import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderHome, HeightPicker, LocationSwitch, ProfileEdit, ProfileEditProfile, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT, Space, TextButtonSh } from '../../../components/Utilities/Utilities';
import getCountryISO3 from 'country-iso-2-to-3'
import { PickerSheetRefProps, getDate, setBioo, setProperty, toCms, toFeet } from '../../../components/Functions/Functions';
import { azureConstant, azureConstantBackground } from '../../../components/Data/Data';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../../components/Functions/5-FunctionsProfile';
import { getDataNumber, getDataString, setData } from '../../../components/Storage/MMKV';
import firestore from '@react-native-firebase/firestore';
import { RegisterNotificationRefProps } from '../../../components/Functions/PermissionFunctions';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'react-native-image-picker';
import { putBackgroundImage, putImage } from '../../../components/Storage/Azure';

const EditProfile = ({navigation}) => {
  const [isActive1, setIsActive1] = React.useState(getDataString('gender') == 'Male')
  const [isActive2, setIsActive2] = React.useState(getDataString('gender') == 'Female')
  const [isActive3, setIsActive3] = React.useState(getDataString('gender') == 'Prefer Not To Say')
  const [isSheetOn, setIsSheetOn] = React.useState(true)
  // scrollViewRef.current.scrollToEnd({animated: true})}
  const [isClickedLocation, setIsClickedLocation] = React.useState(false)
  const [isClickedBirthdate, setIsClickedBirthdate] = React.useState(false)
  const [isClickedWeight, setIsClickedWeight] = React.useState(false)
  const [isClickedHeight, setIsClickedHeight] = React.useState(false)

  console.log(bio)
  
  const [bio, setBio] = React.useState(getDataString('bio'))
  const [name, setName] = React.useState(getDataString('firstname'))
  const [lastname, setLastname] = React.useState(getDataString('lastname'))
  const [email, setEmail] = React.useState(getDataString('email'))
  const [country, setCountry] = React.useState(getDataString('locationName'))
  const [countryIso, setCountryIso] = React.useState(getDataString('locationIso2'))
  const [height, setHeight] = React.useState(getDataNumber('height'))
  const [weight, setWeight] = React.useState(getDataNumber('weight'))
  const lookup = require('country-code-lookup')
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(new Date())

  console.log(getDataString('birthdateDATE'))
  console.log(getDataString('birthdateName'))

  const [birthdateName, setBirthdateName] = React.useState(getDataString('birthdateName'))
  const [birthdateDATE, setBirthdateDATE] = React.useState(getDataString('birthdateName'))

  const avatarUrl = azureConstant + email

  const [countries, setCountries] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [birthdate, setBirthdate] = React.useState(getDate(date))
  const [birthDate, setBirthDate] = React.useState(getDate(date))
  const [avatarChosen, setAvatarChosen] = React.useState(false)

  React.useEffect(() => {
    dataFetch1()
},[])

  const dataFetch1 = async () => {

    try{
        
        const response = await fetch('https://api.countrystatecity.in/v1/countries', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSCAPI-KEY': 'UG9lVktzWEswQ3lTSlJEN0tGODRNMkkxZllnTDVzcW5abTFYSm1MQg=='
    },
    })
        setIsLoading(false)
        setCountries(await response.json())

    }catch(err){
        console.log(err)
    }


    }

  const backgroundUrl = azureConstantBackground + email


  const onChangeText = (num, txt) => {
    if(num == 0){
      setName(txt)
    }
    if(num == 1){
      setLastname(txt)
    }
    if(num == 2){
      setEmail(txt)
    }
  }

  const setSwitch = async (n, v) => {
    if(n == 0){
      setCountryIso(v)
      setCountry(lookup.byIso(v).country)

    }
    else if(n == 1){
      // setBirthdate(V)
    }
    else if(n == 2){
    }
  }

  const openSheet = React.useCallback(() => {
    setIsSheetOn(true)
    setTimeout(() => {
      setIsVisible(true)
    }, 300) 
}, [])

  const scrollViewRef = React.useRef();

      
  const [isClickedFirst, setIsClickedFirst] = React.useState(false)
  const [isClickedSecond, setIsClickedSecond] = React.useState(false)
  const [isClickedThird, setIsClickedThird] = React.useState(false)
  
  const [gender, setGender] = React.useState(getDataString('gender'))

  const [isClickedFirstOnce, setIsClickedFirstOnce] = React.useState(false)
  const [isClickedSecondOnce, setIsClickedSecondOnce] = React.useState(false)
  const [isClickedThirdOnce, setIsClickedThirdOnce] = React.useState(false)

  const [heightCmC, setHeightCmC] = React.useState(180)
  const [heightCm, setHeightCm] = React.useState(height)
  const [unit, setUnit] = React.useState(0)
  const [heightFt, setHeightFt] = React.useState(toFeet(heightCm))
  const [heightInFeet, setHeightInFeet] = React.useState(toFeet(heightCm))
  const [weight1, setWeight1] = React.useState(60)
  const [weight2, setWeight2] = React.useState(0)

  const onValueChangeHeight = (val) => {
    setHeight(val)
  }

  

  const [isClickedDay1, setIsClickedDay1] = React.useState(false)
  const [isClickedDay2, setIsClickedDay2] = React.useState(false)
  const [isClickedDay3, setIsClickedDay3] = React.useState(false)
  const [isClickedDay4, setIsClickedDay4] = React.useState(false)
  const [isClickedDay5, setIsClickedDay5] = React.useState(false)
  const [isClickedDay6, setIsClickedDay6] = React.useState(false)
  const [isClickedDay7, setIsClickedDay7] = React.useState(false)
  const [heightInF1, setHeightInF1] = React.useState(0)
  const [heightInF2, setHeightInF2] = React.useState(0)
  const [isVisible2, setIsVisible2] = React.useState(false)
  const [isVisible3, setIsVisible3] = React.useState(false)

  const [isPickerOn, setIsPickerOn] = React.useState(false)
  const [isWSelected, setIsWSelected] = React.useState(false)
  const [isW, setIsW] = React.useState(false)
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false)
  const [goals, setGoals] = React.useState('')
  
  const [isHeightSelected, setIsHeightSelected] = React.useState(false)
  const ref = React.useRef<PickerSheetRefProps>(null)
  
  React.useEffect(() => {
    ref?.current?.scrollTo(-1100)
  }, [])

  const onHeightChange = (val) => {

    setHeightCm(toFeet(heightCm))
      setHeightFt(toFeet(heightCm))
      setHeightInFeet(toFeet(heightCm))


      console.log(heightFt)

      setHeightInF1(toFeet(heightCm).split(' ')[0])
      setHeightInF2(toFeet(heightCm).split(' ')[1])
      
    setHeightCm(val)
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

      setHeightCm(toFeet(heightCm))
      setHeightFt(toFeet(heightCm))
      setHeightInFeet(toFeet(heightCm))


      console.log(heightFt)

      setHeightInF1(toFeet(heightCm).split(' ')[0])
      setHeightInF2(toFeet(heightCm).split(' ')[1])
      
      console.log(heightInF1)
      console.log(heightInF2)

      setUnit(1)

      
    }
  }

  const onWeightChangeLeft = (val) => {
    setWeight(val)
  }

  const onWeightChangeRight = (val) => {
    setWeight(val)
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


  const optionsCamera = {

    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
    quality: 0.8,
    presentationStyle: 'pageSheet',
    selectionLimit: 1,
    
  };

const launchCamera = async () => {

    await ImagePicker.launchCamera(optionsCamera, response => {
      try{
        
        console.log(response)

        const file = response.assets[0] 

        avatarChosen ? putImage(file, email) : putBackgroundImage(file, email)
        
      }
      catch(err){
        
      }    });
  };

const optionsLibrary = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const launchLibrary = async () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
    },
    (response) => {

      try{
        const file = response.assets[0] 

        avatarChosen ? putImage(file, email) : putBackgroundImage(file, email)
        
      }
      catch(err){
        
      }


    },
  )
  };


  const notRef = React.useRef<RegisterNotificationRefProps>(null);

  function Range(a,b){
    if (b === undefined) {
      b = a;3
      a = 1;
    }
    return [...Array(b-a+1).keys()].map(x => x+a);
  }

  const [isVisible, setIsVisible] = React.useState(false)

  console.log(country)
  console.log(countryIso)

  return (

    !isLoading ?
    
<SafeAreaView style={{height: SCREEN_HEIGHT}}>
<HeaderHome onPress={()=> {navigation.goBack(); 

 setProperty(email, name, lastname, bio, gender, heightCm, weight, countryIso, country)
 ;}} onPressBack={() => {navigation.goBack();}} type={6} title={'EDIT PROFILE'} txt={'Done'}/>

<Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible}>

