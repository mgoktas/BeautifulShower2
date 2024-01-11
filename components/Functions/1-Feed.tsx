import React, { Fragment, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import {  Alert, Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { CountryCnt, Discover, HeaderHome, InputBox, Line, PersonBox, PersonCnt, SCREEN_HEIGHT, SheetButtons, SmallLine, SocialMediaCnt, Space, UserBox } from "../Utilities/Utilities"
import { useFocusEffect } from "@react-navigation/native"
import { verticalScaleAnti } from "../Utilities/Metrics"
import { datablogs } from "../Data/Data"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { getDataNumber, getDataString, setData, storage } from "../Storage/MMKV"
import { addToFollowingList, checkUserFriends, removeFromFollowingList } from "../Storage/Azure"
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { checkFollow, followPerson, getDate, unFollowPerson } from "./Functions"

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
    email: String
  }

export const AddPersonSheet = React.forwardRef<AddPersonSheetRefProps, AddPersonSheetProps>((props: AddPersonSheetProps, ref) => {
  
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [isSwitchOn2, setIsSwitchOn2] = useState(getDataNumber('isContactsPermitted') == 1)
    const [isAlreadyChecked, setIsAlreadyChecked] = useState(getDataNumber('isContactsPermitted') == 1)
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = React.useState([])
    const [filteredDataSource, setFilteredDataSource] = useState(users);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = React.useState(getDataString('email'))

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

      
     setTimeout(() => { 


      !props.isSheetOn ? setInterval(function2, 1000) : {}
    
    }, 1000);
      
    }
    
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
        scrollTo(200)
        refresh()
    },[])
    const refresh = () => {
      setUsers([])
      setIsLoading(true)
            
      firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async(doc) => {
          
          if(doc._data.email != email){
            setUsers(arr => [...arr, {name: doc._data.firstname + ' ' + doc._data.lastname, email: doc._data.email,}])
          }

          });
                
          setIsLoading(false)
    
      });
    }

    const search = (text) => {
        
        setFilteredDataSource(users)
        setMasterDataSource(users)

        try{

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
              },500)
              setFilteredDataSource([]);
          }
        }
        catch(err){
        }


    };
          
        return (

          !isLoading ? 
          <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1}}>
                 
               <SmallLine />

               <SheetButtons

                  onPressBack={() => { scrollTo(SCREEN_HEIGHT); props.setSheet(2) } } txt2={'Cancel'} txt1={''} type={6} title={'EDIT PROFILE'} txt={'Done'} onPress={undefined}/>


                  <Space space={5}/>
                  <InputBox onChangeText={(txt) => { setSearchText(txt); search(txt) } } txt={'Enter name or email address'} type={undefined} txt2={undefined} count={undefined} onChangeTextTitle={undefined} />
                  <Line space={0} type={undefined}/>
                   {

              filteredDataSource.slice(0, 5).map((item, index) => (
                  <Fragment  key={index}>
                          <PersonCnt 
                          isFollowing={checkFollow(email, item.email) == false || checkFollow(email, item.email) ==  true ? checkFollow(email, item.email) : false } 
                          style={{ borderTopLeftRadius: index == 0 ? 10 : 0, borderTopRightRadius: index == 0 ? 10 : 0, borderBottomLeftRadius: index == (filteredDataSource.length - 1) ? 10 : 0, borderBottomRightRadius: index == (filteredDataSource.length - 1) ? 10 : 0 }} 
                          txt={item.name} 
                          onPress={ () => {

                    if(!checkFollow(email, item.email)){
                       followPerson(email, item.email)
                    }

                    else if(checkFollow(email, item.email)){
                      unFollowPerson(email, item.email)
                    }

                  } } country={undefined}/>
                  </Fragment>
              ))
                  }
                   
               <ScrollView>


                {/* <View style={{display: searchText.length == 0 ? 'flex' : 'none'}}>
                  <SocialMediaCnt isEnabled={isSwitchOn} toggleSwitch={() => { } } type={'feed'} onPress={undefined} isEnabledBot={undefined} isEnabledTop={undefined} onVlChngT={undefined} onVlChngB={undefined} />
                  <Line space={0} type={undefined}/>
                  <Line space={0} type={undefined}/>
                  
                  
                  <SocialMediaCnt isEnabled={isSwitchOn2} toggleSwitch={() => { props.connectCon() } } type={'feedcon'} onPress={undefined} isEnabledBot={undefined} isEnabledTop={undefined} onVlChngT={undefined} onVlChngB={undefined} />
                  <Line space={0} type={undefined}/>
                  <Line space={0} type={undefined}/>
                </View> */}
                  

                  {/* <UserBox name={'Shafira'} place={'Sekibo'} name2={'Zakia'} place2={'Iwu'} isFriend={false} isFriend2={true}/> */}

                
                </ScrollView>
              </View>
            </Animated.View>
          </GestureDetector>
          </GestureHandlerRootView>
          
          :

          <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
                <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1}}>
                   
                 <SmallLine />

                 <SheetButtons

                    onPressBack={() => { scrollTo(SCREEN_HEIGHT); props.setSheet(2) } } txt2={'Cancel'} txt1={''} type={6} title={'EDIT PROFILE'} txt={'Done'} onPress={undefined}/>


                    <Space space={5}/>
                    <InputBox onChangeText={(txt) => { setSearchText(txt); search(txt) } } txt={'Enter name or email address'} type={undefined} txt2={undefined} count={undefined} onChangeTextTitle={undefined} />
                    <Line space={0} type={undefined}/>
                     
                 <ScrollView>


                  <View style={{display: searchText.length == 0 ? 'flex' : 'none'}}>
                    <SocialMediaCnt isEnabled={isSwitchOn} toggleSwitch={() => { } } type={'feed'} onPress={undefined} isEnabledBot={undefined} isEnabledTop={undefined} onVlChngT={undefined} onVlChngB={undefined} />
                    <Line space={0} type={undefined}/>
                    <Line space={0} type={undefined}/>
                    
                    
                    <SocialMediaCnt isEnabled={isSwitchOn2} toggleSwitch={() => { props.connectCon() } } type={'feedcon'} onPress={undefined} isEnabledBot={undefined} isEnabledTop={undefined} onVlChngT={undefined} onVlChngB={undefined} />
                    <Line space={0} type={undefined}/>
                    <Line space={0} type={undefined}/>
                  </View>
                    

                    {/* <UserBox name={'Shafira'} place={'Sekibo'} name2={'Zakia'} place2={'Iwu'} isFriend={false} isFriend2={true}/> */}
                    <Space space={100}/>
                    <Space space={100}/>
                    <Space space={100}/>
                  
                  </ScrollView>
                  <Space space={200} />  
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
  name: String
  
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

    
    setTimeout(() => { 

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
        scrollTo(200)
      },[])
      
      const [countLeft, setCountLeft] = useState(200)
      const [postTxt, setPostTxt] = useState('')
      const [postTitle, setPostTitle] = useState('')

      const postCollection = firestore().collection('Users');

      const post = async (postTitle, postTxt) => {
        
        const email = getDataString('email')

        let user2 = await firestore().collection('Users').doc(email).get()

        const user = user2._data


        await firestore()
        .collection('Posts')
        // .doc()
        // .doc(uuid.v4()) // if not creates random id do it here.
        .add({
          postTitle: postTitle,
          postTxt: postTxt,
          id: email,
          byWho: await user2._data.firstname + ' ' + await user2._data.lastname ,
          postDate: getDate(new Date()),
          followercount: await user2._data.followercount,
        })
        .then(async () => {

          

          scrollTo(SCREEN_HEIGHT); props.setSheet(2)
          Alert.alert('Post created!', 'Your post is now shared with others!')

        })
        
      }

      const postNew = async (postTitle, postTxt, email, name) => {
        
        await firestore()
        .collection('Posts')
        .add({
          postTitle: postTitle,
          postTxt: postTxt,
          id: email,
          byWho: name,
          postDate: getDate(new Date()),
          followercount: 0,
        })
        .then(async () => {

          

          scrollTo(SCREEN_HEIGHT); props.setSheet(2)
          Alert.alert('Post created!', 'Your post is now shared with others!')

        })
      }

      const addpost =  () => {
        postNew('New T-Shirt', 'Check my new shirt!', 'ahmethkhkhk@gmail.com', 'Muhammet Rasit Goktas')
        postNew('New Pants!', 'Check my new pants!', 'ahmethkhkhk@gmail.com', 'Muhammet Rasit Goktas')
        postNew('Look at this guy!', 'Check my new friend!', 'mgoktashk@gmail.com', 'Muhammet Raşit Göktaş')
        postNew('Be honest!', 'Check my new gf!', 'mgoktashk@gmail.com', 'Muhammet Raşit Göktaş')
      }

      useEffect(() => {
        // addpost()
      }, [])

      const [keyboardHeight, setKeyboardHeight] = useState(0);

      useEffect(() => {
        function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
          setKeyboardHeight(e.endCoordinates.height);
        }
    
        function onKeyboardDidHide() {
          setKeyboardHeight(0);
        }
    
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetPost, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column'}}>

              <ScrollView >
              <SheetButtons

              onPress={() => {
                post(postTitle, postTxt)
                }}

              onPressBack={() => {scrollTo(SCREEN_HEIGHT); props.setSheet(2)}} txt2={'Cancel'} txt1={'Post'} type={6} title={'EDIT PROFILE'} txt={'Done'}/>
              
              <PersonBox name={props.name} onPress={undefined}/>

              <InputBox onChangeText={(txt) => {

                if(postTxt.length < 201) {
                  setPostTxt(txt); setCountLeft(200-postTxt.length)
                }

                
                }} onChangeTextTitle={(txt) => {setPostTitle(txt)}} type={'post'} txt={'Write something'} txt2={'Characters left'} count={countLeft} />
              </ScrollView>

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

      
  