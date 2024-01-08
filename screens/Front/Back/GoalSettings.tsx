import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivitySwitches, CustomButton, Header, HeaderHome, Line, LineBwCell, OneGoal, OneGoalInput, SettingsBox, SmallSwitch, SocialMediaCnt, Space, styles } from '../../../components/Utilities/Utilities';
import { LogOut } from '../../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../../components/Functions/PermissionFunctions';
import { companyUrl, privacyPolicyUrl, supportUrl, termsAndConditionsUrl } from '../../../components/Data/Data';
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { setData } from '../../../components/Storage/MMKV';

const GoalSettings = ({route, navigation}) => {

  const [isEnabledLeft, setIsEnabledLeft] = React.useState(false)
  const [isEnabledRight, setIsEnabledRight] = React.useState(false)
  
  const refCon = React.useRef<GetAllContactsRefProps>(null)

  const [isClickedFirst, setIsClickedFirst] = React.useState(false)
  const [isClickedSec, setIsClickedSec] = React.useState(false)

  const [isClickedFirstTime, setIsClickedFirstTime] = React.useState(false)
  const [isClickedSecTime, setIsClickedSecTime] = React.useState(false)

  const [selectedIndex, setSelectedIndex] = React.useState(2)
  const [input, setInput] = React.useState(0)



  const saveGoal = () => {


    // const goal1 = isClickedFirst ? 'Cold' : 'Hot' 
    // const goal2 = isClickedFirstTime ? 'Day' : 'Week'
    // const goal3 = selectedIndex == 1 ? 'Frequency' : selectedIndex == 2 ? 'Duration' : selectedIndex == 3 ? 'Time of the day' : 'Calories'
    // const goal4 = input
  
    // const Goal = goal1 + '/' + goal2 + '/' + goal3 + '/' + goal4

    

    setData('weeklyGoalMin', Number(input))

    setData('timeFrameGoal', 'week')

    if(isClickedFirst){
      setData('bathGoal', 'cold')
    }

    if(isClickedSec){
      setData('bathGoal', 'hot')
    }

    navigation.goBack()


  }
  return (
    <SafeAreaView>
        <Header onPressSave={saveGoal} type={'goalset'} isBlank={false} onPress={() => {navigation.goBack()}} />

        <Space space={30}/>

        <OneGoal type={'goalset1'} onPressFirst={() => {setIsClickedSec(false);setIsClickedFirst(!isClickedFirst)}} onPressSec={() => {setIsClickedFirst(false);setIsClickedSec(!isClickedSec);}} isClickedFirst={isClickedFirst} isClickedSec={isClickedSec}   txt={'BATH TYPE'} txt21={'Cold'} icon1={'snow'} txt22={'Hot'} icon2={'pepper-hot'} />    
        <OneGoal type={'goalset2'} onPressFirst={() => {setIsClickedSecTime(false);setIsClickedFirstTime(!isClickedFirstTime)}} onPressSec={() => {setIsClickedFirstTime(false);setIsClickedSecTime(!isClickedSecTime);}} isClickedFirst={isClickedFirstTime} isClickedSec={isClickedSecTime}  txt={'TIME FRAME'} txt21={'Per Day'} txt22={'Per Week'} icon2={'pepper-hot'} icon1={null}/>    
        <OneGoal type={'goalset3'} onPressFirst={() => {setSelectedIndex(1)}} onPressSec={() => {setSelectedIndex(2)}} onPressThi={() => {setSelectedIndex(3)}} onPressFou={() => {setSelectedIndex(4)}} selectedIndex={selectedIndex}  txt={'GOAL TYPE'} txt21={'Frequency'} txt22={'Duration'} txt31={'Time of the day'} txt32={'Calories'}  icon2={'pepper-hot'} icon1={null}/>    

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
