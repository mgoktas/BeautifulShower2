import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivitySwitches, CustomButton, HeaderHome, Line, LineBwCell, SettingsBox, SmallSwitch, SocialMediaCnt, Space, styles } from '../../../components/Utilities/Utilities';
import { LogOut } from '../../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../../components/Functions/PermissionFunctions';
import { companyUrl, privacyPolicyUrl, supportUrl, termsAndConditionsUrl } from '../../../components/Data/Data';
import IconMa from 'react-native-vector-icons/MaterialIcons'
import { getDataNumber, getDataString, setData } from '../../../components/Storage/MMKV';

const ActivitySettings = ({route, navigation}) => {

  const [isEnabledLeft, setIsEnabledLeft] = React.useState(getDataString('bathGoal' == 'cold'))
  const [isEnabledRight, setIsEnabledRight] = React.useState(!isEnabledLeft)
  const isPremium = getDataNumber('isPremium') == 1
  
  const refCon = React.useRef<GetAllContactsRefProps>(null)
  

  return (
    isPremium ? 
    <SafeAreaView>
    <HeaderHome  type={4} title={'Activity Setup'} txt={'Done'} onPress={() => {navigation.goBack()}}/>
    
    {/* <ActivitySwitches 
    isEnabledLeft={isEnabledLeft} isEnabledRight={isEnabledRight} 
    onVlChngLeft={(val) => {setIsEnabledLeft(val)}}
    onVlChngRight={() => {setIsEnabledRight(!isEnabledRight)}} 
     /> */}

     <View style={{flexDirection: 'row', marginVertical: 15}}>

      <View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

      <IconMa size={32} color={'black'} name={'severe-cold'} />            

      <Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
          Cold Shower
      </Text>


      </View>
      <View style={{right: 80, position: 'relative'}}>
      
      <SmallSwitch 
            onVlChng={() => {
              if(!isEnabledLeft){
                setData('bathGoal', 'cold')
              }
            setIsEnabledLeft(!isEnabledLeft)
            setIsEnabledRight(!isEnabledRight)
            }}
            isEnabled={isEnabledLeft} 
            type={'activity'}
            />
</View>

<Line space={0}/>

     </View>
<Line space={0}/>

     <View style={{flexDirection: 'row', marginVertical: 15}}>

<View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

<IconMa size={32} color={'black'} name={'whatshot'} />            

<Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
Hot Shower
</Text>


</View>

<View style={{right: 80, position: 'relative'}}>

<SmallSwitch 

onVlChng={() => {
if(!isEnabledRight){
setData('bathGoal', 'hot')
}
setIsEnabledRight(!isEnabledRight)
setIsEnabledLeft(!isEnabledLeft)


      }}
  isEnabled={isEnabledRight} 
  type={'activity'}
  />
</View>

</View>

</SafeAreaView>
    :

    <SafeAreaView>
        <HeaderHome  type={4} title={'Activity Setup'} txt={'Done'} onPress={() => {navigation.goBack()}}/>
        
        {/* <ActivitySwitches 
        isEnabledLeft={isEnabledLeft} isEnabledRight={isEnabledRight} 
        onVlChngLeft={(val) => {setIsEnabledLeft(val)}}
        onVlChngRight={() => {setIsEnabledRight(!isEnabledRight)}} 
         /> */}

         <View style={{flexDirection: 'row', marginVertical: 15, opacity: .6}}>

          <View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

          <IconMa size={32} color={'black'} name={'severe-cold'} />            

          <Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
              Cold Shower
          </Text>


          </View>
          <View style={{right: 80, position: 'relative'}}>
          
          <SmallSwitch 
                onVlChng={() => {
                  if(!isEnabledLeft){
                    setData('bathGoal', 'cold')
                  }
                setIsEnabledLeft(!isEnabledLeft)
                setIsEnabledRight(!isEnabledRight)
                }}
                isEnabled={false} 
                type={'activity'}
                />
</View>

<Line space={0}/>
 
         </View>
<Line space={0}/>

         <View style={{flexDirection: 'row', marginVertical: 15}}>

<View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

<IconMa size={32} color={'black'} name={'whatshot'} />            

<Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
    Hot Shower
</Text>


</View>

<View style={{right: 80, position: 'relative'}}>

<SmallSwitch 

onVlChng={() => {
  if(!isEnabledRight){
    setData('bathGoal', 'hot')
  }
  setIsEnabledRight(!isEnabledRight)
  setIsEnabledLeft(!isEnabledLeft)


          }}
      isEnabled={true} 
      type={'activity'}
      />
</View>

</View>

    </SafeAreaView>
  );
};

export default ActivitySettings;
