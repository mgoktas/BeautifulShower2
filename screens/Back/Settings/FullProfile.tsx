import { countries } from 'country-code-lookup';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { index } from 'realm';
import { HeaderHome, ProfileBox, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT } from '../../../components/Utilities/Utilities';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../../components/Functions/5-FunctionsProfile';
import { getDataString, setData } from '../../../components/Storage/MMKV';
import { azureConstant, azureConstantBackground } from '../../../components/Data/Data';

const FullProfile = ({route, navigation}) => {
    
    // const {Name} = route.params
    
    const Name = 'MUHAMMET RASIT GOKTAS'
    const CountryIso = 'tr'
    const CountryName = 'Turkey'
    const Bio = 'Add a bio to your profile'
    const FollowerCount = 0
    const FollowingCount = 0

    const [name, setName] = React.useState(Name)
    const [email, setEmail] = React.useState(getDataString('email'))
    const [countryIso, setCountryIso] = React.useState(CountryIso)
    const [countryName, setCountryName] = React.useState(CountryName)
    const [bio, setBio] = React.useState(Bio)
    const [followerCount, setFollowerCount] = React.useState(FollowerCount)
    const [followingCount, setFollowingCount] = React.useState(FollowingCount)
    const [isSheetOn, setIsSheetOn] = React.useState(false)
    const [isDarkModeOn, setIsDarkModeOn] = React.useState(false)
    const [avatarChosen, setAvatarChosen] = React.useState(false)

    const avatarUrl = azureConstant + email
    const backgroundUrl = azureConstantBackground + email


    const avatarRef = React.useRef<ChangeAvatarRefProps>(null)

    const changeTheAvatar = React.useCallback(() => {
      avatarRef?.current?.changeTheAvatar()
    }, [])

    const openSheet = React.useCallback(() => {
      setIsSheetOn(true)
      avatarRef?.current?.scrollTo(-SCREEN_HEIGHT/6)
    }, [])

  return (
    <SafeAreaView>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={'lrtbtntxtmid'} title={name} txt={'Save'}/>

          <ScrollView>

            <ProfilePerson imageSource={backgroundUrl} onPress={() => {
              setAvatarChosen(false);
              openSheet()
            }} />

            <ProfilePersonIt

            isSecary={true}
            onPressProfile={() => {navigation.navigate('EditProfile')}} imageSource={avatarUrl} onPressAvatar={() => {
            setAvatarChosen(true);
            openSheet()
            }} txt1={name} txt2={countryIso} txt3={countryName} txt4={bio} txt5={followerCount} txt6={followingCount}/>

            <ChangeAvatar avatarChosen={avatarChosen} userEmail={email} ref={avatarRef} openSheet={openSheet} />
       
            </ScrollView>

    </SafeAreaView>
  );
};

export default FullProfile;

