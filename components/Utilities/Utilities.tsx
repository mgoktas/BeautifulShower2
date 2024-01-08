import { Picker } from "@react-native-picker/picker"
import { Dimensions, Image, StyleSheet, Text, View, View as V, TextInput, Switch, TouchableOpacity as TO, TouchableHighlight, ScrollView, ImageBackground, FlatList } from "react-native"
import { GestureDetector, GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler"
import Icon from 'react-native-vector-icons/FontAwesome'
import IconI from 'react-native-vector-icons/Ionicons'
import IconA from 'react-native-vector-icons/AntDesign'
import IconF from 'react-native-vector-icons/FontAwesome'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/Entypo'
import IconMa from 'react-native-vector-icons/MaterialIcons'
import CountryFlag from "react-native-country-flag"
import DatePicker from "react-native-date-picker"
import { FlashList } from "@shopify/flash-list"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { verticalScale } from "./Metrics"
import Animated from "react-native-reanimated"
import { isEnabled } from "react-native/Libraries/Performance/Systrace"
import { goToProfile } from "../Functions/Functions"

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')

export const AppLogo = ({txt, space}) => {
    return (
        <View style={[styles.logoCnt, {marginTop: space, position: 'absolute', top: 50}]}>
            <Image style={styles.logoIt} source={require('../images/logotransparent.png')}/>
            <Text style={styles.logoTxt}>{txt}</Text>
        </View>
    )
}

export const Space = ({space}) => (
    <View style={{height: space}}>

    </View>
)

export const BottomTab = ({onPress1, onPress2, type, txt1, txt2, style}) => (
    type == 2 ? 
    <GestureHandlerRootView style={style}>
        <View style={[styles.bottomCnt, {marginHorizontal: 0}]}>
            <TouchableOpacity onPress={onPress1} activeOpacity={.7} style={[styles.bottomBtnCnt, {marginHorizontal: 0}]}>
                <Text style={styles.bottomBtnTxt}>{txt1}</Text>
                <Icon size={15} name={'long-arrow-right'} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} activeOpacity={.7} style={[styles.bottomTxtCnt, {justifyContent: 'center', borderBottomWidth: 0}]}>
                <Text style={[styles.bottomTxt, {alignSelf: 'center', fontSize: 13, letterSpacing:0, fontWeight: '800', bottom: 10}]}>
                {txt2}
                </Text>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>   
    :
    <GestureHandlerRootView>
        <View style={styles.bottomCnt}>
            <TouchableOpacity onPress={onPress1} activeOpacity={.7} style={styles.bottomBtnCnt}>
                <Text style={styles.bottomBtnTxt}>START YOUR SHOWER</Text>
                <Icon size={15} name={'long-arrow-right'} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} activeOpacity={.7} style={[styles.bottomTxtCnt, {bottom: 20}]}>
                <Text style={styles.bottomTxt}>
                ALREADY  HAVE  AN  ACCOUNT ?  LOG  IN
                </Text>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>
)

export const Header = ({onPress, isBlank, isSheetOn, type, onPressSave}) => {
 
    return (
        type == 'goalset' ? 
        <GestureHandlerRootView>
    <View style={[styles.header, {backgroundColor: isSheetOn ? 'gray' : 'white', justifyContent: 'space-around'}]}>
        <TouchableOpacity onPress={onPress} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex', marginStart: 0, left: -10}]}>
            <Text style={styles.headerTextLeft}>
                Cancel
            </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTextMiddle]}>
            SET MY GOAL
        </Text>
        <TouchableOpacity onPress={onPressSave} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex', marginStart: 0, left: 10}]}>
        <Text style={styles.headerTextRight}>
                Save
            </Text>
        </TouchableOpacity>
    </View>
</GestureHandlerRootView> 
        :
    type == 2 ? <GestureHandlerRootView>
    <View style={[styles.header, {backgroundColor: isSheetOn ? 'gray' : 'white', justifyContent: 'space-around'}]}>
        <TouchableOpacity onPress={onPress} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex', marginStart: 0, left: -10}]}>
            <Text style={styles.headerTextLeft}>
                Cancel
            </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTextMiddle]}>
            ADD GOAL
        </Text>
        <TouchableOpacity onPress={onPress} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex', marginStart: 0, left: 10}]}>
        <Text style={styles.headerTextRight}>
                Save
            </Text>
        </TouchableOpacity>
    </View>
</GestureHandlerRootView> :

        type == 'signup' ? 
        <GestureHandlerRootView>
        <View style={[styles.header, {backgroundColor: isSheetOn ? 'gray' : 'transparent',borderBottomColor: 'gray',
borderBottomWidth: 0,}]}>
            <TouchableOpacity onPress={onPress} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex'}]}>
                <IconI name={'arrow-back'} size={32}/>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>
        :

    <GestureHandlerRootView>
        <View style={[styles.header, {backgroundColor: isSheetOn ? 'gray' : 'transparent'}]}>
            <TouchableOpacity onPress={onPress} activeOpacity={.7} style={[styles.headerIconCnt, {display: isBlank ? 'none' : 'flex'}]}>
                <IconI name={'arrow-back'} size={32}/>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>

)}


export const JoinLogo = ({txt1, txt2, type}) => (
    <View style={[styles.joinLogoCnt, {marginTop: type == 2 ? 40 : 100}]}>
        <Text style={styles.joinLogoHead}>
            {txt1}
        </Text>
        <Text style={styles.joinLogoSmallText}>
        {txt2}
        </Text>
    </View>
)

export const AppleButtonWithHighlight = ({onPress, isApple, title}) => {
    return (
        <GestureHandlerRootView>
            <TouchableHighlight onPress={onPress} style={[styles.appleBtnCnt]} underlayColor={'#201F1C'}>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Icon style={{display : isApple ? 'flex' : 'none'}} name={'apple'} color={'white'} size={20}/>  
                <Text style={styles.appleBtnTxt}>{isApple ? 'Sign in with Apple' : title}</Text>
            </View>
            </TouchableHighlight>
        </GestureHandlerRootView>
    )
}

export const CustomButton = ({isReady, onPress, txt, type, isClicked, space}) => {
    
    return (

        type == 6 ?
        
        <GestureHandlerRootView>
            <View style={[styles.bottomCnt, {backgroundColor: 'white'}]}>
                <TO onPress={onPress} activeOpacity={.7} style={[styles.bottomBtnCnt,{ borderWidth: 1, borderColor: 'black', height: 30, padding: 5, backgroundColor: 'black', borderRadius: 5}]}>
                    <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>{txt}</Text>
                </TO>
            </View>
        </GestureHandlerRootView>
        :
        
        type == 5 ? 
        
        <GestureHandlerRootView>
            <View style={[styles.bottomCnt]}>
                <TO activeOpacity={.8} onPress={onPress} style={[styles.bottomBtnCnt, {backgroundColor: '#AB2727'}]}>
                    <Text style={styles.customBtnTxt}>{txt}</Text>
                    <IconI size={15} name={'arrow-forward-sharp'} color={'white'}/>
                </TO>
                <View style={styles.buttonArrowBack}>

                </View>
            </View>
        </GestureHandlerRootView>
        :
        type == 4 ? 
        <GestureHandlerRootView>
            <View style={[styles.bottomCnt, {display: isClicked ? 'flex' : 'none'}]}>
                <TO onPress={onPress} activeOpacity={.7} style={[styles.bottomBtnCnt, {height: 30, padding: 6, width: 100, left: -5, flexDirection: 'row', alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth:1, borderColor: 'black'}]}>
                    <Text style={[styles.customBtnTxt, {fontSize: 10, fontWeight: '500', color: 'black'}]}>{txt}</Text>
                    <Icon style={{bottom: 0}} size={15} name={'long-arrow-right'} color={'black'}/>
                </TO>
            </View>
        </GestureHandlerRootView>
        :

        type == 3 ?
        
        <GestureHandlerRootView>
            <View style={[styles.bottomCnt]}>
                <TO onPress={onPress} activeOpacity={.7} style={[styles.bottomBtnCnt,{backgroundColor: 'white', borderWidth: 1, borderColor: 'black'}]}>
                    <Text style={[styles.customBtnTxt, {color: 'black'}]}>{txt}</Text>
                    <Icon size={25} name={'long-arrow-right'} color={'black'}/>
                </TO>
                <View style={styles.buttonArrowBack}>

</View>
            </View>
        </GestureHandlerRootView>
        :
    
        type == 2 ?
        
    <GestureHandlerRootView>
    <View style={[styles.bottomCnt, {display: isClicked ? 'flex' : 'none'}]}>
        <TO onPress={onPress} activeOpacity={.7} style={[styles.bottomBtnCnt, {height: 30, padding: 10, width: 130, left: -5, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}]}>
            <Text style={[styles.customBtnTxt, {fontSize: 10, fontWeight: '500'}]}>{txt}</Text>
            <Icon style={{bottom: 2}} size={15} name={'long-arrow-right'} color={'white'}/>
        </TO>
        <View style={styles.buttonArrowBack}>

</View>
    </View>
    </GestureHandlerRootView>
        :


    <GestureHandlerRootView>
        <View style={[styles.bottomCnt, {opacity : isReady ? 1 : .5}]}>
            <TO onPress={onPress} activeOpacity={isReady ? .7 : 1} style={styles.bottomBtnCnt}>
                <Text style={styles.customBtnTxt}>{txt}</Text>
                <Icon size={15} name={'long-arrow-right'} color={'white'}/>
            </TO>
        </View>
    </GestureHandlerRootView>
)}

export const BottomText = () => (
    <View style={styles.txtBtmCnt}>
        <View style={styles.lines}></View>
        <Text style={styles.txtBtm}>
            OR
        </Text>
        <View style={styles.lines}></View>
    </View>
)

export const SignWith = ({isEnabled, txt, txt2, icon2, onPress, type, onValueChange, value}) => (
    type == 'activity' ? 
    <GestureHandlerRootView >
    <View style={[styles.signWithCnt, {marginTop: txt == 'Facebook' ?  0 : 0}]} >
        <View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

            <IconMa size={32} color={txt == 'Cold Shower' ? 'black' : 'black'} name={txt == 'Cold Shower' ? 'severe-cold' : 'whatshot'} />            

            <Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
                {txt}
            </Text>

            
        </View>
            <View style={{position: 'absolute', right: 30,}}>
                
                <View style={styles.smallSwitchItCnt}>
                <Switch
                trackColor={{false: '#f2f2f6', true: 'black'}}
                thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="gray"
                value={isEnabled}
                onValueChange={onValueChange}
                />                
                </View>

            </View>
    </View>
</GestureHandlerRootView>
    :
    type == 'feedcon' ? 
    <GestureHandlerRootView >
        <View style={[styles.signWithCnt, {marginTop: txt == 'Facebook' ?  0 : 0}]} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                <IconI size={25} name='people-outline' style={[styles.signWithIcon, { marginHorizontal:30}]}/>
                
                <View style={{flexDirection: 'column'}}>      
                    <Text style={[styles.signWithTxt, {top: 0, fontWeight: '600', fontSize: 14}]}>
                        {txt}
                    </Text>
                    <Text style={[styles.signWithTxt, {top: 0, fontSize: 14}]}>
                        {txt2}
                    </Text>
                </View>


                
            </View>
                <View style={{position: 'absolute', right: 40,}}>
                    
                    <View style={styles.smallSwitchItCnt}>
                    <Switch
                    trackColor={{false: '#f2f2f6', true: 'black'}}
                    thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#eeeef0"
                    value={value}
                    onValueChange={onValueChange}                    
                    />                
                    </View>

                </View>
        </View>
    </GestureHandlerRootView>
    :
    type == 'feed' ? 
    <GestureHandlerRootView >
        <View style={[styles.signWithCnt, {marginTop: txt == 'Facebook' ?  0 : 0}]} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                <Image style={[styles.signWithIcon, {backgroundColor: '#1877f2', marginHorizontal:30}]} source={require('../images/fb.png')}/>
                
                <View style={{flexDirection: 'column'}}>      
                    <Text style={[styles.signWithTxt, {top: 0, fontWeight: '600', fontSize: 14}]}>
                        {txt}
                    </Text>
                    <Text style={[styles.signWithTxt, {top: 0, fontSize: 14}]}>
                        {txt2}
                    </Text>
                </View>


                
            </View>
                <View style={{position: 'absolute', right: 40,}}>
                    
                    <View style={styles.smallSwitchItCnt}>
                    <Switch
                    trackColor={{false: '#f2f2f6', true: 'black'}}
                    thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#eeeef0"
                    value={value}
                    onValueChange={onValueChange}                    
                    />                
                    </View>

                </View>
        </View>
    </GestureHandlerRootView>
    :
    type == 2 ? 
    <GestureHandlerRootView >
        <View style={[styles.signWithCnt, {marginTop: txt == 'Facebook' ?  0 : 0}]} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                <Image style={[styles.signWithIcon, {backgroundColor: txt == 'Facebook' ? '#1877f2' : 'transparent'}]} source={txt == 'Facebook' ? require('../images/fb.png') : require('../images/g.png')}/>
                <Text style={[styles.signWithTxt, {top: 0}]}>
                    {txt}
                </Text>

                
            </View>
                <View style={{position: 'absolute', right: 53,}}>
                    
                    <View style={styles.smallSwitchItCnt}>
                    <Switch
                    trackColor={{false: '#f2f2f6', true: 'black'}}
                    thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="gray"
                    value={isEnabled}
                    onValueChange={onValueChange}
                    />                
                    </View>

                </View>
        </View>
    </GestureHandlerRootView>
    :
    <GestureHandlerRootView >
        <TouchableHighlight style={[styles.signWithCnt, {marginTop: txt == 'Facebook' ?  30 : 0}]} onPress={onPress} underlayColor={'#C5C1C0'} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={[styles.signWithIcon, {backgroundColor: txt == 'Facebook' ? '#1877f2' : 'transparent'}]} source={txt == 'Facebook' ? require('../images/fb.png') : require('../images/g.png')}/>
                <Text style={styles.signWithTxt}>
                    {txt}
                </Text>
            </View>
        </TouchableHighlight>
    </GestureHandlerRootView>
)

export const SignWithEmail = ({txt, onPress}) => (  
    // <View style={styles.signWithCnt}>
    //     <IconI style={styles.signWithIconI} size={22} name={'mail-outline'}/>
    //     <Text style={styles.signWithTxt}>
    //         {txt}
    //     </Text>
    // </View>
        <GestureHandlerRootView >
        <TouchableHighlight style={[styles.signWithCnt]} onPress={onPress} underlayColor={'#C5C1C0'} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconI style={styles.signWithIconI} size={22} name={'mail-outline'}/>
                <Text style={styles.signWithTxt}>
                    {txt}
                </Text>
            </View>
        </TouchableHighlight>
    </GestureHandlerRootView>
)

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

export const CustomSwitch = ({type, isActive1, isActive2, isActive3, onPress1, onPress2, onPress3}) => (
    <GestureHandlerRootView>
        <View style={styles.customSwitchCnt}>
            <TouchableOpacity onPress={onPress1} activeOpacity={1} style={[styles.customSwitch, {width: 50, height: 30, borderColor: isActive1 ? 'black' : 'gray'}]}>
                <Text style={[styles.customSwitchTxt, {color: isActive1 ? 'black' : 'gray'}]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} activeOpacity={1} style={[styles.customSwitch, {width: 70, height: 30, borderColor: isActive2 ? 'black' : 'gray'}]}>
                <Text style={[styles.customSwitchTxt, {color: isActive2 ? 'black' : 'gray'}]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress3} activeOpacity={1} style={[styles.customSwitch, {width: 120, height: 30, borderColor: isActive3 ? 'black' : 'gray'}]}>
                <Text style={[styles.customSwitchTxt, {color: isActive3 ? 'black' : 'gray'}]}>Prefer not to say</Text>
            </TouchableOpacity>
        </View>
    </GestureHandlerRootView>
)

