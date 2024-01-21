import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, HeaderHome, Line, LineBwCell, SettingsBox, Space } from '../../components/Utilities/Utilities';
import { LogOut } from '../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../components/Functions/PermissionFunctions';
import { companyUrl, privacyPolicyUrl, supportUrl, termsAndConditionsUrl } from '../../components/Data/Data';
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';

const AdminPanel = ({route, navigation}) => {

  const [isAdmin, setIsAdmin] = React.useState(getDataNumber('isAdmin') == 1)  

  const refCon = React.useRef<GetAllContactsRefProps>(null)

  const goTo = React.useCallback((url) => {
    refCon?.current?.goTo(url)
  }, [])

  return (
    <SafeAreaView>
        <HeaderHome  type={4} title={'Admin Panel'} txt={'Back'} onPress={() => {navigation.goBack()}}/>
        
        <ScrollView>

            <HeaderHome type={5} title={'PERSONAL SETTINGS'} />

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
                    
            <SettingsBox icon={'person-outline'} icon2={true} isFirst={true}  title={'All Users'}  onPress={() => {navigation.navigate('Users')}}/>
          
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          
            <SettingsBox icon={'person-outline'} title={'All Posts'}  onPress={() => {navigation.navigate('Posts')}}/>
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

        </ScrollView>

    </SafeAreaView>
  );
};

export default AdminPanel;
