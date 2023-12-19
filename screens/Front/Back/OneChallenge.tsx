import { ImageBackground, SafeAreaView } from "react-native"
import { ChallengeContent, HeaderHome, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target } from "../../../components/Utilities/Utilities"
import { View } from "react-native"
import { Text } from "react-native"
import React from "react"


export const OneChallenge = ({route, navigation}) => {
    const {data} = route.params

    return (
        <SafeAreaView>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={'notif'} title={data.title} txt={'Done'}/>
            <ImageBackground source={data.image} style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT * .2, justifyContent: 'flex-end'}}>
               <ChallengeContent data={data} />
            </ImageBackground>
            <Space space={3}/>
            <Target data={data} type={'target'} title={data.target} desc={data.desc}/>
            <Space space={3}/>
            <Line />
            <Space space={3}/>
            <Target data={data} type={'date'} title={data.dateTitle} desc={data.dateDesc}/>
            <Space space={3}/>
        </SafeAreaView>        
    )
}

export default OneChallenge