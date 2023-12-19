import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountPageContent, CustomButton, HeaderHome, PrivacyText, Space, styles } from '../../../components/Utilities/Utilities';
import { getDataNumber } from '../../../components/Storage/MMKV';

const Privacy = ({navigation}) => {

  const [isEmailActive, setIsEmailActive] = React.useState(getDataNumber('isEmailActive') == 1)

  return (
    <SafeAreaView style={styles.accountPage}>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'PRIVACY'}S/>

        <ScrollView>

        <HeaderHome type={10} title={"LET'S STAY IN TOUCH"} />

        <PrivacyText toggleSwitch={() => {setIsEmailActive(!isEmailActive)}} isEnabled={isEmailActive} title={'VIA E-MAIL'} txt={'I give explicit consent to receive personal commercial electronic messages from mgoktas. Mgoktas can contact me through my chosen channels, such as email.'} />
        
        {/* <PrivacyText onPress2={() => {setSelectedIndexActivity(2)}} onPress1={() => {setSelectedIndexActivity(1)}} onPress0={() => {setSelectedIndexActivity(0)}} selectedIndex={selectedIndexActivity} option1={'Everybody'} option2={'Followers'} option3={'Only me'} icon3={'lock-closed-outline'} icon2={'people-outline'} icon1={'earth-outline'} title={'ACTIVITY'} type={2} txt={'All information which belongs to your activities (i.e. activity, duration, calories, etc.)'} /> */}
       
        {/* <PrivacyText onPress2={() => {setSelectedIndexActivityMaps(2)}} onPress1={() => {setSelectedIndexActivityMaps(1)}} onPress0={() => {setSelectedIndexActivityMaps(0)}} selectedIndex={selectedIndexMaps} option1={'Everybody'} option2={'Followers'} option3={'Only me'} icon3={'lock-closed-outline'} icon2={'people-outline'} icon1={'earth-outline'} title={'MAPS'} type={2} txt={'Decide who can see the maps from your GPS activities'} />

        <PrivacyText onPress2={() => {setSelectedIndexActivityPhotos(2)}} onPress1={() => {setSelectedIndexActivityPhotos(1)}} onPress0={() => {setSelectedIndexActivityPhotos(0)}} selectedIndex={selectedIndexActivityPhotos} option1={'Everybody'} option2={'Followers'} option3={'Only me'} icon3={'lock-closed-outline'} icon2={'people-outline'} icon1={'earth-outline'} title={'PHOTOS'} type={2} txt={'All photos you have uploaded'} /> */}
        
        {/* <PrivacyText toggleSwitch={() => {setIsFollowerSuggestActive(!isFollowerSuggestActive)}} isEnabled={isFollowerSuggestActive} title={'FOLLOWER SUGGESTIONS'} type={3}  txt={"If you opt out, we won't use the location data of your tracked activities to provide follower suggestions."} />
        
        <PrivacyText toggleSwitch={() => {setIsLeaderBActive(!isLeaderBActive)}} isEnabled={isLeaderBActive} title={'JOIN SHOWERING LEADERBOARD'} type={3} txt={"If you opt out, you won't be able to compare your running distance or complete with other users. Go, go, go!."}/> */}

        </ScrollView>

    </SafeAreaView>
  );
};

export default Privacy;

