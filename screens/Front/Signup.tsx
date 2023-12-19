
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAccount } from '../../components/Functions/AuthFunctions';
import { AgreementSheet, AgreementSheetRefProps, getAge, getDate, getDDate, hashPassword, SignWithFb } from '../../components/Functions/Functions';
import { addUserToMMKV, getDataString, setData, updateUserMMKV } from '../../components/Storage/MMKV';
import { AppleButtonWithHighlight, BottomTab, BottomText, CustomButton, CustomInput, CustomSwitch, Header, InfoText, JoinLogo, Line, LocationSwitch, SCREEN_HEIGHT, SCREEN_WIDTH, SignWith, SignWithEmail, Space, styles } from '../../components/Utilities/Utilities';
import { updateUser } from '../../components/Storage/Azure';
import firestore from '@react-native-firebase/firestore';

interface JoinProps {}

const Signup = ({route, navigation}) => {

    const {email} = route.params

    const [date, setDate] = React.useState(getDDate(new Date()))

    const [isActive1, setIsActive1] = React.useState(true)
    const [isActive2, setIsActive2] = React.useState(false)
    const [isActive3, setIsActive3] = React.useState(false)
    const [isSheetOn, setIsSheetOn] = React.useState(false)

    const [isClickedLocation, setIsClickedLocation] = React.useState(false)
    const [isClickedBirthdate, setIsClickedBirthdate] = React.useState(false)

    const [name, setName] = React.useState('')
    const [name2, setName2] = React.useState(getDataString('firstname'))
    const [lastName, setLastName] = React.useState('')
    const [lastName2, setLastName2] = React.useState(getDataString('lastname'))
    const [password, setPassword] = React.useState('')
    const [country, setCountry] = React.useState('United States')
    const [countryIso, setCountryIso] = React.useState('US')
    const [birthDate, setBirthDate] = React.useState(getDate(date))

    const [countries, setCountries] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const openWelcome = async () => {

        const gender = isActive1 ? 'Male' : isActive2 ? 'Female' : 'Not Specified'

        try {
            
            setData('gender', gender)
            setData('locationISO2', countryIso)
            setData('locationName', country)
            setData('birthdateDATE', date.toString())
            setData('birthdateName', birthDate)
            
          firestore()
          .collection('Users')
          .doc(email)
          .update({
            gender: gender,
            locationISO2: countryIso,
            locationName: country,
            birthdateDATE: date,
            birthdateName: birthDate,
        })
          .then(async () => {
            
            await navigation.navigate('Welcome') 
  
          }) 

        }
        catch(err){
            console.log(err)
        }
    }
    
    const closeSheet = () => {
        setIsSheetOn(false)
    }

    const ref = React.useRef<AgreementSheetRefProps>(null)
    const openSheet = useCallback(() => {
        ref?.current?.scrollTo(-1250)
    }, [])

    React.useEffect(() => {
        dataFetch1()
        ref?.current?.scrollTo(100)
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

        return

        }

    const scrollViewRef = useRef();

    return (
    !isLoading ?         
        
        <View style={{backgroundColor: isSheetOn ? 'gray' : 'white'}}>
            <Header isSheetOn={isSheetOn} isBlank={true} onPress={() => { navigation.goBack(); } } type={'signup'} />
        <View style={styles.flexCnt}>
            <ScrollView ref={scrollViewRef} style={{backgroundColor: 'transparent'}}>
    
                <JoinLogo type={2} txt1={'HELP US FILL IN THE GAPS'} txt2={'Your information is secure with us. Users will be able to search for you by your name or email address.'} />
    
                <Space space={20}/>
    
                <CustomSwitch onPress1={() => {setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>
        
                <LocationSwitch  onValueChange={(val, ind) => { setCountryIso(val); setCountry(countries[ind].name); } } value={countryIso} values={countries}

                        onPress={() => {

                            if (isClickedLocation) {

                                scrollViewRef?.current.scrollTo({ x: 0, y: 110, animated: true });
                                setIsClickedLocation(false);

                            } else {

                                scrollViewRef?.current.scrollTo({ x: 0, y: SCREEN_HEIGHT, animated: true });
                                setIsClickedLocation(true);

                            }


                        } }
                        isClicked={true} txt1={'LOCATION'} txt2={country} type={2} open={undefined} date={undefined} onDateChange={undefined} onCancel={undefined} sdWghtLeft={undefined} sdWghtRight={undefined} oVCWLeft={undefined} oVCWRight={undefined} sdWgTp={undefined} heightSd={undefined} oVC={undefined}/>
                
                <LocationSwitch onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); console.log(date, getDate(date))}} date={date} type={'date'}  
                
                        onPress={() => {

                            if (isClickedBirthdate) {

                                scrollViewRef?.current.scrollTo({ x: 0, y: 110, animated: true });
                                setIsClickedBirthdate(false);

                            } else {

                                scrollViewRef?.current.scrollTo({ x: 0, y: SCREEN_HEIGHT + 100, animated: true });
                                setIsClickedBirthdate(true);

                            }


                        } } isClicked={isClickedBirthdate} txt1={'BIRTHDATE'} txt2={birthDate} value={undefined} onValueChange={undefined} values={undefined} open={isClickedBirthdate} onCancel={undefined} sdWghtLeft={undefined} sdWghtRight={undefined} oVCWLeft={undefined} oVCWRight={undefined} sdWgTp={undefined} heightSd={undefined} oVC={undefined}/>
    

            </ScrollView>

                
            <InfoText onPress={() => {
                        openSheet();
                        // openWelcome()
                    } } type={undefined} txt1={undefined} txt2={undefined} />
            </View>

            <AgreementSheet closeSheet={closeSheet} openWelcome={openWelcome} ref={ref}/>
     
        </View>
:
       <View style={{backgroundColor: isSheetOn ? 'gray' : 'white'}}>
            <Space space={45}/>
            <Header isSheetOn={isSheetOn} isBlank={true} onPress={() => { navigation.goBack(); } } type={undefined} />
        <View style={styles.flexCnt}>
            <ScrollView ref={scrollViewRef} style={{backgroundColor: 'transparent'}}>
    
            <JoinLogo type={2} txt1={'HELP US FILL IN THE GAPS'} txt2={'Your information is secure with us. Users will be able to search for you by your name or email address.'} />

            <Space space={20}/>

            <CustomInput type={1} txt={'FIRST NAME'} name={name} email={undefined} onChangeText={undefined} isName={undefined} txt1={undefined} name1={undefined} lastname1={undefined} />
            
            <Space space={20}/>
        
            <CustomInput type={1} txt={'LAST NAME'} name={lastName} email={undefined} onChangeText={undefined} isName={undefined} txt1={undefined} name1={undefined} lastname1={undefined} />

            <CustomSwitch onPress1={() => {setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>

            <Line space={30} type={undefined}/>

            <Space space={20}/>

            <CustomInput type={3} txt={'EMAIL'} name={email} email={undefined} onChangeText={undefined} isName={undefined} txt1={undefined} name1={undefined} lastname1={undefined} />

            <Space space={20}/>

            <Space space={20}/>
        
            {/* <LocationSwitch onPress={() => {setIsClickedBirthdate(!isClickedBirthdate)}} isClicked={isClickedBirthdate}  txt1={'BIRTHDATE'} txt2={birthDate}/> */}

            <CustomButton onPress={() => { navigation.navigate('Welcome'); } } txt={'JOIN'} isReady={undefined} type={undefined} isClicked={undefined} space={undefined}/>

        </ScrollView>        
        

    </View>
    </View>
    )
};

export default Signup;