import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { GetAllContacts, GetAllContactsRefProps } from '../../components/Functions/2-FunctionsCommunity';
import { ConnectToFacebookRefProps, ConnectToFacebookSheet } from '../../components/Functions/PermissionFunctions';  
import { Dimensions, Image, View as V, TextInput, Switch, TouchableOpacity as TO, TouchableHighlight, ScrollView, ImageBackground, FlatList } from "react-native"
import { GestureDetector, GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler"
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/Entypo'
import { useCallback, useEffect, useRef, useState } from "react"
import { verticalScale } from "./Metrics"
import { SCREEN_WIDTH } from '../../components/Utilities/Utilities';

const Tasks = ({route, navigation}) => {

    const [name, setName] = React.useState('Muhammet')
    
    const contactRef = React.useRef<GetAllContactsRefProps>(null);
    const getContacts = React.useCallback(() => {
      contactRef?.current?.getContacts()
    }, []);

    const metaRef = React.useRef<ConnectToFacebookRefProps>(null);
    const connectFriendsFromFacebook = React.useCallback(() => {
      metaRef?.current?.connectFB()
    }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

        <HeaderHome title={'TASKS'} type={5} />
        <Line />
        
        <ScrollView> 
      
            {/* <Discover onPress={() => {navigation.navigate('OneChallenge', {data: {title: data[0].title, time: data[0].duration, count: data[0].count, image: data[0].image, desc: data[0].desc, dateDesc: data[0].dateDesc}})}} type={2} onPressRight={() => {getContacts()}} title={'CHALLENGES'} subtitle={''} data={data} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}
            
            {/* <Discover type={3} onPressRight={() => {getContacts()}} title={'EVENTS'} subtitle={'PAST EVENTS'} data={data} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}

            {/* <Discover duration={'0 mins'} name={name} info={'Track a session to participate in the leaderboard'} type={3} title={'LEADERBOARD'} subtitle={'PAST CHALLENGES'} data={data}/> */}
            
            {/* <Discover type={true} onPressLeft={() => {connectFriendsFromFacebook()}} onPressRight={() => {getContacts()}} title={'DISCOVER PEOPLE'} text21={'Contacts'} text22={'Follow people you know'} text11={'Facebook'} text12={'Follow friends from Facebook'} text3={true ? 'CONNECTED' : 'CONNECT'}  /> */}
        
            <Space space={50} />

            {/* <Discover duration={'0 mins'} name={'Groups & Communities'} info={'Longeivty is more fun together'} type={4} title={'GROUPS & COMMUNITIES'} data={data}/> */}

            <Space space={50} />

            <AppleButton11 color={'#007AFF'} txt={'Weekly'} txt2={'Monthly'} isPrimary={true} isPrimary2={false}/>

        </ScrollView>

    </SafeAreaView>
  );
};

export default Tasks;

export const HeaderHome = ({onPressR, onPress, txt, title, type, onPressBack, onPress0, onPress1, onPress2, onPressShare}) => {
 
    return (
        type == 35 ?
        <GestureHandlerRootView>
            <View style={styles.headerHomeCnt}>
                    <Text style={styles.headerHomeTitle}>
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPress} style={styles.headerProfileIconsCnt}>
                        <IconE style={styles.startButtonActivityIcon} name={'dots-three-vertical'} size={21}/>
                    </TO>
            </View>
        </GestureHandlerRootView> 
        :
        type == 'goals' ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center', left: -78,}]}>
                    <Text style={[styles.headerHomeTitle, {marginTop: 10, marginBottom: 15, width: '50%', marginStart: 0}]} >
                        {title}
                    </Text>
                    <View>
                    <TO activeOpacity={.7} onPress={onPressShare} style={[{position: 'absolute', left: 90, top: -15}]}>
                        <IconI name={'share-outline'} size={25} />
                    </TO>
                    <TO activeOpacity={.7} onPress={onPressR} style={[{position: 'absolute', left: 130, top: -15}]}>
                        <IconI style={styles.startButtonActivityIcon} name={'settings-outline'} size={28}/>
                    </TO>
                    </View>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView>
        :
        type == 'lrtbtntxtmid' ?
        <GestureHandlerRootView>
        <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 11, letterSpacing: 2}]} >
                    {title}
                </Text>
                <TO activeOpacity={.7} onPress={onPress} style={[styles.headerProfileIconsCnt, {position: 'absolute'}]}>
                    <IconI color={'#545353'} name={'share-outline'} size={25} />
                </TO>
                <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                    <IconI color={'#545353'} name={'arrow-back'} size={25} />
                </TO>
        </View>
        <Line space={undefined} />
    </GestureHandlerRootView>
    :
        
        type == 'notif' ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                    <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 13, letterSpacing: 2}]} >
                        {title}
                    </Text>
                    
                    <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                        <IconI color={'#545353'} name={'arrow-back'} size={25} />
                    </TO>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView>
        :
        type == 10 ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {height: 'auto'}]}>
                    <Text style={[styles.headerHomeTitle, {width: '70%', marginTop: 35, marginBottom: 15, fontWeight: '500', fontSize: 25}]} >
                        {title}
                    </Text>
            </View>
        </GestureHandlerRootView> 
        :
        type == 8?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                    <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 13, letterSpacing: 2}]} >
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                        <IconI color={'#545353'} name={'arrow-back'} size={25} />
                    </TO>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView>
        :
        type == 7 ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                    <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 13, letterSpacing: 2}]} >
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPress} style={[styles.headerProfileIconsCnt, {position: 'absolute'}]}>
                        <Text style={{ fontWeight: '700'}}>
                            {txt}
                        </Text>
                    </TO>
                    <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                        <IconI name={'arrow-back'} size={25} />
                    </TO>
                    <View>
                    <TO activeOpacity={.7} onPress={onPressBack} style={[{position: 'absolute', left: 50, top: -15}]}>
                        <IconI name={'share-outline'} size={25} />
                    </TO>
                    <TO activeOpacity={.7} onPress={onPressBack} style={{position: 'absolute', left: 90, top: -15}}>
                        <IconM name={'dots-horizontal'} size={25} />
                    </TO>
                    </View>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView>
        :
        type == 6 ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                    <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 13, letterSpacing: 2}]} >
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPress} style={[styles.headerProfileIconsCnt, {position: 'absolute'}]}>
                        <Text style={{ fontWeight: '700'}}>
                            {txt}
                        </Text>
                    </TO>
                    <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                        <IconI color={'#545353'} name={'arrow-back'} size={25} />
                    </TO>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView>
        :
        type == 5 ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {height: 'auto'}]}>
                    <Text style={[styles.headerHomeTitle, {width: '70%', marginTop: 10, marginBottom: 15}]} >
                        {title}
                    </Text>
            </View>
        </GestureHandlerRootView> 
        :
        type == 4 ?
        <GestureHandlerRootView>
            <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                    <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 15, letterSpacing: 2}]} >
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPress} style={[styles.headerProfileIconsCnt, {position: 'absolute'}]}>
                        <Text style={{ fontWeight: '700'}}>
                            {txt}
                        </Text>
                    </TO>
            </View>
            <Line space={undefined} />
        </GestureHandlerRootView> 
        :
        type == 3 ?
        <GestureHandlerRootView>
            <View style={styles.headerHomeCnt}>
                    <Text style={styles.headerHomeTitle}>
                        {title}
                    </Text>
                    <TO activeOpacity={.7} onPress={onPress} style={styles.headerProfileIconsCnt}>
                    <IconI style={styles.startButtonActivityIcon} name={'settings-outline'} size={28}/>
                    </TO>
            </View>
        </GestureHandlerRootView> 
        :
    type == 2 ? 
    <GestureHandlerRootView>
    <View style={styles.headerActivityCnt}>
            <View style={styles.headerActivityIconCnt}>
                <IconI size={16} name={'star'} color={'white'} />
            </View>
            <Image style={styles.headerActivityImage} source={require('../images/logotransparent.png')} />
            <Text style={styles.headerActivityText}>
                {txt}
            </Text>
    </View>
