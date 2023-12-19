import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, HeaderHome, Line, LineBwCell, SettingsBox, Space } from '../../components/Utilities/Utilities';
import { LogOut } from '../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../components/Functions/PermissionFunctions';
import { privacyPolicyUrl, termsAndConditionsUrl } from '../../components/Data/Data';

const Settings = ({route, navigation}) => {

  const [name, setName] = 'Muhammet'
  const [surname, setSurname] = 'Goktas'
  
  
  const refCon = React.useRef<GetAllContactsRefProps>(null)

  const goTo = React.useCallback((url) => {
    refCon?.current?.goTo(url)
  }, [])


  return (
    <SafeAreaView>
        <HeaderHome  type={4} title={'SETTINGS'} txt={'Done'} onPress={() => {navigation.goBack()}}/>
        
        <ScrollView>

            <HeaderHome type={5} title={'PERSONAL SETTINGS'} />

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
         
            <SettingsBox icon={'person-outline'} icon2={true} isFirst={true}  title={'Edit Profile'}  onPress={() => {navigation.navigate('EditProfile', {name, surname})}}/>
          
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          
            <SettingsBox icon={'person-outline'} title={'Account'}  onPress={() => {navigation.navigate('Account')}}/>
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
            
            <SettingsBox icon={'key-outline'} title={'Privacy'} onPress={() => {navigation.navigate('Privacy')}}/>
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
            
            <SettingsBox type={2} icon={'bell-ring-outline'} title={'Notifications'}  onPress={() => {navigation.navigate('Notifications')}}/>

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
           
            <Space space={15} />

            <HeaderHome type={5} title={'APP SETTINGS'} />

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
           
            {/* <SettingsBox type={2} icon={'watch-variant'} title={'Apple Watch'}   onPress={() => {navigation.navigate('AppleWatch')}}/> */}
          
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          
            <SettingsBox type={3} icon={'people-outline'} title={'Social Sharing'} onPress={() => {navigation.navigate('SocialSharing')}}/>

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <Space space={15} />
          
            <HeaderHome type={5} title={'MORE'} />

            <Space space={15} />
          
            <SettingsBox onPress={
              () => {
                goTo('https://resetwill.netlify.app/support/beautifulshower');
              }
            } type={4} icon={'message-text-outline'} icon2={true} isFirst={true}  title={'Support & Feedback'} />
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <SettingsBox onPress={() => {goTo(termsAndConditionsUrl)}} icon={'pencil-sharp'} title={'Terms & Conditions'} />
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <SettingsBox onPress={() => {goTo(privacyPolicyUrl)}} icon={'lock-closed-outline'} title={'Privacy Policy'} />
         
            {/* <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          */}
            {/* <SettingsBox icon={'people-outline'} title={'Community Guidelines'} /> */}
         
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
         
            <SettingsBox type={5} onPress={() => {goTo('https://resetwill.netlify.app')}} title={'mgoktas & Premium'} />
        
            <CustomButton type={3} onPress={() => { LogOut(navigation) }} txt={'LOG OUT'}/>

            <Space space={20}/>
            <Space space={20}/>

        </ScrollView>

      <GetAllContacts ref={refCon}/>
  
    </SafeAreaView>
  );
};

export default Settings;
