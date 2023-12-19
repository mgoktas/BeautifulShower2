import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, Space } from '../../components/Utilities/Utilities';
// import Contacts from 'react-native-contacts';

const NotificationsHome = () => {

  
  const getContacts = () => {
  // Contacts.getAll().then(contacts => {
  //   // contacts returned
  // })
}


  return (
    <SafeAreaView>

        <HeaderHome title={'FEED'} />
        <Line />

        <Discover onPressRight={() => {getContacts()}} title={'DISCOVER PEOPLE'} subtitle={'SHOW MORE'} text21={'Contacts'} text22={'Follow people you know'} text11={'Facebook'} text12={'Follow friends from Facebook'} text3={'CONNECT'}  />

    </SafeAreaView>
  );
};

export default NotificationsHome;

