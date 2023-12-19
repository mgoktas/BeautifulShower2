import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountPageContent, CustomButton, HeaderHome, PrivacyText, SmallSwitch, SocialMediaCnt, Space, styles, WatchPageContent } from '../../../components/Utilities/Utilities';

const SocialSharing = ({navigation}) => {

  const [isSharingEnabled, setIsSharingEnabled] = React.useState(false)
  const [isEnabledTop, setIsEnabledTop] = React.useState(false)
  const [isEnabledBot, setIsEnabledBot] = React.useState(false)


  return (
    <SafeAreaView style={styles.accountPage}>
        
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'SOCIAL SHARING'}/>

        <SocialMediaCnt isEnabledTop={isEnabledTop} isEnabledBot={isEnabledBot} 
        onVlChngT={() => {setIsEnabledTop(!isEnabledTop)}}
        onVlChngB={() => {setIsEnabledBot(!isEnabledBot)}} 
        toggleSwitch={() => {setIsSharingEnabled(!isSharingEnabled)}} />

    </SafeAreaView>
  );
};

export default SocialSharing;

