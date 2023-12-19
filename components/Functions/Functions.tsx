import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import {  StyleSheet, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { CustomButton, HeightPicker, InfoText, JoinLogo, Line, SCREEN_HEIGHT, Space, SwitchBox, TextButton } from "../Utilities/Utilities"
import BcryptReactNative from 'bcrypt-react-native';
import { deleteUserMMKV } from "../Storage/MMKV";

export type  AgreementSheetRefProps = {
    scrollTo: (destination: number)=> void
  }
  
interface ChildPropsAgreementSheet {
  closeSheet: Function
  isDarkModeOn: boolean
  openWelcome: Function
}

export const AgreementSheet = React.forwardRef<AgreementSheetRefProps>( (props: ChildPropsAgreementSheet, ref) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
  
  const [isDate, setIsDate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [isActiveSub1, setIsActiveSub1] = useState(true)
  const [isActiveSub2, setIsActiveSub2] = useState(false)
  const [choosingTask, setCoosingTask] = useState(true)
  const [isOn, setIsOn] = useState(false)
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 10000 })
  }, [])
  
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])
  
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
  })
  .onEnd(() => {
  })

  const initialValue = '';
  const reference = useRef(initialValue);
  const reference2 = useRef(initialValue);
  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
        [15, 15],
        Extrapolate.CLAMP
        )
        
        return {
          transform: [{translateY: translateY.value}]
        }
      }) 
      
    useEffect(() => {
      scrollTo(100)
    },[])

  return  (

        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.agreementSheet, rBottomSheetStyle,]}>

              <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                  <JoinLogo type={2} txt1={'ADDITIONAL STEPS ARE REQUIRED'} />
                  <InfoText type={2} txt1={"Based on your country's legal resrictions we are required to ask for additional consent. You can find more information in our"} txt2={'and in our'} />
                  <SwitchBox isOn={isOn} onPress={() => {setIsOn(!isOn)}} txt={'I consent to my data being transferred abroad and shared with select third party organizations as explained in the'}/>
                  <Line space={0}/>
                  <CustomButton isReady={isOn ? true : false} onPress={() => {props.openWelcome()}} txt={'I CONSENT'}/>
                  <TextButton onPress={() => {props.closeSheet(); scrollTo(100)}} txt={'CANCEL'} />
              </View>

            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>

        )

      })

export type  PickerSheetRefProps = {
  scrollTo: (destination: number)=> void
  setSort: (destination: number)=> void
}

interface PickerSheet {
closeSheet: Function
isHeightSelected: boolean
onWeightChangeLeft: Function
onWeightChangeRight: Function
isWSelected: boolean
isW: boolean
isDarkModeOn: boolean
height: number
weight: number
unit: number
feet1: number
feet2: number
heightInFeet: number
openWelcome: Function
onHeightChange: Function
onUnitChange: Function
onValueChangeLeftH :Function
onValueChangeRightH :Function
}

export const PickerSheet = React.forwardRef<PickerSheetRefProps>( (props: PickerSheet, ref) => {

const translateY = useSharedValue(0)
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2

const [type, setType] = useState(0)

const scrollTo = useCallback((destination: number) => {
  'worklet';
  translateY.value = withSpring(destination, { damping: 10000 })
}, [])

const setSort = (X) => {
  setType(X)
}


useImperativeHandle(ref, () => ({ scrollTo, setSort }), [scrollTo, setSort])

const context = useSharedValue({ y: 0 })
const gesture = Gesture.Pan()
.onStart(() => {
  context.value = { y: translateY.value }
})
.onUpdate((event) => {
})
.onEnd(() => {
})


  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
      [15, 15],
      Extrapolate.CLAMP
      )
      
      return {
        transform: [{translateY: translateY.value}]
      }
    }) 
    
  useEffect(() => {
    props.closeSheet()
    scrollTo(-1000); 
  },[])

  function Range(a,b){
    if (b === undefined) {
      b = a;3
      a = 1;
    }
    return [...Array(b-a+1).keys()].map(x => x+a);
  }


return  (

      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.pickerSheet, rBottomSheetStyle,]}>
            <View style={{justifyContent: 'center', flexDirection: 'column'}}>
              <HeightPicker onValueChangeLeftH={props.onValueChangeLeftH} onValueChangeRightH={props.onValueChangeRightH}  heightInFeet={props.heightInFeet} isW={props.isW} selectedIndex={props.selectedIndex} weight={props.weight} onWeightChangeLeft={props.onWeightChangeLeft} onWeightChangeRight={props.onWeightChangeRight} isWSelected={props.isWSelected} feet1={props.feet1} feet2={props.feet2} unit={props.unit} onUnitChange={props.onUnitChange} onValueChange={props.onHeightChange} height={props.height} isHeightSelected={!props.isHeightSelected} onPress={() => {scrollTo(-1100); props.closeSheet()}} type={1} values={Range(120,220)} values2={['cm', 'ft']} values3={["3","4'","5'","6'"]} values4={['0"','1"','2"','3"','4"','5"','6"','7"','8"','9"','10"','11"']} values5={Range(34,770)} values6={Range(0,9)} />
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>

      )

    })

export function toFeet(n) {
  var realFeet = ((n*0.393700) / 12);
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return feet + ' ' + inches
}

export function toCms(feet, inches) {
  const cmTotal = feet * 30.48 + inches * 2.54;
  const feetNew = Math.floor(cmTotal);
  return feetNew
}

export function getDate(date) {
  const dayName = date.toLocaleString('default', { month: 'short' })
  
  return    date.getDate() + ' ' + dayName + ' ' + date.getFullYear()
}

export const getDDate = (date: Date) => {
  date.setFullYear(2000)
  date.setMonth(0, 1)
  return date
}

export const hashPassword = async (password) => {
  const salt = await BcryptReactNative.getSalt(10);
  const hashed = await BcryptReactNative.hash(salt, password);
  return hashed
}

export const getAge = (date: Date) => {
  const thisyeardate = new Date()
  const age = thisyeardate.getFullYear()-date.getFullYear() 
  return age
}

export const deleteAccount = () => {
  deleteUserMMKV()
}

const styles =  StyleSheet.create({

  agreementSheet : {
    width: '100%', 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    opacity: 300,
    zIndex: 200,
    position: 'absolute',
    top : SCREEN_HEIGHT + 100,  
    minHeight: SCREEN_HEIGHT / 1.6
    }, 
  pickerSheet : {
    width: '100%', 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    opacity: 300,
    zIndex: 200,
    position: 'absolute',
    top : SCREEN_HEIGHT / .6,  
    minHeight: SCREEN_HEIGHT / 3
    },    
  
})
