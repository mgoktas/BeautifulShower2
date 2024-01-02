import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignWithFb } from '../../components/Functions/Functions';
import { AppleButtonWithHighlight, BottomText, Header, JoinLogo, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SignWith, SignWithEmail, Space } from '../../components/Utilities/Utilities';
import { SignWithApple, SignWithAppleRefProps, SignWithFacebook, SignWithFacebookRefProps, SignWithGoogle, SignWithGoogleRefProps } from '../../components/Functions/AuthFunctions';
// import { appleAuth, AppleButton, AppleCredentialState } from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

const Already = ({navigation}) => {

  //Apple Sign In
  const [credentialStateForUser, updateCredentialStateForUser] = React.useState(-1);

  //Apple Sign In
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

  return (
    <SafeAreaView>
        
        <Space space={30}/>

        <Header onPress={() => { navigation.goBack(); } } isBlank={undefined} isSheetOn={undefined} type={undefined} />
        
        <JoinLogo txt1={'WELCOME BACK'} txt2={'Log in with one of the following options and get started!'} />

        <Space space={SCREEN_HEIGHT/6}/>

        <AppleButtonWithHighlight isApple={true} onPress={() => { SignInWithApplePress(updateCredentialStateForUser); } } title={undefined} />
        <BottomText />

        <SignWith onPress={() => {LoginWithFacebook()}}  txt={'Facebook'} icon={'facebook'}/>

        <Line space={undefined} type={undefined} />
        <Line space={undefined} type={undefined} />

        <SignWith onPress={() => {LoginWithGoogle()}} txt={'Google'} icon={'google'}/>

        <Line space={undefined} type={undefined} />
        <Line space={undefined} type={undefined} />

        <SignWithEmail onPress={() => {navigation.navigate('Login')}} txt={'Email'} icon={''}/>

        <SignWithApple ref={refApple} />
        <SignWithFacebook ref={refMeta} />
        <SignWithGoogle ref={refGoogle} />

        
    </SafeAreaView>
  );
};

export default Already;