<HeightPicker onValueChangeLeftH={onValueChangeLeftH} onValueChangeRightH={onValueChangeRightH} weight={weight}  heightInFeet={heightInFeet} isW={isW} selectedIndex={null} onWeightChangeLeft={onWeightChangeLeft} onWeightChangeRight={onWeightChangeRight} isWSelected={isWSelected} unit={unit} onUnitChange={onUnitChange} onValueChange={onHeightChange} height={heightCm} isHeightSelected={!isHeightSelected} onPress={() => {closeSheet()}} type={1} values={Range(120,220)} values2={['cm', 'ft']} values3={["3","4'","5'","6'"]} values4={['0"','1"','2"','3"','4"','5"','6"','7"','8"','9"','10"','11"']} values5={Range(34,770)} values6={Range(0,9)} />

</Dialog.Container>

<Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible3}>

<TextButtonSh
        //   isDarkModeOn={props}
          title1={'Take Photo'}
          title2={'Choose Photo'}
          // title3={'Browse...'}
          title4={'Cancel'}
          isFirst={true}
          isLast={true}
          onPress1={() => {
            launchCamera();
          }}
          onPress2={() => {
            launchLibrary();
          }}
          onPress4={() => {
            // scrollTo(SCREEN_HEIGHT/2);
            // props.closeSheet();
            setIsVisible3(false)
          }}
        />