export const HeightPicker = ({heightInFeet, onValueChangeLeftH, onValueChangeRightH, isW, selectedIndex, weight, onWeightChangeLeft, onWeightChangeRight, feet1, feet2, unit, isWSelected, onUnitChange, height, value, values, values2, values3, values4, values5, values6, onValueChange, type, onPress, isHeightSelected, values10, values11, values12}) => {
    
    return ( 
    
        unit == 1 && isW ?     <View style={{flexDirection: 'row'}}>
            <View style={[styles.locationSwitchItemCnt, {alignSelf: 'flex-end'}]}>
                <TextButton onPress={onPress} txt={'00'} type={undefined}/>
            </View>
        <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                style={{width: '30%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 60}}
                selectedValue={heightInFeet.split(' ')[0] + "'"}
                onValueChange={onValueChangeLeftH}>
            {
                values3.map((item, index) =>
                    <Picker.Item key={index} label={String(item)} value={item} />
                    )
                }
        </Picker>
        <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                style={{width: '30%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 25}}
                selectedValue={heightInFeet.split(' ')[1] + '"'}
                onValueChange={onValueChangeRightH}>
            {
                values4.map((item, index) =>
                    <Picker.Item key={index} label={String(item)} value={item} />
                    )
                }
        </Picker>
        <Picker itemStyle={{width: '50%', backgroundColor: 'transparent',}} 
                style={{width: '50%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                selectedValue={1}
                onValueChange={onUnitChange}>
            {
                values2.map((item, index) =>
                    <Picker.Item key={index} label={item} value={index} />
                    )
                }
        </Picker>
        </View> :
    
        isWSelected ?  
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
            <Space space={10}/>
        <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
                <TextButton onPress={onPress} txt={'111'} type={undefined}/>
        </View>
        <Space space={10}/>
        <Line space={0}/>
    
        <View style={{flexDirection: 'row'}}>
    
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '100%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 120}}
                    selectedValue={weight[0]}
                    onValueChange={onWeightChangeLeft}>
                {
                    values5.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker>
            <Text style={{alignSelf: 'center', left: 88, top: 22, fontSize: 16}}>
                ,
            </Text>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '25%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 50}}
                    selectedValue={weight[1]}
                    onValueChange={onWeightChangeRight}>
                {
                    values6.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={index} />
                        )
                    }
            </Picker>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '25%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, right: 20}}
                    selectedValue={value}
                    onValueChange={onValueChange}>
                {
                    ['kg', 'lb'].map((item, index) =>
                        <Picker.Item key={index} label={item} value={index} />
                        )
                    }
            </Picker>
            
        </View>
    
        </View>
        :
        isHeightSelected ?
        <View style={[ {flexDirection: 'column', marginTop: 5}, styles.shadow]}>
        <Space space={10}/>
    <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
        <TextButton onPress={onPress} txt={'22'} type={undefined}/>
    </View>
    <Space space={10}/>
    <Line space={0}/>
    <View style={{flexDirection: 'row'}}>
        <View style={[styles.locationSwitchItemCnt, {alignSelf: 'center', left: 45, top:77}]}>
    
        </View>
    <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
            style={{width: '50%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 60}}
            selectedValue={height}
            onValueChange={onWeightChangeLeft}>
        {
            values.map((item, index) =>
                <Picker.Item key={index} label={String(item)} value={item} />
                )
            }
    </Picker>
    <Picker itemStyle={{width: '50%', backgroundColor: 'transparent',}} 
            style={{width: '50%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', height: 120, backgroundColor: 'transparent', marginTop: 40}}
            selectedValue={unit}
            onValueChange={onWeightChangeRight}>
        {
            values2.map((item, index) =>
                <Picker.Item key={index} label={item} value={index} />
                )
            }
    </Picker>
    </View>
        </View>
        :
        type == 8 ? 
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
        <Space space={10}/>
    <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
            <TextButton type={2} onPress={onPress} txt={'CANCEL'}/>
            <TextButton type={2} onPress={onPress} txt={'DONE'}/>
    </View>
    <Space space={10}/>
    <Line space={0}/>
    
    <View style={{flexDirection: 'row'}}>
    
    </View>
    
        </View> 
       : 
        type == 7 ? 
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
        <Space space={10}/>
    <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
            <TextButton type={2} onPress={onPress} txt={'CANCEL'}/>
            <TextButton type={2} onPress={onPress} txt={'DONE'}/>
    </View>
    <Space space={10}/>
    <Line space={0}/>
    
    <View style={{flexDirection: 'row'}}>
    
        <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                style={{width: '50%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 100}}
                selectedValue={value}
                onValueChange={onValueChange}>
            {
                values12.map((item, index) =>
                    <Picker.Item key={index} label={item} value={index} />
                    )
                }
        </Picker>
    
    </View>
    
            </View> 
       : 
        type == 6 ? 
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
        <Space space={10}/>
    <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
            <TextButton type={2} onPress={onPress} txt={'CANCEL'}/>
            <TextButton type={2} onPress={onPress} txt={'DONE'}/>
    </View>
    <Space space={10}/>
    <Line space={0}/>
    
    <View style={{flexDirection: 'row'}}>
    
        <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                style={{width: '65%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 100}}
                selectedValue={value}
                onValueChange={onValueChange}>
            {
                values11.map((item, index) =>
                    <Picker.Item key={index} label={String(item)} value={index} />
                    )
                }
        </Picker>
        <Text style={{alignSelf: 'center', left: -15, top: 20, fontSize: 16}}>
                times
        </Text>
    </View>
    
        </View>    
       : type == 5 ? 
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
        <Space space={10}/>
    <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
            <TextButton type={2} onPress={onPress} txt={'CANCEL'}/>
            <TextButton type={2} onPress={onPress} txt={'DONE'}/>
    </View>
    <Space space={10}/>
    <Line space={0}/>
    
    <View style={{flexDirection: 'row'}}>
    
        <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                style={{width: '45%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 100}}
                selectedValue={value}
                onValueChange={onValueChange}>
            {
                values10.map((item, index) =>
                    <Picker.Item key={index} label={String(item)} value={index} />
                    )
                }
        </Picker>
        <Text style={{alignSelf: 'center', left: 35, top: 20, fontSize: 20}}>
                min
        </Text>
    </View>
    
        </View>
        :
        <View style={[ {flexDirection: 'column', marginTop: 5}, styles.shadow]}>
                <Space space={10}/>
            <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
                <TextButton onPress={onPress} txt={'DONE'} type={undefined}/>
            </View>
            <Space space={10}/>
            <Line space={0}/>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.locationSwitchItemCnt, {alignSelf: 'center', left: 45, top:77}]}>
    
                </View>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '50%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 60}}
                    selectedValue={height}
                    onValueChange={onValueChange}>
                {
                    values.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker>
            <Picker itemStyle={{width: '50%', backgroundColor: 'transparent',}} 
                    style={{width: '50%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                    selectedValue={unit}
                    onValueChange={onUnitChange}>
                {
                    values2.map((item, index) =>
                        <Picker.Item key={index} label={item} value={index} />
                        )
                    }
            </Picker>
            </View>
        </View>
        
    )}

export const WeightPicker = ({weight, 
    onWeightChangeLeft, onWeightChangeRight, 
    unit, isWSelected, 
    onUnitChange, onValueChange, type, onPress, 
    valuesKgLeft, 
    valuesKgRight,
    valuesLbLeft, 
    valuesLbRight,
    typeOfWeight,
    isClicked,
    oVCWLeft,
    oVCWRight,
    sdWghtLeft,
    sdWghtRight,
    sdWgTp,
    heightSd,
    oVC,
    valuesHt
}) => {

    return ( 
        type == 'height' ?
        <View style={{flexDirection: 'row'}}>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',  fontSize: 25}} 
                    style={{width: '100%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 0, display: isClicked ? 'flex' : 'none'}}
                    selectedValue={heightSd}
                    onValueChange={oVC}
                    >
                {
                    valuesHt.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker>
            <Text style={{position: 'absolute', top: 90, left: SCREEN_WIDTH/2 + 80, fontSize: 20, display: isClicked ? 'flex' : 'none'}}>
                {sdWgTp}
            </Text>
        </View> 
        :        
        unit == 0 ?
        <View style={{flexDirection: 'row'}}>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',  fontSize: 25}} 
                    style={{width: '100%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 0, display: isClicked ? 'flex' : 'none'}}
                    selectedValue={sdWghtLeft}
                    onValueChange={oVCWLeft}
                    >
                {
                    valuesKgLeft.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker>
            <Text style={{position: 'absolute', top: 72, left: SCREEN_WIDTH/2 + 20, fontSize: 40, display: isClicked ? 'flex' : 'none'}}>
                .
            </Text>
            <Text style={{position: 'absolute', top: 90, left: SCREEN_WIDTH/2 + 80, fontSize: 20, display: isClicked ? 'flex' : 'none'}}>
                {sdWgTp}
            </Text>
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent', fontSize: 25}} 
                    style={{width: '20%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 25, display: isClicked ? 'flex' : 'none', zIndex: 100, opacity: 100, position: 'absolute', left: SCREEN_WIDTH / 1.85}}
                    selectedValue={sdWghtRight}
                    onValueChange={oVCWRight}
                    >
                {
                    valuesKgRight.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker>
        {/* <Picker itemStyle={{width: '50%', backgroundColor: 'transparent',}} 
                style={{width: '50%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                selectedValue={sdWgTp}
                onValueChange={onUnitChange}>
            {
                typeOfWeight.map((item, index) =>
                    <Picker.Item key={index} label={item} value={index} />
                    )
                }
        </Picker> */}
        </View> 
        :
        <View style={[ {flexDirection: 'column', marginTop: 5}]}>
            <Space space={10}/>
        <View style={[{justifyContent: 'flex-end', flexDirection: 'row'}]}>
                <TextButton onPress={onPress} txt={'DONE'} type={undefined}/>
        </View>
        <Space space={10}/>
        <Line space={0}/>
    
        <View style={{flexDirection: 'row'}}>
    
            {/* <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '25%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 120}}
                    selectedValue={weight[0]}
                    onValueChange={onWeightChangeLeft}>
                {
                    values5.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={item} />
                        )
                    }
            </Picker> */}
            <Text style={{alignSelf: 'center', left: 88, top: 22, fontSize: 16, display: isClicked ? 'flex' : 'none'}}>
                ,
            </Text>
            {/* <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '25%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, left: 50}}
                    selectedValue={weight[1]}
                    onValueChange={onWeightChangeRight}>
                {
                    values6.map((item, index) =>
                        <Picker.Item key={index} label={String(item)} value={index} />
                        )
                    }
            </Picker> */}
            <Picker itemStyle={{width: '100%', backgroundColor: 'transparent',}} 
                    style={{width: '25%', flexDirection: 'column', borderRadius: 10, justifyContent: 'center', alignSelf: 'flex-end', height: 120, backgroundColor: 'transparent', marginTop: 40, right: 20}}
                    // selectedValue={value}
                    onValueChange={onValueChange}>
                {
                    ['kg', 'lb'].map((item, index) =>
                        <Picker.Item key={index} label={item} value={index} />
                        )
                    }
            </Picker>
            
        </View>
    
        </View>
    )}

export const LocationSwitch = ({txt1, txt2, onPress, 
    isClicked, value, onValueChange, values, 
    type, open, date, 
    onDateChange, 
    onCancel,
    sdWghtLeft,
    sdWghtRight,
    oVCWLeft,
    oVCWRight,
    sdWgTp,
    heightSd,
    oVC
}) => {

    const range = (start, end, step) => {
        return Array.from(Array.from(Array(Math.ceil((end-start)/step)).keys()), x => start+ x*step);
      }
      
      let out = Array.from(range(10,221,1))

    const Range = (start, end) => {
        return Array.from(range(start, end, 1))
    }


    return (
        type == 'date' ?
        <GestureHandlerRootView>
            <View style={{
        display: isClicked ? 'flex' : 'none',
        position: 'relative',
        height: 45,
        backgroundColor: '#f2f2f6',
        alignSelf: 'center',
        borderRadius: 10
    }}>

            </View>
            <View style={styles.locationSwitchCnt}>
                <View style={styles.locationSwitchTextsCnt}>
                    <Text style={styles.locationSwitchText1}>{txt1}</Text>
                    <TO onPress={onPress} activeOpacity={1}>
                        <Text style={styles.locationSwitchText2}>{txt2}</Text>
                    </TO>
                </View>
                <Line space={0}/>
            </View>
            <View>

<DatePicker
 style={{width: SCREEN_WIDTH, display: open ? 'flex' : 'none'}}
        mode="date"
        date={date}
        onDateChange={onDateChange}
      />

            </View> 

        </GestureHandlerRootView> 
        
        :
        type == 'location' ?
        <GestureHandlerRootView>
        <View style={styles.locationSwitchCnt}>
            <View style={styles.locationSwitchTextsCnt}>
                <TO onPress={onPress} activeOpacity={1}>
                    <Text style={styles.locationSwitchText2}>{txt2}</Text>
                </TO>
            </View>
            <Line space={0}/>
        </View>
        {/* <DatePicker 
        style={{width: SCREEN_WIDTH, borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
        mode="date"
        date={date}
        onDateChange={onDateChange}
        /> */}
    </GestureHandlerRootView> 
        :
       
        type == 'weight' || 'height' ? 
        <GestureHandlerRootView>
            
            {/* <DatePicker 
            style={{width: SCREEN_WIDTH, borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
            mode="date"
            date={date}
            onDateChange={onDateChange}
            /> */}
                            <Picker 
                itemStyle={{width: '80%', backgroundColor: 'transparent'}}
                style={{width: '90%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 0}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                    {
                        
                        values.map((item, index) =>
                            <Picker.Item key={index} label={item.name} value={item.iso2} />
                            )
                        
                        }
                </Picker>
        </GestureHandlerRootView>
        :
        type == 'editProfile' ? 
        <GestureHandlerRootView>
            <View style={[styles.locationSwitchItemCnt, {display: isClicked ? 'flex' : 'none'}]}>

            </View>
            <View style={styles.locationSwitchCnt}>
                <View style={styles.locationSwitchTextsCnt}>
                    <Text style={styles.locationSwitchText1}>{txt1}</Text>
                    <TO onPress={onPress} activeOpacity={1}>
                        <Text style={styles.locationSwitchText2}>{txt2}</Text>
                    </TO>
                </View>
                <Line space={0}/>
            </View>

                <Picker 
                itemStyle={{width: '100%', backgroundColor: 'transparent',}}
                style={{width: '100%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                    {
                        
                        values.map((item, index) =>
                            <Picker.Item key={index} label={item.name} value={item.iso2} />
                            )
                        
                        }
                </Picker>

        </GestureHandlerRootView>
        :
        type == 3 ?
        <GestureHandlerRootView>
            <View style={{
        display: isClicked ? 'flex' : 'none',
        position: 'relative',
        height: 45,
        backgroundColor: '#f2f2f6',
        alignSelf: 'center',
        borderRadius: 10
    }}>

            </View>
            <View style={styles.locationSwitchCnt}>
                <View style={styles.locationSwitchTextsCnt}>
                    <Text style={styles.locationSwitchText1}>{txt1}</Text>
                    <TO onPress={onPress} activeOpacity={1}>
                        <Text style={styles.locationSwitchText2}>{txt2}</Text>
                    </TO>
                </View>
                <Line space={0}/>
            </View>
            <View>

{/* <DatePicker
 style={{width: SCREEN_WIDTH, display: open ? 'flex' : 'none'}}
        mode="date"
        date={new Date()}
        onDateChange={onDateChange}
      /> */}
                      <Picker 
                itemStyle={{width: '100%', backgroundColor: 'transparent',}}
                style={{width: '100%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                    {
                        
                        values.map((item, index) =>
                            <Picker.Item key={index} label={item.name} value={item.iso2} />
                            )
                        
                        }
                </Picker>
            </View> 

        </GestureHandlerRootView> 
        
        : 
        type = 2 ? 
        <GestureHandlerRootView>
            <View style={[styles.locationSwitchItemCnt, {display: isClicked ? 'flex' : 'none', top: 50, bottom: 'auto'}]}>

            </View>
            <View style={styles.locationSwitchCnt}>
                <View style={styles.locationSwitchTextsCnt}>
                    <Text style={styles.locationSwitchText1}>{txt1}</Text>
                    <TO onPress={onPress} activeOpacity={1}>
                        <Text style={styles.locationSwitchText2}>{txt2}</Text>
                    </TO>
                </View>
                <Line space={0}/>
            </View>
            <View>

            </View>

                <Picker 
                itemStyle={{width: '100%', backgroundColor: 'transparent',}}
                style={{width: '100%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                    {
                        
                        values.map((item, index) =>
                            <Picker.Item key={index} label={item.name} value={item.iso2} />
                            )
                        
                        }
                </Picker>

        </GestureHandlerRootView>

        :
        <GestureHandlerRootView>
            <View style={styles.locationSwitchCnt}>
                <View style={styles.locationSwitchTextsCnt}>
                    <TO onPress={onPress} activeOpacity={1}>
                        <Text style={styles.locationSwitchText2}>{txt2}</Text>
                    </TO>
                </View>
                <Line space={0}/>
            </View>
            <Picker 
                itemStyle={{width: '100%', backgroundColor: 'transparent',}}
                style={{width: '100%', borderRadius: 10, justifyContent: 'center', alignSelf: 'center', zIndex: isClicked ? 1 : 0, display: isClicked ? 'flex' : 'none', height: 120, backgroundColor: 'transparent', marginTop: 40}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                    {
                        
                        values.map((item, index) =>
                            <Picker.Item key={index} label={item.name} value={item.iso2} />
                            )
                        
                        }
                </Picker>
       
        </GestureHandlerRootView>
)

}

export const InfoText = ({type, txt1, txt2, onPress}) => {

return ( 
    type == 2 ?
    <GestureHandlerRootView>
        <View style={[styles.infoTextCnt, {height: 'auto'}]}>
            <Text style={styles.infoText}>
                {txt1}
                <TO onPress={onPress} style={styles.infoText2Cnt}>
                    <Text style={styles.infoTextLink}>
                Terms and Conditions 
                    </Text>
                </TO>
                {txt2} 
                <TO onPress={onPress} style={styles.infoText2Cnt}>
                    <Text style={styles.infoTextLink}>
                Privacy Policy.
                    </Text>
                </TO>        </Text>
        </View>
    </GestureHandlerRootView>
    :
    <GestureHandlerRootView>
        <View style={styles.infoTextCnt}>
            <Text style={styles.infoText}>
                By joining, you agree to the 
                <TO onPress={onPress} style={styles.infoText2Cnt}>
                    <Text style={styles.infoTextLink}>
                Terms and Conditions 
                    </Text>
                </TO>
                and conkfirm that you have read and understand the 
                <TO onPress={onPress} style={styles.infoText2Cnt}>
                    <Text style={styles.infoTextLink}>
                Privacy Policy.
                    </Text>
                </TO>       
                 </Text>
            <CustomButton isReady={true} onPress={onPress} txt={'JOIN'} type={undefined} isClicked={undefined} space={undefined}/>
        </View>
    </GestureHandlerRootView>
)}

export const SwitchBox = ({txt, isOn, onPress}) => (
    <TO onPress={onPress} activeOpacity={1} style={styles.switchBoxCnt}>
        <View style={styles.switchBoxItCnt}>
            <View style={styles.switchBoxIt}>
                <View style={[styles.switchBoxItIt, {borderColor: 'white', backgroundColor: isOn ? 'black' : 'white'}]}>

                </View>
            </View>
        </View>
        <View style={styles.switchBoxTextCnt}>
            <Text style={styles.switchBoxText}>{txt}
            </Text>
            <TouchableOpacity activeOpacity={1} style={styles.switchBoxText2Cnt}>
                        <Text style={styles.switchBoxTextLink}>
                    Privacy Policy.
                        </Text>
                    </TouchableOpacity> 
        </View>
    </TO>
)

export const TextButton = ({txt, onPress, type}) => {
    
    return ( 
        type == 3 ? 
        <GestureHandlerRootView>
            <TO onPress={onPress} activeOpacity={.8}>
                <Text style={[styles.textButton, {letterSpacing: 1, padding: 1}]}>{txt}</Text>
            </TO>
        </GestureHandlerRootView>
        :
        type == 2 ?
    <GestureHandlerRootView>
        <TO onPress={onPress} activeOpacity={.8}>
            <Text style={[styles.textButton, {marginHorizontal: 10,}]}>{txt}</Text>
        </TO>
    </GestureHandlerRootView>        
        :
    <GestureHandlerRootView>
        <TO onPress={onPress} activeOpacity={.8}>
            <Text style={styles.textButton}>{txt}</Text>
        </TO>
    </GestureHandlerRootView>
)}

export const WelcomeHeader = ({txt1, txt2}) => (
    <View style={styles.welcomeHeaderCnt}>
        <Text style={styles.welcomeHeaderTextSm}>{txt1}</Text>
        <Text style={styles.welcomeHeaderTextBg}>{txt2}</Text>
    </View>
)

export const Optionals = ({unit, toggleSwitchNotifications, isNotificationsEnabled, weight, height, txt1, txt2, isActive, onPressH, onPressW, isClicked, type, onPress, onPressG, onPressOpen, onPressContinue, isClickedOnce, isClickedDay1, isClickedDay2, isClickedDay3, isClickedDay4, isClickedDay5, isClickedDay6, isClickedDay7, onPressDay1, onPressDay2, onPressDay3, onPressDay4, onPressDay5, onPressDay6, onPressDay7}) => {

    return (
    type == 3 ? 
    <GestureHandlerRootView>
        <View style={styles.optionalsCnt}>
            <View style={[styles.optionalsTickCnt]}>
            <IconA name={isClickedOnce ? 'checkcircle' : 'checkcircleo'} size={18}/>
                <View style={[styles.optionalsTickLine, {height: isClicked ? 500 : 40}]}></View>
            </View>
            <View style={[styles.optionalsTextCnt,]}>
                <TO activeOpacity={1} onPress={onPressOpen}>
                    <Text style={styles.optionalsText1}>{txt1}</Text>
                </TO>
                <View style={{display: isClicked ? 'flex' : 'none'}}>
                    <Text style={[styles.optionalsText2, {display: isClicked ? 'flex' : 'none', color: 'gray'}]}>{txt2}</Text>
                    <View style={[styles.rulerCnt, {display: type == 2 ? 'none' : isClicked ? 'flex' : 'none'}]}>
                        <IconF name={'trophy'} size={18}/>
                        <TouchableOpacity onPress={onPressG} activeOpacity={1} style={[styles.customSwitch, {width: 90, height: 30, borderColor: isActive ? 'black' : 'gray'}]}>
                            <Text style={[styles.customSwitchTxt, {color: isActive ? 'black' : 'black'}]}>Add Goal  +</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton onPress={onPressContinue} isClicked={isClicked} txt={'CONTINUE'} type={4} isReady={undefined} space={undefined}/>
                </View>
            </View>
            
        </View>
    </GestureHandlerRootView>
    :
    
    type == 2 ? 
    <GestureHandlerRootView>
    <View style={styles.optionalsCnt}>
        <View style={styles.optionalsTickCnt}>
        <IconA name={isClickedOnce ? 'checkcircle' : 'checkcircleo'} size={18}/>
            <View style={[styles.optionalsTickLine, {height: isClicked ? 200 : 40}]}></View>
        </View>
        <View style={[styles.optionalsTextCnt,]}>
        <TO activeOpacity={1} onPress={onPressOpen}>
            <Text style={styles.optionalsText1}>{txt1}</Text>
        </TO>
            <View style={{display: isClicked ? 'flex' : 'none'}}>
                <Text style={[styles.optionalsText2, {display: isClicked ? 'flex' : 'none'}]}>{txt2}</Text>
                <SmallSwitch toggleSwitch={toggleSwitchNotifications} isEnabled={isNotificationsEnabled} txt1={'Notifications'} txt2={'To track your showers in time.'} type={undefined}/>
                {/* <Line space={0}/> */}
                <CustomButton onPress={onPressContinue} isClicked={isClicked} txt={'CONTINUE'} type={2} isReady={undefined} space={undefined}/>
            </View>
        </View>
        
    </View>
    </GestureHandlerRootView>
    :

    <GestureHandlerRootView>
        <View style={styles.optionalsCnt}>
            <View style={styles.optionalsTickCnt}>
            <IconA name={isClickedOnce ? 'checkcircle' : 'checkcircleo'} size={18}/>
                <View style={[styles.optionalsTickLine, {height: isClicked ? 500 : 40}]}></View>
            </View>
            <View style={[styles.optionalsTextCnt,]}>
            <TO activeOpacity={1} onPress={onPressOpen}>
                <Text style={styles.optionalsText1}>{txt1}</Text>
            </TO>
                <Text style={[styles.optionalsText2, {display: isClicked ? 'flex' : 'none'}]}>{txt2}</Text>
                <View style={{display: type == 2 ? 'none' : isClicked ? 'flex' : 'none'}}>
                <DayOptions onPress={onPressDay1} isClicked={isClickedDay1} txt={'Monday'}/>
                <DayOptions onPress={onPressDay2} isClicked={isClickedDay2} txt={'Tuesday'}/>
                <DayOptions onPress={onPressDay3} isClicked={isClickedDay3} txt={'Wednesday'}/>
                <DayOptions onPress={onPressDay4} isClicked={isClickedDay4} txt={'Thursday'}/>
                <DayOptions onPress={onPressDay5} isClicked={isClickedDay5} txt={'Friday'}/>
                <DayOptions onPress={onPressDay6} isClicked={isClickedDay6} txt={'Saturday'}/>
                <DayOptions onPress={onPressDay7} isClicked={isClickedDay7} txt={'Sunday'}/>
                </View>
                <View style={[styles.rulerCnt, {display: type == 2 ? 'none' : isClicked ? 'flex' : 'none'}]}>
                    <IconF5 name={'ruler'} size={18}/>
                    <TO onPress={onPressH} activeOpacity={1} style={[styles.customSwitch, {width: 70, height: 30, borderColor: isActive ? 'black' : 'gray'}]}>
                        <Text style={[styles.customSwitchTxt, {color: isActive ? 'black' : 'black'}]}>{unit == 1 ? height + ' ft' : height + ' cm'} </Text>
                    </TO>
                </View>
                <View style={[styles.rulerCnt, {display: type == 2 ? 'none' : isClicked ? 'flex' : 'none'}]}>
                    <IconM name={'scale-bathroom'} size={18}/>
                    <TouchableOpacity onPress={onPressW} activeOpacity={1} style={[styles.customSwitch, {width: 70, height: 30, borderColor: isActive ? 'black' : 'gray', left: 4}]}>
                        <Text style={[styles.customSwitchTxt, {color: isActive ? 'black' : 'black'}]}>{weight[0]},{weight[1]} kg</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton onPress={onPressContinue} isClicked={isClicked} txt={'CONTINUE'} type={2} isReady={undefined} space={undefined}/>
            </View>
            
        </View>
    </GestureHandlerRootView>
)}

export const SmallSwitch = ({toggleSwitch, isEnabled, txt1, txt2, type, onVlChng}) => {
    return (
        type == 'activity' ? 
        <View style={styles.smallSwitchCnt}>
        <View style={styles.smallSwitchTextsHead}>
            <Text style={styles.smallSwitchText1}>{txt1}</Text>
        </View>
        <View style={styles.smallSwitchItCnt}>
        <Switch
        trackColor={{false: '#f2f2f6', true: 'black'}}
        thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="gray"
        onValueChange={onVlChng}
        value={isEnabled}/>                
        </View>
</View>
        :
        type == 3 ? 
        <View style={styles.smallSwitchCnt}>
            <View style={styles.smallSwitchTextsHead}>
                <Text style={[styles.smallSwitchText1, {color: 'black', left: 10}]}>{txt1}</Text>
            </View>
            <View style={[styles.smallSwitchItCnt, { left: 40}]}>
            <Switch
            trackColor={{false: '#f2f2f6', true: 'black'}}
            thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="gray"
            onValueChange={toggleSwitch}
            value={isEnabled}/>                
            </View>
        </View>
:
        type == 2 ? 
        <View style={[styles.smallSwitchCnt]}>
            <View style={[styles.smallSwitchTextsHead, {left: 10}]}>
                <Text style={styles.smallSwitchText1}>{txt1}</Text>
                <Text style={styles.smallSwitchText2}>{txt2}</Text>
            </View>
            <View style={[styles.smallSwitchItCnt, {justifyContent: 'center', top: 5, left: 40}]}>
            <Switch
            trackColor={{false: '#f2f2f6', true: 'black'}}
            thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="gray"
            onValueChange={toggleSwitch}
            value={isEnabled}/>                
            </View>
        </View>
        :
        <View style={styles.smallSwitchCnt}>
                <View style={styles.smallSwitchTextsHead}>
                    <Text style={styles.smallSwitchText1}>{txt1}</Text>
                    <Text style={styles.smallSwitchText2}>{txt2}</Text>
                </View>
                <View style={styles.smallSwitchItCnt}>
                <Switch
                trackColor={{false: '#f2f2f6', true: 'black'}}
                thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="gray"
                onValueChange={toggleSwitch}
                value={isEnabled}/>                
                </View>
        </View>
    )
}


export const DayOptions = ({txt, isClicked, onPress}) => (
    <GestureHandlerRootView>
        <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.dayBoxCnt}>
            <View style={styles.dayBoxItCnt}>
                <View style={styles.dayBoxIt}>
                    <View style={[styles.dayBoxItIt, {backgroundColor: isClicked ? 'black' : 'white'}]}>
                    </View>
                </View>
            </View>
            <View style={styles.dayBoxTextCnt}>
                <Text style={styles.dayBoxText}>{txt}
                </Text>
            </View>
        </TouchableOpacity>
    </GestureHandlerRootView>
)

export const OneGoal = ({selectedIndex, isClickedFirst, isClickedSec, isClickedThi, isClickedFou, onPressThi, onPressFou, onPressFirst, onPressSec, txt, txt21, txt22, txt31, txt32, icon1, icon2, type}) => {
    return (
    type == 'goalset1' ? 
    <View style={styles.oneGoalCnt}>
    <Text style={styles.oneGoalHeader}>{txt}</Text>
    <View style={styles.oneGoalsCnt}>
        <TO activeOpacity={1} onPress={onPressFirst} style={[styles.oneGoalTsCnt, {borderColor: isClickedFirst ? 'black': 'gray'}]}>
            <IconI name={icon1} color={isClickedFirst ? 'black': 'gray'} size={18} />
            <Text style={[styles.oneGoalTx, {color: isClickedFirst ? 'black': 'gray'}]}>{txt21}</Text>
        </TO>
        <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: isClickedSec ? 'black': 'gray'}]}>
            <IconF5 name={icon2} color={isClickedSec ? 'black': 'gray'} size={18} />
            <Text style={[styles.oneGoalTx, {color: isClickedSec ? 'black': 'gray'}]}>{txt22}</Text>
        </TO>
    </View>
</View>
    :
    type == 'goalset2' ? 
    <View style={styles.oneGoalCnt}>
        <Text style={styles.oneGoalHeader}>{txt}</Text>
        <View style={styles.oneGoalsCnt}>
            <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: isClickedSec ? 'black': 'gray'}]}>
            <Text style={[styles.oneGoalTx, {color: isClickedSec ? 'black': 'gray'}]}>{txt22}</Text>
                <Text style={styles.oneGoalTx}></Text>
            </TO>
        </View>
    </View>
    :
    type == 'goalset3' ? 
<View style={styles.oneGoalCnt}>
        <Text style={styles.oneGoalHeader}>{txt}</Text>
        <View style={styles.oneGoalsCnt}>
            <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: selectedIndex == 2 ? 'black': 'gray'}]}>
                <Text style={[styles.oneGoalTx, {color: selectedIndex == 2 ? 'black': 'gray'}]}>{txt22}</Text>
                <Text style={styles.oneGoalTx}></Text>
            </TO>
        </View>
    </View>
    :
    type == 3  ? <View style={styles.oneGoalCnt}>
        <Text style={styles.oneGoalHeader}>{txt}</Text>
        <View style={styles.oneGoalsCnt}>
        <TO activeOpacity={1} onPress={onPressFirst} style={[styles.oneGoalTsCnt, {borderColor: selectedIndex == 1 ? 'black': 'gray'}]}>
            <Text style={[styles.oneGoalTx, {color: selectedIndex == 1 ? 'black': 'gray'}]}>{txt21}</Text>
            <Text style={styles.oneGoalTx}></Text>
        </TO>
            <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: selectedIndex == 2 ? 'black': 'gray'}]}>
                <Text style={[styles.oneGoalTx, {color: selectedIndex == 2 ? 'black': 'gray'}]}>{txt22}</Text>
                <Text style={styles.oneGoalTx}></Text>
            </TO>
        </View>
        <View style={styles.oneGoalsCnt}>
        <TO activeOpacity={1} onPress={onPressThi} style={[styles.oneGoalTsCnt, {borderColor: selectedIndex == 3 ? 'black': 'gray'}]}>
            <Text style={[styles.oneGoalTx, {color: selectedIndex == 3 ? 'black': 'gray'}]}>{txt31}</Text>
            <Text style={styles.oneGoalTx}></Text>
        </TO>
            <TO activeOpacity={1} onPress={onPressFou} style={[styles.oneGoalTsCnt, {borderColor: selectedIndex == 4 ? 'black': 'gray'}]}>
                <Text style={[styles.oneGoalTx, {color: selectedIndex == 4 ? 'black': 'gray'}]}>{txt32}</Text>
                <Text style={styles.oneGoalTx}></Text>
            </TO>
        </View>
    </View>
       : type == 2 ? 
    <View style={styles.oneGoalCnt}>
        <Text style={styles.oneGoalHeader}>{txt}</Text>
        <View style={styles.oneGoalsCnt}>
        <TO activeOpacity={1} onPress={onPressFirst} style={[styles.oneGoalTsCnt, {borderColor: isClickedFirst ? 'black': 'gray'}]}>
        <Text style={[styles.oneGoalTx, {color: isClickedFirst ? 'black': 'gray'}]}>{txt21}</Text>
                <Text style={styles.oneGoalTx}></Text>
        </TO>
            <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: isClickedSec ? 'black': 'gray'}]}>
            <Text style={[styles.oneGoalTx, {color: isClickedSec ? 'black': 'gray'}]}>{txt22}</Text>
                <Text style={styles.oneGoalTx}></Text>
            </TO>
        </View>
    </View>
        :
        <View style={styles.oneGoalCnt}>
            <Text style={styles.oneGoalHeader}>{txt}</Text>
            <View style={styles.oneGoalsCnt}>
                <TO activeOpacity={1} onPress={onPressFirst} style={[styles.oneGoalTsCnt, {borderColor: isClickedFirst ? 'black': 'gray'}]}>
                    <IconI name={icon1} color={isClickedFirst ? 'black': 'gray'} size={18} />
                    <Text style={[styles.oneGoalTx, {color: isClickedFirst ? 'black': 'gray'}]}>{txt21}</Text>
                </TO>
                <TO activeOpacity={1} onPress={onPressSec} style={[styles.oneGoalTsCnt, {borderColor: isClickedSec ? 'black': 'gray'}]}>
                    <IconF5 name={icon2} color={isClickedSec ? 'black': 'gray'} size={18} />
                    <Text style={[styles.oneGoalTx, {color: isClickedSec ? 'black': 'gray'}]}>{txt22}</Text>
                </TO>
            </View>
        </View>
    )
}

export const OneGoalInput = ({type, onPress, txt, onChangeText}) => {
    return (
        type == 0 ?
        <TO onPress={onPress} activeOpacity={.7} style={styles.oneGoalInput}>
            <Text style={styles.oneGoalInputText}>
                Frequency
            </Text>
            <IconE name={'chevron-thin-down'} size={20} />
        </TO>
        : 
        type == 1 ?
        <TO onPress={onPress} activeOpacity={.7} style={styles.oneGoalInput}>
            <Text style={styles.oneGoalInputText}>
                Duration
            </Text>
            <IconE name={'chevron-thin-down'} size={20} />
        </TO>
        : type == 2 ?
        <TO onPress={onPress} activeOpacity={.7} style={styles.oneGoalInput}>
            <Text style={styles.oneGoalInputText}>
                Time of the day
            </Text>
            <IconE name={'chevron-thin-down'} size={20} />
        </TO>
        :
        <View style={styles.oneGoalInput}>
            <TextInput
                            keyboardType="numeric"
                            onChangeText={onChangeText} placeholderTextColor={'gray'} placeholder={txt} style={[styles.oneGoalInputText, {color: 'black', height: 50}]}>
            </TextInput>
            <Text style={[styles.oneGoalInputText, {color: 'black'}]}>
                {/* Kcal */}
            </Text>
            {/* <IconE name={'chevron-thin-down'} size={20} /> */}
        </View>
    )
}

export const HeaderHome = ({onPressR, onPress, txt, title, type, onPressBack, onPress0, onPress1, onPress2, onPressShare, onPressTDots}) => {
 
    return (
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

export const ActivityDuration = ({txt1, txt2, txt3, txt4, hr, min, sec}) => (
    <View style={styles.activityDurationCnt}>
        <View style={styles.activityDurationCntRow0}>
            <Text style={styles.activityDurationCntRow2ColText1}>{String(hr).length == 1 ? `0${hr}` : hr}:{String(min).length == 1 ? `0${min}` : min}:{String(sec).length == 1 ? `0${sec}` : sec}</Text>
            <Text style={styles.activityDurationCntRow2ColText2}>Duration</Text>
        </View>
        <View style={styles.activityDurationCntRow2}>
            <View style={styles.activityDurationCntRow1}>
                <Text style={styles.activityDurationCntRow2Col2Text1}>{txt2}</Text>
                <Text style={styles.activityDurationCntRow2ColText2}>Times</Text>
            </View>
            <View style={styles.activityDurationCntRow1}>
                <Text style={styles.activityDurationCntRow2Col2Text1}>{txt3}</Text>
                <Text style={styles.activityDurationCntRow2ColText2}>Calories (cal)</Text>
            </View>
            <View style={styles.activityDurationCntRow1}>
                <Text style={styles.activityDurationCntRow2Col2Text1}>{txt4}</Text>
                <Text style={styles.activityDurationCntRow2ColText2}>Avg. Min Per Bath</Text>
            </View>
        </View>
    </View>
)

 
// export const StartButtonActivity = ({txt1, txt2, txt3, txt4, txt5, onPress, onPress2, onPress3, hasStarted, changeActive}) => {
    
//   const [visibleItems, setVisibleItems] = useState([]);

//     const viewabilityConfig = useRef({
//         itemVisiblePercentThreshold: 90,
//     }).current;
    
//     const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        
//         console.log(viewableItems)
       
//         setVisibleItems(viewableItems.map(({ item, index }) => {
//             if(index == 1){
//                 changeActive()
//             }
//         }));

//     }, []);
    
    
//     const configref = useRef(viewabilityConfig)
//     const itemschangedref = useRef(onViewableItemsChanged)
      
//       const renderItem = ({ item, index }) => {

        
//           return (

//             index == 1
//             ? 
//             <View style={{width: SCREEN_WIDTH, flexDirection: 'row',}}>
//                 <TO onPress={onPress2} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '40%', backgroundColor: 'red', justifyContent: 'center'},]}>
//                     <View style={styles.startButtonActivityButtonCol1}>
//                         <Text style={styles.startButtonActivityButtonText1}>{txt4}</Text>
//                     </View>
//                 </TO>
//                 <TO onPress={onPress3} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '40%', backgroundColor: 'green', justifyContent: 'center'}]}>
//                     <View style={styles.startButtonActivityButtonCol1}>
//                         <Text style={styles.startButtonActivityButtonText1}>{txt5}</Text>
//                     </View>
//                 </TO>
//             </View>
//                 :
//             <View style={{width: SCREEN_WIDTH, flexDirection: 'row',}}>
//                 <TO onPress={onPress} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '90%', justifyContent: 'center'}]}>
//                     <View style={styles.startButtonActivityButtonCol1}>
//                         <Text style={styles.startButtonActivityButtonText1}>{txt3}</Text>
//                     </View>
//                     <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
//                 </TO>
//             </View>
            
//           )
//       }
    
    
//       const Toggle = () => {  

//   ref?.current?.scrollToIndex({ index: 1, animated: true })

// }

// useEffect(() => {
//     Toggle()
// },[])

//     return (

    
//         hasStarted ? 
//         <View style={[styles.startButtonActivityCnt,{height: hasStarted ? 55 : 60, top: 30, backgroundColor: 'white', marginVertical: 15}]}>
  

//             <FlatList 
//         viewabilityConfig={configref.current}
//         onViewableItemsChanged={itemschangedref.current}        
//             inverted keyExtractor={(item,index)=> index.toString()} estimatedItemSize={2} ref={ref}  pagingEnabled={true} data={[0,1]} renderItem={renderItem} horizontal={true} keyExtractor={(item) => item} extraData={'data'} showsHorizontalScrollIndicator={false}>
//             </FlatList>
//     </View> 
      
//         :

//     <View style={[styles.startButtonActivityCnt,{height: hasStarted ? 55 : 60}]}>
  
//         <View style={[styles.startButtonActivityMusicIconCnt, {display: hasStarted ? 'none' : 'flex'}]}>
//             <IconI style={styles.startButtonActivityIcon} name={'musical-notes-outline'} size={32}/>
//         </View>

//         <TO onPress={onPress} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: hasStarted ? '85%' : '50%'}]}>
//             <View style={styles.startButtonActivityButtonCol1}>
//                 <Text style={styles.startButtonActivityButtonText1}>{hasStarted ? txt3 : txt1}</Text>
//                 <Text style={[styles.startButtonActivityButtonText2,{display: hasStarted ? 'none' : 'flex'}]}>{txt2}</Text>
//             </View>
//             <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
//         </TO>

//         <View style={[styles.startButtonActivitySettingsButton,{display: hasStarted ? 'none' : 'flex'}]}>
//             <IconI style={styles.startButtonActivityIcon} name={'settings-outline'} size={28}/>
//         </View>
    
//     </View> 

//     )}

    export type OfferSheetRefProps = {
      };
      
      interface ChildProps {
        txt1,
        txt2, 
        txt3, 
        txt4, 
        txt5, 
        onPress, 
        onPress2, 
        onPress3, 
        hasStarted, 
        changeActive,
        ref,
        onPressRight,
        onPressLeft,
        onPressMusic
      }
      

      export const StartButtonActivity = React.forwardRef<
      OfferSheetRefProps,
      ChildProps
    >((props: ChildProps, ref) => {
    
        const [visibleItems, setVisibleItems] = useState([]);

        const viewabilityConfig = useRef({
            itemVisiblePercentThreshold: 90,
        }).current;
        
        const onViewableItemsChanged = useCallback(({ viewableItems }) => {
            
            console.log(viewableItems)
           
            setVisibleItems(viewableItems.map(({ item, index }) => {
                if(index == 1){
                    props.changeActive()
                }
            }));
    
        }, []);
        
        
        const configref = useRef(viewabilityConfig)
        const itemschangedref = useRef(onViewableItemsChanged)
          
          const renderItem = ({ item, index }) => {
    
            
              return (
    
                index == 1
                ? 
                <View style={{width: SCREEN_WIDTH, flexDirection: 'row',}}>
                    <TO onPress={props.onPress2} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '40%', backgroundColor: 'red', justifyContent: 'center'},]}>
                        <View style={styles.startButtonActivityButtonCol1}>
                            <Text style={styles.startButtonActivityButtonText1}>{props.txt4}</Text>
                        </View>
                    </TO>
                    <TO onPress={props.onPress3} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '40%', backgroundColor: 'green', justifyContent: 'center'}]}>
                        <View style={styles.startButtonActivityButtonCol1}>
                            <Text style={styles.startButtonActivityButtonText1}>{props.txt5}</Text>
                        </View>
                    </TO>
                </View>
                    :
                <View style={{width: SCREEN_WIDTH, flexDirection: 'row',}}>
                    <TO onPress={props.onPress} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: '90%', justifyContent: 'center'}]}>
                        <View style={styles.startButtonActivityButtonCol1}>
                            <Text style={styles.startButtonActivityButtonText1}>{props.txt3}</Text>
                        </View>
                        <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
                    </TO>
                </View>
                
              )
          }
        
        

    
        return (
    
        
            props.hasStarted ? 
            <View style={[styles.startButtonActivityCnt,{height: props.hasStarted ? 55 : 60, top: 30, backgroundColor: 'white', marginVertical: 15}]}>
      
    
                <FlatList 
            viewabilityConfig={configref.current}
            onViewableItemsChanged={itemschangedref.current}        
                inverted keyExtractor={(item,index)=> index.toString()} estimatedItemSize={2} ref={ref}  pagingEnabled={true} data={[0,1]} renderItem={renderItem} horizontal={true} keyExtractor={(item) => item} extraData={'data'} showsHorizontalScrollIndicator={false}>
                </FlatList>
        </View> 
          
            :
    
        <View style={[styles.startButtonActivityCnt,{height: props.hasStarted ? 55 : 60}]}>
      
            <View style={[styles.startButtonActivityMusicIconCnt, {display: props.hasStarted ? 'none' : 'flex'}]}>
                <IconI style={styles.startButtonActivityIcon} name={'musical-notes-outline'} size={32}/>
            </View>
    
            <TO onPress={props.onPress} activeOpacity={.8} style={[styles.startButtonActivityButtonCnt, {width: props.hasStarted ? '85%' : '50%'}]}>
                <View style={styles.startButtonActivityButtonCol1}>
                    <Text style={styles.startButtonActivityButtonText1}>{props.hasStarted ? props.txt3 : props.txt1}</Text>
                    <Text style={[styles.startButtonActivityButtonText2,{display: props.hasStarted ? 'none' : 'flex'}]}>{props.txt2}</Text>
                </View>
                <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
            </TO>
    
            <TO activeOpacity={.9} onPress={props.onPressRight} style={[styles.startButtonActivitySettingsButton,{display: props.hasStarted ? 'none' : 'flex'}]}>
                <IconI style={styles.startButtonActivityIcon} name={'settings-outline'} size={28}/>
            </TO>
        
        </View> 
    
        )}
      );

export const ProfilePerson = ({type, onPress, imageSource}) => (
    type == 'up' ? 
    <V style={styles.profilePersonBackCnt}>
        <V style={{width: '100%', height: SCREEN_HEIGHT/5, justifyContent: 'center'}}>
        <IconM style={styles.profilePersonIcon} name={'pencil-outline'} size={30} />
        </V>
    </V>
    :

    type == 2 && imageSource ?

    <TO onPress={onPress} activeOpacity={.8} style={styles.profilePersonBackCnt}>
        <ImageBackground style={{width: '100%', height: SCREEN_HEIGHT/5, justifyContent: 'center'}} source={{uri :imageSource}}>
        <IconM style={[styles.profilePersonIcon, {opacity: 100, zIndex: 100}]} color={'white'} name={'pencil-outline'} size={30} />
        </ImageBackground>
    </TO>
     :
     type == 2 ?

    <View style={styles.profilePersonBackCnt}>
        <IconM style={styles.profilePersonIcon} name={'camera'} size={30} />
    </View>    

    :
    <V style={styles.profilePersonBackCnt}>
        <ImageBackground style={{width: '100%', height: SCREEN_HEIGHT/5, justifyContent: 'center'}} source={{uri :imageSource}}>
        <IconM style={styles.profilePersonIcon} name={'pencil-outline'} size={30} />
        </ImageBackground>
    </V>
)

export const ProfilePersonIt = ({isFollowing, isSecary, txt1, txt2, txt3, txt4, txt5, txt6, type, onPressAvatar, imageSource, onPressProfile, onPressFollow, onPressChat}) => (
    type == 'userp' ?
    <View style={styles.profilePersonItCnt}>
    <View style={styles.profilePersonColCnt}>
        <TO activeOpacity={.8} onPress={onPressAvatar} style={styles.profilePersonImageCnt}>
            <ImageBackground style={{width: 140, height: 140, borderRadius: 40, justifyContent: 'center'}} borderRadius={80} source={{uri :imageSource}}>
            <IconI name={'person-outline'}  style={[styles.profilePersonImage, {display: imageSource !== undefined ? 'none' : 'flex'}]} color={'#a5a5a5'} size={80} />
            </ImageBackground>
        </TO>
        <Text style={styles.profilePersonName}>{txt1}</Text>
        <View style={styles.profilePersonCountryCnt}>
            <CountryFlag isoCode={txt2} size={12} />
            <Text style={styles.profilePersonItCountryText}>{txt3}</Text>
        </View>
        <Text style={styles.profilePersonItBioText}>
            {txt4}
        </Text>
        <View style={styles.profilePersonItInfoCnt}>
            <Text style={styles.profilePersonInfoText}>{txt5} FOLLOWERS</Text>
            <View style={styles.profilePersonInfoVLine}></View>
            <Text style={styles.profilePersonInfoText}>{txt6} FOLLOWING</Text>
        </View>
        <TO activeOpacity={.8} onPress={onPressFollow} style={styles.profilePersonButtonCnt}>
            <Text style={[styles.profilePersonButtonText, {textAlign: 'center'}]}>{isFollowing ? 'Following' : 'Follow' }</Text>
        </TO>
        <TO activeOpacity={.8} onPress={onPressChat} style={[styles.profilePersonButtonCnt, {display: true ? 'flex' : 'none'}]}>
            <Text style={[styles.profilePersonButtonText, {textAlign: 'center'}]}>{'Start Chat' }</Text>
        </TO>
    </View>
</View>
:
    type == 'up' ? 
    <View style={styles.profilePersonItCnt}>
    <View style={styles.profilePersonColCnt}>
        <TO activeOpacity={.8} onPress={onPressAvatar} style={styles.profilePersonImageCnt}>
            <V style={{width: 140, height: 140, borderRadius: 40, justifyContent: 'center'}} borderRadius={80}>
            <IconI name={'person-outline'}  style={[styles.profilePersonImage, {display: 'flex'}]} color={'#a5a5a5'} size={80} />
            </V>
        </TO>
        <Text style={styles.profilePersonName}>{txt1}</Text>
        <View style={styles.profilePersonCountryCnt}>
            {/* <CountryFlag isoCode={txt2} size={12} /> */}
            <Text style={styles.profilePersonItCountryText}>{txt3}</Text>
        </View>
        <Text style={styles.profilePersonItBioText}>
            {txt4}
        </Text>
        <View style={styles.profilePersonItInfoCnt}>
            <Text style={styles.profilePersonInfoText}>{txt5} FOLLOWERS</Text>
            <View style={styles.profilePersonInfoVLine}></View>
            <Text style={styles.profilePersonInfoText}>{txt6} FOLLOWING</Text>
        </View>
        <TO activeOpacity={.8} onPress={onPressProfile} style={styles.profilePersonButtonCnt}>
            <Text style={styles.profilePersonButtonText}>VIEW FULL PROFILE</Text>
            <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
        </TO>
    </View>
</View>
    :
    type == 2 && imageSource ?
    <ImageBackground source={imageSource} style={[styles.profilePersonImageCnt2, {backgroundColor: '#a5a5a5'}]}>
        <IconI name={'person-outline'}  style={styles.profilePersonImage} size={60} />
    </ImageBackground>
    : 
    type == 2 ?
    <TO activeOpacity={.8} style={[styles.profilePersonImageCnt2, {backgroundColor: '#a5a5a5'}]}>
        <IconI name={'person-outline'}  style={styles.profilePersonImage} size={60} />
    </TO>
    :
    isSecary ? 
    <View style={[styles.profilePersonItCnt, {backgroundColor: 'white'}]}>
    <View style={styles.profilePersonColCnt}>
        <TO activeOpacity={.8} onPress={onPressAvatar} style={styles.profilePersonImageCnt}>
            <ImageBackground style={{width: 140, height: 140, borderRadius: 40, justifyContent: 'center'}} borderRadius={80} source={{uri :imageSource}}>
            <IconI name={'person-outline'}  style={[styles.profilePersonImage, {display: imageSource !== undefined ? 'none' : 'flex'}]} color={'#a5a5a5'} size={80} />
            </ImageBackground>
        </TO>
        <Text style={styles.profilePersonName}>{txt1}</Text>
        <View style={styles.profilePersonCountryCnt}>
            {/* <CountryFlag isoCode={txt2} size={12} /> */}
            <Text style={styles.profilePersonItCountryText}>{txt3}</Text>
        </View>
        <Text style={styles.profilePersonItBioText}>
            {txt4}
        </Text>
        <View style={styles.profilePersonItInfoCnt}>
            <Text style={styles.profilePersonInfoText}>{txt5} FOLLOWERS</Text>
            <View style={styles.profilePersonInfoVLine}></View>
            <Text style={styles.profilePersonInfoText}>{txt6} FOLLOWING</Text>
        </View>
        <TO activeOpacity={.8} onPress={onPressProfile} style={[styles.profilePersonButtonCnt, {backgroundColor: 'white', borderWidth: 1, width: SCREEN_WIDTH/2.3, marginVertical: 14, height: 32}]}>
            <Text style={[styles.profilePersonButtonText, {color: 'black', fontSize: 12, width: 'auto'}]}>EDIT PROFILE</Text>
            <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={16} color={'black'}/>
        </TO>
    </View>
</View>
    :
    <View style={styles.profilePersonItCnt}>
        <View style={styles.profilePersonColCnt}>
            <TO activeOpacity={.8} onPress={onPressAvatar} style={styles.profilePersonImageCnt}>
                <ImageBackground style={{width: 140, height: 140, borderRadius: 40, justifyContent: 'center'}} borderRadius={80} source={{uri :imageSource}}>
                <IconI name={'person-outline'}  style={[styles.profilePersonImage, {display: imageSource !== undefined ? 'none' : 'flex'}]} color={'#a5a5a5'} size={80} />
                </ImageBackground>
            </TO>
            <Text style={styles.profilePersonName}>{txt1}</Text>
            <View style={styles.profilePersonCountryCnt}>
                <CountryFlag isoCode={txt2} size={12} />
                <Text style={styles.profilePersonItCountryText}>{txt3}</Text>
            </View>
            <Text style={styles.profilePersonItBioText}>
                {txt4}
            </Text>
            <View style={styles.profilePersonItInfoCnt}>
                <Text style={styles.profilePersonInfoText}>{txt5} FOLLOWERS</Text>
                <View style={styles.profilePersonInfoVLine}></View>
                <Text style={styles.profilePersonInfoText}>{txt6} FOLLOWING</Text>
            </View>
            <TO activeOpacity={.8} onPress={onPressProfile} style={styles.profilePersonButtonCnt}>
                <Text style={styles.profilePersonButtonText}>VIEW FULL PROFILE</Text>
                <Icon style={styles.startButtonActivityButtonIcon} name={'long-arrow-right'} size={20} color={'white'}/>
            </TO>
        </View>
    </View>
)

export const ProfileBox = ({txt1, txt2}) => (
    <View style={styles.profileBoxCnt}>
        <Text style={styles.headerHomeTitle}> 
            PREMIUM
        </Text>
        <View style={styles.profileBoxRow2}>
            <View style={styles.profileBoxIconPremium}>
                <IconI size={16} name={'star'} color={'white'} />
            </View>            
            <View style={styles.profileBoxCol2TextsCnt}>
                <Text style={styles.profileBoxCol2Text1}>{txt1}</Text>
                <Text style={styles.profileBoxCol2Text2}>{txt2}</Text>
            </View>
            <IconF style={styles.profileBoxIconRight}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
        </View>
    </View>
)

export const SettingsBox = ({title, isFirst, isLast, icon, icon2, type, onPress, name, lastName}) => (
    type == 5 ?
    <View>
    <View style={{display: isFirst ? 'flex' : 'none'}}>
        <Line space={undefined} />
    </View>
    <TouchableHighlight underlayColor={'#DFDFDF'} onPress={onPress}  style={styles.settingsBoxCnt}>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.settingsBoxIconCnt, { justifyContent: 'center', alignItems: 'center'}]}>
                <SmallLogo />    
            </View>
            <Text style={[styles.settingsBoxText, {right: 17}]}>{title}</Text>
            <IconF style={[styles.settingsBoxIconRight, {right: 35}]}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
        </View>
    </TouchableHighlight>
    {/* <View style={{display: isLast ? 'flex' : 'none'}}> */}
        <Line type={2} />
    {/* </View>     */}
</View>
:
    type == 4 ? 
    <View>
        <View style={{display: isFirst ? 'flex' : 'none'}}>
            <Line space={undefined} />
        </View>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={onPress}  style={styles.settingsBoxCnt}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.settingsBoxIconCnt}>
                    <IconM color={'#111010'} name={icon} size={30}/>
                    <IconM color={'#111010'} style={[styles.settingsBoxIconPen, {display: icon2 ? 'flex' : 'none', bottom: 10, opacity: 2}]} name={'pencil-outline'} size={20} />
                </View>
                <Text style={styles.settingsBoxText}>{title}</Text>
                <IconF style={styles.settingsBoxIconRight}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
            </View>
        </TouchableHighlight>
        {/* <View style={{display: isLast ? 'flex' : 'none'}}> */}
        {/* </View>     */}
    </View>
    
    :
    type == 3 ?
    <View>
        <View style={{display: isFirst ? 'flex' : 'none'}}>
            <Line space={undefined} />
        </View>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={onPress}  style={styles.settingsBoxCnt}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.settingsBoxIconCnt}>
                <IconMa color={'#111010'} name={icon} size={30}/>
                <IconM color={'#111010'} style={[styles.settingsBoxIconPen, {display: icon2 ? 'flex' : 'none'}]} name={'pencil-outline'} size={20} />
            </View>
            <Text style={styles.settingsBoxText}>{title}</Text>
            <IconF style={styles.settingsBoxIconRight}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
            </View>
        </TouchableHighlight>
        {/* <View style={{display: isLast ? 'flex' : 'none'}}> */}
        {/* </View>     */}
    </View>
    :
    type == 2 ?
    <View>
        <View style={{display: isFirst ? 'flex' : 'none'}}>
        </View>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={onPress}  style={styles.settingsBoxCnt}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.settingsBoxIconCnt}>
                <IconM color={'#111010'} name={icon} size={30}/>
                <IconM color={'#111010'} style={[styles.settingsBoxIconPen, {display: icon2 ? 'flex' : 'none'}]} name={'pencil-outline'} size={20} />
            </View>
            <Text style={styles.settingsBoxText}>{title}</Text>
            <IconF style={styles.settingsBoxIconRight}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
            </View>
        </TouchableHighlight>
        {/* <View style={{display: isLast ? 'flex' : 'none'}}> */}
        {/* </View>     */}
    </View>
    :
    
    <View>
        <View style={{display: isFirst ? 'flex' : 'none'}}>
        </View>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={onPress}  style={[styles.settingsBoxCnt, {justifyContent: 'center'}]}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.settingsBoxIconCnt}>
                    <IconI color={'#111010'} name={icon} size={30}/>
                    <IconM color={'#111010'} style={[styles.settingsBoxIconPen, {display: icon2 ? 'flex' : 'none'}]} name={'pencil-outline'} size={20} />
                </View>
                <Text style={styles.settingsBoxText}>{title}</Text>
                <IconF style={styles.settingsBoxIconRight}  name={'angle-right'} size={35} color={'#1c1c1e'}/>
            </View>
        </TouchableHighlight>
        {/* <View style={{display: isLast ? 'flex' : 'none'}}> */}
        {/* </View>     */}
    </View>
)

