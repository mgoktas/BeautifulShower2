import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityDuration, HeaderHome, StartButtonActivity, styles } from '../../components/Utilities/Utilities';
import firestore from '@react-native-firebase/firestore';
import { postShower } from '../../components/Functions/Functions';
import { getDataString } from '../../components/Storage/MMKV';
import { GetAllContacts } from '../../components/Functions/2-FunctionsCommunity';
import { musicUrl } from '../../components/Data/Data';

const Activity = ({route, navigation}) => {

  const [secPast, setSecPast] = React.useState(0)
  const [hr, setHr] = React.useState(0)
  const [min, setMin] = React.useState(14)
  const [sec, setSec] = React.useState(0)
  const [userInfo, setUserInfo] = React.useState({times: 2, cal: 20, avg: 7})
  const [hasStarted, setHasStarted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  const [isActive, setIsActive] = React.useState(false);
  const [isActiveBt, setIsActiveBt] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  const [isActive3, setIsActive3] = React.useState(false);
  const [isShowerOn, setIsShowerOn] = React.useState(false);
  const email = getDataString('email')

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

      // if(remainingSecs == 0){
      //   setRemainingSecs(1500)
      //   resetAll()
      // } else {
        setSec(sec => sec + 1);
      // }

  }, 1000);
  } 
  else if (!isActive && sec !== 0) {
  clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, sec]);


const Toggle = () => {  

  setIsActive(true)
  setIsActiveBt(true)

}
  
const Toggle2 = () => {
  // postShower(email, min, 0)
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
        <HeaderHome type={2} txt={'This Week'}/>

        <ActivityDuration hr={hr} min={min} sec={sec} txt2={userInfo.times} txt3={userInfo.cal} txt4={userInfo.avg}/>

        <ImageBackground style={styles.imageActivity} source={require('../../components/images/showerActivity.jpg')} >

        <StartButtonActivity onPressMusic={async () => {
                       async () => {
                        Platform.OS == 'ios' ? 
                        await goTo(musicUrl)
                        :
                        await Linking.openURL(musicUrl);              }
        }} onPressRight={openSettings} ref={ref} changeActive={changeActive} hasStarted={isActiveBt} onPress={Toggle} onPress2={Toggle2} onPress3={Toggle3} txt1={'START'} txt2={'Showering'} txt3={'SLIDE TO PAUSE'} txt4={'FINISH'} txt5={'RESUME'}/>
            
        </ImageBackground>
      
      <GetAllContacts ref={refCon}/>
        
    </SafeAreaView>
  );
};

export default Activity;