</Dialog.Container>

<ScrollView ref={scrollViewRef}>

  <ProfilePerson onPress={() => {
     setAvatarChosen(false);
     setIsVisible3(true)
  }} imageSource={backgroundUrl} type={2} />
  
  <ProfileEditProfile
  imageSource={avatarUrl}  
  onPressAvi={() => {
    setAvatarChosen(true);
    setIsVisible3(true)
 }}  
        heightInF1={heightInF1}
        heightInF2={heightInF2}
        unit={unit}
        height={unit == 0 ? heightCm : heightFt}
        weight={weight}
        isClickedOnce={isClickedFirstOnce} onPressContinue={() => {setIsClickedFirst(false); setIsClickedThird(false); setIsClickedSecond(!isClickedSecond); setIsClickedFirstOnce(true)}} onPressOpen={() => {setIsClickedSecond(false); setIsClickedThird(false); setIsClickedFirst(!isClickedFirst)}}  isClicked={isClickedFirst} 
        onPressH={() => {setIsW(true); setIsHeightSelected(true); setIsWSelected(false); openSheet(); }} 
        onPressW={() => {setIsW(false); setIsWSelected(true); openSheet(); setIsHeightSelected(false);}} txt1={'Calorie Calculation'} txt2={'To accurately calculate the calories you burned in shower, we need to know how often you take showers.'} onChangeBio={(val) => {setBio(val);}} bio={bio} isClickedWeight={isClickedWeight} isClickedHeight={isClickedHeight} onPressHt={() => {setIsClickedWeight(!isClickedHeight)}}  onPressWg={() => {setIsClickedWeight(!isClickedWeight)}} open={open} date={date} onDateChange={(date) => {setOpen(true);setDate(date);setBirthdate(getDate(date))}} onChangeCountry={v => setSwitch(0, v)}  onChangeLastname={(txt) => {onChangeText(1, txt)}}  onChangeName={(txt) => {onChangeText(0, txt)}} countries={countries} countryIso={countryIso} email={email} country={country} birthdate={birthdate} onPressCon={() => {setIsClickedLocation(!isClickedLocation);  scrollViewRef.current.scrollToEnd({animated: true})}} onPressBd={() => {setOpen(!open); scrollViewRef.current.scrollToEnd({animated: true})}} isClickedBirthdate={isClickedBirthdate} isClickedLocation={isClickedLocation}  onPress1={() => {setData('gender', 'Male'); setGender('Male'); ;setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setData('gender', 'Female'); setGender('Female'); setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setData('gender', 'Prefer Not To Say'); setGender('Prefer Not To Say'); setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} name={name} lastname={lastname}/>
{/* 
<LocationSwitch onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); }} date={new Date('2011-04-11T10:20:30Z')} type={'date'}  
 isClicked={isClickedBirthdate} txt1={'BIRTHDATE'} txt2={birthdateName} value={undefined} onValueChange={undefined} values={undefined} open={isClickedBirthdate} onCancel={undefined} sdWghtLeft={undefined} sdWghtRight={undefined} oVCWLeft={undefined} oVCWRight={undefined} sdWgTp={undefined} heightSd={undefined} oVC={undefined}/> */}

</ScrollView>

</SafeAreaView>
    :

    <SafeAreaView>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={6} title={'EDIT PROFILE'} txt={'Save'}/>

        <ProfilePerson type={2} />
        
    </SafeAreaView>    
  );
};

export default EditProfile;
