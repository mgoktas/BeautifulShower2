import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, OneItemSummary, SCREEN_HEIGHT, Space } from '../../components/Utilities/Utilities';
// import Contacts from 'react-native-contacts';
import { data, datablogs } from '../../components/Data/Data';
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';
import { AddPersonSheet, AddPersonSheetRefProps, AddPostSheet, AddPostSheetRefProps } from '../../components/Functions/1-Feed';
import { ConnectContactSheet, ConnectContactsRefProps, ConnectToFacebookRefProps, ConnectToFacebookSheet } from '../../components/Functions/PermissionFunctions';
import { SignWithFacebook, SignWithFacebookRefProps } from '../../components/Functions/AuthFunctions';
import { Linking } from 'react-native';
import { createUser, createUser2, createUserEmail, createUserNew } from '../../components/Storage/Azure';
import { useFocusEffect } from '@react-navigation/native';

const Feed = ({route, navigation}) => {

  console.log(getDataString('firstname'))
  console.log(getDataString('lastname'))
  console.log(getDataString('gender'))
  console.log(getDataString('locationISO2'))
  console.log(getDataString('locationName'))
  console.log(getDataString('birthdateDATE'))
  console.log(getDataString('birthdateName'))
  console.log(getDataString('showerdays'))
  console.log(getDataNumber('height'))
  console.log(getDataNumber('weight'))
  console.log(getDataString('goals'))
  
  useFocusEffect(
    React.useCallback(() => {
      
      const add = route.params == undefined ? '' : 'add'
      
      console.log(route.params)

    }, [])
  );

  const [name, setName] = React.useState(`${getDataString('firstname')}, ${getDataString('lastname')}`)
  const [when, setWhen] = React.useState('')
  const [activity, setActivity] = React.useState('Cold Bath')
  const [duration, setDuration] = React.useState(5)
  const [burned, setBurned] = React.useState(1)
  const [postTxt, setPostTxt] = React.useState()
  const [isSheetOn, setIsSheetOn] = React.useState(false)
  const [isSheetOn2, setIsSheetOn2] = React.useState(false)

const ref = React.useRef<AddPersonSheetRefProps>(null);
const openSheet = React.useCallback(() => {
  ref?.current?.scrollTo(-SCREEN_HEIGHT/1.5)
}, []);

const refPost = React.useRef<AddPostSheetRefProps>(null);
const AddPost = React.useCallback(() => {
  refPost?.current?.scrollTo(-SCREEN_HEIGHT/1.2)
}, []);

const openSheet2 = React.useCallback(() => {
  ref?.current?.openSheet2()
}, []);

// const refFB = React.useRef<ConnectToFacebookRefProps>(null);
// const connectToFB = React.useCallback(() => {
//   refFB?.current?.connectFB()
// }, []);

// const refMeta = React.useRef<SignWithFacebookRefProps>(null);
// const LoginWithFacebook = React.useCallback(() => {
//   refMeta?.current?.LoginWithFacebook(navigation)
// }, []);

// const refCon = React.useRef<ConnectContactsRefProps>(null);
// const connectContact = React.useCallback(() => {
//   refCon?.current?.connectContact()
// }, []);

const setSheet = (id) => {
  setIsSheetOn(false)

  id == 2 ? setIsSheetOn2(false)  : {}

}

const openDialog = () => {
  Alert.alert(
    //title
    'Access to Contacts',
    //body
    'Allow us to access your contacts so we can connect you with your friends. To enable, tap Settings and turn on Contacts.',
    [
      { text: 'Yes', onPress: () => {Linking.openURL('app-settings:')    } },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: false }
    //clicking out side of alert will not cancel
  );
}

  return (
    <SafeAreaView style={{flex: 1, height: SCREEN_HEIGHT, backgroundColor: isSheetOn || isSheetOn2 ? 'gray' : 'white'}}>

        <HeaderHome title={'FEED'}  onPress0={() => {openSheet();openSheet2();setIsSheetOn(true);}}
                                    onPress1={() => {AddPost(); setIsSheetOn2(true);}}
                                    onPress2={() => {navigation.navigate('Notifications2')}}
          />
        <Line />

        <ScrollView>
 
          <OneItemSummary type={'p'} txt1={name} txt2={when} txt3={activity} txt4={duration} txt5={burned} txt6={'Duration'} txt7={'Calories'} /> 

          {/* <Discover isSheetOn={isSheetOn} type={5} onPressRight={() => {getContacts()}} title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} />

          <Discover isSheetOn={isSheetOn} type={6} onPressRight={() => {getContacts()}} title={'FEATURED CHALLENGES'} subtitle={'DISMISS'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} />

          <Discover type={2} onPressRight={() => {getContacts()}} title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}

        </ScrollView>

    <AddPersonSheet isSheetOn={isSheetOn} setSheet={setSheet} ref={ref}/>
    {/* <AddPersonSheet isSheetOn={isSheetOn} setSheet={setSheet} connectCon={connectContact} ref={ref}/> */}
    <AddPostSheet setSheet={setSheet} ref={refPost}/>
    {/* <ConnectToFacebookSheet ref={refFB}/>
    <SignWithFacebook ref={refMeta} />
    <ConnectContactSheet openDialog={openDialog}  ref={refCon}/> */}



    </SafeAreaView>
  );
};

export default Feed;

