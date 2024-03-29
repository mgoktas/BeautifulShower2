import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppLogo, BottomTab, SCREEN_HEIGHT, SCREEN_WIDTH, styles } from '../../components/Utilities/Utilities';
import { MMKV } from 'react-native-mmkv';
import { getDataString, setData } from '../../components/Storage/MMKV';

interface FirstProps {}

const First = (props: FirstProps) => {
  
  const navigation = useNavigation()
  
  React.useEffect(() => {
    
      setData('weeklyGoalMin', 20)
      setData('timeFrameGoal', 20)
      setData('showeredTimes', 0)
      setData('showeredGoalTimes', 4)
      setData('showerTimeGoal', '12:00')
      setData('calorieGoal', 200)
      setData('calorieBurned', 10)

  },[])

  return (
      <ImageBackground style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT, justifyContent: 'flex-end'}} source={require('../../components/images/shower.jpg')}>

        <AppLogo space={SCREEN_HEIGHT/10} txt={'Showering'} />

        <BottomTab  onPress1={() => { navigation.navigate('Join'); } } onPress2={() => { navigation.navigate('Already'); } } type={undefined} txt1={undefined} txt2={undefined} />
     
      </ImageBackground> 
  );
};

export default First;