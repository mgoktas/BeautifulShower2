import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerSheet, PickerSheetRefProps, toCms, toFeet } from '../../components/Functions/Functions';
import { CustomButton, HeightPicker, Line, Optionals, SCREEN_HEIGHT, SCREEN_WIDTH, Space, styles, WelcomeHeader } from '../../components/Utilities/Utilities';
import { RegisterNotification, RegisterNotificationRefProps } from '../../components/Functions/PermissionFunctions';
import { Notifications } from 'react-native-notifications';
import { updateUser, updateUser2 } from '../../components/Storage/Azure';
import { getDataNumber, getDataString, setData, updateUserMMKV2 } from '../../components/Storage/MMKV';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import Dialog from "react-native-dialog";

const Welcome = ({route, navigation}) =>  {

    // const {user} = route.params
    
    const [isClickedFirst, setIsClickedFirst] = React.useState(false)
    const [isClickedSecond, setIsClickedSecond] = React.useState(false)
    const [isClickedThird, setIsClickedThird] = React.useState(false)

    const [isClickedFirstOnce, setIsClickedFirstOnce] = React.useState(false)
    const [isClickedSecondOnce, setIsClickedSecondOnce] = React.useState(false)
    const [isClickedThirdOnce, setIsClickedThirdOnce] = React.useState(false)

    const [heightCmC, setHeightCmC] = React.useState(180)
    const [heightCm, setHeightCm] = React.useState(180)
    const [unit, setUnit] = React.useState(0)
    const [heightFt, setHeightFt] = React.useState(toFeet(heightCm))
    const [heightInFeet, setHeightInFeet] = React.useState(toFeet(heightCm))
    const [weight, setWeight] = React.useState(340)
    const [weight1, setWeight1] = React.useState(60)
    const [weight2, setWeight2] = React.useState(0)
    const [email, setEmail] = React.useState(getDataString('email'))
    const [firstName, setFirstname] = React.useState(getDataString('firstname'))
    const [lastName, setLastname] = React.useState(getDataString('lastname'))


    const [isClickedDay1, setIsClickedDay1] = React.useState(false)
    const [isClickedDay2, setIsClickedDay2] = React.useState(false)
    const [isClickedDay3, setIsClickedDay3] = React.useState(false)
    const [isClickedDay4, setIsClickedDay4] = React.useState(false)
    const [isClickedDay5, setIsClickedDay5] = React.useState(false)
    const [isClickedDay6, setIsClickedDay6] = React.useState(false)
    const [isClickedDay7, setIsClickedDay7] = React.useState(false)
    
    const [isNotificationsAllowedPrimary, setIsNotificationsAllowedPrimary] = React.useState(getDataNumber('isNotificationsAllowed') == 1)
    const [isNotificationsAllowedSecary, setIsNotificationsAllowedSecary] = React.useState(getDataNumber('isNotificationsAllowedBase') == 1)

    const [isPickerOn, setIsPickerOn] = React.useState(false)
    const [isWSelected, setIsWSelected] = React.useState(false)
    const [isW, setIsW] = React.useState(false)
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false)
    const [goals, setGoals] = React.useState('')
    
    const [isHeightSelected, setIsHeightSelected] = React.useState(false)
    const ref = React.useRef<PickerSheetRefProps>(null)
    
    const openSheet = React.useCallback(() => {
      ref?.current?.scrollTo(-1700)
      setTimeout(() => {
        setIsPickerOn(true)
        setIsVisible(true)
      }, 300)
    }, [])

    React.useEffect(() => {
      ref?.current?.scrollTo(-1100)
    }, [])

    const onHeightChange = (val) => {

      setHeightCm(val)
      console.log(val)
      setHeightFt(toFeet(val))

    }

    const closeSheet = () => {
      setIsPickerOn(false)
      setIsVisible(false)
    }

    const onUnitChange = (val) => {
      if(val == 0){
        setUnit(0)
        setHeightCm(toCms(heightInFeet.split(' ')[0], heightInFeet.split(' ')[1]))
      } else {
        setUnit(1)
        setHeightCm(toFeet(heightCm))
        setHeightFt(toFeet(heightCm))
        setHeightInFeet(toFeet(heightCm))
      }
    }

    const onWeightChangeLeft = (val) => {
      setWeight1(val)
      setWeight(Number(String(weight1) + String(weight2)))
    }

    const onWeightChangeRight = (val) => {
      setWeight2(val)
      setWeight(Number(String(weight1) + String(weight2)))    
    }

    const onValueChangeLeftH = (val) => {
      setHeightInFeet(val.split("'")[0] + ' ' + heightInFeet.split(' ')[1])
      setHeightFt(val.split("'")[0] + ' ' + heightFt.split(' ')[1])
    }

    const onValueChangeRightH = (val) => {
      console.log(val)
      console.log(heightInFeet)
      setHeightInFeet(heightInFeet.split(' ')[0] + ' ' + val)
      setHeightFt(heightFt.split(' ')[0] + ' ' + val)
    }

    const notRef = React.useRef<RegisterNotificationRefProps>(null);
    const SetNotifications = React.useCallback(() => {
      notRef?.current?.SetNotifications()
    }, []);

    const update = async () => {

      const obj = {
        monday: isClickedDay1 ? 1 : 0,
        tuesday: isClickedDay2 ? 1 : 0,
        wednesday: isClickedDay3 ? 1 : 0,
        thursday: isClickedDay4 ? 1 : 0,
        friday: isClickedDay5 ? 1 : 0,
        saturday: isClickedDay6 ? 1 : 0,
        sunday: isClickedDay7 ? 1 : 0,
      }
    
      console.log('email: ',email)
      
      setData('weeklySpentBath', 0)
      setData('weeklyTimes', 0)

      try {
          setData('showerdays', JSON.stringify(obj))
          setData('height', heightCm)
          setData('weight', weight1*10 + weight2)
          setData('goals', goals)
          setData('isSeenFirstNotif', 0)      
  
          firestore()
          .collection('Users')
          .doc(email)
          .update({
            showerdays: JSON.stringify(obj),
            height: heightCm,
            weight: weight,
            goals: goals,
            followercount: 0,
            followingCount: 0,
            followers: '',
            followings: '',
            bio: '',
        })
          .then(async () => {
            
            setData('isLogged', 1)
            await navigation.navigate('SplashScreen2') 
  
          }) 

        }
        catch(err){
            console.log(err)
        }


    }

    const onChangeGoals = (goals) => {
      setGoals(goals)
    }

    function Range(a,b){
      if (b === undefined) {
        b = a;3
        a = 1;
      }
      return [...Array(b-a+1).keys()].map(x => x+a);
    }

    const [isVisible, setIsVisible] = React.useState(false)


  return (
    <View style={[styles.pageWelcome, {backgroundColor:  isPickerOn ? 'gray' : 'white'}]}>

        <WelcomeHeader txt1={`WELCOME ${firstName} ${lastName}`} txt2={"LET'S GET STARTED"} />
        <Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible}>

        {/* <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '100%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 120}}
                    selectedValue={weight[0]}
                    onValueChange={onWeightChangeLeft}>
                {
                  Range(34,770).map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
        </Picker> */}

