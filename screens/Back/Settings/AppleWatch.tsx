import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountPageContent, CustomButton, HeaderHome, PrivacyText, SmallSwitch, Space, styles, WatchPageContent } from '../../../components/Utilities/Utilities';

const AppleWatch = ({navigation}) => {

  const [isNEnabled, setIsNEnabled] = React.useState(false)


  return (
    <SafeAreaView style={styles.accountPage}>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'APPLE WATCH'}/>

        <WatchPageContent onPress2={() => {navigation.goBack()}} txt1={'WELCOME TO MGOKTAS SHOWERING FOR APPLE WATCH'}  txt2={'Let us walk you through the few steps to set up your Apple Watch perfectly according to your prefences'} txt3={'You can alawys grant permissions in the settings later.'} txt4={'SET UP YOUR WATCH'} txt5={'Not now'} />

    </SafeAreaView>
  );
};

export default AppleWatch;

