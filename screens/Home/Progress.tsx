import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Share } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, ProgressCnt, SCREEN_HEIGHT, Space } from '../../components/Utilities/Utilities';
import ViewShot from 'react-native-view-shot';
import { captureScreen } from "react-native-view-shot";
// import Contacts from 'react-native-contacts';
import RNFS from "react-native-fs";
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';
import { getDaysLeftEndWeek, getRemainingGoal } from '../../components/Functions/Functions';

const Progress = ({route, navigation}) => {

    const [name, setName] = React.useState('Muhammet')
    const [uri, setUri] = React.useState('')
    const ref = React.useRef();
    const weeklyGoalMin = getDataNumber('weeklyGoalMin')
    const weeklyReachedMin = getDataNumber('weeklyReachedMin')
    setData('weeklyReachedMin', 0)
    const timeFrameGoal = getDataString('timeFrameGoal')
    const bathGoal = getDataString('bathGoal')

    console.log(weeklyGoalMin, 'das')
  
  const getContacts = () => {
  // Contacts.getAll().then(contacts => {
  //   // contacts returned
  // })
}

React.useEffect(() => {
  // on mount
  ref.current.capture().then(uri => {
    setUri(uri)
  });
}, []);



const shareIt = () => {
  // RNFS.readFile(uri, "base64").then((res) => {
    let urlString = "data:image/jpeg;base64," + uri;
    let options = {
      title: "Share Title",
      message: "Share Message",
      url: uri,
      type: "image/jpeg",
    };
    Share.share(options)
      .then((res) => {
      })
      .catch((err) => {
        err && console.log(err);
      });
  // });
  
}

const data = [
    {title: 'COLD IS MERCILESS', duration: 'STARTS IN 5 DAYS', count: '206 PARTICIPANTS', image: require('../../components/images/cold.jpg')},
    {title: 'DAILY BOOST', duration: 'STARTS IN 15 DAYS', count: '106 PARTICIPANTS', image: require('../../components/images/daily.jpg')},
    {title: 'LIVING FOR IT', duration: 'STARTS IN 25 DAYS', count: '306 PARTICIPANTS', image: require('../../components/images/longevity.jpeg')},
]


  return (
    <SafeAreaView style={{height: SCREEN_HEIGHT, backgroundColor: 'white'}}>

        <HeaderHome onPressR={() => {
          navigation.navigate('GoalSettings')
        }} onPressShare={shareIt} type={'goals'}  title={'GOAL DETAILS'} />
        <Line />

        <Space space={30}/>

        <ViewShot ref={ref}>
        <View>
          <ProgressCnt  txt1={'THIS WEEK'} txt2={'14:00'} txt3={'of ' + weeklyGoalMin + ':00'} txt4={'1:' +'00'} txt5={'Left to Goal'} txt6={getDaysLeftEndWeek() + ' days'} txt7={'Remaining'} />
        </View>
      </ViewShot>
        
    </SafeAreaView>
  );
};

export default Progress;