<HeightPicker onValueChangeLeftH={onValueChangeLeftH} onValueChangeRightH={onValueChangeRightH}  heightInFeet={heightInFeet} isW={isW} selectedIndex={null} onWeightChangeLeft={onWeightChangeLeft} weight={[weight1, weight2]}  onWeightChangeRight={onWeightChangeRight} isWSelected={isWSelected} unit={unit} onUnitChange={onUnitChange} onValueChange={onHeightChange} height={heightCm} isHeightSelected={!isHeightSelected} onPress={() => {closeSheet()}} type={1} values={Range(120,220)} values2={['cm', 'ft']} values3={["3","4'","5'","6'"]} values4={['0"','1"','2"','3"','4"','5"','6"','7"','8"','9"','10"','11"']} values5={Range(34,770)} values6={Range(0,9)} />


        </Dialog.Container>

      <ScrollView>

        <Optionals 
        
        unit={unit}
        onPressDay1={() => {setIsClickedDay1(!isClickedDay1)}} 
        onPressDay2={() => {setIsClickedDay2(!isClickedDay2)}} 
        onPressDay3={() => {setIsClickedDay3(!isClickedDay3)}} 
        onPressDay4={() => {setIsClickedDay4(!isClickedDay4)}} 
        onPressDay5={() => {setIsClickedDay5(!isClickedDay5)}} 
        onPressDay6={() => {setIsClickedDay6(!isClickedDay6)}} 
        onPressDay7={() => {setIsClickedDay7(!isClickedDay7)}} 
        
        isClickedDay1={isClickedDay1}
        isClickedDay2={isClickedDay2} 
        isClickedDay3={isClickedDay3} 
        isClickedDay4={isClickedDay4} 
        isClickedDay5={isClickedDay5} 
        isClickedDay6={isClickedDay6} 
        isClickedDay7={isClickedDay7} 

        height={unit == 0 ? heightCm : heightFt}
        weight={[weight1, weight2]}
        isClickedOnce={isClickedFirstOnce} onPressContinue={() => {setIsClickedFirst(false); setIsClickedThird(false); setIsClickedSecond(!isClickedSecond); setIsClickedFirstOnce(true)}} onPressOpen={() => {setIsClickedSecond(false); setIsClickedThird(false); setIsClickedFirst(!isClickedFirst)}}  isClicked={isClickedFirst} 
        onPressH={() => {setIsW(true); setIsHeightSelected(true); setIsWSelected(false); openSheet(); }} 
        onPressW={() => {setIsW(false); setIsWSelected(true); openSheet(); setIsHeightSelected(false);}} txt1={'Calorie Calculation'} txt2={'To accurately calculate the calories you burned in shower, we need to know how often you take showers.'}/>
        <Optionals 
        
        toggleSwitchNotifications={() => {

          console.log(isNotificationsAllowedSecary)

          if(true){
            setIsNotificationsAllowedPrimary(!isNotificationsAllowedPrimary)
          } else {
            SetNotifications()
          }

        }}
        
        isNotificationsEnabled={isNotificationsAllowedPrimary} isClickedOnce={isClickedSecondOnce} onPressContinue={() => {setIsClickedThird(true); setIsClickedSecond(false); ; setIsClickedSecondOnce(true)}} onPressOpen={() => {setIsClickedFirst(false); setIsClickedThird(false); setIsClickedSecond(!isClickedSecond); }}  type={2} isClicked={isClickedSecond} onPressH={() => {openSheet(); setIsHeightSelected(true); }} onPressW={() => {openSheet(); setIsHeightSelected(false);}} txt1={'Permissions'} txt2={'Help us provide you with the best experience possible.'}/>
        <Optionals isClickedOnce={isClickedThirdOnce} onPressContinue={() => {setIsClickedThird(false); ; setIsClickedThirdOnce(true)}} onPressOpen={() => {setIsClickedSecond(false); setIsClickedFirst(false); setIsClickedThird(!isClickedThird)}} onPressG={() => {navigation.navigate('Goals', {onChangeGoals:onChangeGoals})}} type={3} isClicked={isClickedThird} onPressH={() => {openSheet(); setIsHeightSelected(true); }} onPressW={() => {openSheet(); setIsHeightSelected(false);}} txt1={'Set a Personal Goal'} txt2={'Having a goal, however big or small, can help keep you focused and motivated.'}/>
        <Space space={120}/>

      </ScrollView>
        <View style={{bottom: 50, position: 'absolute', width: SCREEN_WIDTH}}>
          <Line />
          <CustomButton isReady={isClickedFirstOnce && isClickedSecondOnce && isClickedThirdOnce ? true : false} onPress={() => { update() }} txt={'READY TO GO'}/>
        </View>

    <RegisterNotification ref={notRef} />

    {/* <PickerSheet onValueChangeLeftH={onValueChangeLeftH} onValueChangeRightH={onValueChangeRightH} heightInFeet={heightInFeet} isW={isW} weight={[weight1, weight2]} onWeightChangeLeft={onWeightChangeLeft} onWeightChangeRight={onWeightChangeRight} closeSheet={closeSheet} isWSelected={isWSelected} feet1={heightFt.split(' ')[0]} feet2={heightFt.split(' ')[1]} unit={unit} onUnitChange={onUnitChange} onHeightChange={onHeightChange} height={heightCm} isHeightSelected={isHeightSelected} ref={ref} /> */}
    </View>
  );
};

export default Welcome;