export const ProfileEdit = ({typee, name, lastname, countries, isActive1, isActive2, isActive3, isClickedBirthdate, isClickedLocation, isClickedWeight, isClickedHeight, onPressCon, country, birthdate, email, countryIso, weight, height, onPress1, onPress2, onPress3, onPressBd, onPressWg, onPressHt, onChangeName, onChangeLastname, onChangeBio, onChangeCountry, onChangeBirthdate, onChangeWeight, onChangeHeight, onDateChange, open, date, onCancel}) => (
   typee == 2 ? 
   <V>
   <ScrollView>
       <V style={styles.profileEditCnt}>
           <V style={{justifyContent: 'center'}}>
               <ProfilePersonIt type={2} txt1={undefined} txt2={undefined} txt3={undefined} txt4={undefined} txt5={undefined} txt6={undefined} onPressAvatar={undefined} />
           </V>
           <V>
               <CustomInput onChangeText={onChangeName} type={'editprofilefn'} txt={'First Name'} name={name} email={undefined} isName={undefined} txt1={undefined} />
               <CustomInput onChangeText={onChangeLastname} type={'editprofileln'} txt={'Last Name'} name={lastname} email={undefined} isName={undefined} txt1={undefined} />
           </V>
       </V>
       <CustomInput onChangeText={onChangeLastname} type={'bio'} txt={'Bio'} name={lastname} email={undefined} isName={undefined} txt1={undefined} />
       <CustomSwitch onPress1={onPress1} onPress2={onPress2} onPress3={onPress3} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>
       <Line space={0}/>
       <Space space={20}/>
       {/* <CustomInput type={4} txt={'Email'} email={email} name={undefined} onChangeText={undefined} isName={undefined} txt1={undefined} /> */}
   </ScrollView>
</V>
   :
   <V>
        <ScrollView>
            <V style={styles.profileEditCnt}>
                <V style={{justifyContent: 'center'}}>
                    <ProfilePersonIt type={2} txt1={undefined} txt2={undefined} txt3={undefined} txt4={undefined} txt5={undefined} txt6={undefined} onPressAvatar={undefined} />
                </V>
                <V>
                    <CustomInput onChangeText={onChangeName} type={21} txt={'First Name'} name={name} email={undefined} isName={undefined} txt1={undefined} />
                    <CustomInput onChangeText={onChangeLastname} type={2} txt={'Last Name'} name={lastname} email={undefined} isName={undefined} txt1={undefined} />
                </V>
            </V>
            <CustomInput onChangeText={onChangeBio} type={3} name={''} txt={'Bio'} email={undefined} isName={undefined} txt1={undefined}/>
            <CustomSwitch onPress1={onPress1} onPress2={onPress2} onPress3={onPress3} isActive1={isActive1} isActive2={isActive2} isActive3={isActive3} type={1}/>
            <Line space={0}/>
            <Space space={20}/>
            <CustomInput type={4} txt={'Email'} email={email} name={undefined} onChangeText={undefined} isName={undefined} txt1={undefined} />
            <Space space={40}/>
            {/* <LocationSwitch onValueChange={onChangeCountry} value={countryIso} values={countries} onPress={onPressCon} isClicked={isClickedLocation} txt1={'LOCATION'} txt2={country}/> */}
            <Space space={40}/>
            {/* <LocationSwitch open={open} date={date} onCancel={onCancel} onDateChange={onDateChange} onValueChange={onChangeBirthdate} type={3}  onPress={onPressBd} isClicked={true}  txt1={'BIRTHDATE'} txt2={birthdate}/> */}
            <Space space={80}/>
            {/* <LocationSwitch onValueChange={onChangeWeight} type={2}  onPress={onPressWg} isClicked={isClickedWeight}  txt1={'WEIGHT'} txt2={weight}/> */}
            {/* <Space space={40}/>
            <LocationSwitch onValueChange={onChangeHeight} type={2}  onPress={onPressHt} isClicked={isClickedHeight}  txt1={'HEIGHT'} txt2={height}/> */}
            <Space space={40}/>
            <Space space={40}/>
        </ScrollView>
    </V>
)

