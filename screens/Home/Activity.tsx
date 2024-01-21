import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityDuration, HeaderHome, StartButtonActivity, styles } from '../../components/Utilities/Utilities';
import firestore from '@react-native-firebase/firestore';
import { postShower } from '../../components/Functions/Functions';
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';
import { GetAllContacts } from '../../components/Functions/2-FunctionsCommunity';
import { musicUrl } from '../../components/Data/Data';

const Activity = ({route, navigation}) => {

  const [secPast, setSecPast] = React.useState(0)
  const [hr, setHr] = React.useState(0)
  const [min, setMin] = React.useState(getDataNumber('weeklySpentBath'))
  const [sec, setSec] = React.useState(0)
  const [sec2, setSec2] = React.useState(0)
  
  const [weeklyTimes, setWeeklyTimes] = React.useState(getDataNumber('weeklyTimes'))
  const [weeklySpentBath, setWeeklySpentBath] = React.useState(getDataNumber('weeklySpentBath'))

  const [timeFrameGoal, setTimeFrameGoal] = React.useState(getDataString('timeFrameGoal'))
  const [userInfo, setUserInfo] = React.useState({times: weeklyTimes, cal: weeklySpentBath * 2, avg: weeklySpentBath == 0 ? 0 : weeklySpentBath / weeklyTimes})
  const [hasStarted, setHasStarted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isActiveBt, setIsActiveBt] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  const [isActive3, setIsActive3] = React.useState(false);

  React.useEffect(() => {
    let interval = null;

    if (hasStarted) {
    interval = setInterval(() => {
      // if(sec == 60 && min == 60){
      //   setHr(hr => hr + 1);
      //   setMin(0);
      //   setSec(0);
      // } 
      // // else if(min == 60){
      // //   setMin(0);
      // //   setSec(0);
      // // } 
      // else if(sec == 60){
      //   setMin(min => min + 1);
      //   setSec(0);
      // } 
      // else {
        setSec(sec => sec + 1);
      // }


    }, 1000);

    } else if (!hasStarted && sec !== 0) {
    clearInterval(interval);
    }
    return () => clearInterval(interval);
}, [hasStarted, sec]);

React.useEffect(() => {
  let interval = null;
  if (isActive) {
  interval = setInterval(() => {

      if(sec == 60){
        setMin(min => min + 1);
        setSec(0);
      }

      // if(remainingSecs == 0){
      //   setRemainingSecs(1500)
      //   resetAll()
      // } else {
        setSec(sec => sec + 1);
        setSec2(sec2 => sec2 + 1);
      // }
      

  }, 1000);
  } 
  else if (!isActive && sec !== 0) {
  clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, sec]);

const Toggle = () => {  

  setSec(0)
  setMin(0)
  setIsActive(true)
  setIsActiveBt(true)

}

const Toggle2 = () => {
  // postShower(email, min, 0)
  
  const minutes  = Math.floor(sec2 / 60) + 1
  
  let prevMin = weeklySpentBath
  let prevTimes = weeklyTimes
  
  let nowMin = prevMin + minutes
  let nowTimes = prevTimes + 1

  setData('weeklySpentBath', nowMin)
  setData('weeklyTimes', nowTimes)
  

  setIsActive(false)
  setIsActiveBt(false)
  setSec(0)
  ToggleRef()



}

const Toggle3 = () => {
  setIsActive(true)
  setIsActiveBt(true)
  ToggleRef()
}

const Reset = () => {
  setIsActive(false)
  setIsActive2(false)
  setIsActiveBt(false)
  setIsActive3(false)
  setSec(0)
  setHr(0)
  setMin(0)
}

const changeActive = () => {
  setIsActive(false)
}

const ref = React.useRef()

const ToggleRef = () => {  
    
  ref?.current?.scrollToIndex({ index: 0, animated: true })

}

const openSettings = () => {
  navigation.navigate('ActivitySettings')
}

const refCon = React.useRef<GetAllContactsRefProps>(null)

const goTo = React.useCallback((url) => {
  refCon?.current?.goTo(url)
}, [])

  return (

    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderHome type={2} txt={timeFrameGoal}/>

        <ActivityDuration hr={hr} min={min} sec={sec} txt2={userInfo.times} txt3={userInfo.cal} txt4={userInfo.avg}/>

        <ImageBackground style={styles.imageActivity} source={require('../../components/images/showerActivity.jpg')} >

        <View style={{bottom: 40}}>
                <StartButtonActivity onPressMusic={async () => {
                    Platform.OS == 'ios' ? 
                    await goTo(musicUrl)
                    :
                                await Linking.openURL(musicUrl);
                }} onPressRight={openSettings} ref={ref} changeActive={changeActive} hasStarted={isActiveBt} onPress={Toggle} onPress2={Toggle2} onPress3={Toggle3} txt1={'START'} txt2={'Showering'} txt3={'SLIDE TO PAUSE'} txt4={'FINISH'} txt5={'RESUME'}/>
        </View>
                    
        </ImageBackground>
      
      <GetAllContacts ref={refCon}/>
        
    </SafeAreaView>
    
  );
};

export default Activity;