</GestureHandlerRootView> 
    :    
    <GestureHandlerRootView>
        <View style={styles.headerHomeCnt}>
                <Text style={styles.headerHomeTitle}>
                    {title}
                </Text>
                <View style={styles.headerHomeIconsCnt}>
                    
                    <TO activeOpacity={.8} onPress={onPress0}>
                        <IconI size={25} name={'person-add-outline'}/>
                    </TO>
                    <TO activeOpacity={.8} onPress={onPress1}>
                        <IconE size={25} name={'new-message'}/>
                    </TO>
                    <TO activeOpacity={.8} onPress={onPress2}>
                        <IconI size={25} name={'notifications-outline'}  />
                    </TO>
                    <TO activeOpacity={.8} onPress={onPressR}>
                        <IconI size={25} name={'refresh-outline'}  />
                    </TO>

                </View>
        </View>
    </GestureHandlerRootView> 
)}

export const Line = ({space, type}) => (
    type == 3 ?
    <View style={[styles.line, {marginHorizontal: space, backgroundColor: '#ACAAAA', height: 2.5}]}>

    </View> :
    type == 2 ?
    <View style={[styles.line, {marginHorizontal: space, backgroundColor: '#ACAAAA', height: 1.5}]}>

    </View> :
        <View style={[styles.line, {marginHorizontal: space, backgroundColor: '#ACAAAA'}]}>

        </View>
)