export const Discover = ({isSheetOn, info, name, duration, data, title, subtitle, text11, text12, text21, text22, onPressRight, onPressLeft, type, text1, text2, text3, onPress}) => {
    

    const DateItemListList = ({item}) => {
      return (
        <View style={{width: Dimensions.get("screen").width}}>
          <FlashList showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={true} renderItem={item =>renderItem(item)} estimatedItemSize={10} data={data} extraData={data.length}>
          </FlashList>
        </View>
      )
    }
    
    const renderItem = ({ item, index }) => {
        return (
            <View style={{width: SCREEN_WIDTH}}>
                <ImageBackground source={require('../images/cold.jpg')} style={[styles.discoverRowBox, {width: SCREEN_WIDTH / 1.2, height: 200, backgroundColor: 'transparent', flexDirection: 'row'}]}>
                    <View style={styles.discoverChallengesRowCnt}>
                        <View style={styles.discoverChallengeRowCnt}>
                            <Text style={styles.discoverChallengeRowText1}>{item.title}</Text>
                        </View>
                        <View style={styles.discoverChallengeRowCnt}>
                            <Text style={styles.discoverChallengeRowText2}>{item.duration}</Text>
                        </View>
                        <View style={styles.discoverChallengeRowCnt}>
                            <Text style={styles.discoverChallengeRowText3}>{item.count}</Text>
                        </View>
                    </View>
                </ImageBackground>  
            </View>
        )
    }

    const renderItems = ({ item, index }) => {

          return (
            <DateItemListList item={item} />
          )
        
    }

    const DateItemListListBlog = ({item}) => {
        return (
          <View style={{width: Dimensions.get("screen").width}}>
            <FlashList showsHorizontalScrollIndicator={false} pagingEnabled={false} horizontal={true} renderItem={item =>renderItemBlog(item)} estimatedItemSize={10} data={data} extraData={data.length}>
            </FlashList>
          </View>
        )
    }
  
    const renderItemBlog = ({ item, index }) => {
        return (
            <View style={{width: SCREEN_WIDTH / 1.4, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1}}>
                <ImageBackground resizeMethod='scale' source={require('../images/cold.jpg')} style={[styles.discoverRowBox, {width: SCREEN_WIDTH / 1.4, backgroundColor: 'transparent', flexDirection: 'row', height: '90%'}]}>
                    <View style={[styles.discoverBlogRowCnt, {padding: 20}]}>
                            <Text style={styles.discoverBlogRowText1}>{item.category}</Text>
                            <Text style={styles.discoverBlogRowText2}>{item.title}</Text>
                            <Text style={styles.discoverBlogRowText3}>{item.duration}</Text>
                    </View>
                </ImageBackground>  
            </View>
        )
    }

    const renderItemsBlog = ({ item, index }) => {
  
            return (
              <DateItemListListBlog item={item} />
            )
          
    }

    const flatlistRef = useRef()
    const flatlistRefBlog = useRef()

    return (
        type == 6 ?
        <View style={styles.discoverCnt}>
            <View style={styles.discoverTopRow}>
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>
                <Text style={styles.discoverSubtitle}>
                        {subtitle}
                </Text>
            </View>
        <View style={[styles.discoverRow2, {opacity: isSheetOn ? .6 : 1}]}>
            <View style={{width: SCREEN_WIDTH, justifyContent: 'center'}}>
                    <ImageBackground source={require('../images/cold.jpg')} style={[styles.discoverRowBox, {width: SCREEN_WIDTH / 1.2, height: 200, backgroundColor: 'transparent', flexDirection: 'row', left: SCREEN_WIDTH/32}]}>
                        <View style={styles.discoverChallengesRowCnt}>
                            <View style={styles.discoverChallengeRowCnt}>
                                <Text style={styles.discoverChallengeRowText1}>{data[0].title}</Text>
                            </View>
                            <View style={styles.discoverChallengeRowCnt}>
                                <Text style={styles.discoverChallengeRowText2}>{data[0].duration}</Text>
                            </View>
                            <View style={styles.discoverChallengeRowCnt}>
                                <Text style={styles.discoverChallengeRowText3}>{data[0].count}</Text>
                            </View>
                        </View>
                    </ImageBackground>  
            </View>
        </View>
        </View> 
        :
        type == 5 ?
        <View style={[styles.discoverCnt, {width: '80%', height: SCREEN_WIDTH}]}>
            <View style={styles.discoverTopRow}>
                
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>

            </View>
        <View style={styles.discoverRow2}>

              <FlashList estimatedItemSize={5} ref={flatlistRefBlog}  pagingEnabled={false} data={['1']} renderItem={renderItemsBlog} horizontal={true} keyExtractor={(item) => item} extraData={data} showsHorizontalScrollIndicator={false}>
              </FlashList>

        </View>
        </View> 
        :
        type == 4 ?
        <View style={[styles.discoverCnt]}>
            <View style={styles.discoverTopRow}>
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>
            </View>
            <TO onPress={onPress} activeOpacity={.8} style={styles.discoverLeaderRow}>
                <IconMa  name={'people-outline'} color={'#1c1c1e'} size={25} />
                <View style={[styles.discoverLeaderCol, {right: 20}]}>
                    <Text style={styles.discoverLeaderName}>{name}</Text>
                    <Text style={styles.discoverLeaderText}>{info}</Text>
                </View>
                <IconI name={'chevron-forward'} color={'gray'} size={30} />
            </TO>
        </View> 
        :
        type == 3 ?
        <View style={[styles.discoverCnt]}>
            <View style={styles.discoverTopRow}>
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>
            </View>
            <View style={styles.discoverLeaderRow}>
                <IconMa  name={'leaderboard'} color={'gray'} size={25} />
                <View style={styles.discoverLeaderCol}>
                    <Text style={styles.discoverLeaderName}>{name}</Text>
                    <Text style={styles.discoverLeaderText}>{info}</Text>
                </View>
                <Text style={styles.discoverLeaderDistance}>{duration}</Text>
                <IconI name={'chevron-forward'} color={'gray'} size={30} />
            </View>
        </View> 
        :
        type == 2 ?
        <TO activeOpacity={1} onPress={onPress} style={styles.discoverCnt}>
            <View style={styles.discoverTopRow}>
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>
                <Text style={styles.discoverSubtitle}>
                        {subtitle}
                </Text>
            </View>
        <View style={styles.discoverRow2}>

              <FlashList estimatedItemSize={5} ref={flatlistRef}  pagingEnabled={true} data={['2']} renderItem={renderItems} horizontal={true} keyExtractor={(item) => item} extraData={data} showsHorizontalScrollIndicator={false}>
              </FlashList>

        </View>
        </TO> 
        :
        <View style={styles.discoverCnt}>
            <View style={styles.discoverTopRow}>
                <Text style={styles.discoverTitle}>
                        {title}
                </Text>
                <Text style={styles.discoverSubtitle}>
                        {subtitle}
                </Text>
            </View>
            <View style={styles.discoverRow2}>
            <View style={[styles.discoverRowBox, styles.discoverRowBox1]}>
                    <Image style={[styles.discoverIcon ,{width: 40, height: 40, bottom: 5}]} source={require('../images/fb.png')}>

                    </Image>
                    <Text style={styles.discoverRowHead}>{text11}</Text>
                    <Text style={styles.discoverRowSubhead}>{text12}</Text>
                    <TO activeOpacity={.7} onPress={onPressLeft} style={styles.discoverRowBoxBox}>
                        <Text style={styles.discoverRowBoxBtnText}>{text3}</Text>
                    </TO>
            </View>                
            <View style={styles.discoverRowBox}>
                <IconMa style={styles.discoverIcon} name={'people-outline'} size={35}/>
                <Text style={styles.discoverRowHead}>{text21}</Text>
                <Text style={styles.discoverRowSubhead}>{text22}</Text>
                <TO activeOpacity={.7} onPress={onPressRight} style={styles.discoverRowBoxBox}>
                    <Text style={styles.discoverRowBoxBtnText}>{text3}</Text>
                </TO>
            </View>
            </View>
        </View>
    )
}

