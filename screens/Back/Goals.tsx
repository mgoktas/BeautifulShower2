import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, OneGoal, OneGoalInput, SCREEN_HEIGHT, Space } from '../../components/Utilities/Utilities';
import { PickerSheet, PickerSheetRefProps } from '../../components/Functions/Functions';


const Goals = ({route, navigation}) => {

  const {onChangeGoals} = route.params

  const [isClickedFirst, setIsClickedFirst] = React.useState(false)
  const [isClickedSec, setIsClickedSec] = React.useState(false)

  const [isClickedFirstTime, setIsClickedFirstTime] = React.useState(false)
  const [isClickedSecTime, setIsClickedSecTime] = React.useState(false)

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [input, setInput] = React.useState('')
  

  const ref = React.useRef<PickerSheetRefProps>(null)
  const openSwitch = React.useCallback((x) => {
    setSort(x)
    ref?.current?.scrollTo(-SCREEN_HEIGHT / .6)
}, [])

const setSort = React.useCallback((x) => {
  ref?.current?.setSort(x)
}, [])

const saveGoal = () => {
  const goal1 = isClickedFirst ? 'Cold' : 'Hot' 
  const goal2 = isClickedFirstTime ? 'Day' : 'Week'
  const goal3 = selectedIndex == 1 ? 'Frequency' : selectedIndex == 2 ? 'Duration' : selectedIndex == 3 ? 'Time of the day' : 'Calories'
  const goal4 = input

  const Goal = goal1 + '/' + goal2 + '/' + goal3 + '/' + goal4

  onChangeGoals(Goal)
}

  return (
    <SafeAreaView>
        <Header onPressSave={saveGoal} type={2} isBlank={false} onPress={() => {navigation.goBack()}} />

        <Space space={30}/>

        <OneGoal onPressFirst={() => {setIsClickedSec(false);setIsClickedFirst(!isClickedFirst)}} onPressSec={() => {setIsClickedFirst(false);setIsClickedSec(!isClickedSec);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}  type={1} txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'pepper-hot'} />    
        <OneGoal onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime} type={2} txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'pepper-hot'} icon1={null}/>    
        <OneGoal onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex} type={3} txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'pepper-hot'} icon1={null}/>    

        <OneGoalInput onChangeText={(txt) => {setInput(txt)}} txt={selectedIndex == 1 ? 'Times' : selectedIndex == 2 ? 'Minutes' : selectedIndex == 3 ? 'Time' : 'kcal'}  type={5} onPress={saveGoal}/>

    {/* <PickerSheet  ref={ref}/> */}
    </SafeAreaView>
  );
};

export default  Goals;

