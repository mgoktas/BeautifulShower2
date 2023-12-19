import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderHome, LocationSwitch, ProfileEdit, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT, Space } from '../../../components/Utilities/Utilities';
import getCountryISO3 from 'country-iso-2-to-3'
import { getDate } from '../../../components/Functions/Functions';
import { azureConstant, azureConstantBackground } from '../../../components/Data/Data';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../../components/Functions/5-FunctionsProfile';
import { getDataString } from '../../../components/Storage/MMKV';

const EditProfile = ({route, navigation}) => {
  const [isActive1, setIsActive1] = React.useState(true)
  const [isActive2, setIsActive2] = React.useState(false)
  const [isActive3, setIsActive3] = React.useState(false)
  const [isSheetOn, setIsSheetOn] = React.useState(true)
  // scrollViewRef.current.scrollToEnd({animated: true})}
  const [isClickedLocation, setIsClickedLocation] = React.useState(false)
  const [isClickedBirthdate, setIsClickedBirthdate] = React.useState(false)
  const [isClickedWeight, setIsClickedWeight] = React.useState(false)
  const [isClickedHeight, setIsClickedHeight] = React.useState(false)

  const [name, setName] = React.useState(getDataString('firstname'))
  const [lastname, setLastname] = React.useState(getDataString('firstname'))
  const [email, setEmail] = React.useState(getDataString('email'))
  const [country, setCountry] = React.useState(getDataString('locationName'))
  // const [countryLong, setCountryLong] = React.useState(getDataString('locationName'))
  const [countryIso, setCountryIso] = React.useState(getDataString('locationISO2'))
  const [height, setHeight] = React.useState(getDataString('height'))
  const [weight, setWeight] = React.useState(getDataString('weight'))
  const lookup = require('country-code-lookup')
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(new Date())
  
  const [countries, setCountries] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [birthdate, setBirthdate] = React.useState(getDate(date))
  const [birthDate, setBirthDate] = React.useState(getDate(date))
  const [avatarChosen, setAvatarChosen] = React.useState(false)

  const myWeight = 605
  const myHeight = 175

  const avatarUrl = azureConstant + email
  const backgroundUrl = azureConstantBackground + email

  const avatarRef = React.useRef<ChangeAvatarRefProps>(null)

  const [sdWghtLeft, setSdWghtLeft] = React.useState(Number(String(myWeight).slice(0, -1)))
  const [sdWghtRight, setSdWghtRight] = React.useState(Number(String(myWeight).charAt(String(myWeight).length - 1)))
  const [heightSd, setHeightSd] = React.useState(myHeight)
  // const [sdWgTp] = React.useState([])

  React.useEffect(() => {
      const dataFetch1 = async () => {
          await fetch('https://api.countrystatecity.in/v1/countries', {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSCAPI-KEY': 'UG9lVktzWEswQ3lTSlJEN0tGODRNMkkxZllnTDVzcW5abTFYSm1MQg=='
          },
          })
          .then(response => response.json())
          .then(json => {
              setCountries(json)
              setIsLoading(false)
          })
          .catch(error => {
              console.error(error);
          });
          }
      dataFetch1()
  },[])

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
    avatarRef?.current?.scrollTo(-SCREEN_HEIGHT/3)
}, [])

  const scrollViewRef = React.useRef();

  return (

    isLoading ?
    <SafeAreaView>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={6} title={'EDIT PROFILE'} txt={'Save'}/>

        <ProfilePerson type={2} />
        
    </SafeAreaView>    
    :

    <SafeAreaView style={{height: SCREEN_HEIGHT}}>
        <HeaderHome onPress={()=> {navigation.goBack()}} onPressBack={() => {navigation.goBack()}} type={6} title={'EDIT PROFILE'} txt={'Done'}/>

      <ScrollView ref={scrollViewRef}>
  
          <ProfilePerson onPress={() => {
             setAvatarChosen(false);
             openSheet()
          }} imageSource={backgroundUrl} type={2} />
          
          <ProfileEdit typee={2} isClickedWeight={isClickedWeight} isClickedHeight={isClickedHeight} onPressHt={() => {setIsClickedWeight(!isClickedHeight)}}  onPressWg={() => {setIsClickedWeight(!isClickedWeight)}} open={open} date={date} onDateChange={(date) => {setOpen(true);setDate(date);setBirthdate(getDate(date))}} onChangeCountry={v => setSwitch(0, v)} onChangeBio={(txt) => {onChangeText(2, txt)}}  onChangeLastname={(txt) => {onChangeText(1, txt)}}  onChangeName={(txt) => {onChangeText(0, txt)}} height={height} weight={weight} countries={countries} countryIso={countryIso} email={email} country={country} birthdate={birthdate} onPressCon={() => {setIsClickedLocation(!isClickedLocation);  scrollViewRef.current.scrollToEnd({animated: true})}} onPressBd={() => {setOpen(!open); scrollViewRef.current.scrollToEnd({animated: true})}} isClickedBirthdate={isClickedBirthdate} isClickedLocation={isClickedLocation}  onPress1={() => {setIsActive1(true); setIsActive2(false); setIsActive3(false)}} onPress2={() => {setIsActive1(false); setIsActive2(true); setIsActive3(false)}} onPress3={() => {setIsActive1(false); setIsActive2(false); setIsActive3(true)}} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} name={name} lastname={lastname}/>
  
          <Space space={20}/>
          <Space space={20}/>
      
          <LocationSwitch  onValueChange={(val, ind) => {setCountryIso(val); setCountry(countries[ind].name)}}  value={countryIso} values={countries} 
          date={date}
          onPress={() => {
          
              if(isClickedLocation){
                  
                  scrollViewRef?.current.scrollTo({x: 0, y: 110, animated: true})
                  setIsClickedLocation(false)
                    
              } else {

                  scrollViewRef?.current.scrollTo({x: 0, y: SCREEN_HEIGHT, animated: true})
                  setIsClickedLocation(true)

              }
          
          
          }}                  
          type={'location'}
          isClicked={true} txt1={'LOCATION'} txt2={country}/>
                
                <Space space={20}/>
                <Space space={20}/>
            
          <LocationSwitch onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); console.log(date, getDate(date))}} date={date} type={2}  
          
          onPress={() => {
          
              if(isClickedBirthdate){
                  
                  scrollViewRef?.current.scrollTo({x: 0, y: 110, animated: true})
                  setIsClickedBirthdate(false)
                    
              } else {

                  scrollViewRef?.current.scrollTo({x: 0, y: SCREEN_HEIGHT + 100, animated: true})
                  setIsClickedBirthdate(true)

              }
          
          
          }} isClicked={isClickedBirthdate}  txt1={'BIRTHDATE'} txt2={birthDate}/>

          <Space space={20}/>
          <Space space={20}/>

          <LocationSwitch 
          
          type={'weight'} onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); console.log(date, getDate(date))}} date={date}  
          
          sdWghtLeft={sdWghtLeft}

          sdWghtRight={sdWghtRight}

          sdWgTp={'kg'}
          
          // onUnitChange={}

          oVCWLeft={(val) => {setSdWghtLeft(val)}}

          oVCWRight={(val) => {setSdWghtRight(val)}}

          onPress={() => {
          
              // if(isClickedWeight){
                  
              //     scrollViewRef?.current.scrollTo({x: 0, y: 110, animated: true})
              !isClickedWeight ? setIsClickedHeight(false) : {}
              //     setIsClickedBirthdate(false)

              setIsClickedWeight(!isClickedWeight)
                    
              // } else {

              //     scrollViewRef?.current.scrollTo({x: 0, y: SCREEN_HEIGHT + 100, animated: true})
              //     setIsClickedBirthdate(true)

              // }
          
          
          }} isClicked={isClickedWeight}  txt1={'WEIGHT'} txt2={`${sdWghtLeft}.${sdWghtRight} kg`}/>

          <Space space={20}/>
          <Space space={20}/>


          <LocationSwitch 
          
          type={'height'} onDateChange={(date) => {setDate(date); setBirthDate(getDate(date)); console.log(date, getDate(date))}} date={date}  
          
          heightSd={heightSd}  
          
          sdWgTp={'cm'}

          oVC={(val) => {setHeightSd(val)}}


          onPress={() => {
          
              // if(isClickedWeight){
                  
              //     scrollViewRef?.current.scrollTo({x: 0, y: 110, animated: true})
              //     setIsClickedBirthdate(false)

              !isClickedHeight ? setIsClickedWeight(false) : {}

              setIsClickedHeight(!isClickedHeight)
              
                    
              // } else {

              //     scrollViewRef?.current.scrollTo({x: 0, y: SCREEN_HEIGHT + 100, animated: true})
              //     setIsClickedBirthdate(true)

              // }
          
          
          }} isClicked={isClickedHeight}  txt1={'HEIGHT'} txt2={`${heightSd} cm`}/>

      <Space space={20}/>
      <Space space={20}/>
      <ChangeAvatar avatarChosen={avatarChosen} userEmail={email} ref={avatarRef} />

      </ScrollView>

    </SafeAreaView>
  );
};

export default EditProfile;