export const ProgressCnt = ({txt1, txt2, txt3, txt4, txt5, txt6, txt7}) => {
    return (
        <View style={styles.progressCnt}>
            <View style={styles.progressBarCnt}>
                <View style={styles.progressTextsCnt}>
                    <Text style={styles.progressText1}>{txt1}</Text>
                    <Text style={styles.progressText2}>{txt2}</Text>
                    <Text style={styles.progressText3}>{txt3}</Text>
                </View>
            </View>
            {/* <View></View> */}
            <View style={styles.progressRow}>

            <View style={{width: '50%', flexDirection: 'row', marginVertical: 20}}>
                <IconI color={'#545353'} name={'timer-outline'} size={30} style={styles.progressRow1}/>
                <View style={styles.progressCol}>
                    <Text style={styles.progressColText1}>{txt4}</Text>
                    <Text style={styles.progressColText2}>{txt5}</Text>
                </View>
            </View>
            
            <View style={{width: '50%', flexDirection: 'row', marginVertical: 20}}>
                <IconM color={'#545353'} name={'timer-sand'} size={30} style={styles.progressRow1}/>
                <View style={styles.progressCol}>
                    <Text style={styles.progressColText1}>{txt6}</Text>
                    <Text style={styles.progressColText2}>{txt7}</Text>
                </View>
            </View>

            </View>
            <Line space={undefined} />
        </View>
    )
}

