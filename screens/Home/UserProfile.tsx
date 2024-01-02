import { countries } from 'country-code-lookup';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { index } from 'realm';
import { HeaderHome, ProfileBox, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT, SmallButton } from '../../components/Utilities/Utilities';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../components/Functions/5-FunctionsProfile';
import { getDataString, setData } from '../../components/Storage/MMKV';
import { azureConstant, azureConstantBackground } from '../../components/Data/Data';
import firestore from '@react-native-firebase/firestore';
import { UnFollowPerson, checkFollow, followPerson, unFollowPerson } from '../../components/Functions/Functions';

const UserProfile = ({route, navigation}) => {
    
    const {email} = route.params
    
    const [myemail, setMymail] = React.useState(getDataString('email'))
    const [isLoading, setIsLoading] = React.useState(true)
    const [isFollowing, setIsFollowing] = React.useState(checkFollow(myemail, email))
    const [avatarChosen, setAvatarChosen] = React.useState(false)
    const [user, setUser] = React.useState({})

    const avatarUrl = azureConstant + email
    const backgroundUrl = azureConstantBackground + email

    const avatarRef = React.useRef<ChangeAvatarRefProps>(null)


  React.useEffect(() => {

    const func = async () => {

      const user = await firestore().collection('Users').doc(email).get();

      console.log(user._data)

      if(user){
        setUser({
          name: user._data.firstname + ' ' +user._data.lastname, 
          locationISO2: user._data.locationISO2.toLowerCase(),
          locationName: user._data.locationName, 
          bio: user._data.bio, 
          followerCount: user._data.followercount, 
          followingCount: user._data.followingCount, 
         })
    }          
      
      
      setIsLoading(false)
    }

    func()
  
  },[])

  return (
    !isLoading ? 
    <SafeAreaView>

    <HeaderHome title={'PROFILE'} type={3}/>

      <ScrollView>

        <ProfilePerson imageSource={backgroundUrl} />

        <ProfilePersonIt onPressFollow={() => {isFollowing ? unFollowPerson(myemail, email) : followPerson(myemail, email)}} isFollowing={isFollowing} type={'userp'} imageSource={avatarUrl} txt1={user.name} txt2={user.locationISO2} txt3={user.locationName} txt4={user.bio == '' ? user.bio : 'Welcome To My Page!'} txt5={user.followerCount} txt6={user.followingCount}/>

        <ProfileBox txt1={'Premium Benefits'} txt2={'Go further with Premium'}/>

        <ChangeAvatar avatarChosen={avatarChosen} userEmail={email} ref={avatarRef} />

      </ScrollView>

    </SafeAreaView>

    :

    <SafeAreaView>

        <HeaderHome title={'PROFILE'} type={3}/>

          <ScrollView>

            <ProfilePerson type={'up'}/>

            <ProfilePersonIt type={'up'} txt1={'User Name'} txt2={'us'} txt3={'United States'} txt4={'Write me up!'} txt5={152} txt6={77}/>

            <ProfileBox txt1={'Premium Benefits'} txt2={'Go further with Premium'}/>

            <ChangeAvatar avatarChosen={avatarChosen} userEmail={email} ref={avatarRef} />
       
          </ScrollView>

    </SafeAreaView>
  );
};

export default UserProfile;

