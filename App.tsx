import 'react-native-gesture-handler'
//native
import React, { useEffect, useState } from 'react';
import { Linking, LogBox, Platform, Text } from 'react-native';

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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Tasks from './screens/Tasks';
import Home from './screens/Home';

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

            if (route.name === 'Home') {
              return <IconF name='home' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;
            } 
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
    
    <Tab.Screen  name='Home' component={Home}
      options={{
      tabBarLabel: 'Home', 
      tabBarActiveTintColor: 'black',
      tabBarStyle:{backgroundColor: 'white'},
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />


   

     <Tab.Screen  name='Tasks' component={Tasks}
      options={{
        tabBarLabel: 'Tasks', 
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
    UserProfile: {
      path: 'userprofile/:email'
    },

  }
}

const linking = {

  prefixes: ['beautifulshower://'],
  config: config
}

function App(): JSX.Element {

  const [initialUrl, setInitialUrl] = useState('')
  
  const [isLogged, setIsLogged] = useState(getDataNumber('isLogged') == 1)

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
  
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreLogs(['Sending']); // Ignore log notification by message
LogBox.ignoreAllLogs(true);

useEffect(() => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreLogs(['Sending']); // Ignore log notification by message
LogBox.ignoreAllLogs(true);

},[])

  return (

    isLogged ? 
    
    <GestureHandlerRootView>

    <NavigationContainer onReady={() => {
      isReadyRef.current = true;
}} ref={navigationRef}  linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName={'Tabs'} screenOptions={{headerShown: false}} >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Tasks' component={Tasks}/>

      </Stack.Navigator>
    </NavigationContainer>

    </GestureHandlerRootView>

    :
     <GestureHandlerRootView>

    <NavigationContainer onReady={() => {
      isReadyRef.current = true;
}} ref={navigationRef}  linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName={'First'} screenOptions={{headerShown: false}} >
      <Stack.Screen name='Home' component={Goals}/>
      <Stack.Screen name='Tasks' component={Tasks}/>
      </Stack.Navigator>
    </NavigationContainer>
    
    </GestureHandlerRootView>

    );
}

export default App;
