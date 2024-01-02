import { useApp, useEmailPasswordAuth, useQuery } from '@realm/react';
import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppleButtonWithHighlight, BottomText, Header, JoinLogo, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SignWith, SignWithEmail, Space } from '../../components/Utilities/Utilities';
import appleAuth from '@invertase/react-native-apple-authentication';
import { SignWithApple, SignWithAppleRefProps, SignWithFacebook, SignWithFacebookRefProps, SignWithGoogle, SignWithGoogleRefProps } from '../../components/Functions/AuthFunctions';
import { setData } from '../../components/Storage/MMKV';
// import { run } from '../../components/Storage/Cluster';
import firestore from '@react-native-firebase/firestore';

const Join = ({navigation}) => {

  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  //Apple Sign In
  const [credentialStateForUser, updateCredentialStateForUser] = React.useState(-1);

  const refApple = React.useRef<SignWithAppleRefProps>(null);
  const SignInWithApplePress = React.useCallback((updateCredentialStateForUser: any) => {
    refApple?.current?.SignInWithApplePress(updateCredentialStateForUser, navigation)
  }, []);

  //Facebook Sign In
  const refMeta = React.useRef<SignWithFacebookRefProps>(null);
  const LoginWithFacebook = React.useCallback(() => {
    refMeta?.current?.LoginWithFacebook(navigation)
  }, []);

  //Google Sign In
  const refGoogle = React.useRef<SignWithGoogleRefProps>(null);
  const LoginWithGoogle = React.useCallback(() => {
    refGoogle?.current?.LoginWithGoogle(navigation)
  }, []);


  React.useEffect(() => {

  firestore()
        .collection('Users')
        .doc('email')
        .set({
          firstname: 'user?.name?.firstName',
          lastname: 'user?.name?.lastName',
          email : 'email.email'
        })
        .then((err) => {
          console.log(err)
        })
      },[])


  return (
    <SafeAreaView>
        
        <Space space={30}/>

        <Header onPress={() => { navigation.goBack(); } } isBlank={undefined} isSheetOn={undefined} type={undefined} />
        
        <JoinLogo txt1={'NEVER FORGET YOUR SHOWER!'} txt2={'Sign Up however you wish and start breathing!'} type={undefined} />
  
        <Space space={SCREEN_HEIGHT/10}/>
        
        <AppleButtonWithHighlight isApple={true} onPress={() => { 
                SignInWithApplePress(updateCredentialStateForUser); } } title={undefined} />
        <BottomText />

        <SignWith onPress={() => {LoginWithFacebook()}}  txt={'Facebook'} icon={'facebook'}/>

        <Line space={undefined} type={undefined} />
        <Line space={undefined} type={undefined} />

        <SignWith onPress={() => {LoginWithGoogle()}} txt={'Google'} icon={'google'}/>

        <Line space={undefined} type={undefined} />
        <Line space={undefined} type={undefined} />

        <SignWithEmail onPress={() => {navigation.navigate('SignupScratch')}} txt={'Email'} icon={''}/>

        <SignWithApple ref={refApple} />
        <SignWithFacebook ref={refMeta} />
        <SignWithGoogle ref={refGoogle} />

    </SafeAreaView>
  );
};

export default Join;