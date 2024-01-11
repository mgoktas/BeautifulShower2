import { countries } from 'country-code-lookup';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { index } from 'realm';
import { HeaderHome, ProfileBox, ProfilePerson, ProfilePersonIt, SCREEN_HEIGHT, SmallButton } from '../../components/Utilities/Utilities';
import { ChangeAvatar, ChangeAvatarRefProps } from '../../components/Functions/5-FunctionsProfile';
import { getDataString, setData } from '../../components/Storage/MMKV';
import { azureConstant, azureConstantBackground } from '../../components/Data/Data';
import firestore from '@react-native-firebase/firestore';
import { UnFollowPerson, blockUser, checkFollow, followPerson, reportUser, unFollowPerson } from '../../components/Functions/Functions';
import Dialog from "react-native-dialog";
import IconMa from 'react-native-vector-icons/MaterialIcons'

const UserProfile = ({route, navigation}) => {
    
    const {email} = route.params

    console.log('email')
    
    const [myemail, setMymail] = React.useState(getDataString('email'))
    const [isLoading, setIsLoading] = React.useState(true)
    const [isFollowing, setIsFollowing] = React.useState(checkFollow(myemail, email))
    const [isVisible, setIsVisible] = React.useState(false)
    const [avatarChosen, setAvatarChosen] = React.useState(false)
    const [user, setUser] = React.useState({})
    const [isMe, setIsMe] = React.useState(email == myemail)

    const avatarUrl = azureConstant + email
    const backgroundUrl = azureConstantBackground + email

    const avatarRef = React.useRef<ChangeAvatarRefProps>(null)


  React.useEffect(() => {

    const func = async () => {

      const user = await firestore().collection('Users').doc(email).get();

      if(user){
        setUser({
          name: user._data.firstname + ' ' +user._data.lastname, 
          locationISO2: user._data.locationIso2.toLowerCase(),
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

  const check = async () => {
    setIsFollowing(await checkFollow(myemail, email))
  }

  React.useEffect(() => {
    check()
  },[])

  const openDialog = () => {
    setIsVisible(true)
  }

  return (
    !isLoading ? 
    <SafeAreaView>

    <HeaderHome onPress={openDialog} title={'PROFILE'} type={35}/>

      <ScrollView>

      <Dialog.Container contentStyle={{borderRadius: 30,}} visible={isVisible}>
      <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => {reportUser(email)}} >
        <IconMa name={'report-gmailerrorred'} size={18} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Report User
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => {blockUser(email, myemail)}} >
        <IconMa name={'block'} size={18} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Block User
        </Text>
      </TouchableOpacity>
        <Dialog.Button label="Cancel" onPress={() => {setIsVisible(false)}} />
    </Dialog.Container>

        <ProfilePerson imageSource={backgroundUrl} />

        <ProfilePersonIt onPressChat={() => {navigation.navigate('ChatScreen')}} onPressFollow={ async () => {
          console.log('hkjg')
        if  (isFollowing){
          
            try{
          await  unFollowPerson(myemail, email)
            setIsFollowing(false)
          }
            catch(e){
              console.log(e)
            }
          
              
        } else {
          console.log('hkkhhlkjg')

           try{
             console.log('khj')
         await  followPerson(myemail, email)
         setIsFollowing(true)
         }
           catch(e){
             console.log(e)
           }
         
             
        }
          }} isMe={isMe} isFollowing={isFollowing} type={'userp'} imageSource={avatarUrl} txt1={user.name} txt2={user.locationISO2} txt3={user.locationName} txt4={user.bio == '' ? user.bio : 'Welcome To My Page!'} txt5={user.followerCount} txt6={user.followingCount}/>

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

