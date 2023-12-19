import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderHome, Line, OneNotification } from '../../../components/Utilities/Utilities';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = ({route, navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
   
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={'notif'} title={'NOTIFICATIONS'} txt={'Done'}/>

        <OneNotification txt1={'Welcome to the Beautiful Shower'} txt2={'You have awarded an first login trophy!'} />
        <Line />

    </SafeAreaView>
  );
};

export default Notifications;

