import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { verticalScale } from './Utilities/Metrics';
import { getDataNumber } from './Storage/MMKV';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export default function SplashScreen(){

    const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false)
    const [isLogged, setIsLogged] = useState(getDataNumber('isLogged' == 1))

    const edges = useSafeAreaInsets()

    const startAnimation = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()
    const scaleTitle = useRef(new Animated.Value(1)).current

    const moveTitle = useRef(new Animated.ValueXY({x: 0, y:0})).current
    const moveTitle2 = useRef(new Animated.ValueXY({x: 0, y:0})).current

    const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);



    useEffect(() => {

      setTimeout(() => {
        Animated.sequence([
          Animated.timing(
            startAnimation,
            {
              toValue: -Dimensions.get('window').height + (edges.top + 60),
              useNativeDriver: true
            }
          ),
          Animated.timing(
            scaleTitle,
            {
              toValue: 0.80,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveTitle,
            {
              toValue: {
                x: (2*Dimensions.get('window').width / 4.6),
                y: verticalScale(SCREEN_HEIGHT/3)
              },
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveTitle2,
            {
              toValue: {
                x: (-2*Dimensions.get('window').width / 4.6),
                y: verticalScale(-0)
              },
              useNativeDriver: true
            }
          ),
        ])
        .start(() => {
          setHasAnimationPlayedOnce(true);
          isLogged ? navigation.navigate('Tabs') :  navigation.navigate('First')
        })
      }, 200)

    },[])

    const animationProgress = useRef(new Animated.Value(0));
    
    useEffect(() => {
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, []);

    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
      animationRef.current?.play();
  
      // Or set a specific startFrame and endFrame with:
      animationRef.current?.play(50, 120);
    }, []);
  

    return (
      <View style={{backgroundColor: 'white', height: SCREEN_HEIGHT}}>
        <AnimatedLottieView
      ref={animationRef}
    source={require('./Data/ann.json')}
    autoPlay
    loop 
    style={{
      width: 400,
      height: 400,
      alignSelf: 'center',
      top: SCREEN_HEIGHT/3
    }}
  />
    </View>
    );
  }

