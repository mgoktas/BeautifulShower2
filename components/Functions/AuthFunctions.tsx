import appleAuth, { appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import React, { useState } from "react";
import { Alert, Platform } from "react-native"
import { jwtDecode } from "jwt-decode";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { addUserToMMKV, getDataNumber, getDataString, setData } from "../Storage/MMKV";
import { createUser } from "../Storage/Azure";
// global.atob =  decode;
import jwt_decode from 'jwt-decode';
import { hashPassword, getAge } from "./Functions";
import auth, { firebase } from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import {decode, encode} from 'base-64'
import { addUserDataToMMKV } from "./AppFunctions";


export const createAccount = async (firstname, lastname, gender, email, locationIso2, locationName, birthdateDATE, birthdateName, password, password2, navigation) => {

    if(firstname == ''){ 
        Alert.alert('Security Error','Name is empty')
        return
    }

    else if(lastname == ''){ 
        Alert.alert('Security Error','Surname is empty')
        return
    }

    // else if(password !== password2){
    //     Alert.alert('Security Error','Password do not match',)
    //     return
    // }
    
    else {

      try {

        setData('firstname', firstname)
        setData('lastname', lastname)
        setData('email', email)
        setData('gender', gender)
        setData('locationIso2', locationIso2)
        setData('locationName', locationName)
        setData('birthdateDATE', birthdateDATE)
        setData('birthdateName', birthdateName)
        console.log(105)

        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async () => {
  
            await firestore()
            .collection('Users')
            .doc(email)
            .set({
              firstname : firstname,
              lastname : lastname,
              email : email,
              gender : gender,
              locationIso2 : locationIso2,
              locationName : locationName,
              birthdateDATE : birthdateDATE,
              birthdateName : birthdateName,
            })
            .then(async () => {

              console.log(100)
              setData('firstname', firstname)
              setData('lastname', lastname)
              setData('email', email)
              setData('gender', gender)
              setData('locationIso2', locationIso2)
              setData('locationName', locationName)
              setData('birthdateDATE', birthdateDATE)
              setData('birthdateName', birthdateName)
              
              await navigation.navigate('Welcome',{
                email : email
              }) 
  
            }) 
      
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          });
  
          
      } 
  
        catch (err) {
          Alert.alert('Security Error',err.message)
        }
    } 

  }
    
export const loginToAccount = async (email, password, navigation) => {

  if(email == ''){ 
      Alert.alert('Security Error','Email is empty')
      return
  }

  if(password == ''){ 
      Alert.alert('Security Error','Password is empty')
      return
  }


  try {

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          console.log('User account created & signed in!');

          const user = await firestore().collection('Users').doc(email).get();

          setData('firstname', await user._data.firstname)  
          // setData('bio', await user._data.bio)  
          // setData('birthdateDATE', await user._data.birthdateDATE)  
          // setData('birthdateName', await user._data.birthdateName)  
          setData('isLogged', 1) 
          setData('email', await email)  
          // setData('firstname', await user._data.firstname)  
          // setData('followercount', await user._data.followercount)  
          // setData('followers', await user._data.followers)  
          // setData('followingCount', await user._data.followingCount)  
          // setData('followings', await user._data.followings)  
          // setData('gender', await user._data.gender)  
          // setData('goals', await user._data.goals)  
          // setData('height', await user._data.height)  
          setData('lastname', await user._data.lastname)  
          // setData('locationISO2', await user._data.locationISO2)  
          // setData('locationName', await user._data.locationName)  
          // setData('showerdays', await  user._data.showerdays)  
          // setData('weight', await user._data.weight)  
          // setData('isSeenFirstNotif', await user._data.isSeenFirstNotif)  


            await navigation.navigate('Tabs',{
              email : email
            }) 
            
    
        })
        .catch(async error => {

          Alert.alert('Security Error', 'This email/password combination does not match our records.')

          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
  
        
    } 
  
    catch (err) {

      Alert.alert('Security Error', 'This email does not match our records.')
      console.log(err)

    }
  }