export const Space = ({space}) => (
    <View style={{height: space}}>

    </View>
)


export const styles = StyleSheet.create({
    buttonSheet: {
        width: '96%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        opacity: 3,
        zIndex: 2,
        position: 'absolute',
        height: SCREEN_HEIGHT / 5,
      },
    textButtonTxt: {
        fontSize: 25,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#007AFF'
    },
    textButtonCnt: {
        // marginHorizontal: 
        height: verticalScale(60),
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#1c1c1e',
    },

    oneItemSummaryFeedBackText:{

    },
    oneItemSummaryFeedBackIconsCnt:{

    },
    oneItemSummaryFeedBackCnt:{

    },
    oneItemSummaryRow5MapCnt:{

    },
    oneItemSummaryRow4Text2:{

    },
    oneItemSummaryRow4Text1:{

    },
    oneItemSummaryRow4Cnt:{

    },
    oneItemSummaryBurnedText:{

    },
    oneItemSummaryDurationText:{

    },
    oneItemSummaryCalculationsCnt:{

    },
    oneItemSummaryRow2Text:{

    },
    oneItemSummaryWhatOn:{

    },
    oneItemSummaryPersonNameText:{

    },
    oneItemSummaryCnt:{

    },
    oneItemSummaryRow1:{

    },
    oneItemSummaryRow1AvatarCnt:{

    },
    oneItemSummaryPersonInfoTextCns:{

    },
    classicButtonCnt:{
        marginHorizontal:20,
        justifyContent: 'space-between'
    },
    classicButtonItCnt1:{
        width: '45%',
        height: 55,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    classicButtonText:{
        letterSpacing: 2,
        color: 'white'
    },
    classicButtonItCnt2:{
        width: '45%',
        height: 55,
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    discoverBlogRowText3:{
        fontSize: 10,
        letterSpacing: 1,
        fontWeight: '300',
        color: 'black'
    },
    discoverBlogRowText2:{
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    discoverBlogRowText1:{
        fontSize: 12,
        fontWeight: '500',
        backgroundColor: 'black',
        letterSpacing: 2,
        fontFamily: 'OpinionProCondensed-Bold',
        color: 'white',
        padding: 5,
        width:55,
        justifyContent: 'center',
        marginVertical: 10
        
    },
    discoverBlogRowCnt:{
        fontSize: 22,
        fontWeight: '500',
        padding: 5,
        justifyContent: 'space-between',
        fontStyle: 'italic'
    },
    descriptiveText:{
        color: 'gray',
        fontSize: 10,
        marginLeft: 0,
        marginRight: 40,
        marginVertical: 10
    },
    customInputTxt:{
        position: 'absolute', 
        left: 14, 
        top: 16, 
        color: 'gray'
    },
    loginView:{
        justifyContent: 'space-between',
        height: SCREEN_HEIGHT/1.25
    },
    smallLogo:{
            height: 30,
            width: 50,
            bottom: 5,
            right: 7
    },
    watchPageContentText1:{
        fontSize: 28,
        fontWeight: '800',
        marginVertical: 10,
    },
    watchPageContentText2:{
        marginVertical: 10,
        fontSize: 14,
        fontWeight: '400'
    },
    watchPageContent:{
        marginHorizontal: 30
    },
    allowUsCnt:{
        justifyContent: 'space-between',
        paddingTop: 10,
        backgroundColor: '#b9b9b9'
    },
    allowUsRow1:{
        flexDirection: 'row'
    },
    allowUsRowIcon:{
        marginHorizontal: 20
    },
    allowUsRowTextCnt:{
        justifyContent: 'space-between'
    },
    allowUsRowText1:{
        fontSize: 15,
        fontWeight: '500'
    },
    allowUsRowText2:{
        color: '#1c1c1e',
        fontSize: 13,
        top: 7
    },
    allowButton:{
        marginHorizontal: 36
    },
    privacyOptionsTextLeft:{
        fontSize: 16,
        marginHorizontal: 20
    },
    privacyOptionsIconRight:{
        
    },
    privacyOptionsLeftSide:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    privacyOptionsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    privacyOptionsCnt:{
        marginVertical: 10,
    },
    privacyRow2Text:{
        fontSize: 14,
        color: '#131314'
    },
    privacyRowText1:{
        fontSize: 16,
        fontWeight: '800',
        fontFamily: 'RoboltxBattery300v'
    },
    privacyRow1:{
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    privacyCnt:{
        marginHorizontal: 20,
        marginVertical: 20
    },
    buttonArrowBack:{
        width: 25,
        height: 2,
        backgroundColor: 'white',
        position: 'absolute',
        right: 40,
        bottom: 44
    },
    accountPage:{
        height: SCREEN_HEIGHT
    },
    accountPageContainer:
    {
        justifyContent: 'space-between', 
        flex: 1
    },
    accountPageListItem:{
        color: 'gray',
        textDecorationStyle: 'dotted'
    },
    linkTxt:{
        color: 'black',
        textDecorationLine: 'underline'
    },
    accountPageDesc:{
        marginVertical: 25,
        color: 'gray',
    },
    accountPageHead:{
        fontFamily: 'OpinionProCondensed-Bold',
        fontSize: 28,
        fontStyle: 'italic',
    },
    accountPageContentCnt:{
        marginHorizontal: 20
    },
    accountPageContent:{
        marginHorizontal: 20
    },
    progressText1:{
        fontSize: 13,
        color: '#545353'
    },
    progressText2:{
        fontSize: 32,
        fontFamily: 'SKBarbicaneUnicase-Bold',
    },
    progressText3:{
        fontSize: 10,
        color: '#545353',
        top: 10
    },
    progressColText2:{
        fontWeight: '400',
        color: '#545353'
    },
    progressColText1:{
        fontSize: 22,
        fontWeight: '700'
    },
    progressRow1:{
        marginHorizontal: 20,
        top: 6
    },
    progressCol:{
        right: 10
    },
    progressTextsCnt:{
        height: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    progressRow:{
        flexDirection: 'row'
    },
    progressBarCnt:{
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 15,
        borderColor: 'gray',
        borderRadius: 500
    },
    progressCnt:{
        marginVertical: 20,
    },
    headerProfileIconsCntRight:{
    },
    discoverLeaderDistance:{
        fontSize: 16,
        color: 'gray'
    },
    discoverLeaderText:{
        fontSize: 12,
        color: 'gray'
    },
    discoverLeaderName:{
        fontSize: 14,
        fontWeight: '500'
    },
    discoverLeaderCol:{
        width: '60%'
    },
    discoverLeaderRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center'
    },
    discoverChallengeRowText3:{
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'italic',
        backgroundColor: 'white',
    },
    discoverChallengeRowText2:{
        fontSize: 14,
        fontWeight: '600',
        backgroundColor: 'white',
        letterSpacing: 1,
        fontFamily: 'BloomingElegantSans-Bold'

    },
    discoverChallengeRowText1:{
        fontSize: 22,
        fontWeight: '500',
        backgroundColor: 'white',
        fontStyle: 'italic',
        fontFamily: 'OpinionProCondensed-Bold'
    },
    discoverChallengeRowCnt:{
        fontSize: 22,
        fontWeight: '500',
        backgroundColor: 'white',
        height: '30%',
        padding: 5,
        justifyContent: 'center',
        fontStyle: 'italic'
    },
    discoverChallengesRowCnt:{
        alignSelf: 'flex-end',
        height: '50%',
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    pageWelcome:{
        height: SCREEN_HEIGHT,
    },
    profileEditCnt:{
        flexDirection: 'row',
        marginHorizontal: 30
    },
    settingsBoxIconPen:{
        position: 'absolute',
        right: -5,
        top: 8
    },
    settingsBoxIconCnt:{

    },
    settingsBoxIconRight:{
        // position: 'absolute',
        // right: 0
    },
    settingsBoxText:{
        width: '75%',
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: '700'
    },
    settingsBoxCnt:{
        flexDirection: 'row',
        padding: 25,
        alignItems: 'center'
    },
    profileBoxIconRight:{
        position: 'absolute',
        right: 30
    },
    profileBoxIconPremium:{
        justifyContent: 'center',
        flexDirection: 'row',
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#bf9d50',
        alignItems: 'center',
        marginHorizontal: 20
    },
    profileBoxRow2:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    profileBoxCol2Text2:{
        fontSize: 15,
        height: '50%',
        color: '#1c1c1e'
    },
    profileBoxCol2Text1:{
        fontWeight: '600',
        fontSize: 15,
        height: '50%'
    },
    profileBoxCol2TextsCnt:{
        height: '100%',
        justifyContent: 'center',
    },
    profileBoxTextHead:{

    },
    profileBoxCnt:{
        height: 80,
        marginVertical: 50
    },
    profilePersonItBioText:{
        color: 'gray',
        fontSize: 14
    },
    profilePersonButtonIcon:{

    },
    profilePersonButtonText:{
        letterSpacing: 2,
        fontWeight: '600',
        fontSize: 13,
        color: 'white',
    },
    profilePersonButtonCnt:{
        backgroundColor: 'black',
        flexDirection: 'row',
        marginVertical: 18,
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        paddingLeft: 10
    },
    profilePersonInfoVLine:{
        width: 1,
        height: 10,
        color: 'gray',
        marginBottom: 2
    },
    profilePersonInfoText:{
        fontSize: 13,
        fontWeight: '700',
        textDecorationLine: 'underline',
        marginRight: 15,
        letterSpacing: 2
    },
    profilePersonItInfoCnt:{
        marginVertical: 18,
        flexDirection: 'row'
    },
    profilePersonItCountryText:{
        fontSize: 16,
        color: '#585353',
        marginLeft: 20
    },
    profilePersonCountryCnt:{
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 18,
        alignItems: 'center'
    },
    profilePersonColCnt:{
        width: '65%',
        position: 'absolute',
        marginHorizontal: 20,
        top: -90
    },
    profilePersonName:{
        fontWeight: '700',
        fontSize: 27,
        marginVertical: 18,
        fontFamily: 'Bowie-Bold'
    },
    profilePersonImage:{
        alignSelf: 'center'
    },
    profilePersonImageCnt:{
        width: 140,
        height: 140,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderWidth: 2,
        borderColor: 'white'
    },
    profilePersonImageCnt2:{
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderWidth: 2,
        borderColor: 'white'
    },
    profilePersonItCnt:{
        width: '100%',
        height: SCREEN_HEIGHT / 1.9,
        backgroundColor: '#C2BFBF'
    },
    profilePersonIcon:{
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    profilePersonBackCnt:{
        backgroundColor: '#b2d6d8',
        width: '100%',
        height: SCREEN_HEIGHT/5
    },
    headerProfileIconsCnt:{
        right: 30,
    },
    headerProfileIconsCntLeft:{
        left: 30,
    },
    headerActivityText:{
        position: 'absolute',
        right: 30,
        fontWeight: '500',
        fontStyle: 'italic'
    },
    startButtonActivityIcon:{
        alignSelf: 'center'
    },
    startButtonActivitySettingsButton:{
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: '100%',
        width: '15%',
        marginHorizontal: 30,
        justifyContent: 'center'
    },
    startButtonActivityButtonIcon:{
        width: '15%',
        alignSelf: 'center'
    },
    startButtonActivityButtonText2:{
        color: 'white',
        fontSize: 14
    },
    startButtonActivityButtonText1:{
        letterSpacing: 2,
        fontWeight: '600',
        fontSize: 13,
        color: 'white'
    },
    startButtonActivityButtonCol1:{
        justifyContent: 'center',
        padding: 10,
        textAlign: 'center'
    },
    startButtonActivityButtonCol12:{
        justifyContent: 'center',
        width: '70%',
        padding: 10,
        textAlign: 'center',
        marginHorizontal: 10
    },
    startButtonActivityButtonCnt:{
        backgroundColor: 'black',
        height: '100%',
        width: '50%',
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    startButtonActivityMusicIconCnt:{
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 30,
        width: '15%'
    },
    startButtonActivityCnt:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        marginVertical: 40
    },
    imageActivity:{
        width: '100%',
        height: SCREEN_HEIGHT/2,
        justifyContent: 'flex-end',
        top: 50
    },
    activityDurationCntRow2Col2Text1:{
        fontSize: 38,
        fontWeight: '600',
        alignSelf: 'center',
        fontFamily: 'SKBarbicaneUnicase-Bold'
    },
    activityDurationCntRow2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60
    },
    activityDurationCntRow2ColText2:{
        fontSize: 14,
        alignSelf: 'center',
        color: 'gray'
    },
    activityDurationCntRow2ColText1:{
        fontSize: 54,
        alignSelf: 'center',
        fontWeight: '600',
        fontFamily: 'SKBarbicaneUnicase-Bold'
    },
    activityDurationCntRow1:{
        justifyContent: 'center',
        width: '33%',
        height: 120
    },
    activityDurationCntRow0:{
        justifyContent: 'center',
        height: 120
    },
    activityDurationCnt:{
        
    },
    headerActivityImage:{
        height: 50,
        width: 90
    },
    headerActivityIconCnt:{
        justifyContent: 'center',
        flexDirection: 'row',
        left: 20,
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#bf9d50',
        alignItems: 'center'
    },
    headerActivityCnt:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    discoverRowSubhead:{
        fontSize: 13,
        marginVertical: 5
    },
    discoverRowHead:{
        fontWeight: '500',
        fontSize: 14
    },
    discoverIcon:{
        alignSelf: 'center',
        marginVertical: 40
    },
    discoverRowBoxBtnText:{
        fontWeight: '500',
        letterSpacing: 2,
        fontSize: 12,
        alignSelf: 'center'
    },
    discoverRowBoxBox:{
        padding: 4,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10
    },
    discoverRowBox1:{
        marginEnd: 2
    },
    discoverRowBox:{
        width: '50%',
        height: 250,
        backgroundColor: '#B5AFAF',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    discoverRow2:{
        flexDirection: 'row',
    },
    discoverSubtitle:{
        textDecorationLine: 'underline',
        fontWeight: '600',
        fontSize: 12
    },
    discoverTitle:{
        fontSize: 18,
        fontWeight: '600',
        width: '70%',
        marginStart: 0
    },
    discoverTopRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        alignItems: 'center'
    },
    discoverCnt:    {
        marginHorizontal: 20
    },
    headerHomeIconsCnt:{
        width: '35%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        left: -20
    },
    headerHomeTitle:{
        fontSize: 21,
        fontWeight: '700',
        width: '50%',
        marginStart: 20
    },
    headerHomeCnt:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    oneGoalInputText:{
        color: 'gray'
    },
    oneGoalInput:{
        marginStart: 20,
        marginEnd: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1c1c1e'
    },
    oneGoalTx:{
        color: 'gray',
        fontSize: 15
    },
    oneGoalTsCnt:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginEnd: 10
    },
    oneGoalsCnt:{
        flexDirection: 'row',
        marginBottom: 10
    },
    oneGoalHeader:{
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600'
    },
    oneGoalCnt:{
        marginHorizontal: 20,
        marginVertical: 10
    },
    headerTextLeft:{
        fontSize: 15
    },
    headerTextMiddle:{
        fontSize: 13,
        letterSpacing: 1,
        fontWeight: '600'
    },
    headerTextRight:{
        fontSize: 15,
        fontWeight: '600'
    },
    smallSwitchItCnt: {
        width: '30%',
        left: 20
    },
    smallSwitchText2: {
        // fontFamily: 'DIN Next LT Arabic Regular',
        fontSize: 15,
        color: '#1c1c1e',
        lineHeight: 16
    },
    smallSwitchText1: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'DIN Next LT Arabic Regular',
        marginBottom: 5
    },
    smallSwitchTextsHead:{
        width: '70%',
    },
    smallSwitchCnt:{
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
        
    },
    shadow: { 
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.38,
        shadowRadius: 16.00,
        
    },
    rulerCnt:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25
    },
    dayBoxTextCnt:{
        fontSize: 15,
        marginRight: 100,
        height: SCREEN_WIDTH/10,
        justifyContent: 'center',
        maxWidth: SCREEN_WIDTH /.7
    },
    dayBoxText:{
        fontSize: 15,
        lineHeight: 20,
        marginRight: 10,
        justifyContent: 'center',
    },
    dayBoxItIt:{
        width: 10,
        height: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    dayBoxIt:{
        width: 11,
        height: 11,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1, 
        borderColor: 'black',
        padding: 8
    },
    dayBoxItCnt:{
        justifyContent: 'center',
        width: '20%',
    },
    dayBoxCnt:{
        flexDirection: 'row',
    },
    optionalsText2:{
        fontWeight: '400',
        color: '#757474'
    },
    optionalsText1:{
        fontWeight: '600',
        marginVertical: 5,
        fontFamily: 'DIN Next LT Arabic Bold',
    },
    optionalsTextCnt:{
        marginRight: 80,
        flexDirection: 'column'
    },
    optionalsTickLine:{
        height: 500,
        width: .5,
        backgroundColor: 'gray',
        alignSelf: 'center'
    },
    optionalsTickCnt:{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '5%',
        marginHorizontal: 40,
        marginRight: 5,
        top: 8
    },
    optionalsCnt:{
        flexDirection: 'row',

    },
    welcomeHeaderTextBg:{
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    welcomeHeaderTextSm:{
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: '600',
        fontFamily: 'BloomingElegantSans-Bold'
    },
    welcomeHeaderCnt:{
        height: SCREEN_HEIGHT / 5,
        paddingHorizontal: 30,
        paddingTop: 80
    },
    textButton:{
        fontSize: 13,
        marginHorizontal: 30,
        textDecorationLine: 'underline',
        fontWeight: '700',
        letterSpacing: 2
    },
    switchBoxText2Cnt:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        right: 97
    },
    switchBoxTextLink:{
        color: 'black',
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontSize: 14,
        justifyContent: 'center',
    },
    switchBoxTextCnt:{
        fontSize: 15,
        marginRight: 100,
        height: SCREEN_WIDTH/5,
        justifyContent: 'center',
        maxWidth: SCREEN_WIDTH /.7
    },
    switchBoxText:{
        fontSize: 15,
        lineHeight: 20,
        marginRight: 10,
        justifyContent: 'center',
    },
    switchBoxItIt:{
        width: 13,
        height: 13,
        alignSelf: 'center',
        backgroundColor: 'black',
        borderWidth: 1, 
        borderColor: 'black',
    },
    switchBoxIt:{
        width: 20,
        height: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1, 
        borderColor: 'black',
        padding: 10
    },
    switchBoxItCnt:{
        justifyContent: 'center',
        width: '20%',
        height: SCREEN_WIDTH/5,
    },
    switchBoxCnt:{
        flexDirection: 'row',
    },
    flexCnt:{
        justifyContent: 'space-between', height: SCREEN_HEIGHT - 70
    },
    infoText2Cnt:{
        alignItems: 'center',
        justifyContent: 'center',
        top: 4,
        
    },
    infoTextLink:{
        color: 'black',
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontSize: 12,
        justifyContent: 'center'
    },
    infoText:{
        marginHorizontal: 30,
        fontSize: 13,
        justifyContent: 'center',
        lineHeight: 15
    },
    infoTextCnt: {
        height: 200,
        backgroundColor: '#f2f2f6',
        paddingVertical: 10,
        paddingHorizontal: 0
    },
    locationSwitchItemCnt:{
        position: 'absolute',
        height: 45,
        width: '80%',
        backgroundColor: '#f2f2f6',
        top: 95,
        alignSelf: 'center',
        borderRadius: 10
    },
    locationSwitchItemCnt2:{
        height: 45,
        width: '80%',
        backgroundColor: '#f2f2f6',
        alignSelf: 'center',
        borderRadius: 10
    },
    locationSwitchText1: {
        color: 'gray',
        fontWeight: '600'
    },
    locationSwitchText2: {
        fontWeight: '500',
        color: 'black'
    },
    locationSwitchTextsCnt: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationSwitchCnt: {
        marginHorizontal: 30
    },
    customSwitchTxt:{
        fontSize: 12,
        color: 'gray'
    },
    customSwitchCnt: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10
    },
    customSwitch: {
        borderWidth: .8,
        borderColor: 'gray',
        width: 30,
        height: 50,
        margin: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customBtnlineV2: {
        height: 45,
        width: 1,
        backgroundColor: 'gray',
        alignSelf: 'flex-end'
    },
    customBtnlineV: {
        height: 45,
        width: .6,
        backgroundColor: 'gray'
    },
    customBtnlineH2:{
        height: .6,
        backgroundColor: 'gray'
    },
    customBtnlineH1:{
        height: .6,
        width: '65%',
        backgroundColor: 'gray',
        left: 100
    },
    customBtnlineH:{
        height: .6,
        width: '5%',
        backgroundColor: 'gray'
    },
    customBtnCnt: {
        marginHorizontal: 30,
        flexDirection: 'column',
    },
    customBtnTxt: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 1,
        color: 'white',
    },
customBtnlineV22: {
    height: 45,
    width: 1,
    backgroundColor: 'gray',
    alignSelf: 'flex-end'
},
customBtnlineV2: {
    height: 45,
    width: 1,
    backgroundColor: 'gray'
},
customBtnlineH22:{
    height: .6,
    backgroundColor: 'gray'
},
customBtnlineH12:{
    height: .6,
    width: '65%',
    backgroundColor: 'gray',
    left: 100
},
customBtnlineH2:{
    height: .6,
    width: '5%',
    backgroundColor: 'gray'
},
customBtnCnt2: {
    marginHorizontal: 30,
    flexDirection: 'column'
},
customBtnTxt2: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    color: 'white',
},
    line: {
    marginHorizontal: 10,
    height: .5,
    backgroundColor: 'gray'
    },
    signWithIconI: {
        marginHorizontal: 40,
    },
    signWithIcon: {
        marginHorizontal: 40,
        width: 20,
        height: 20
    },
    signWithTxt: {
        fontSize: 15,
        fontFamily: 'PFDinTextPro-Regular'
    },
    signWithCnt: {
        height: 70,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    lines: {
        height: 1,
        width: '40%',
        backgroundColor: 'gray',
        alignSelf: 'center'
    },
    txtBtmCnt: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 15
    },
    txtBtm : {
        alignSelf: 'center',
        color: '#1c1c1e',
        opacity: .8,
        fontWeight: 400,
        fontSize: 16,
        marginHorizontal: 10,
        fontFamily: 'Delm SemiLight'
    },
    appleBtnTxt: {
        color: 'white',
        fontSize: 17,
        fontWeight: 500,
        marginHorizontal: 10,
        alignSelf: 'center',
        fontFamily: 'FONTSPRINGDEMO-neueSingularVLightRegular'
    },
    appleBtnCnt: {
        height: 45,
        backgroundColor: 'black',
        marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'center',
        borderWidth: 1,
    },
    appleBtnCnt11: {
        height: 45,
        backgroundColor: 'black',
        marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'center',
        borderWidth: 1,
        width: SCREEN_WIDTH/2.4
    },
    joinLogoSmallText: {
        marginTop: 30,
        // fontFamily: 'DIN Next LT Arabic Regular',
    },
    joinLogoHead:{
        fontSize: 28,
        fontWeight: '600',
        fontFamily: 'Arial',
    },
    joinLogoCnt : {
    marginHorizontal: 30,
    width: SCREEN_WIDTH / 1.2
    },
    logoCnt : {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height:120,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    logoIt : {
        alignSelf: 'center'
    },
    logoTxt : {
        fontSize : 46,
        alignSelf: 'center',
        fontWeight: '600',
        fontFamily: 'DINPro-CondensedBoldItalic',
        bottom: 20
    },
    backImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 1.2
    },
    bottomCnt: {
        marginVertical: 0, 
        marginHorizontal: 10, 
        backgroundColor: 'transparent',
        flexDirection: 'column'
    },
    bottomBtnCnt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        padding: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        height: 50
    },
    bottomBtnTxt: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 1
    },
    bottomTxtCnt: {
        margin: 20,
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '78%',
        marginLeft: 25
     },
    bottomTxt: {
        fontSize: 10,
        fontWeight: '700',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        letterSpacing: 2,
    },
    header: {
        height: 45,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconCnt: {
        marginStart: 22,
        justifyContent: 'center'
    },
})

export const AppleButton = ({onPress, isPrimary, txt, color}) => {
    return (
        <TouchableOpacity style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : 'black', borderColor: isPrimary ? 'black' : color}]} onPress={onPress}>
            <Text style={[styles.appleBtnTxt, {color : isPrimary ? 'black' : color}]}>
                {txt}lj
            </Text>
        </TouchableOpacity>
    )
}

export const AppleButton11 = ({onPress, isPrimary, isPrimary2, txt, txt2, color}) => {
    return (
        <View>

            <TouchableOpacity style={[styles.appleBtnCnt11, {backgroundColor: isPrimary ? color : 'black', borderColor: isPrimary ? 'black' : color}]} onPress={onPress}>
                <Text style={[styles.appleBtnTxt, {color : isPrimary ? 'black' : color}]}>
                    {txt}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.appleBtnCnt11, {backgroundColor: isPrimary ? color : 'black', borderColor: isPrimary ? 'black' : color}]} onPress={onPress}>
                <Text style={[styles.appleBtnTxt, {color : isPrimary2 ? 'black' : color}]}>
                    {txt2}
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}