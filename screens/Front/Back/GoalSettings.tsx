import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivitySwitches, CustomButton, Header, HeaderHome, Line, LineBwCell, OneGoal, OneGoalInput, PremiumBox, SettingsBox, SmallSwitch, SocialMediaCnt, Space, styles } from '../../../components/Utilities/Utilities';
import { LogOut } from '../../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../../components/Functions/PermissionFunctions';
import { companyUrl, privacyPolicyUrl, supportUrl, termsAndConditionsUrl } from '../../../components/Data/Data';
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { getDataNumber, setData } from '../../../components/Storage/MMKV';

const GoalSettings = ({route, navigation}) => {

  const [isEnabledLeft, setIsEnabledLeft] = React.useState(false)
  const [isEnabledRight, setIsEnabledRight] = React.useState(false)
  
  const refCon = React.useRef<GetAllContactsRefProps>(null)

  const [isClickedFirst, setIsClickedFirst] = React.useState(true)
  const [isClickedSec, setIsClickedSec] = React.useState(false)

  const [isClickedFirstTime, setIsClickedFirstTime] = React.useState(false)
  const [isClickedSecTime, setIsClickedSecTime] = React.useState(false)

  const [selectedIndex, setSelectedIndex] = React.useState(2)
  const [input, setInput] = React.useState(0)
  const isPremium = getDataNumber('isPremium') == 1

  
  
  const saveGoal = () => {
    
    // const goal1 = isClickedFirst ? 'Cold' : 'Hot' 
    // const goal2 = isClickedFirstTime ? 'Day' : 'Week'
    // const goal3 = selectedIndex == 1 ? 'Frequency' : selectedIndex == 2 ? 'Duration' : selectedIndex == 3 ? 'Time of the day' : 'Calories'
    // const goal4 = input
    
    // const Goal = goal1 + '/' + goal2 + '/' + goal3 + '/' + goal4
    
    
    
    if(selectedIndex == 1){
      setData('showeredGoalTimes', Number(input))
    }
    if(selectedIndex == 2){
      setData('weeklyGoalMin', Number(input))
    }
    if(selectedIndex == 3){
      setData('showerTimeGoal', input)
    }
    if(selectedIndex == 4){
      setData('calorieGoal', Number(input))
    }

    setData('timeFrameGoal', 'this week')

    if(isClickedFirst){
      setData('bathGoal', 'cold')
    }

    if(isClickedSec){
      setData('bathGoal', 'hot')
    }

    navigation.goBack()


  }

  return (
    isPremium ? 
    <SafeAreaView>
    <Header onPressCancel={() => {navigation.goBack()}} onPress={() => {saveGoal(input, isClickedFirst, isClickedSec, navigation)}} type={2} isBlank={false}/>

    <Space space={30}/>

    <OneGoal onPressFirst={() => {setIsClickedSec(false);setIsClickedFirst(!isClickedFirst)}} onPressSec={() => {setIsClickedFirst(false);setIsClickedSec(!isClickedSec);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}  type={1} txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'sunny'} />    
    <OneGoal onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime} type={2} txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'sunny'} icon1={null}/>    
    <OneGoal onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex} type={3} txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'sunny'}icon1={null}/>    

    <OneGoalInput onChangeText={(txt) => {setInput(txt)}} txt={selectedIndex == 1 ? 'Times' : selectedIndex == 2 ? 'Minutes' : selectedIndex == 3 ? 'Time' : 'kcal'}  type={5} onPress={saveGoal}/>

    <PremiumBox txt1={'Premium'}  txt2={'Enjoy Beautiful Shower Premium'}/>

{/* <PickerSheet  ref={ref}/> */}
    </SafeAreaView>
    :
    <SafeAreaView>
        <Header onPressSave={saveGoal} type={'goalset'} isBlank={false} onPress={() => {navigation.goBack()}} />

        <Space space={30}/>

        <OneGoal type={'goalset1'} onPressSec={() => {setIsClickedFirst(true);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}   txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'sunny'} />    
        <OneGoal type={'goalset2'} onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime}  txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'sunny'} icon1={null}/>    
        <OneGoal type={'goalset3'} onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex}  txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'sunny'} icon1={null}/>    

        <OneGoalInput onChangeText={(text) => {
          if (!isNaN(text)) { 
            setInput(text); 
        } 

          }} txt={selectedIndex == 1 ? 'Times' : selectedIndex == 2 ? 'Minutes' : selectedIndex == 3 ? 'Time' : 'kcal'}  type={5} onPress={saveGoal}/>

    {/* <PickerSheet  ref={ref}/> */}
    </SafeAreaView>
  );
};

export default GoalSettings;
