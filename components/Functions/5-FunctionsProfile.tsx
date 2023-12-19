import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SCREEN_HEIGHT, Space, TextButtonSh, styles } from "../Utilities/Utilities";
import * as ImagePicker from 'react-native-image-picker';
import { putBackgroundImage, putImage } from "../Storage/Azure";

export type ChangeAvatarRefProps = {
    changeTheAvatar: () => void;
    scrollTo: (destination: number) => void;
  };
  
  interface ChangeAvatarProps {
    openSheet: Function
    userEmail: string
    avatarChosen: Boolean
  }
  
  export const ChangeAvatar = React.forwardRef<
  ChangeAvatarRefProps
  >((props: ChangeAvatarProps, ref) => {

    const changeTheAvatar = async () => {
        props.openSheet(); 
      }


  const translateY = useSharedValue(0);
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2;

  const [isActiveSub1, setIsActiveSub1] = useState(true);
  const [isActiveSub2, setIsActiveSub2] = useState(false);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 10000});
  }, []);

  useImperativeHandle(ref, () => ({scrollTo, changeTheAvatar}), [scrollTo, changeTheAvatar]);

  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      // translateY.value = event.translationY + context.value.y
      // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
      // if(translateY.value > -SCREEN_HEIGHT ) {
      //   scrollTo(60)
      // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
      //   scrollTo(MAX_TRANSLATE_Y)
      // }
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
  
    useEffect(() => {
      scrollTo(SCREEN_HEIGHT/2);
    }, []);
  

    const optionsCamera = {
        //   storageOptions: {
        //   skipBackup: true,
        //   path: 'images',
    
        // },
    
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        quality: 0.8,
        presentationStyle: 'pageSheet',
        selectionLimit: 1,
      };

    const launchCamera = async () => {
      scrollTo(SCREEN_HEIGHT/2);

        await ImagePicker.launchCamera(optionsCamera, response => {
          // console.log(response);
        });
      };
    
    const optionsLibrary = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    const launchLibrary = async () => {
        scrollTo(SCREEN_HEIGHT/2);
        ImagePicker.launchImageLibrary({
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 400,
          maxWidth: 400,
        },
        (response) => {
          const file = response.assets[0]
          console.log(response.assets[0]);

        props.avatarChosen ?  putImage(file, props.userEmail) : putBackgroundImage(file, props.userEmail)
        
        },
      )
      };

    return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.buttonSheet, rBottomSheetStyle]}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  height: SCREEN_HEIGHT / 3,
                }}>
                <Space space={5} />
                <TextButtonSh
                //   isDarkModeOn={props}
                  title1={'Take Photo'}
                  title2={'Choose Photo'}
                  // title3={'Browse...'}
                  title4={'Cancel'}
                  isFirst={true}
                  isLast={true}
                  onPress1={() => {
                    launchCamera();
                  }}
                  onPress2={() => {
                    launchLibrary();
                  }}
                  onPress4={() => {
                    scrollTo(SCREEN_HEIGHT/2);
                    // props.closeSheet();
                  }}
                />
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      );
    

  })