export const AccountPageContent = ({txt1, txt2, txt3, txt4, txt5, txt6, link, linkATxt}) => {
    return (
        <View style={styles.accountPageContentCnt}>
            <Text style={styles.accountPageHead}>{txt1}</Text>
            <Text style={styles.accountPageDesc}>{txt2} 
            {'\n'} 
            <Text style={styles.linkTxt}>
                {link} 
            </Text>

            {linkATxt}</Text>
            <Text style={styles.accountPageListItem}>{`\u2022 ${txt3}`}</Text>
            <Text style={styles.accountPageListItem}>{`\u2022 ${txt4}`}</Text>
            <Text style={styles.accountPageListItem}>{`\u2022 ${txt5}`}</Text>
        </View>
    )
}

export const PrivacyText = ({title, txt, toggleSwitch, isEnabled, type, icon1, icon2, icon3, isSelected, option1, option2, option3, selectedIndex, onPress0, onPress1, onPress2}) => {
    return (
        type == 2 ?
        <View style={styles.privacyCnt}>
            <View style={styles.privacyRow1}>
                <Text style={styles.privacyRowText1}>{title}</Text>
            </View>
            <Text style={styles.privacyRow2Text}>{txt}</Text>
            <View style={styles.privacyOptionsCnt}>
                <TO onPress={onPress0} activeOpacity={1} style={[styles.privacyOptionsRow, {borderColor: selectedIndex == 0 ? 'black' : 'gray'}]}>
                    <View style={styles.privacyOptionsLeftSide}>
                        <IconI color={'#131314'} name={icon1} size={25} />
                        <Text style={styles.privacyOptionsTextLeft}>{option1}</Text>
                    </View>
                    <IconA color={'#131314'} size={25} name={selectedIndex == 0 ? 'checkcircle' : 'checkcircleo'} style={styles.privacyOptionsIconRight} />
                </TO>
                <TO onPress={onPress1} activeOpacity={1} style={[styles.privacyOptionsRow, {borderColor: selectedIndex == 1 ? 'black' : 'gray'}]}>
                    <View style={styles.privacyOptionsLeftSide}>
                        <IconMa color={'#131314'} name={icon2} size={25} />
                        <Text style={styles.privacyOptionsTextLeft}>{option2}</Text>
                    </View>
                    <IconA color={'#131314'} size={25} name={selectedIndex == 1 ? 'checkcircle' : 'checkcircleo'} style={styles.privacyOptionsIconRight} />
                </TO>
                <TO onPress={onPress2} activeOpacity={1} style={[styles.privacyOptionsRow, {borderColor: selectedIndex == 2 ? 'black' : 'gray'}]}>
                    <View style={styles.privacyOptionsLeftSide}>
                        <IconI color={'#131314'} name={icon3} size={25} />
                        <Text style={styles.privacyOptionsTextLeft}>{option3}</Text>
                    </View>
                    <IconA color={'#131314'} size={25} name={selectedIndex == 2 ? 'checkcircle' : 'checkcircleo'} style={styles.privacyOptionsIconRight} />
                </TO>
            </View>
        </View>        
        :
        <View style={styles.privacyCnt}>
            <View style={styles.privacyRow1}>
                <Text style={styles.privacyRowText1}>{title}</Text>
                <View>
                <Switch
                trackColor={{false: '#f2f2f6', true: 'black'}}
                thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#B9B9BB"
                onValueChange={toggleSwitch}
                value={isEnabled}/>   
                </View>
            </View>
            <Text style={styles.privacyRow2Text}>{txt}</Text>
        </View>
    )
}

export const AllowUs = ({txt1, txt2, txt3, onPress}) => {
    return (
        <View style={styles.allowUsCnt}>
            <View style={styles.allowUsRow1}>
                <IconA style={styles.allowUsRowIcon} size={20} name={'exclamationcircleo'}/> 
                <View style={styles.allowUsRowTextCnt}>
                    <Text style={styles.allowUsRowText1}>{txt1}</Text>
                    <Text style={styles.allowUsRowText2}>{txt2}</Text>
                </View>
            </View>
            <View style={styles.allowButton}>
                <CustomButton txt={txt3} onPress={onPress} isClicked={true} txt={'ALLOW'} type={4} isReady={undefined} space={undefined}/>
            </View>
        </View>
    )
}

export const WatchPageContent = ({txt1, txt2, txt3, txt4, txt5, onPress1, onPress2}) => {
    return (
        <View style={styles.watchPageContent}>
            <Text style={styles.watchPageContentText1}>
                {txt1}
            </Text>
            <Text style={styles.watchPageContentText2}>
                {txt2}
            </Text>
            <Text style={styles.watchPageContentText2}>
                {txt3}
            </Text>
            <BottomTab txt1={txt4} txt2={txt5} onPress1={onPress1} onPress2={onPress2} type={2} />
        </View>
    )
}

export const SocialMediaCnt = ({onPress, isEnabled, toggleSwitch, type, isEnabledBot, isEnabledTop, onVlChngT, onVlChngB}) => {
    return (
        type == 'feedcon' ? 
        
        <View>
            <Space space={10}/>
            <SignWith onValueChange={toggleSwitch} value={isEnabled} txt2={'Connect'} type={'feedcon'} onPress={onPress}  txt={'Connect Contacts'} icon={'facebook'}  txt2={'Follow people you know'} icon2={'facebook'}/>
            <Space space={10}/>
        </View>

        :
        type == 'feed' ? 
        
        <View>
            <Space space={10}/>
            <SignWith onValueChange={toggleSwitch} value={isEnabled} txt2={'Connect'} type={'feed'} onPress={onPress}  txt={'Connect to Facebook'} icon={'facebook'}  txt2={'Follow friends from Facebook'} icon2={'facebook'}/>
            <Space space={10}/>
        </View>

        :

        <View>
            <Space space={10}/>
            <Line space={0}/>
            <SignWith onValueChange={onVlChngT} isEnabled={isEnabledTop} txt2={'Connect'} type={2} txt={'Facebook'} icon={'facebook'} />
            <Line space={0}/>
            <Space space={10}/>
            <Line space={0}/>
            <SmallSwitch txt1={'Open share view automatically after activity'} type={3} isEnabled={isEnabledBot} toggleSwitch={onVlChngB} txt2={undefined}/>
            <Line space={0}/>
        </View>
    )
}

