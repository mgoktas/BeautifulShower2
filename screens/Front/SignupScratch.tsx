
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAccount } from '../../components/Functions/AuthFunctions';
import { AgreementSheet, AgreementSheetRefProps, getAge, getDate, getDDate, hashPassword, SignWithFb } from '../../components/Functions/Functions';
import { addUserToMMKV, setData, updateUserMMKV } from '../../components/Storage/MMKV';
import { AppleButtonWithHighlight, BottomTab, BottomText, CustomButton, CustomInput, CustomSwitch, Header, InfoText, JoinLogo, Line, LocationSwitch, SCREEN_HEIGHT, SCREEN_WIDTH, SignWith, SignWithEmail, Space, styles } from '../../components/Utilities/Utilities';
import { createUserEmail, updateUser } from '../../components/Storage/Azure';

interface JoinProps {}

const SignupScratch = ({navigation}) => {


    const [date, setDate] = React.useState(getDDate(new Date()))

    const [isActive1, setIsActive1] = React.useState(true)
    const [isActive2, setIsActive2] = React.useState(false)
    const [isActive3, setIsActive3] = React.useState(false)
    const [isSheetOn, setIsSheetOn] = React.useState(false)

    const [isClickedLocation, setIsClickedLocation] = React.useState(false)
    const [isClickedBirthdate, setIsClickedBirthdate] = React.useState(false)

    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [country, setCountry] = React.useState('United States')
    const [countryIso, setCountryIso] = React.useState('US')
    const [birthDate, setBirthDate] = React.useState(getDate(date))

    const [countries, setCountries] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

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

    const openWelcome = async () => {

        const gender = isActive1 ? 'Male' : isActive2 ? 'Female' : 'Not Specified'
        
        try{

            setData('firstname', name)
            setData('locationIso2', countryIso)
            setData('bio', 'Add a bio to your profile!')

            console.log(countryIso, 1)

            await createAccount(name, lastName, gender, email, countryIso, country, date.toString(), birthDate, password, password2, navigation )
            
            console.log(99)
            
            setData('firstname', name)
            setData('lastname', lastName)

        
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
        ref?.current?.scrollTo(-1450)
    }, [])

    React.useEffect(() => {
        // ref?.current?.scrollTo(-1450)
    },[])


    const scrollViewRef = useRef();

    return (
    !isLoading ?         
        
        <View style={{backgroundColor: isSheetOn ? 'gray' : 'white'}}>
            <Space space={45}/>
            <Header isSheetOn={isSheetOn} isBlank={true} onPress={() => {navigation.goBack()}} />
            <View style={styles.flexCnt}>
            <ScrollView ref={scrollViewRef} style={{backgroundColor: 'transparent'}}>
    
                <JoinLogo type={2} txt1={'HELP US FILL IN THE GAPS'} txt2={'Your information is secure with us. Users will be able to search for you by your name or email address.'} />
    
                <Space space={20}/>
    
                <CustomInput onChangeText={(txt) => {setName(txt)}} isName={true} type={1} txt={'FIRST NAME'}  />
                
                <Space space={30}/>
            
                <CustomInput onChangeText={(txt) => {setLastName(txt)}} isName={true} type={1}  txt={'LAST NAME'} />
    
                <CustomSwitch onPress1={() => {setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>
        
                <Space space={30}/>
    
                <CustomInput isName={false} onChangeText={(txt) => {setEmail(txt)}} type={1}  txt={'EMAIL'} />
    
                <Space space={30}/>
                
                <CustomInput isName={false} onChangeText={(txt) => {setPassword(txt)}} type={5} noText={true}  txt={'PASSWORD'} />
             
                <Space space={20}/>
              
                <CustomInput isName={false} onChangeText={(txt) => {setPassword2(txt)}} type={5}  txt={'PASSWORD'} />
                    
                <Space space={20}/>
        
                <LocationSwitch  onValueChange={(val, ind) => { setCountryIso(val); setCountry(countries[ind].name); console.log(val, 0) } } value={countryIso} values={countries}

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
                
                <LocationSwitch onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); }} date={date} type={'date'}  
                
                        onPress={() => {

                            if (isClickedBirthdate) {

                                scrollViewRef?.current.scrollTo({ x: 0, y: 110, animated: true });
                                setIsClickedBirthdate(false);

                            } else {

                                scrollViewRef?.current.scrollTo({ x: 0, y: SCREEN_HEIGHT + 100, animated: true });
                                setIsClickedBirthdate(true);

                            }


                        } } isClicked={isClickedBirthdate} txt1={'BIRTHDATE'} txt2={birthDate} value={undefined} onValueChange={undefined} values={undefined} open={isClickedBirthdate} onCancel={undefined} sdWghtLeft={undefined} sdWghtRight={undefined} oVCWLeft={undefined} oVCWRight={undefined} sdWgTp={undefined} heightSd={undefined} oVC={undefined}/>
    
                <Space space={120}/>

            </ScrollView>

                
            <InfoText onPress={() => {openWelcome()}} />
            </View>

            {/* <AgreementSheet closeSheet={closeSheet} openWelcome={openWelcome} ref={ref}/> */}
     
        </View>
:
        <View style={{backgroundColor: isSheetOn ? 'gray' : 'white'}}>
        <Space space={45}/>
        <Header isSheetOn={isSheetOn} isBlank={true} onPress={() => {navigation.goBack()}} />
        <View style={styles.flexCnt}>
    
        <ScrollView ref={scrollViewRef} style={{backgroundColor: 'transparent'}}>

            <JoinLogo type={2} txt1={'HELP US FILL IN THE GAPS'} txt2={'Your information is secure with us. Users will be able to search for you by your name or email address.'} />

            <Space space={20}/>
            <CustomInput onChangeText={(txt) => {setName(txt)}} isName={true} type={1} txt={'FIRST NAME'}  />
            
            <Space space={30}/>
        
            <CustomInput onChangeText={(txt) => {setLastName(txt)}} isName={true} type={1}  txt={'LAST NAME'} />

            <CustomSwitch onPress1={() => {setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>
    
            <Space space={30}/>

            <CustomInput isName={false} onChangeText={(txt) => {setEmail(txt)}} type={1}  txt={'EMAIL'} />

            <Space space={20}/>

            <Space space={20}/>
        
            {/* <LocationSwitch onPress={() => {setIsClickedBirthdate(!isClickedBirthdate)}} isClicked={isClickedBirthdate}  txt1={'BIRTHDATE'} txt2={birthDate}/> */}

            <CustomButton onPress={() => {navigation.navigate('Welcome')}} txt={'JOIN'}/>

        </ScrollView>        
        
    </View>
    </View>
    )
};

export default SignupScratch;