export const forgetAccountPassword = async (email) => {

  if(email == ''){ 
      Alert.alert('Security Error','Email is empty')
      return
  }



    auth().sendPasswordResetEmail(email)
    .then(function (user) {
      Alert.alert('Please check your email... at ', email)
    }).catch(function (e) {
      Alert.alert('Security Error','Wrong email is entered.')
    })


  }

export type SignWithAppleRefProps = {
  SignInWithApplePress: (updateCredentialStateForUser: any, navigation: any) => void;
  }
  
interface SignWithAppleProps {
}

export const SignWithApple = React.forwardRef<
SignWithAppleRefProps
>((props: SignWithAppleProps, ref) => {
  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  if (!global.btoa) {  global.btoa = encode }

  if (!global.atob) { global.atob = decode }
  let user: string | null = null;

  React.useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  const SignInWithApplePress = async (updateCredentialStateForUser, navigation) => {
  

    if(Platform.OS == 'ios'){
    
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        console.log(0)
    
        console.log('appleAuthRequestResponse2', appleAuthRequestResponse);
    
        const {
          user: newUser,
          nonce,
          identityToken,
          realUserStatus /* etc */,
          fullName
        } = appleAuthRequestResponse

        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
                            
        console.log(1)
        const email = await jwtDecode(identityToken)
        console.log(email.email)
        setData('email', email.email)
        console.log(2)

        const user = newUser;
        
        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
          updateCredentialStateForUser(`Error: ${error.code}`),
          );
          
          if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            await auth().signInWithCredential(appleCredential);
            console.log(nonce, identityToken);
        } else {
          // no token - failed sign-in?
        }
        if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
          console.log("I'm a real person!");
        }

        try {

          console.log(0,fullName)


          let user = await firestore().collection('Users').doc(email.email).get()._data
        
          await navigation.navigate('Tabs') 
  
          Alert.alert('Succesful login','Welcome!')

          
          let firstName = await user.firstname
          let lastName = await user.lastname

          console.log(1,await firstName)
          console.log(2,await lastName)

          if(fullName != null) {



            firestore()
            .collection('Users')
            .doc(email.email)
            .set({
              firstname: 'Set',
              lastname: 'Me',
              email: email.email,
            })
            .then(async () => {

              setData('firstname', 'Set')
              setData('lastname',  'Me')
              
              
              // await navigation.navigate('Signup',{
              //   firstname : fullName.givenName,
              //   lastname : fullName.familyName,
              //   email : email
              // }) 

            }) 
          }
          
          else {

              const user = await firestore().collection('Users').doc(email).get()

              let firstName = await user.firstname
              let lastName = await user.lastname

              setData('firstname', 'Set')
              setData('lastname',  'Me')
              

              // await navigation.navigate('Signup',{
              //   firstname : firstName,
              //   lastname : lastName,
              //   email : email
              // }) 
          }

          
        



        }catch(err){
          fullName != null ? firestore()
          .collection('Users')
          .doc(email)
          .set({
            firstname: 'Set',
            lastname: 'Me',
          })
          .then(async () => {

            setData('firstname', 'Set')
            setData('lastname',  'Me')
            

            await navigation.navigate('Signup',{
              firstname: 'Set',
              lastname: 'Me',
              email : email
            })
                

          }) :
            async () => {

              const user = await firestore().collection('Users').doc(email).get();

              let firstName = user.firstname
              let lastName = user.lastname


            setData('firstname', user.firstname)
            setData('lastname',  user.lastname)

              await navigation.navigate('Signup',{
                firstname : firstName,
                lastname : lastName,
                email : email
              }) 
            } 

        }
    
        setData('email', email)
          
        console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      } catch (error) {
        if (error.code === appleAuth.Error.CANCELED) {
          console.warn('User canceled Apple Sign in.');
        } else {
          console.error(error);
          console.log(error);
        }
      }
    } else{

// Generate secure, random values for state and nonce
const rawNonce = uuid.v4();
const state = uuid.v4();

      try {
        // Initialize the module
  appleAuthAndroid.configure({
    // The Service ID you registered with Apple
    clientId: "com.bundle.beautifulshower",

    // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    redirectUri: "https://beautifullshower.firebaseapp.com/__/auth/handler",

    // [OPTIONAL]
    // Scope.ALL (DEFAULT) = 'email name'
    // Scope.Email = 'email';
    // Scope.Name = 'name';
    scope: appleAuthAndroid.Scope.ALL,

    // [OPTIONAL]
    // ResponseType.ALL (DEFAULT) = 'code id_token';
    // ResponseType.CODE = 'code';
    // ResponseType.ID_TOKEN = 'id_token';
    responseType: appleAuthAndroid.ResponseType.ALL,

    // [OPTIONAL]
    // A String value used to associate a client session with an ID token and mitigate replay attacks.
    // This value will be SHA256 hashed by the library before being sent to Apple.
    // This is required if you intend to use Firebase to sign in with this credential.
    // Supply the response.id_token and rawNonce to Firebase OAuthProvider
    nonce: rawNonce,

    // [OPTIONAL]
    // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    state,
  });
  const response = await appleAuthAndroid.signIn();
  if (response) {

    const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
    const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
    const user = response.user; // Present when user first logs in using appleId
    const state = response.state; // A copy of the state value that was passed to the initial request.

    const { nonce } = response;
    const appleCredential = auth.AppleAuthProvider.credential(id_token, nonce);
  
    await auth().signInWithCredential(appleCredential);

    try{
      const email = await jwtDecode(id_token)
     
      setData('email', email.email)
      
      let user2 = await firestore().collection('Users').doc(email.email).get()._data
        
      await navigation.navigate('Tabs') 

      Alert.alert('Succesful login','Welcome!')
    }
    catch(err){
 
      const email = await jwtDecode(id_token)
      
      console.log(1, user?.name)
      
      if(user != undefined){

        await firestore()
        .collection('Users')
        .doc(email.email)
        .set({
          firstname: user?.name?.firstName,
          lastname: user?.name?.lastName,
          email : email.email
        })
        .then(async () => {
          
          await navigation.navigate('Signup',{
            email : email.email
          }) 

        }) 

      } else{

        try {

          await navigation.navigate('Tabs') 

        }
        catch(err)
        {

          await navigation.navigate('Signup',{
            email : email.email
          }) 

        }

          firestore()
          .collection('Users')
          .doc(email.email)
          .update({

          })
          .then(async () => {
  
            
            await navigation.navigate('Signup',{
              firstname: 'Change',
              lastname: 'Me',
              email : email.email
            }) 
  
          }) 

          let firstName = 'adas'
          let lastName = 'dasdas'
      }
    }   
  
  } }catch (error) {
    console.log(error);
  if (error && error.message) {
    switch (error.message) {
      case appleAuthAndroid.Error.NOT_CONFIGURED:
        console.log("appleAuthAndroid not configured yet.");
        break;
      case appleAuthAndroid.Error.SIGNIN_FAILED:
        console.log("Apple signin failed.");
        break;
      case appleAuthAndroid.Error.SIGNIN_CANCELLED:
        console.log("User cancelled Apple signin.");
        break;
      default:
        break;
    }
  }
  }
          }

  }

  React.useImperativeHandle(ref, () => ({ SignInWithApplePress}), [ SignInWithApplePress]);
  

})