export const ActivitySwitches = ({onPress, isEnabled, toggleSwitch, type, isEnabledLeft, isEnabledRight, onVlChngLeft, onVlChngRight}) => {
    return (

        <View>
            <Space space={10}/>
            <GestureHandlerRootView >
    <View style={[styles.signWithCnt]} >
        <View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>

            <IconMa size={32} color={'black'} name={'severe-cold'} />            

            <Text style={[styles.signWithTxt, {top: 0, left: 40, fontWeight: '600'}]}>
                'Cold Shower'
            </Text>

            
        </View>
            <View style={{position: 'absolute', right: 30,}}>
                
                <View style={styles.smallSwitchItCnt}>
                <Switch
                trackColor={{false: '#f2f2f6', true: 'black'}}
                thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="gray"
                value={isEnabledLeft}
                onValueChange={onVlChngLeft}
                />                
                </View>

            </View>
    </View>
</GestureHandlerRootView>            

<Space space={10}/>
            <Line space={0}/>
            <Space space={10}/>
            <SignWith onValueChange={onVlChngRight} isEnabled={isEnabledRight} txt2={'Connect'} type={'activity'} txt={'Hot Shower'} icon={'facebook'} />
            <Space space={10}/>
            <Line space={0}/>
        </View>
    )
}



export const SmallLogo = ({}) => {
    return (
        <View>
            <Image style={[styles.smallLogo, {bottom: 0}]} source={require('../images/logotransparent.png')} />
        </View>
    )
}

export const CustomInput = ({noText, txt, name, type, email, onChangeText, isName, txt1, name1, lastname1, isPassword}) => (
    type == 'editprofilefn' ?
    <View style={[styles.customBtnCnt, {width: '50%', marginVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 15, top: -8, color: 'gray', fontSize: 11}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: '49%', left: 70}]}>
            </View>
            <View style={{height: .5, width: '96%', backgroundColor: 'gray', left: -100, top: 46}}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={[styles.customBtnlineV]}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={[styles.customBtnlineH2, {left : 40, position: 'absolute'}]}>
        </View>
    <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} value={name} placeholderTextColor={'black'} style={{position: 'absolute', top: 5, left: 15, zIndex: 100, opacity: 100, width: 1000,}}>

    </TextInput>
    </View> 
    :
    type == 'editprofileln' ?
    <View style={[styles.customBtnCnt, {width: '50%', marginVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 15, top: -8, color: 'gray', fontSize: 11}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: '49%', left: 70}]}>
            </View>
            <View style={{height: .6, width: '96%', backgroundColor: 'gray', left: -100, top: 46}}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={[styles.customBtnlineH2, {left : 40, position: 'absolute'}]}>
        </View>
    <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} value={name} placeholderTextColor={'black'} style={{position: 'absolute', top: 5, left: 15, zIndex: 100, opacity: 100, width: 1000}}>

    </TextInput>
    </View> 
    :
    type == 'bio' ?
    <View style={[styles.customBtnCnt, {width: '85%', marginVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>

            <Text style={{position: 'absolute', left: 20, top: -8, color: 'gray', fontSize: 11}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: '45%', left: 90,}]}>
            </View>
            <View style={{height: .6, width: '96%', backgroundColor: 'gray', left: -130, top: 46}}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={styles.customBtnlineH2}>
        </View>
    <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} value={name} placeholderTextColor={'black'} style={{position: 'absolute', top: 5, left: 15, zIndex: 100, opacity: 100, width: 1000}}>

    </TextInput>
    </View> 
    :
    type == 5 ?
    <View style={styles.customBtnCnt}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 28, top: -8, color: 'gray'}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: type == 2 ? '65%' : type == 3 ? '77%' : '65%', left: type == 2 ? 90 : type == 3 ? 60 : 100}]}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={styles.customBtnlineH2}>
        </View>
        <TextInput secureTextEntry={true} placeholder={txt1}  autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} placeholderTextColor={'gray'} style={{position: 'absolute', top: 0, left: 15, height: 50, opacity: 2, zIndex: 2, width: SCREEN_HEIGHT / 1.5}}>

        </TextInput>
        <Line space={0}/>
        <View style={{display: noText ? 'none' : 'flex'}}>
            <DescriptiveText txt={'Min. 8 char, incl. 1 uppercase and 1 lowercase letter, 1 number and 1 special character'}/>
        </View>
    </View>
    :
    type == 4 ?
    <View style={styles.customBtnCnt}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 28, top: -8, color: 'gray'}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: type == 2 ? '65%' : type == 3 ? '77%' : '78%', left: type == 2 ? 90 : type == 3 ? 60 : 55}]}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={[styles.customBtnlineH2, {width: '100%'}]}>
        </View>
        <Text style={{position: 'absolute', top: 15, left: 15, color : 'gray'}}>
        </Text>
    </View>
    :
    type == 3 ?
    <View style={[styles.customBtnCnt, {width: '100%', marginVertical: 30}]}>
        <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} placeholder={name} placeholderTextColor={'gray'} style={{ borderWidth:1, borderColor: 'gray', width: '85%', padding: 15,
    height: 50, zIndex: 100, opacity: 100, width: 1000}}>

        </TextInput>
    </View> 
    :
    type == 21 ?
    <View style={[styles.customBtnCnt, {width: '50%', marginVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 28, top: -8, color: 'gray', fontSize: 11}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: '49%', left: 90}]}>
            </View>
            <View style={{height: .5, width: '96%', backgroundColor: 'gray', left: -100, top: 46}}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={styles.customBtnlineH2}>
        </View>
    <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} value={name} placeholderTextColor={'black'} style={{position: 'absolute', top: 15, left: 15, zIndex: 100, opacity: 100, width: 1000,}}>

    </TextInput>
    </View> 
    :
    type == 2 ?
    <View style={[styles.customBtnCnt, {width: '50%', marginVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 28, top: -8, color: 'gray', fontSize: 11}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: '49%', left: 90}]}>
            </View>
            <View style={{height: .6, width: '96%', backgroundColor: 'gray', left: -100, top: 46}}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <View style={styles.customBtnlineH2}>
        </View>
    <TextInput autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} value={name} placeholderTextColor={'black'} style={{position: 'absolute', top: 15, left: 15, zIndex: 100, opacity: 100, width: 1000}}>

    </TextInput>
    </View> 
    :
    <View style={styles.customBtnCnt}>
        
        <View style={{flexDirection: 'row'}}>
            <View style={styles.customBtnlineH}>
            </View>
            <Text style={{position: 'absolute', left: 28, top: -8, color: 'gray'}}>
            {txt}
            </Text>
            <View style={[styles.customBtnlineH1, {width: type == 2 ? '65%' : type == 3 ? '77%' : '65%', left: type == 2 ? 90 : type == 3 ? 60 : 100}]}>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <View style={styles.customBtnlineV}>
            </View>
            <View style={styles.customBtnlineV2}>
            </View>
        </View>
        <TextInput secureTextEntry={isPassword ? true : false} defaultValue={name1} placeholder={txt1}  autoCapitalize={isName ? 'words' : 'none'} onChangeText={onChangeText} placeholderTextColor={'gray'} style={{position: 'absolute', top: 0, left: 15, height: 50, opacity: 2, zIndex: 2, width: SCREEN_HEIGHT / 1.5}}>

        </TextInput>
        <Line space={0}/>
        <Line space={0}/>
        <Line space={0}/>

    </View>
)

export const DescriptiveText = ({txt}) => (
    <Text style={styles.descriptiveText}>
        {txt}
    </Text>
)

export const ClassicButton = ({txt1, txt2}) => (
    <View style={styles.classicButtonCnt}>
        <View style={styles.classicButtonItCnt1}>
            <Text style={styles.classicButtonText}>{txt1}</Text>
        </View>
        <View style={styles.classicButtonItCnt2}>
            <Text style={styles.classicButtonText}>{txt2}</Text>
        </View>
    </View>
)

export const OneItemSummary = ({txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, type}) => (
   type == 'p' ? 
   <View style={styles.oneItemSummaryCnt}>
        <View style={[styles.oneItemSummaryRow1, {flexDirection: 'row'}]}>
            <View style={[styles.oneItemSummaryRow1AvatarCnt, {justifyContent: 'center', width: '25%', height: 60}]}>
                {/* <View style={{backgroundColor: 'gray', width: 50, alignSelf: 'center', borderRadius: 30}}> */}
                <IconI style={{alignSelf: 'center'}} color={'gray'} size={40} name={'person-outline'}/>
                {/* </View> */}
            </View>
            <View style={[styles.oneItemSummaryPersonInfoTextCns, {height: 60, justifyContent: 'center'}]}>
                <Text style={styles.oneItemSummaryPersonNameText}>
                {txt1}
                </Text>
                <Text style={[styles.oneItemSummaryWhatOn, {fontSize: 12, color: 'gray'}]}>
                {txt2}
                </Text>
            </View>
        </View>

        <View style={[styles.oneItemSummaryRow4Cnt, {flexDirection: 'row'}]}>

        </View>
        <View style={styles.oneItemSummaryRow5MapCnt}></View>
        <View style={styles.oneItemSummaryFeedBackCnt}>
            <View style={styles.oneItemSummaryFeedBackIconsCnt}>
                <Icon />
                <Icon />
            </View>
            <Text style={styles.oneItemSummaryFeedBackText}>
                
            </Text>
        </View>
    </View>   
   : 
   <View style={styles.oneItemSummaryCnt}>
        <View style={[styles.oneItemSummaryRow1, {flexDirection: 'row'}]}>
            <View style={[styles.oneItemSummaryRow1AvatarCnt, {justifyContent: 'center', width: '25%', height: 60}]}>
                {/* <View style={{backgroundColor: 'gray', width: 50, alignSelf: 'center', borderRadius: 30}}> */}
                <IconI style={{alignSelf: 'center'}} color={'gray'} size={40} name={'person-outline'}/>
                {/* </View> */}
            </View>
            <View style={[styles.oneItemSummaryPersonInfoTextCns, {height: 60, justifyContent: 'center'}]}>
                <Text style={styles.oneItemSummaryPersonNameText}>
                {txt1}
                </Text>
                <Text style={[styles.oneItemSummaryWhatOn, {fontSize: 12, color: 'gray'}]}>
                {txt2}
                </Text>
            </View>
        </View>
        <View style={[styles.oneItemSummaryRow2Text, {width: '25%'}]}>
            <Text style={{alignSelf: 'center', fontStyle: 'italic'}}>
        {txt3}
            </Text>
        </View>
        <View style={[styles.oneItemSummaryCalculationsCnt,  {flexDirection: 'row', marginTop: 5}]}>
            <View style={{ width: '25%'}}>
            <Text style={[styles.oneItemSummaryDurationText, {alignSelf: 'center', fontWeight: 'bold'}]}>
            00:00:0{txt4}
            </Text>
            </View>
            <View style={{width: '25%'}}>
            <Text style={[styles.oneItemSummaryBurnedText,  {alignSelf: 'center', fontWeight: 'bold'}]}>
            {txt5}
            </Text>
            </View>
        </View>
        <View style={[styles.oneItemSummaryRow4Cnt, {flexDirection: 'row'}]}>

        <View style={{ width: '25%'}}>
            <Text style={[styles.oneItemSummaryRow4Text1, {alignSelf: 'center', opacity: .5}]}>
            {txt6}
            </Text>
        </View>
            
        <View style={{ width: '25%'}}>
            <Text style={[styles.oneItemSummaryRow4Text2, {alignSelf: 'center', opacity: .5}]}>
            {txt7}
            </Text>
        </View>

        </View>
        <View style={styles.oneItemSummaryRow5MapCnt}></View>
        <View style={styles.oneItemSummaryFeedBackCnt}>
            <View style={styles.oneItemSummaryFeedBackIconsCnt}>
                <Icon />
                <Icon />
            </View>
            <Text style={styles.oneItemSummaryFeedBackText}>
                
            </Text>
        </View>
    </View>
)

