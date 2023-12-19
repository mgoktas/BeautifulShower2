import React, { Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import {  StyleSheet, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { CountryCnt, Discover, HeaderHome, InputBox, Line, PersonBox, SCREEN_HEIGHT, SheetButtons, SmallLine, SocialMediaCnt, Space, UserBox } from "../Utilities/Utilities"
import { useFocusEffect } from "@react-navigation/native"
import { verticalScaleAnti } from "../Utilities/Metrics"
import { datablogs } from "../Data/Data"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { getDataNumber, getDataString, setData } from "../Storage/MMKV"
import { addToFollowingList, checkUserFriends, removeFromFollowingList } from "../Storage/Azure"
import firestore from '@react-native-firebase/firestore';

export type AddPersonSheetRefProps = {
    scrollTo: (destination: number) => void
    getSheetHeight: ()=> void
    itemAdded: ()=> void
    openSheet2: ()=> void
    
  }
    
export interface AddPersonSheetProps {
    connectCon: Function
    setSheet: Function
    isSheetOn: Boolean
  }

export const AddPersonSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>((props: AddPersonSheetProps, ref) => {
  
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [isSwitchOn2, setIsSwitchOn2] = useState(getDataNumber('isContactsPermitted') == 1)
    const [isAlreadyChecked, setIsAlreadyChecked] = useState(getDataNumber('isContactsPermitted') == 1)
    const [isLoading, setIsLoading] = useState(true)
    const [countries, setCountries] = React.useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    const checkContacts = () => {
    
      checkUserFriends()
    
    }

    useEffect(() => {

      // checkContacts()

    }, [])

    const translateY = useSharedValue(0)
    const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
    
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      translateY.value = withSpring(destination, { damping: 2000 })
      
    }, [])
    
    
    const getSheetHeight = () => {
      return translateY.value
    }
    
    // getSheetHeight() < 100 ? props.setSheet() : {}
    
    
    const checkSheet = async  () => {

      console.log('sheet is checking')
      
     setTimeout(() => { 

      console.log('sheet is checking every 1s')

      !props.isSheetOn ? setInterval(function2, 1000) : {}
    
    }, 1000);
      
    }
    
    // props.isSheetOn ? checkSheet() : {}
    
    function function2 () {

      if(!props.isSheetOn){
        getSheetHeight() > -10 ? props.setSheet() : {}
        // console.log('sheet is checking every 1s')
        // console.log(getSheetHeight())
      }
      else{
      }



    }
    
    const openSheet2 = () => {
      checkSheet()
      console.log('sheet is on')
    }

    useImperativeHandle(ref, () => ({ scrollTo, getSheetHeight, openSheet2 }), [scrollTo, getSheetHeight, openSheet2])
    
    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
      // getSheetHeight()
    })
    .onEnd(() => {
      if(translateY.value > -SCREEN_HEIGHT ) {
        scrollTo(SCREEN_HEIGHT)
        
    } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y)
      }
    })

    
      const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
          translateY.value,
          [-MAX_TRANSLATE_Y + 100, -MAX_TRANSLATE_Y],
          [12, 5],
          Extrapolate.CLAMP
          )
          
          return {
            borderRadius,
            transform: [{translateY: translateY.value}]
          }
        })   
        
        useEffect(() => {
            scrollTo(60)
            dataFetch()
        },[])


        const dataFetch = async () => {
          await dataFetch1()
        }

        const dataFetch1 = async () => {

          await fetch('https://api.countrystatecity.in/v1/countries', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSCAPI-KEY': 'UG9lVktzWEswQ3lTSlJEN0tGODRNMkkxZllnTDVzcW5abTFYSm1MQg=='
        },
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setCountries(json)
            setIsLoading(false)
        })
        .catch(error => {
            console.error(error);
        });
  
        
  
          }
          
          const search = (text) => {
            
            // //check email
            // function checkName(item) {
            //     return item.name != myCountry.name;
            // }
    
            setFilteredDataSource(countries)
            setMasterDataSource(countries)
            
            if (text) {
              const newData = masterDataSource.filter(
              function (item, index) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
              setFilteredDataSource(newData);
            } else {
                setTimeout(() => {
                    // setIsDisabled(true)
                },500)
                setFilteredDataSource([]);
            }
        };

        const updateState = (name) => {
          const newState = filteredDataSource.map(obj => {

            if (obj.name == name) {
              if (obj.id == 100){
                
                removeFromFollowingList(obj) //remove from my followings list
              return {...obj, id: 10};
              } else {

                addToFollowingList(obj) //add to my followings list
                return {...obj, id: 100};

              }

            }
      
            // 👇️ otherwise return the object as is
            return obj;
          });
      
          setFilteredDataSource(newState);
        };
    
        
        
        return (
          <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
                <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1}}>
                   
                 <SmallLine />
                 
                    <Space space={5}/>
                    <InputBox onChangeText={(txt) => {setSearchText(txt); search(txt)}} txt={'Enter name or email address'} />
                    <Line space={0}/>
                     {

                filteredDataSource.slice(0, 5).map((item, index) => (
                    <Fragment  key={index}>
                            <CountryCnt isFollowing={item.id == 100 ? true : false} style={{borderTopLeftRadius: index == 0 ? 10 : 0, borderTopRightRadius: index == 0 ? 10 : 0,borderBottomLeftRadius: index == (filteredDataSource.length -1) ? 10 : 0, borderBottomRightRadius: index  == (filteredDataSource.length -1) ? 10 : 0}} txt={item.name} onPress={() => {console.log('onPressed :', item.name); updateState(item.name) 
                                // if(placeHolder){changeCountry(item)} 
                                // else {
                                //   chooseCountry(item)
                                // }
                              }}
                                />
                    </Fragment>
                ))
                    }
                     
                 <ScrollView>


                  <View style={{display: searchText.length == 0 ? 'flex' : 'none'}}>
                    <SocialMediaCnt isEnabled={isSwitchOn} toggleSwitch={() => {}} type={'feed'} />
                    <Line space={0}/>
                    <Line space={0}/>
                    
                    
                    <SocialMediaCnt isEnabled={isSwitchOn2} toggleSwitch={() => {props.connectCon()}} type={'feedcon'} />
                    <Line space={0}/>
                    <Line space={0}/>
                  </View>
                    

                    {/* <UserBox name={'Shafira'} place={'Sekibo'} name2={'Zakia'} place2={'Iwu'} isFriend={false} isFriend2={true}/> */}
                    <Space space={100}/>
                    <Space space={100}/>
                    <Space space={100}/>
                  
                  </ScrollView>
                </View>
              </Animated.View>
            </GestureDetector>
            </GestureHandlerRootView>
          )
        })

