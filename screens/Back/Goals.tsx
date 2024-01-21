import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomText, Header, MiniText, OneGoal, OneGoalInput, PremiumBox, ProfileBox, SCREEN_HEIGHT, Space } from '../../components/Utilities/Utilities';
import { PickerSheet, PickerSheetRefProps, saveGoal } from '../../components/Functions/Functions';
import { getDataNumber, setData } from '../../components/Storage/MMKV';


const Goals = ({route, navigation}) => {

  const [isClickedFirst, setIsClickedFirst] = React.useState(false)
  const [isClickedSec, setIsClickedSec] = React.useState(true)

  const [isClickedFirstTime, setIsClickedFirstTime] = React.useState(false)
  const [isClickedSecTime, setIsClickedSecTime] = React.useState(true)

  const [selectedIndex, setSelectedIndex] = React.useState(2)
  const [input, setInput] = React.useState('')

  const isPremium = getDataNumber('isPremium') == 1

  const ref = React.useRef<PickerSheetRefProps>(null)

  return (
    isPremium ? 
    <SafeAreaView>
    <Header onPress={() => {saveGoal(input, isClickedFirst, isClickedSec, navigation)}} type={2} isBlank={false}/>

    <Space space={30}/>

    <OneGoal onPressFirst={() => {setIsClickedSec(false);setIsClickedFirst(!isClickedFirst)}} onPressSec={() => {setIsClickedFirst(false);setIsClickedSec(!isClickedSec);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}  type={1} txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'sunny'} />    
    <OneGoal onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime} type={2} txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'sunny'} icon1={null}/>    
    <OneGoal onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex} type={3} txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'sunny'} icon1={null}/>    

    <OneGoalInput onChangeText={(txt) => {setInput(txt)}} txt={selectedIndex == 1 ? 'Times' : selectedIndex == 2 ? 'Minutes' : selectedIndex == 3 ? 'Time' : 'kcal'}  type={5} onPress={saveGoal}/>

    <PremiumBox txt1={'Premium'}  txt2={'Enjoy Beautiful Shower Premium'}/>

{/* <PickerSheet  ref={ref}/> */}
    </SafeAreaView>
    :
    <SafeAreaView>
    <Header onPressSave={() => {saveGoal(input, is1, is2, nav)}} type={2} isBlank={false} onPress={() => {saveGoal(input, isClickedFirst, isClickedSec, navigation)}} />

        <Space space={30}/>

        <OneGoal isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}  type={1} txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'sunny'} />    
        {/* <OneGoal onPressFirst={() => {setIsClickedSec(false);setIsClickedFirst(!isClickedFirst)}} onPressSec={() => {setIsClickedFirst(false);setIsClickedSec(!isClickedSec);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}  type={1} txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'pepper-hot'} />     */}
        
        
        <OneGoal isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime} type={2} txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'sunny'} icon1={null}/>    
        {/* <OneGoal onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime} type={2} txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'pepper-hot'} icon1={null}/>     */}
        
        
        <OneGoal selectedIndex={selectedIndex} type={3} txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'sunny'} icon1={null}/>    
        {/* <OneGoal onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex} type={3} txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'pepper-hot'} icon1={null}/>     */}


        <OneGoalInput onChangeText={(txt) => {setInput(txt)}} txt={selectedIndex == 1 ? 'Times' : selectedIndex == 2 ? 'Minutes' : selectedIndex == 3 ? 'Time' : 'kcal'}  type={5} onPress={saveGoal}/>

        <MiniText txt={'You can unlock other goal features after purchasing Premium Beautiful Shower.'}/>

    {/* <PickerSheet  ref={ref}/> */}
    </SafeAreaView>
  );
};

export default  Goals;