export type SignWithFacebookRefProps = {
  LoginWithFacebook: (navigation: any) => void;
};

interface SignWithFacebookProps {
}

export const SignWithFacebook = React.forwardRef<
SignWithFacebookRefProps
>((props: SignWithFacebookProps, ref) => {
      
  const LoginWithFacebook = (navigation: any) => {
    try{
      LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(
              async (data) => {
                console.log(data.accessToken.toString())
                
                const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                // Sign-in the user with the credential
                const user = await auth().signInWithCredential(facebookCredential)

                const email = user.user.email

                  Profile.getCurrentProfile().then(
                  async function(currentProfile,) {
                    if (currentProfile) {
                      console.log("The current lorasitben10gged user is: " +
                        currentProfile.firstName
                        + ". His profile id is: " +
                        currentProfile.userID,
                        );
                      
                        
                        try {
  
                            setData('firstname', currentProfile.firstName)
                            setData('lastname',  currentProfile.lastName)
                            setData('email',  email)
                       
                         
        let user = await firestore().collection('Users').doc(email).get()._data

        await firestore()
        .collection('Users')
        .doc(email)
        .set({
          firstname :  currentProfile.firstName,
          lastname :  currentProfile.firstName,
          email : email
        })
        .then(async () => {

          await navigation.navigate('Signup',{
            email : email
          })                                 

        }) 
        
        await setData('isLogged', 1)
        await navigation.navigate('Tabs') 

        Alert.alert('Succesful login','Welcome!')
        await navigation.navigate('Tabs',{
          email : email
        }) 
                
                          }
                          catch(err)
                          {
                            try{
                              await firestore()
                              .collection('Users')
                              .doc(email)
                              .update({
                                email : email
                              })
                              .then(async () => {
                                
                                await navigation.navigate('Signup',{
                                  email : email
                                }) 
                
                              }) 
                
                            }catch(err){

                              await firestore()
                              .collection('Users')
                              .doc(email)
                              .set({
                                firstname :  currentProfile.firstName,
                                lastname :  currentProfile.firstName,
                                email : email
                              })
                              .then(async () => {
                
                                await navigation.navigate('Signup',{
                                  email : email
                                })                                 
                
                              }) 
                            }
                          }


                          
                  }
                  }
                );

              }
            )
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
                
            );
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    }
    catch(err){
      console.log(err)
    }
  
  }


  React.useImperativeHandle(ref, () => ({ LoginWithFacebook}), [ LoginWithFacebook]);

})

