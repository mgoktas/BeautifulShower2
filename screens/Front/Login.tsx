import * as React from 'react';
import { useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgreementSheet, AgreementSheetRefProps, SignWithFb } from '../../components/Functions/Functions';
import { AppleButtonWithHighlight, BottomTab, BottomText, CustomButton, CustomInput, CustomSwitch, Header, HeaderHome, InfoText, JoinLogo, Line, LocationSwitch, SCREEN_HEIGHT, SCREEN_WIDTH, SignWith, SignWithEmail, Space, styles, TextButton } from '../../components/Utilities/Utilities';
import { forgetAccountPassword, loginToAccount } from '../../components/Functions/AuthFunctions';


const Login = ({navigation}) => {

    const [isForgot, setIsForgot] = React.useState(false)

    const [isSheetOn, setIsSheetOn] = React.useState(false)

    const [isClickedLocation, setIsClickedLocation] = React.useState(false)
    const [isClickedBirthdate, setIsClickedBirthdate] = React.useState(false)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = () => {
        loginToAccount(email, password, navigation)
    }

    const forget = () => {
        forgetAccountPassword(email)
    }
    

    return (
    isForgot ? 
    <View style={{backgroundColor: 'white', height: SCREEN_HEIGHT}}>
        <Space space={15}/>
        <HeaderHome type={6} onPressBack={() => { navigation.goBack(); } } onPress={undefined} txt={undefined} title={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined} onPressShare={undefined} onPressTDots={undefined}/>
        <Space space={30}/>

        <View style={styles.loginView}>

                <View>
                    <CustomInput type={1} txt={'EMAIL'} txt1={''} name={undefined} email={undefined} onChangeText={(txt) => {setEmail(txt)}} isName={undefined} name1={undefined} lastname1={undefined} />
                    
                    <Space space={20}/>

                    <Space space={20}/>
            
                    <TextButton onPress={() => {setIsForgot(false); setEmail(''); setPassword('')}} type={3} txt={'LOG IN?'}/>
                
                </View>


                <View>
                    <CustomButton isReady={true} txt={'RESET PASSWORD'} onPress={forget} type={undefined} isClicked={undefined} space={undefined}/>
                    <Space space={10}/>  
                </View>

        </View>

    </View>
    :
    <View style={{backgroundColor: 'white', height: SCREEN_HEIGHT}}>
            <Space space={15}/>
            
            <HeaderHome type={6} onPressBack={() => { navigation.goBack(); } } onPress={undefined} txt={undefined} title={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined} onPressShare={undefined} onPressTDots={undefined}/>
        <Space space={30}/>

        <View style={styles.loginView}>

        <View>
                    <CustomInput type={1} txt={'EMAIL'} txt1={''} name={undefined} email={undefined} onChangeText={(txt) => {setEmail(txt)}} isName={undefined} name1={undefined} lastname1={undefined} />
                    
                    <Space space={20}/>
                    <Space space={10}/>

                    <CustomInput isPassword={true} type={1} txt={'PASSWORD'} txt1={''} name={undefined} email={undefined} onChangeText={(txt) => {setPassword(txt)}} isName={undefined} name1={undefined} lastname1={undefined}/>
                    <Space space={20}/>
                    <Space space={20}/>
                
                    <TextButton onPress={() => {setIsForgot(true); setEmail(''); setPassword('')}} type={3} txt={'FORGOT PASSWORD?'}/>
                </View>


                <View>
                    <CustomButton isReady={true} txt={'LOG IN'} onPress={login} type={undefined} isClicked={undefined} space={undefined}/>
                    <Space space={10}/>  
                </View>

        </View>

    </View>
    )
};

export default Login;