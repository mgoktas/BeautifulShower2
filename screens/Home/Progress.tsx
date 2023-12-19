import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Share } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, ProgressCnt, Space } from '../../components/Utilities/Utilities';
import ViewShot from 'react-native-view-shot';
import { captureScreen } from "react-native-view-shot";
// import Contacts from 'react-native-contacts';
import RNFS from "react-native-fs";

const Progress = () => {

    const [name, setName] = React.useState('Muhammet')
    const [uri, setUri] = React.useState('')
    const ref = React.useRef();
  
  const getContacts = () => {
  // Contacts.getAll().then(contacts => {
  //   // contacts returned
  // })
}

React.useEffect(() => {
  // on mount
  ref.current.capture().then(uri => {
    console.log("do something with ", uri);
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
        console.log(res);
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
    <SafeAreaView>

        <HeaderHome onPressShare={shareIt} type={'goals'}  title={'GOAL DETAILS'} />
        <Line />

        <Space space={30}/>

        <ViewShot ref={ref}>
        <View>
          <ProgressCnt  txt1={'THIS WEEK'} txt2={'00:00'} txt3={'of 10:00'} txt4={'01:00'} txt5={'Left to Goal'} txt6={'2 days'} txt7={'Remaining'} />
        </View>
      </ViewShot>

        
    </SafeAreaView>
  );
};

export default Progress;