export type AddPostSheetRefProps = {
  scrollTo: (destination: number) => void
  getSheetHeight: ()=> void
  
}
  
export interface AddPostSheetProps {
  connectCon: Function
  setSheet: Function
  isSheetOn: Boolean
  
}

export const AddPostSheet = React.forwardRef<AddPostSheetRefProps, AddPostSheetProps>((props: AddPostSheetProps, ref) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 2000 })
    
  }, [])

  
  
  const getSheetHeight = () => {
    return translateY.value
  }
  
  const checkSheet = async  () => {

    console.log('sheet is checking')
    
    setTimeout(() => { 

    console.log('sheet is checking every 1s')

    !props.isSheetOn ? setInterval(function2, 1000) : {}
  
  }, 1000);
    
  }
  
  function function2 () {

    if(!props.isSheetOn){
      getSheetHeight() > -10 ? props.setSheet() : {}
    }
    else{
    }



  }
  
  const openSheet2 = () => {
    checkSheet()
    console.log('sheet is on')
  }

  useImperativeHandle(ref, () => ({ scrollTo, getSheetHeight }), [scrollTo, getSheetHeight])
  
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    // translateY.value = event.translationY + context.value.y
    // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
    // getSheetHeight()
  })
  .onEnd(() => {
  //   if(translateY.value > -SCREEN_HEIGHT ) {
  //     scrollTo(SCREEN_HEIGHT)
      
  // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
  //     scrollTo(MAX_TRANSLATE_Y)
  //   }
  })

  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 100, -MAX_TRANSLATE_Y],
        [12, 5],
        Extrapolate.CLAMP
        )
        
        return {
          borderRadius,
          transform: [{translateY: translateY.value}]
        }
      })   
      
      useEffect(() => {
          scrollTo(60)
      },[])
      
      const [countLeft, setCountLeft] = useState(200)
      const [postTxt, setPostTxt] = useState('')

      const postCollection = firestore().collection('Users');

      const post = () => {
        getDataString('email')
      }


      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetPost, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column'}}>

              <SheetButtons

              onPress={() => {
            post()
            }}
              onPressBack={() => {scrollTo(SCREEN_HEIGHT); props.setSheet(2)}} txt2={'Cancel'} txt1={'Post'} type={6} title={'EDIT PROFILE'} txt={'Done'}/>
              
              <PersonBox name={'Muhammet Rasit'}/>

              <InputBox onChangeText={(txt) => {setPostTxt(txt); setCountLeft(200-postTxt.length)}} type={'post'} txt={'Write something'} txt2={'Characters left'} count={countLeft} />
          
              </View>
            </Animated.View>
          </GestureDetector>
          </GestureHandlerRootView>
        )
      })

const styles = StyleSheet.create({
    qrReader: {
      position: 'absolute',
      bottom: 0, top:0, right: 0, left:0,
      flex: 1 
    },
    barcodeTextURL: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
      line : {width: 75, borderWidth: 1, backgroundColor: 'black', color: 'black', alignSelf: 'center', height: 4, marginVertical: 15, borderRadius: 5},
      bottomSheet : {
        height: SCREEN_HEIGHT * 1.5, 
        width: '96%' , 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        zIndex: 2,
        opacity: 3,
        position: 'absolute',
    },
    bottomSheetPost : {
      height: SCREEN_HEIGHT, 
      width: '96%' , 
      backgroundColor: 'white', 
      alignSelf: 'center', 
      zIndex: 2,
      opacity: 3,
      position: 'absolute',
  },
      seperator: {height: .6, borderWidth: .2, borderColor: '#B2A496', marginHorizontal:40},
      countryIcon : {marginLeft: 20},
      cellTxt: {
        fontSize: 13, color: 'black', marginRight: 20
    },
      title: {
      fontSize: 18,
      marginStart: 32,
      fontWeight: 500,
      flex: 1,
  
  },
  input: {
      backgroundColor: 'transparent',
      marginLeft: 40,
      borderRadius: 40,
      color: 'black',
      fontSize: 20,
      bottom: 29
  },
      cell: {
          paddingVertical: 6,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
      },
      searchBox: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderRadius: 1,
          color: 'gray',
          borderColor: 'transparent',
          fontSize: 28,
          marginHorizontal:20,
          height: 40,
      },
      })

      
  