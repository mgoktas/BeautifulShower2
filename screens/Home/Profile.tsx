import { countries } from 'country-code-lookup';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { index } from 'realm';
import { HeaderHome, PremiumBox, ProfileBox, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT, TextButtonSh } from '../../components/Utilities/Utilities';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../components/Functions/5-FunctionsProfile';
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';
import { azureConstant, azureConstantBackground } from '../../components/Data/Data';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'react-native-image-picker';
import { putBackgroundImage, putImage } from "../../components/Storage/Azure";
const Profile = ({route, navigation}) => {
    
    const FollowerCount = 0
    const FollowingCount = 0
    const [firstname, setFirstname] = React.useState(getDataString('firstname'))
    const [lastname, setLastname] = React.useState(getDataString('lastname'))
    const name = firstname + ' ' +lastname
    const [email, setEmail] = React.useState(getDataString('email'))
    const [countryIso, setCountryIso] = React.useState(getDataString('locationIso2'))
    const [countryName, setCountryName] = React.useState(getDataString('locationName'))
    const [bio, setBio] = React.useState(getDataString('bio'))
    const [followerCount, setFollowerCount] = React.useState(FollowerCount)
    const [followingCount, setFollowingCount] = React.useState(FollowingCount)
    const [isSheetOn, setIsSheetOn] = React.useState(false)
    const [isDarkModeOn, setIsDarkModeOn] = React.useState(false)
    const [avatarChosen, setAvatarChosen] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isVisible2, setIsVisible2] = React.useState(false)

    const avatarUrl = azureConstant + email
    const backgroundUrl = azureConstantBackground + email

    const avatarRef = React.useRef<ChangeAvatarRefProps>(null)

    const openSheet = React.useCallback(() => {
      setIsSheetOn(true)
      avatarRef?.current?.scrollTo(-SCREEN_HEIGHT/2)
  }, [])

  
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

  return (
    <SafeAreaView>

        <HeaderHome onPress={() => {navigation.navigate('Settings')}} title={'PROFILE'} type={3}/>
        
        <Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible}>


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
                    setIsVisible(false)
                  }}
                />

        </Dialog.Container>

        <Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible2}>


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
            setIsVisible2(false)
          }}
        />

        </Dialog.Container>

        <Dialog.Container contentStyle={{borderRadius: 30}} visible={isVisible2}>


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
            setIsVisible2(false)
          }}
        />

        </Dialog.Container>

        <ScrollView>

          <ProfilePerson imageSource={backgroundUrl} onPress={() => {
            setAvatarChosen(false);
            setIsVisible2(true)
          }} />

          <ProfilePersonIt 

          onPressFollowers={() => {navigation.navigate('Connections', {which: 0})}}
          onPressFollowings={() => {navigation.navigate('Connections', {which: 1})}}
          isSecary={true}
          onPressProfile={() => {navigation.navigate('EditProfile')}} imageSource={avatarUrl} onPressAvatar={() => {
            setAvatarChosen(true);
            setIsVisible(true)
            // openSheet()
          }} txt1={name} txt2={countryIso} txt3={countryName} txt4={bio} txt5={followerCount} txt6={followingCount}/>

          {/* <ProfileBox txt1={'Premium Benefits'}  txt2={'Go further with Premium'}/> */}
      
        </ScrollView>

        <ChangeAvatar avatarChosen={avatarChosen} userEmail={email} ref={avatarRef} openSheet={openSheet} />
    

    </SafeAreaView>
  );
};

export default Profile;

