import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityDuration, HeaderHome, StartButtonActivity, styles } from '../../components/Utilities/Utilities';
import firestore from '@react-native-firebase/firestore';
import { postShower } from '../../components/Functions/Functions';
import { getDataString } from '../../components/Storage/MMKV';

const Activity = () => {

  const [secPast, setSecPast] = React.useState(0)
  const [hr, setHr] = React.useState(0)
  const [min, setMin] = React.useState(0)
  const [sec, setSec] = React.useState(0)
  const [userInfo, setUserInfo] = React.useState({times: 0, cal: 0, avg: 0})
  const [hasStarted, setHasStarted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  const [isActive, setIsActive] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  const [isShowerOn, setIsShowerOn] = React.useState(false);
  const email = getDataString('email')

  React.useEffect(() => {
    let interval = null;
    if (hasStarted) {
    interval = setInterval(() => {
      if(sec == 60 && min == 60){
        setHr(hr => hr + 1);
        setMin(0);
        setSec(0);
      } 
      // else if(min == 60){
      //   setMin(0);
      //   setSec(0);
      // } 
      else if(sec == 60){
        setMin(min => min + 1);
        setSec(0);
      } 
      else {
        setSec(sec => sec + 1);
      }


    }, 1000);
    } else if (!hasStarted && sec !== 0) {
    clearInterval(interval);
    }
    return () => clearInterval(interval);
}, [hasStarted, sec]);

const Toggle = () => {  

  setIsActive(true)

}

const Toggle2 = () => {
  postShower(email, min, 0)
}

const Toggle3 = () => {
  setIsActive(!isActive)
}

// React.useEffect(() => {

//   refresh()
  
//   },[])
  
// const refresh = () => {
//   setIsLoading(true)
  
//   firestore()
//   .collection('Showers')
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(async(doc) => {
      
//       setUserInfo({times: doc._data.showerDidTimes, cal: doc._data.avgBathTime, avg: doc._data.avg})
    
//       });
            
//       setIsLoading(false)

//   });
// }

  return (

    // !isLoading ? 
    // <SafeAreaView style={{flex: 1}}>
    //   <HeaderHome type={2} txt={'This Week'}/>

    //     <ImageBackground style={styles.imageActivity} source={require('../../components/images/showerActivity.jpg')} >

    //     </ImageBackground>

    // </SafeAreaView>
    // :

    <SafeAreaView style={{flex: 1}}>
      <HeaderHome type={2} txt={'This Week'}/>

        <ActivityDuration hr={hr} min={min} sec={sec} txt2={userInfo.times} txt3={userInfo.cal} txt4={userInfo.avg}/>

        <ImageBackground style={styles.imageActivity} source={require('../../components/images/showerActivity.jpg')} >

        <StartButtonActivity hasStarted={isActive} onPress={Toggle} onPress2={Toggle2} onPress3={Toggle3} txt1={'START'} txt2={'Showering'} txt3={'SLIDE TO PAUSE'} txt4={'FINISH'} txt5={'RESUME'}/>
            
        </ImageBackground>

    </SafeAreaView>
  );
};

export default Activity;

