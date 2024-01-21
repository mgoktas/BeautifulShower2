import React, {
    useState,
    useCallback,
    useRef,
    useImperativeHandle,
  } from 'react';
  import {
    Linking, StyleSheet, Text, TouchableOpacity, View,
  } from 'react-native';
  import {GestureDetector} from 'react-native-gesture-handler';
  import {GestureHandlerRootView, Gesture} from 'react-native-gesture-handler';
  import Animated, {
      Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
  } from 'react-native-reanimated';
  import {
      SCREEN_HEIGHT,
    SCREEN_WIDTH,
    Space,
  } from './Utilities/Utilities';
import { Icon } from 'react-native-paper';
import { privacyPolicyUrl, termsAndConditionsUrl } from './Data/Data';
import { verticalScale } from './Utilities/Metrics';
import IconI from 'react-native-vector-icons/Ionicons'
  
  
export type OfferSheetRefProps = {
    scrollTo: (destination: number) => void;
  };
  
  interface ChildProps {
    closeSheet: Function;
    isDarkModeOn: boolean;
    pay: Function;
    confirmed: Function;
    canceled: Function;
  }
  
  export const OfferSheet = React.forwardRef<
    OfferSheetRefProps,
    BottomSheetProps
  >((props: ChildProps, ref) => {
    const translateY = useSharedValue(0);
    const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2;
  
    const [isActiveSub1, setIsActiveSub1] = useState(true);
    const [isActiveSub2, setIsActiveSub2] = useState(false);
    const [subId, setSubId] = useState('false');
    
  
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      translateY.value = withSpring(destination, {damping: 2000});
    }, []);
  
    useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);
  
    const context = useSharedValue({y: 0});
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
      })
      .onEnd(() => {
      });
  
      const initialValue = '';
      const reference = useRef(initialValue);
      const reference2 = useRef(initialValue);
  
      const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
          translateY.value,
          [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y / 1.5],
          [40, 15],
          Extrapolate.CLAMP, 
        );
  
        return {
          borderRadius,
          transform: [{translateY: translateY.value}],
        };
      });
  
      const goTo = useCallback(async url => {
        const supported = await Linking.canOpenURL(url);
  
        if (supported) {
          await Linking.openURL(url);
        } else {
          // console.log(`Don't know how to open this URL: ${url}`);
        }
      }, []);
  
      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.offerSheet, rBottomSheetStyle, {backgroundColor:   '#f2f2f6', }]}>
  
                <BackButton onPress={() => {scrollTo(60); props.closeSheet()}} />
                <SheetTitle isDarkModeOn={false} />
                <Space space={5}/>
                <FeaturesBox isDarkModeOn={false} />
                {/* <SubsBox isDarkModeOn={props.isDarkModeOn} txt1={'Annual'} txt2={'SAVE 31%'} txt21={'$4.16 / month'} txt31={'Billed as one payment of $49.99'} isActive={isActiveSub1} onPress={() => {setIsActiveSub1(true); setIsActiveSub2(false)}} isThirdRowDisabled={false}/> */}
                <BottomTexts2 txt2={'Add different types of showers, cold and hot!'} txt3={'Calculate how many calories you burned!'} />
                <BottomTexts3 txt2={'Count how many times you showered! Set a Goal!'} />
                <SubsBox isDarkModeOn={false} txt1={'Monthly'} txt21={'$4.99 / month'} isActive={isActiveSub2} onPress={() => {setIsActiveSub2(true); setIsActiveSub1(false)}} isBorderDisabled={true} isThirdRowDisabled={true}/>
                <AppleButton isDarkModeOn={false} onPress={() => {   
                  props.pay() }} color={'#007AFF'} txt={'Start Free Trial (7 Days)'} isPrimary={true}/>
                <AppleButton isDarkModeOn={false} onPress={() => {scrollTo(60); props.closeSheet()}} color={'#007AFF'} txt={'Dismiss'} isPrimary={false}/>
                <BottomTexts onPress2={async () => {await goTo(privacyPolicyUrl)}} onPress3={async () => {await goTo(te)}}   isDarkModeOn={false} isRestore={false} txt1={'Restore Purchases'} txt2={'Privacy Policy'} txt3={'Terms of Service'} onPress2={() => {goTo(privacyPolicyUrl)}} onPress3={() => {goTo(termsAndConditionsUrl)}} />
                <Space space={85}/>
  
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        )
  });
  
  export default OfferSheet

  export const SheetTitle = ({isDarkModeOn}) => {
    return (
        <Text style={[styles.sheetTitle, {backgroundColor : isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            Unlock Everything
        </Text>
    )
}

export const FeaturesBox = ({isDarkModeOn}) => {
    return (
        <View style={[styles.featuresBoxCnt, { backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <View style={styles.featuresHeadsCnt}>
                <Text style={[styles.featuresHeads1]}>Features</Text>
                <View style={styles.featuresBoxRowText2Cnt}>
                <Text style={styles.featuresHeads2}>Free</Text>
                </View>
                <View style={styles.featuresBoxRowText2Cnt}>
                <Text style={[styles.featuresHeads2, {color: '#007AFF'}]}>Pro</Text>
                </View>
            </View>
            <View style={styles.seperator}>

            </View>
            <View style={styles.featuresContentCnt}>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Different Shower Features</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>x</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, {backgroundColor: '#007AFF', borderRadius: 15} ]}>
                        <IconI name={'checkmark'}  color={'black'} size={13} />
                    </View>
                    </View>
                </View>
                <View style={styles.featuresBoxRowCnt}>
                <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Multiple Goal Features</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>x</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, {backgroundColor: '#007AFF', borderRadius: 15} ]}>
                        <IconI name={'checkmark'}  color={'black'} size={13} />
                    </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const SubsBox = ({isBorderDisabled, isThirdRowDisabled, isActive, onPress, txt1, txt2, txt21, txt31, isDarkModeOn}) => (
    <TouchableOpacity style={[styles.subsBox, {borderBottomWidth: isBorderDisabled ? 0 : .2, backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]} activeOpacity={.7} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: isActive ? 'white' : 'gray', borderColor: isActive ? '#007AFF' : 'gray'}]}>
            <View style={styles.icon}>
            </View>
        </View>
        <View style={[styles.subInfoBox, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            <View style={styles.subRow1}>
                <Text style={[styles.subRow1Text1, {color: isDarkModeOn ? 'white' : '#1c1c1e'}]}>{txt1}</Text>
                <Text style={[styles.subRow1Text2]}>{txt2}</Text>
            </View>
            <Text style={styles.subRow2}>{txt21}</Text>
            <Text style={[styles.subRow3, {height: isThirdRowDisabled ? 0 : 'auto', color: isDarkModeOn ? 'white' : '#1c1c1e'}]}>{txt31}</Text>
        </View>
    </TouchableOpacity>
)

export const BackButton = ({onPress}) => {

    return (
        <TouchableOpacity activeOpacity={.7} style={styles.backButtonCnt} onPress={onPress}>

            <View style={styles.backButtonIconCnt}>
                {/* <Icon2 name={'angle-left'} size={32} color={'#007AFF'}/> */}
            </View>
                <View style={styles.backButtonBtnCnt}>
                    
                    <Text style={styles.backButtonBtnTxt}>
                    Back
                    </Text>
                </View>

        </TouchableOpacity>
    )
}

export const AppleButton = ({onPress, isPrimary, txt, color, isDarkModeOn, isOnTask, mode}) => {
    return (
        <TouchableOpacity activeOpacity={.4} style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : isDarkModeOn ? 'black' : 'white', borderColor: isOnTask ? 'white' : isPrimary ? 'white' : color,marginHorizontal : mode === 2 ? 100 : 20}]} onPress={onPress}>
            <Text style={[styles.appleBtnTxt, {color : isPrimary && !isDarkModeOn ? 'white' : isDarkModeOn ? 'white' : color}]}>
                {txt}
            </Text>
        </TouchableOpacity>
    )
}

export const BottomTexts = ({txt1, txt2, txt3, onPress1, onPress2, onPress3}) => {
    return (
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={.8} onPress={onPress2} style={styles.bottomTxtCnt}>
                <Text style={[styles.bottomTxt, {opacity: .7}]}>
                    {txt2}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={onPress3} style={styles.bottomTxtCnt}>
            <Text style={[styles.bottomTxt, {opacity: .7}]}>
                    {txt3}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export const BottomTexts2 = ({txt1, txt2, txt3, onPress1, onPress2, onPress3}) => {
    return (
        <View style={{justifyContent: 'space-around'}}>
            <TouchableOpacity activeOpacity={.8} onPress={onPress2} style={{marginVertical: 5, margin: 15}} >
                <Text style={styles.bottomTxt}>
                    {txt2}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={onPress3} style={{marginVertical: 5, margin: 15}}  >
                <Text style={styles.bottomTxt}>
                    {txt3}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export const BottomTexts3 = ({txt1, txt2, txt3, onPress1, onPress2, onPress3}) => {
    return (
        <View style={{justifyContent: 'space-around'}}>
            <TouchableOpacity activeOpacity={.8} onPress={onPress2} style={{marginVertical: 5, margin: 15}} >
                <Text style={styles.bottomTxt}>
                    {txt2}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarLogo: {
        width: SCREEN_WIDTH * .23,
        height: SCREEN_WIDTH * .23,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 10,
    },
    profileInfo: {
        flexDirection: 'column',
        margin: 30
    },
    avatarName: {
        fontWeight: 500,
        fontSize: 30,
        alignSelf: 'center'
    },
    avatarEmail: {
        fontWeight: 400,
        fontSize: 16,
        alignSelf: 'center'
    },
    seperatorWithTextCnt : {
        height: 5,
        justifyContent: 'center'
    },
    seperatorWithTextLine: {
        height: .2,
        backgroundColor: 'gray',
        opacity: 1,
        width: '%40',
    },
    seperatorWithText: {
            width: '%20',
            alignSelf: 'center',
            color: 'gray',
            opacity: .7,
            opacity: 1,
            fontWeight: 400,
            fontSize: 12
    },
    cardCnt: {
        height: SCREEN_HEIGHT * .05,
        width: SCREEN_HEIGHT * .1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cardIconCnt : {
        height: SCREEN_HEIGHT * .025,
    },
    cardText: {
        height: SCREEN_HEIGHT * .025,
        fontSize: 12
    },
    cardInfoCnt: {
        height: SCREEN_HEIGHT * .2,
        flexDirection: 'column',
    },
    cardTextCnt: {

    },
    cardInfoText: {
        fontSize: 12
    },
    cardInfoTextScan: {
        fontWeight: 500,
        fontSize: 12
    },
    cardInfoTextInput: {
        height: SCREEN_HEIGHT * .08,
    },
    cardInfoTextInput2: {
        height: SCREEN_HEIGHT * .08,
        width: '%50'
    },
    cardInfoButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        height: SCREEN_HEIGHT * .08,
    },
    caretIconCnt : {
        position: 'absolute',
        left: 30,
        top: 80,
        opacity: 10,
        zIndex: 10
    },
    sheetTitle: {
        fontSize: 27,
        fontWeight: 700,
        color: '#007AFF',
        marginLeft: 15,
        top: 10,
        marginTop: 10,
        backgroundColor: 'black'
    },
    featuresBoxCnt: {
        margin: 15,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#212121',
        flexDirection: 'column',
        borderRadius: 15,
    },
    featuresHeadsCnt: {
        marginLeft: 5,
        marginVertical: 15,
        flexDirection: 'row',
    },
    featuresHeads1: {
        fontSize: 18,
        fontWeight: 600,
        width: '60%',
        color: 'gray'
    },
    featuresHeads2: {
        fontSize: 18,
        fontWeight: 600,
        color: 'gray',
        alignSelf: 'center'
    },
    seperator: {
        marginHorizontal: 1,
        backgroundColor: 'black',
        height: .3
    },
    featuresContentCnt: {
        marginLeft: 5,
        marginVertical: 13,
        flexDirection: 'column'   
    },
    featuresBoxRowCnt: {
        flexDirection: 'row',
        marginVertical: 5
    },
    featuresBoxRowText1: {
        width: '60%',
        fontSize: 15,
        fontWeight: 600,
        alignSelf: 'flex-start',
        color: 'white',
        opacity: .8
    },
    featuresBoxRowText2Cnt: {
        justifyContent: 'center',
        width: '20%',
    },
    featuresBoxRowText2: {
        fontWeight: 600,
        fontSize: 16,
        alignSelf: 'center',
        color: 'gray',
        // opacity: .8
    },
    subsBox: {
        backgroundColor: 'black',
        marginVertical: 5,
        borderBottomColor: 'white',
        borderBottomWidth: .2,
        marginHorizontal: 20,
        flexDirection: 'row',
        paddingBottom: 10
    },
    iconBox: {
        alignSelf: 'center',
        width: '10%',
        backgroundColor: 'white',
        height: SCREEN_HEIGHT/33,
        width: SCREEN_HEIGHT/33,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 6,
        borderColor: '#007AFF'
    },
    subInfoBox: {
        flexDirection: 'column',
        backgroundColor: 'black',
        width: '90%',
    },
    subRow1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subRow1Text1: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white'
    },
    subRow1Text2: {
        fontSize: 12,
        fontWeight: 600,
        color: '#007AFF',
        marginLeft: 10
    },
    subRow2: {
        fontSize: 13,
        opacity: .7,
        color: 'gray',
        marginVertical: 2
    },
    subRow3: {
        fontSize: 12,
        fontWeight: 400,
        color: 'white'
        
    },
    backButtonCnt: {
        flexDirection: 'row',
        margin: 12,
        marginBottom: 0,
        justifyContent: 'flex-start',
        zIndex: 1,
        width: '20%',
    },
    backButtonIconCnt: {
        justifyContent: 'center'
    },
    backButtonBtnCnt: {
        justifyContent: 'center',
        zIndex: 0,
        marginLeft: 5
    },
    backButtonBtnTxt: {
        color: '#007AFF',
        fontSize: 18,
        fontWeight: '500',
    },
    appleBtnCnt: {
        height: verticalScale(45),
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 1,
    },
    appleBtnTxt: {
        color: 'black',
        fontSize: 17,
        fontWeight: 500,
        alignSelf: 'center'
    },
    bottomTxtCnt: {
        marginVertical: 15
    },
    bottomTxt: {
        color: 'gray'
    }

})