export type SignWithGoogleRefProps = {
  LoginWithGoogle: (navigation) => void;
};
  
  interface SignWithGoogleProps {
  }
  
  export const SignWithGoogle = React.forwardRef<
  SignWithGoogleRefProps
  >((props: SignWithGoogleProps, ref) => {
    const [signinInProgress, setSigninInProgress] = useState(false)
        
    const LoginWithGoogle = async (navigation) => {
      // setSigninInProgress(true);
      GoogleSignin.configure({
        iosClientId: '269523057437-1ok5hmg4lf789vst2mu6pq95ie1bb3ta.apps.googleusercontent.com',
        webClientId: '269523057437-k4lltqd14ndmlh2gnbmij0qrk44e804u.apps.googleusercontent.com'
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      // );

      
      try {

        setData('firstname', userInfo.user.givenName)
        setData('lastname',  userInfo.user.familyName)
        setData('email' ,userInfo.user.email)

        let user = await firestore().collection('Users').doc(userInfo.user.email).get()._data
        
        await navigation.navigate('Tabs') 

        Alert.alert('Succesful login','Welcome!')
        
      }
      catch(err)
      {
        try{
          await firestore()
          .collection('Users')
          .doc(userInfo.user.email)
          .update({
            email : userInfo.user.email
          })
          .then(async () => {
            
            await navigation.navigate('Signup',{
              email : userInfo.user.email
            }) 

          }) 

        }catch(err){

          await firestore()
          .collection('Users')
          .doc(userInfo.user.email)
          .set({
            firstname :  userInfo.user.givenName,
            lastname :  userInfo.user.familyName,
            email : userInfo.user.email
          })
          .then(async () => {

            await navigation.navigate('Signup',{
              email : userInfo.user.email
            })
               

          }) 
        }
      }


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error)
      }
    }

    }

    React.useImperativeHandle(ref, () => ({ LoginWithGoogle}), [ LoginWithGoogle]);

  })

  export const LogOut = async (navigation) => {

    setData('isLogged', 0)
    setData('locationIso2', 'us')
    setData('countryIso2', 'us')
    setData('countryName', 'United States')
    setData('locationName', 'United States')
    setData('firstname', 'Change')
    setData('lastname', 'Me')

    setData('isNotificationsAllowed', 0)

    await navigation.navigate('First')

  }