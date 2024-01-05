import 'react-native-gesture-handler'
//native
import React, { useEffect, useState } from 'react';
import { Linking, Platform, Text } from 'react-native';

//icons
import Icon from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/FontAwesome'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

//navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import First from './screens/Front/First';
import Join from './screens/Front/Join';
import { AppProvider, UserProvider } from '@realm/react';
import Already from './screens/Front/Already';
import Signup from './screens/Front/Signup';
import Welcome from './screens/Front/Welcome';
import Goals from './screens/Back/Goals';
import Home from './screens/Home/Home';
import Feed from './screens/Home/Feed';
import Activity from './screens/Home/Activity';
import Profile from './screens/Home/Profile';
import Settings from './screens/Back/Settings';
import Account from './screens/Back/Settings/Account';
import AppleWatch from './screens/Back/Settings/AppleWatch';
import CommunityGuidelines from './screens/Back/Settings/CommunityGuidelines';
import MgoktasPremium from './screens/Back/Settings/MgoktasPremium';
import EditProfile from './screens/Back/Settings/EditProfile';
import Notifications from './screens/Back/Settings/Notifications';
import Notifications2 from './screens/Front/Back/Notifications';
import Privacy from './screens/Back/Settings/Privacy';
import PrivacyPolicy from './screens/Back/Settings/PrivacyPolicy';
import SocialSharing from './screens/Back/Settings/SocialSharing';
import SupportFeedback from './screens/Back/Settings/SupportFeedback';
import TermsConditions from './screens/Back/Settings/TermsConditions';
import SignupScratch from './screens/Front/SignupScratch';
import Community from './screens/Home/Community';
import Progress from './screens/Home/Progress';
import Login from './screens/Front/Login';
import FullProfile from './screens/Back/Settings/FullProfile';
import Connections from './screens/Front/Back/Connections';
import OneChallenge from './screens/Front/Back/OneChallenge';
import AddContacts from './screens/Home/Tabs/AddContacts';
import { getDataNumber } from './components/Storage/MMKV';
import SplashScreen from './components/SplashScreen';
import SplashScreen2 from './components/SplashScreen2';
import UserProfile from './screens/Home/UserProfile';
import { navigationRef, isReadyRef } from './components/RootNavigation';
import * as RootNavigation from './components/RootNavigation';

//navigators
const Stack  = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const Tabs = ({route}: { route: any}) => {

  const [tabbar, setTabbar] = useState(0)


  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle:{
          backgroundColor: 'red',
          left: 0,
          bottom: 0,
          right: 0},
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Feed') {
              return <IconF name='feed' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;
            } 
            else if (route.name === 'Activity') {
              return <IconF name='hourglass-start' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
            else if (route.name === 'Profile') {
              return <IconI name='person-outline' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
            else if (route.name === 'Community') {
              return <IconI name='people-outline' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
            else if (route.name === 'Progress') {
              return <IconM name='list-status' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
            // else if (route.name === 'Profile') {
            //   return <Icon name='settings-outline' size={size} color={
            //     focused
            //       ? 'black'
            //       : '#6C6A66'
            //   } />;}
          },

        })}
      >
    
    <Tab.Screen  name='Feed' component={Feed}
      options={{
      tabBarLabel: 'Feed', 
      tabBarActiveTintColor: 'black',
      tabBarStyle:{backgroundColor: 'white'},
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />

    <Tab.Screen  name='Community' component={Community}
      options={{
      tabBarStyle:{backgroundColor: 'white'},
      tabBarActiveTintColor: 'black',
      tabBarLabel: 'Community', 
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />
    
    <Tab.Screen  name='Activity' component={Activity}
      options={{
      tabBarStyle:{backgroundColor: 'white'},
      tabBarActiveTintColor: 'black',
      tabBarLabel: 'Activity', 
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />
      <Tab.Screen  name='Progress' component={Progress}
      options={{
        tabBarLabel: 'My Goal', 
        tabBarActiveTintColor: 'black',
        tabBarStyle:{backgroundColor: 'white'},
        headerShown:false, 
        headerStyle:{backgroundColor: 'white'}, 
        headerTitleStyle:{color:'black'},
        tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />

     <Tab.Screen  name='Profile' component={Profile}
      options={{
        tabBarLabel: 'Profile', 
        tabBarActiveTintColor: 'black',
        tabBarStyle:{backgroundColor: 'white'},
        headerShown:false, 
        headerStyle:{backgroundColor: 'white'}, 
        headerTitleStyle:{color:'black'},
        tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />

    </Tab.Navigator>
  )
}

const config = {
  initialRouteName: 'Activity',
  screens: {
    OnePost: {
      path: 'onepost/:postId'
    },
  }
}

const linking = {

  prefixes: ['beautifulshower://'],
  config: config
}

function App(): JSX.Element {

  const [initialUrl, setInitialUrl] = useState('')

  useEffect(() => {
      Linking.getInitialURL()
      .then((url) => {
        if (url) {

  

        }
      })
      .catch((e) => {})
  })

  useEffect(() => {
    Linking.addEventListener('url', ({url}) =>{
      if (url) {
        


      }
    })
  })
  
  useEffect(() => {
  
  return () => {
      isReadyRef.current = false
    };
  },[]);
  

  return (
    <NavigationContainer onReady={() => {
      isReadyRef.current = true;
}} ref={navigationRef}  linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName={'Tabs'} screenOptions={{headerShown: false}} >
        
        <Stack.Screen name='Activity' component={Activity}/>
        <Stack.Screen name='First' component={First}/>
        <Stack.Screen name='Already' component={Already}/>
        <Stack.Screen name='Join' component={Join}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignupScratch' component={SignupScratch}/>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Tabs' component={Tabs}/>
        <Stack.Screen name='Settings' component={Settings}/>
        <Stack.Screen name='Account' component={Account}/>
        <Stack.Screen name='AppleWatch' component={AppleWatch}/>
        <Stack.Screen name='CommunityGuidelines' component={CommunityGuidelines}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name='FullProfile' component={FullProfile}/>
        <Stack.Screen name='UserProfile' component={UserProfile}/>
        <Stack.Screen name='MgoktasPremium' component={MgoktasPremium}/>
        <Stack.Screen name='Notifications' component={Notifications}/>
        <Stack.Screen name='Notifications2' component={Notifications2}/>
        <Stack.Screen name='Privacy' component={Privacy}/>
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
        <Stack.Screen name='SocialSharing' component={SocialSharing}/>
        <Stack.Screen name='SupportFeedback' component={SupportFeedback}/>
        <Stack.Screen name='TermsConditions' component={TermsConditions}/>
        <Stack.Screen name='AddContacts' component={AddContacts}/>
        <Stack.Screen name='OneChallenge' component={OneChallenge}/>
        <Stack.Screen name='Connections' component={Connections}/>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='SplashScreen2' component={SplashScreen2}/>
             
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;

