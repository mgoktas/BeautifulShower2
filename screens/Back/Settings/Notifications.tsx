import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountPageContent, AllowUs, CustomButton, HeaderHome, PrivacyText, SmallSwitch, Space, styles } from '../../../components/Utilities/Utilities';
import { getDataNumber } from '../../../components/Storage/MMKV';
import { RegisterNotification, RegisterNotificationRefProps } from '../../../components/Functions/PermissionFunctions';

const Notifications = ({navigation}) => {

  const [isNotifEnabled, setIsNotifEnabled] = React.useState(getDataNumber('isNotificationsAllowed') == 1)
  const [isNotifEnabled1, setIsNotifEnabled1] = React.useState(false)
  const [isNotifEnabled2, setIsNotifEnabled2] = React.useState(false)
  const [isNotifEnabled3, setIsNotifEnabled3] = React.useState(false)

  const refNotif = React.useRef<RegisterNotificationRefProps>(null)
  const SetNotifications = React.useCallback(() => {
    refNotif?.current?.SetNotifications()
  }, []);
    
  return (

    !isNotifEnabled ?
    <SafeAreaView style={styles.accountPage}>
    
      <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'NOTIFICATIONS'}/>

      <AllowUs onPress={SetNotifications} txt1={'Push Notifications Disabled'} txt2={'Please allow us to send you push messages'} txt3={'ALLOW'} />      
  
      <RegisterNotification ref={refNotif} />
 
    </SafeAreaView>
    :
    
    
    <SafeAreaView style={styles.accountPage}>
     
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'NOTIFICATIONS'}/>

      <SmallSwitch isEnabled={isNotifEnabled1} toggleSwitch={() => {setIsNotifEnabled1(!isNotifEnabled1)}} txt1={'Follower Updates'} txt2={'When someone has followed you.'} type={2}/>
      <SmallSwitch isEnabled={isNotifEnabled2} toggleSwitch={() => {setIsNotifEnabled2(!isNotifEnabled2)}} txt1={'Following Updates'} txt2={'When someone you follow has posted something on Feed.'} type={2}/>
      <SmallSwitch isEnabled={isNotifEnabled3} toggleSwitch={() => {setIsNotifEnabled3(!isNotifEnabled3)}} txt1={'Following Updates'} txt2={'When someone you follow has posted something on Feed.'} type={2}/>


        <SmallSwitch isEnabled={false} txt1={'Notifications'} txt2={'To track your showers in time.'} type={2}/>
      
        <RegisterNotification ref={refNotif} />

    </SafeAreaView>
  );
};

export default Notifications;

