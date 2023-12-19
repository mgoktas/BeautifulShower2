import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountPageContent, CustomButton, HeaderHome, Space, styles } from '../../../components/Utilities/Utilities';
import { deleteAccount } from '../../../components/Functions/Functions';

const Account = ({navigation}) => {
  return (
    <SafeAreaView style={styles.accountPage}>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={8} title={'ACCOUNT'} txt={'Save'}/>

        <Space space={60}/>
      <View style={styles.accountPageContainer}>
        <AccountPageContent txt1={'YOUR DATA'} txt2={'You can delete all data linked to this account.'} txt3={'Identity and contact details'} txt4={'Activities'} txt5={'Your profile and community'} linkATxt={'Depending on your usage of our services this data might include:'} />
        <CustomButton onPress={async() => {await deleteAccount(); navigation.navigate('First')}} txt={'DELETE ACCOUNT'} type={5}/>
      </View>

    </SafeAreaView>
  );
};

export default Account;