export const TextButtonSh = ({title1, title2, title3, title4, isFirst, isLast, onPress1, onPress2, onPress3, onPress4, isDarkModeOn}) => {
    return (

        <View style={{opacity: 10, zIndex: 10}}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={onPress1}
                style={[styles.textButtonCnt, {
                borderTopLeftRadius: isFirst ? 10 : 0,
                borderTopRightRadius: isFirst ? 10 : 0, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
                <Text style={styles.textButtonTxt}>
                    {title1}
                </Text>
            </TouchableOpacity>
            <LineBwCell isFull={true} isDarkModeOn={undefined} isOnTask={undefined}/>
            <TouchableOpacity 
            activeOpacity={.8}
            onPress={onPress2}
            style={[styles.textButtonCnt, {
                 backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <Text style={styles.textButtonTxt}>
                {title2}
            </Text>
</TouchableOpacity>
<LineBwCell isFull={true} isDarkModeOn={undefined} isOnTask={undefined}/>

{/* <TouchableOpacity 
    activeOpacity={.8}
    onPress={onPress3}
    style={[styles.textButtonCnt, {
    borderBottomEndRadius: isLast ? 10 : 0, 
    borderBottomStartRadius: isLast ? 10 : 0,
    backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'
    }]}>
    <Text style={styles.textButtonTxt}>
        {title3}
    </Text>
</TouchableOpacity> */}

<Space space={5}/>

<TouchableOpacity 
    activeOpacity={.8}
    onPress={onPress4}
    style={[styles.textButtonCnt, {
    borderTopLeftRadius: isFirst ? 10 : 0,
    borderTopRightRadius: isFirst ? 10 : 0,
    borderBottomEndRadius: isLast ? 10 : 0, 
    borderBottomStartRadius: isLast ? 10 : 0,
    backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'
    }]}>
    <Text style={styles.textButtonTxt}>
        {title4}
    </Text>
</TouchableOpacity>
</View>

)
}

export const LineBwCell = ({isFull, isDarkModeOn, isOnTask, isSettings}) => {
    return (

        isSettings ?

        <View style={{height: .5, backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#242426' : '#d0d0d2', flexDirection: 'row'}}>
           
            <View style={{height: '100%', backgroundColor: isFull ? '#242426' : 'black', width: 0}}>
                
            </View>
            

            <View style={{height: '100%', backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#1c1c1e' : 'white', }}>
           
            </View>

        </View>
        :

        isFull == null ? 
        <View style={{height: 0.2, backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#242426' : '#d0d0d2', flexDirection: 'row', marginHorizontal: isFull ? 0 : 20}}>
           
            <View style={{height: '100%', backgroundColor: isFull ? '#242426' : 'black', width: 0}}>
                
            </View>
            

            <View style={{height: '100%', backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#1c1c1e' : 'white', width: isOnTask ? 100 : 45}}>
           
            </View>

        </View>
        :

        <View style={{height: .5, backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#242426' : '#d0d0d2', flexDirection: 'row', marginHorizontal: isFull ? 0 : 20}}>
           
            <View style={{height: '100%', backgroundColor: isFull ? '#242426' : 'black', width: 0}}>
                
            </View>
            

            <View style={{height: '100%', backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#1c1c1e' : 'white', width: isOnTask ? 100 : 45}}>
           
            </View>

        </View>
    )
}

export const InputBox = ({txt, type, txt2, count, onChangeText, onChangeTextTitle}) => {
    return (

        type == 'post' ? 
        <View>
        <View style={{marginHorizontal: 20, marginVertical: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderBottomColor: 'black'}}>
                        
            <TextInput onChangeText={onChangeTextTitle} placeholderTextColor={'gray'} style={{alignSelf: 'center', width: '90%', height: 40}} placeholder={'Title'}/>

        </View>
        <View style={{marginHorizontal: 20, marginVertical: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderBottomColor: 'black'}}>
                        
            <TextInput multiline={true} onChangeText={onChangeText} placeholderTextColor={'gray'} style={{alignSelf: 'center', width: '90%', height: 80,}} placeholder={txt}/>
            
        </View>
            <Text style={{ width: '90%', marginLeft: 20, fontSize: 12, color: '#363132'}}>
                {txt2}: {count}
            </Text>
        </View>
        :

        <View style={{marginHorizontal: 20, marginVertical: 10, backgroundColor: '#eeeef0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                        
            <IconI style={{alignSelf: 'center', width: '10%', left:10, marginHorizontal: 10}} name="search-outline" size={24} />

            <TextInput onChangeText={onChangeText} style={{alignSelf: 'center', width: '90%', height: 40,}} placeholder={txt}/>
        
        </View>
    )
}

export const PersonCnt = ({isFollowing, txt, onPress, country, style }) => {

    return (
      <TouchableOpacity 
        activeOpacity={.7} onPress={onPress} style={[{
        backgroundColor: '#212121',
        borderRadius: 1,
        borderColor: 'transparent',
        fontSize: 24,
        paddingHorizontal:20,
        height: 40,
        flexDirection: 'column',
        marginHorizontal: 20,}, style]}>
        <View style={{backgroundColor: '#212121',
        borderRadius: 1,
        borderColor: 'transparent',
        fontSize: 24,
        paddingHorizontal:20,
        height: 40,
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'}}>
            <Text style={{top:10, right:5, fontWeight:500, fontSize: 14, color: '#766E6E'}}>{txt}</Text>
            <SmallButton type={'c'} isFollowing={isFollowing}  txt={'FOLLOWING'} txt2={'FOLLOW'}/>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

export const SmallLine = ({}) => {
    return (
        <View style={{width: '10%', height: 4, backgroundColor: 'gray', alignSelf: 'center',
        top: 7, borderRadius: 300}}>

        </View>
    )
}

export const SheetButtons = ({title, txt, txt1, txt2, type, onPress, onPressBack}) => {
    return (
        <GestureHandlerRootView>
        <View style={[styles.headerHomeCnt, {justifyContent: 'center'}]}>
                <Text style={[styles.headerHomeTitle, {alignSelf: 'center', width: 'auto', marginStart: 0, fontSize: 13, letterSpacing: 2}]} >
                </Text>
                <TO activeOpacity={.7} onPress={onPress} style={[styles.headerProfileIconsCnt, {position: 'absolute'}]}>
                    <Text style={{ fontWeight: '400'}}>
                        {txt1}
                    </Text>
                </TO>
                <TO activeOpacity={.7} onPress={onPressBack} style={[styles.headerProfileIconsCntLeft, {position: 'absolute'}]}>
                <Text style={{ fontWeight: '400', color: 'gray', fontSize: 15}}>
                        {txt2}
                    </Text>
                </TO>
        </View>
        <Line space={undefined} />
    </GestureHandlerRootView>
    )
}

export const PersonBox = ({name, onPress}) => {
    return (
        <GestureHandlerRootView >
        <TouchableHighlight style={[styles.signWithCnt]} onPress={onPress} underlayColor={'#C5C1C0'} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <IconI style={[styles.signWithIconI, {marginRight: 15}]} size={22} name={'person-outline'}/>
                
                <Text style={[styles.signWithTxt, {fontSize: 14, fontFamily: ''}]}>
                    {name}
                </Text>
            </View>
        </TouchableHighlight>
    </GestureHandlerRootView>
    )
}

export const OneNotification = ({txt1, txt2, onPress, closePost}) => {
    return(
        <TO onPress={onPress} activeOpacity={.8} style={{flexDirection:'row'}}>
            
            <ImageBackground width={50} height={50} style={{width:50, height: 50, margin: 30, borderRadius: 300}} borderRadius={40} source={require('../images/logo.png')}>
            </ImageBackground>

            <View style={{justifyContent: 'center'}}>

                <Text style={{fontWeight: '500'}}>
{txt1}
                </Text>

                <Text>
{txt2}
                </Text>

            </View>

            <TO style={{position: 'absolute', right: 40, top: 10}} onPress={closePost}>
                <IconF5 color={'gray'} size={20} name='times'/>
              </TO>

    <Line space={undefined} type={undefined} />
    <Line space={undefined} type={undefined} />


        </TO>
    )
}

export const UserBox = ({name, place, isFriend, name2, place2, isFriend2, type}) => {
    return (
        type == 2 ? 
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{width: SCREEN_WIDTH * 0.475, backgroundColor: '#CECFD0', height: SCREEN_HEIGHT * .28, marginTop:1}}>
                
                <TO activeOpacity={.8}>
                    <IconI name="close-outline" size={30} style={{position: 'absolute', right: 20, top: 20}} />
                </TO>

                
                <View style={{width: 80, height: 80, backgroundColor: 'gray', alignSelf: 'center', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                    <IconI name="person-outline" color={'#CECFD0'} size={57} style={{opacity: 10, zIndex: 10}}/>
                </View>
                <Text style={{color: 'black', alignSelf: 'center', marginTop: 10, fontWeight: '500'}}>{name}</Text>
                <Text style={{color: 'black', alignSelf: 'center', marginVertical: 10, opacity: .8, marginTop: 5}}>{place}</Text>
                <TO activeOpacity={.8}>
                    <Text style={{alignSelf: 'center', marginTop: 10, letterSpacing: 2, padding: 8, borderWidth: 1, fontSize: 12, fontWeight: '700'}}>{isFriend ? 'UNFOLLOW' : 'FOLLOW'}</Text>
                </TO>
            </View>
        </View>        
        :
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: SCREEN_WIDTH * 0.475, backgroundColor: '#CECFD0', height: SCREEN_HEIGHT * .28}}>
                
                <TO activeOpacity={.8}>
                    <IconI name="close-outline" size={30} style={{position: 'absolute', right: 20, top: 20}} />
                </TO>

                
                <View style={{width: 80, height: 80, backgroundColor: 'gray', alignSelf: 'center', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                    <IconI name="person-outline" color={'#CECFD0'} size={57} style={{opacity: 10, zIndex: 10}}/>
                </View>
                <Text style={{color: 'black', alignSelf: 'center', marginTop: 10, fontWeight: '500'}}>{name}</Text>
                <Text style={{color: 'black', alignSelf: 'center', marginVertical: 10, opacity: .8, marginTop: 5}}>{place}</Text>
                <TO activeOpacity={.8}>
                    <Text style={{alignSelf: 'center', marginTop: 10, letterSpacing: 2, padding: 8, borderWidth: 1, fontSize: 12, fontWeight: '700'}}>{isFriend ? 'UNFOLLOW' : 'FOLLOW'}</Text>
                </TO>
            </View>
            
            <View style={{width: SCREEN_WIDTH * 0.475, backgroundColor: '#CECFD0', height: SCREEN_HEIGHT * .28}}>
                <TO activeOpacity={.8}>
                    <IconI name="close-outline" size={30} style={{position: 'absolute', right: 20, top: 20}} />
                </TO>
            <View style={{width: 80, height: 80, backgroundColor: 'gray', alignSelf: 'center', marginTop: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                    <IconI name="person-outline" color={'#CECFD0'} size={57} style={{opacity: 10, zIndex: 10}}/>
                </View>
                <Text style={{color: 'black', alignSelf: 'center', marginTop: 10, fontWeight: '500'}}>{name2}</Text>
                <Text style={{color: 'black', alignSelf: 'center', marginVertical: 10, opacity: .8, marginTop: 5}}>{place2}</Text>
                <TO activeOpacity={.8}>
                    <Text style={{alignSelf: 'center', marginTop: 10, letterSpacing: 2, padding: 8, borderWidth: 1, fontSize: 12, fontWeight: '700'}}>{isFriend2 ? 'UNFOLLOW' : 'FOLLOW'}</Text>
                </TO>
            
            </View>
        </View>
    )
}

export const Target = ({title, desc, type, data}) => {
    return (
        type == 'target' ? 
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
            <IconM name="target" size={30} style={{marginHorizontal:20}}/>
            <View>
                <Text style={{fontWeight: '600'}}>Target</Text>
                <Text style={{fontWeight: '300'}}>{desc}</Text>
            </View>
        </View>
        :
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
            <IconI name="calendar-outline" size={30} style={{marginHorizontal:20}}/>
            <View>
                <Text style={{fontWeight: '600'}}>Time Frame</Text>
                <Text style={{fontWeight: '300'}}>{desc}</Text>
            </View>
        </View>
    )
}

export const ChallengeContent = ({data}) => {
    return (
        <View style={{marginLeft: 30, marginBottom: 10}}>
            <Text style={{fontSize: 16, fontStyle: 'italic', fontWeight: '500',backgroundColor: 'white', alignSelf: 'flex-start', margin: 4, padding: 5}}>{data.title}</Text>
            <Text style={{fontSize: 13, fontStyle: 'italic', fontWeight: '600',backgroundColor: 'white', alignSelf: 'flex-start', padding: 5, marginLeft: 4}}>{data.time}</Text>
            <Text style={{fontSize: 13, fontStyle: 'italic', fontWeight: '400',backgroundColor: 'white', alignSelf: 'flex-start', margin: 4, color: 'gray', padding: 5}}>{data.count}</Text>
        </View>
    )
}

export const Followers = ({}) => {
    return (
        <View style={{width:SCREEN_WIDTH, backgroundColor: 'red', height: SCREEN_HEIGHT}}>
        </View>
    )
}

export const Followings = ({}) => {
    return (
        <View style={{width:SCREEN_WIDTH, backgroundColor: 'gray', height: SCREEN_HEIGHT}}>
        </View>
    )
}

export const Choose = ({count, count2, selectedIndex, onPress1, onPress2}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TO activeOpacity={1} onPress={onPress1}>
                <Text style={{width: SCREEN_WIDTH/2 , textAlign: 'center', letterSpacing: 2, padding: 20, fontSize: 12, fontWeight: selectedIndex == 0 ? '600' : '400'}}>FOLLOWERS ({count})</Text>
            </TO>

            <TO activeOpacity={1} onPress={onPress2}>
                <Text style={{width: SCREEN_WIDTH/2 , textAlign: 'center', letterSpacing: 2, padding: 20, fontSize: 12, fontWeight: selectedIndex == 1 ? '600' : '400'}}>FOLLOWING ({count2})</Text>
            </TO>
      
        </View>
    )
}

export const NoOneYet = ({txt, onPress, type}) => {
    return (
        type == 'feed' ? 
        <View>
            <Text style={{marginLeft: type == 2 ? 35 : 31, marginRight: 70, opacity: .8, alignSelf: type == 2 ? 'flex-start' :  'flex-end', flexDirection: 'column', left: type == 2 ? 0 : 0}}>
                {txt}
            </Text>
        </View>
        :

        
        <View>
            <Text style={{marginLeft: type == 2 ? 35 : 31, marginRight: 70, opacity: .8, alignSelf: type == 2 ? 'flex-start' :  'flex-end', flexDirection: 'column', left: type == 2 ? 0 : 0}}>
                {txt}
            </Text>
            <TO style={{display: type == 2 ? 'none' : 'flex'}} activeOpacity={.8} onPress={onPress}>
                <IconI style={{marginLeft: 28, opacity: .8, alignSelf: 'flex-start', flexDirection: 'column', marginTop: 20}} name="share-outline" size={28}/>
            </TO>
        </View>

        // person-add-outline

    )
}

export const SmallButton = ({type, txt, txt2, onPress, isFollowing}) => (
    type == 'c' ? 
    <TO activeOpacity={.7} onPress={onPress} style={[styles.discoverRowBoxBox, {alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 0, left: 30}]}>
        <Text style={[styles.discoverRowBoxBtnText, {color: 'white'}]}>{isFollowing ? txt : txt2 }</Text>
    </TO>
    :
    <TO activeOpacity={.7} onPress={onPress} style={[styles.discoverRowBoxBox, {alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 0, left: 30}]}>
        <Text style={styles.discoverRowBoxBtnText}>{isFollowing ? txt : txt2 }</Text>
    </TO>
)

export const FollowerList = ({onClick, navigation, changeFollowings, changeFollowers, followings, followers, onPressText, followingsList, followersList, selectedIndex, onPress1, onPress2, isSheetOn, info, name, duration, data, title, subtitle, text11, text12, text21, text22, onPressRight, onPressLeft, type, text1, text2, text3, onPress}) => {
    

    const renderItemBlog = ({ item, index }) => {

        const renderFollower = ({item, index}, changeFollowers) => (
            <TO onPress={() => {goToProfile(navigation, item.email)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginVertical: 10}}>
                <IconI size={20} style={{width: '15%', alignSelf: 'center', marginLeft: 30}} name="person-outline"/>
                <Text style={{width: '35%', alignSelf: 'center'}}>
                    {item.name}
                </Text>
                <View style={{opacity: 20, zIndex: 20}}>
                    <SmallButton isFollowing={item.id == 100 ? true : false} onPress={() => {changeFollowers(item)}} txt={'FOLLOW'} txt2={'UNFOLLOW'}/>
                </View>
                </View>
                <Line type={2} />
            </TO>
        )

        const renderFollowing = ({item, index}, changeFollowers) => (
            <TO onPress={() => {goToProfile(navigation, item.email)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginVertical: 10}}>
                <IconI size={20} style={{width: '15%', alignSelf: 'center', marginLeft: 30}} name="person-outline"/>
                <Text style={{width: '35%', alignSelf: 'center'}}>
                    {item.name}
                </Text>
                <View style={{opacity: 20, zIndex: 20}}>
                    <SmallButton isFollowing={item.id == 100 ? true : false} onPress={() => {changeFollowings(item)}} txt={'FOLLOW'} txt2={'UNFOLLOW'}/>
                </View>
                </View>
                <Line type={2} />
            </TO>
        )

        return (
            index == 0 && followers.length == 0 ?
            <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text></Text>
            
                <NoOneYet onPress={onPressText} txt={"There's no one here yet. Share your profile to help others find you."} />
            
            </View> :
            index == 0 ? 
            <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1, }}>
                    <Line type={3}/>
                <ScrollView>

                <FlatList showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={false} renderItem={item =>renderFollower(item, changeFollowers)} estimatedItemSize={10} data={followers} extraData={data[0].amIFollowing}>
                </FlatList>
                    
                </ScrollView>
            </View> 
            :
            index == 1 && followings.length == 0 ?
            <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text></Text>
                <View>
                    <NoOneYet type={2}  onPress={onPressText} txt={"You're not following anybody yet. Discover people to get inspired."} />
                    <View style={{left: 100, top: -15}}>
                        <SmallButton onPress={() => {navigation.navigate('Feed', {add: 'add'})}} txt2={'Add Friends'}/>
                    </View>
                </View>
            </View> :
            <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1,}}>
                    <Line type={3}/>
             <ScrollView>
             <FlatList showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={false} renderItem={item =>renderFollowing(item, changeFollowings)} estimatedItemSize={10} data={followings} extraData={data[0].amIFollowing}>
            </FlatList>
            </ScrollView>
            </View> 
        )
    }

    const flatlistRef = useRef()

    return (

        <View style={[{width: '100%', height: SCREEN_HEIGHT * 3}]}>

                <Choose onPress1={()=>{onPress1();  flatlistRef?.current.scrollToIndex({
                      index: 0,
                      animated: true,
                    });}} onPress2={()=>{onPress2();  flatlistRef?.current.scrollToIndex({
                        index: 1,
                        animated: true,
                      });}} selectedIndex={selectedIndex} count={0} count2={0}/>
                <FlatList estimatedItemSize={5} ref={flatlistRef}  pagingEnabled={true} data={[0, 1]} renderItem={renderItemBlog} horizontal={true} keyExtractor={(item) => item} extraData={data} showsHorizontalScrollIndicator={false}>
                </FlatList>

        </View>

    )
}

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
        width: '80%',
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
        borderRadius: 100
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
