import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityDuration, HeaderHome, StartButtonActivity, styles } from '../../components/Utilities/Utilities';

const Activity = () => {

  const [secPast, setSecPast] = React.useState(0)
  const [hr, setHr] = React.useState(0)
  const [min, setMin] = React.useState(0)
  const [sec, setSec] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false);

  // React.useEffect(() => {
  //   let interval = null;

  //   if (hasStarted) {
  //   interval = setInterval(() => {
  //       setSecPast(sec => sec + 1);
  //       getTimePast()
  //   }, 1000);
  //   } 
  //   else if (!hasStarted) {
  //   clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  //   }, [hasStarted, secPast]);

const getTimePast = () => {
    setSec(secPast % 60)
    setMin(Math.floor(secPast/60))
    setHr(Math.floor(secPast/3600))
}

  return (
    <SafeAreaView>
      <HeaderHome type={2} txt={'This Week'}/>

        <ActivityDuration hr={hr} min={min} sec={sec} txt2={'0'} txt3={'0'} txt4={'00:00'}/>

        <ImageBackground style={styles.imageActivity} source={require('../../components/images/showerActivity.jpg')} >

        <StartButtonActivity hasStarted={hasStarted} onPress={() => {setHasStarted(val => !val)}} txt1={'START'} txt2={'Showering'} txt3={'SLIDE TO PAUSE'}/>
            
        </ImageBackground>

    </SafeAreaView>
  );
};

export default Activity;

