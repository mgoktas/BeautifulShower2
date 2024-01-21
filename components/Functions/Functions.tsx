import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import {  FlatList, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, Animated, Dimensions, Easing, Share, Alert, ImageBackground } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { CustomButton, HeightPicker, InfoText, JoinLogo, Line, NoOneYet, OneNotification, SCREEN_HEIGHT, SCREEN_WIDTH, SmallButton, Space, SwitchBox, TextButton } from "../Utilities/Utilities"
import BcryptReactNative from 'bcrypt-react-native';
import { deleteUserMMKV, getDataNumber, setData } from "../Storage/MMKV";
import IconI from 'react-native-vector-icons/Ionicons'
import { azureConstant } from "../Data/Data";
import IconE from 'react-native-vector-icons/Entypo'
import IconF5 from 'react-native-vector-icons/FontAwesome5'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { verticalScale } from "../Utilities/Metrics";

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
                  <JoinLogo type={2} txt1={'ADDITIONAL STEPS ARE REQUIRED'} txt2={undefined} />
                  <InfoText type={2} txt1={"Based on your country's legal resrictions we are required to ask for additional consent. You can find more information in our"} txt2={'and in our'} onPress={undefined} />
                  <SwitchBox isOn={isOn} onPress={() => {setIsOn(!isOn)}} txt={'I consent to my data being transferred abroad and shared with select third party organizations as explained in the'}/>
                  <Line space={0} type={undefined}/>
                  <CustomButton isReady={isOn ? true : false} onPress={() => { props.openWelcome(); } } txt={'I CONSENT'} type={undefined} isClicked={undefined} space={undefined}/>
                  <TextButton onPress={() => { props.closeSheet(); scrollTo(100); } } txt={'CANCEL'} type={undefined} />
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
selectedIndex: any;
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
            <View style={{justifyContent: 'center', flexDirection: 'column', zIndex: 90, opacity: 90}}>
              <HeightPicker onValueChangeLeftH={props.onValueChangeLeftH} onValueChangeRightH={props.onValueChangeRightH} heightInFeet={props.heightInFeet} isW={props.isW} selectedIndex={props.selectedIndex} weight={props.weight} onWeightChangeLeft={props.onWeightChangeLeft} onWeightChangeRight={props.onWeightChangeRight} isWSelected={props.isWSelected} feet1={props.feet1} feet2={props.feet2} unit={props.unit} onUnitChange={props.onUnitChange} onValueChange={props.onHeightChange} height={props.height} isHeightSelected={!props.isHeightSelected} onPress={() => { scrollTo(-1100); props.closeSheet(); } } type={1} values={Range(120, 220)} values2={['cm', 'ft']} values3={["3", "4'", "5'", "6'"]} values4={['0"', '1"', '2"', '3"', '4"', '5"', '6"', '7"', '8"', '9"', '10"', '11"']} values5={Range(34, 770)} values6={Range(0, 9)} value={undefined} values10={undefined} values11={undefined} values12={undefined} />
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

export const getImage = (email) => {
  const url = azureConstant + email
  
  return url
}

export const Posts = ({openPost, onPressDots, closePost, posts, onPressText, isSheetOn, goToProfileFeed, navigation, openSheet}) => {
    


      const renderPost = ({item, index}) => (
          <View>
              
              <View style={{flexDirection: 'row', alignContent: 'center', marginVertical: 5, justifyContent: 'space-around', width: SCREEN_WIDTH}}>

          <TouchableOpacity style={{backgroundColor: 'gray', width : 50, height: 50, borderRadius: 60, justifyContent: 'center'}} activeOpacity={.8} onPress={() => {goToProfileFeed(item.id)}}>
          <ImageBackground borderRadius={60} style={{width: 50, height: 50, borderRadius: 40, marginVertical: 15}} source={{uri : getImage(item.id)}}>
                </ImageBackground>
          </TouchableOpacity>


                <TouchableOpacity onPress={() => {openPost(item)}} style={{justifyContent: 'space-around', height: 80, width: '50%', alignItems: 'flex-start', right: 20}}>
                  <Text style={{fontWeight: '600'}}>
                    {item.byWho}
                  </Text>
                  <Text>
                    {item.followercount}
                  </Text>
                  <Text>
                    {item.postDate}
                  </Text>
                </TouchableOpacity>

            <View style={{flexDirection: 'row', width: '15%', justifyContent: 'space-between', alignSelf: 'flex-start', top: 5}}>
              <TouchableOpacity onPress={() => {onPressDots(item)}}>
                <IconE color={'gray'} size={20} name='dots-three-horizontal'/> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {closePost(item)}}>
                <IconF5 color={'gray'} size={20} name='times'/>
              </TouchableOpacity>
            </View>
            
              </View>




              <Text style={{justifyContent: 'center', alignSelf: 'flex-start', fontSize: 19, fontWeight: '600', marginHorizontal: 30}}>{item.postTitle}</Text>
              <Text style={{justifyContent: 'center', alignSelf: 'flex-start', marginHorizontal: 30}}>{item.postText}</Text>

              {/* <SmallButton isFollowing={item.id == 100 ? true : false} onPress={() => { changeFollowers(item); } } txt={'FOLLOW'} txt2={'UNFOLLOW'} type={undefined}/> */}
          
              <Line type={3} space={undefined}/>


          </View>
      )



      return (
        posts.length == 0 ?
          <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1, flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text></Text>
          
          <View>
              <NoOneYet onPress={onPressText} txt={"There's no one here yet. Add friends to see others posts."} type={'feed'} />
              <SmallButton onPress={() => {openSheet()}} txt2={'Add Friends'}/>
          </View>
          
          </View> 
          :
          
          <View>
                  <Line type={3} space={undefined}/>

              <FlatList

               keyExtractor={(item, index) => String(index)}

               nestedScrollEnabled={true}
showsHorizontalScrollIndicator={false} pagingEnabled={false} horizontal={false} renderItem={item =>renderPost(item)} estimatedItemSize={10} data={posts} extraData={posts.length}>
              </FlatList>
          </View>
      )

}

export const NotificationsOnly = ({notifications, isSheetOn, openDialog, closePost, }) => {
    


  const renderPost = ({item, index}) => (
      <View>
          
          <TouchableOpacity onPress={() => {openDialog(item.id)}} activeOpacity={.8} style={{flexDirection:'row'}}>
            <ImageBackground width={50} height={50} style={{width:50, height: 50, margin: 30, borderRadius: 300}} borderRadius={40} source={require('../images/logo.png')}>

            </ImageBackground>

            <View style={{justifyContent: 'center'}}>

                <Text style={{fontWeight: '500'}}>
                Someone has followed you! 
                </Text>

                <Text>
                {item.title}
                </Text>

            </View>

            <TouchableOpacity style={{position: 'absolute', right: 40, top: 10}} onPress={() => {closePost(item)}}>
                <IconF5 color={'gray'} size={20} name='times'/>
            </TouchableOpacity>

        </TouchableOpacity>      
    <Line space={undefined} type={undefined} />

      </View>
  )



  return (
    notifications.length == 0 ?
      <View style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH, opacity: isSheetOn ? .6 : 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          {/* <Text></Text>
      
          <NoOneYet onPress={onPressText} txt={"There's no one here yet. Add friends to see others posts."} type={undefined} /> */}
      
      </View> :



                <View>

                  <FlatList

keyExtractor={(item, index) => String(index)}

nestedScrollEnabled={true}
showsHorizontalScrollIndicator={true} pagingEnabled={false} horizontal={false} renderItem={item =>renderPost(item)} estimatedItemSize={10} data={notifications} extraData={notifications.length}>
                  </FlatList>
                  
              </View>
  )

}

export const deleteNotification = (id) => {
  firestore()
    .collection(`FollowerUpdates/${id}`)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {

        if(doc.email == id) {
          firestore()
          .collection(`FollowerUpdates/${id}`)
          .doc(doc.email)
          .delete()
          .then(() => {
            // console.log('User deleted!');
          });
      
        }
  
          
        });


  
    });

   
  }

export const Animation = () => {

  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false)
  const [isLogged, setIsLogged] = useState(getDataNumber('isLogged' == 1))
  const edges = useSafeAreaInsets()

  const startAnimation = useRef(new Animated.Value(0)).current
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
  source={require('../Data/ann.json')}
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

export const sharePost = (title, msg, postId, byWho) => {

  const postLink = `beautifulshower://onepost/:${postId}`

  let options = {
    title: `Post By: ${byWho}`,
    message: `${title} {'\n'} ${msg} {'\n'}  ${postLink} `,
    type: "image/jpeg",
  };
  Share.share(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
}

export const reportPost = async (title, msg, postId, byWho) => {

  const response = await fetch(`https://will-doro-d4ab29967685.herokuapp.com/reportPost`, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      msg: msg,
      postId: postId,
      byWho: byWho
    }),
  });

}

export const reportUser = async (email) => {

  const response = await fetch(`https://will-doro-d4ab29967685.herokuapp.com/reportUser`, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });

}

export const blockUser = async (email, email2) => {

  firestore()
  .collection('Users')
  .doc(email)
  .update({
    blocked: email2,
})
  .then(async () => {

    

  })
}

export const goToProfile = (navigation, email) => {

  navigation.navigate('UserProfile', {email})

}

export const removeFollow = (prevArrStr, email) => {

  const arr = prevArrStr.split('//')

  const index = arr.indexOf(email);

  arr.splice(index, 1);

  let newArr =''

  for (let i=0; i<arr.length; i++){
    if(arr.length == 1){
      newArr += arr[i]
    }

    else{

      if(newArr == ''){
        newArr += arr[i]
      }else{
        newArr += '//' + arr[i]
      }

    }

  }

  return newArr

}

const checkArr = (arr, email) => {
  const arr2 = arr.split('//')
  return arr2.includes(email)
}

export const followPerson = async (email, followWho) => {

  const userme = await firestore().collection('Users').doc(email).get();
  const userthat = await firestore().collection('Users').doc(followWho).get();

  console.log(followWho)
  await firestore()
  .collection('Notifications')
  .add({
    title: `${userme._data.firstname} ${userme._data.lastname} started following you!`,
    toWhom: followWho
  })
  .then(async () => {
  })

  if(userme._data.followingCount == 0) {

    firestore()
    .collection('Users')
    .doc(email)
    .update({
      followingCount: userme._data.followingCount + 1,
      followings: userme._data.followings + followWho,
  })
    .then(async () => {
  
      
  
    }) 
  }

  if(userme._data.followingCount != 0 && checkArr(userme._data.followings, followWho)) {
    
  firestore()
  .collection('Users')
  .doc(email)
  .update({
    followingCount: userme._data.followingCount + 1,
    followings: userme._data.followings + '//' + followWho,
})
  .then(async () => {

    

  }) 
  }

  if(userthat._data.followercount == 0) {

    firestore()
    .collection('Users')
    .doc(followWho)
    .update({
      followerCount: userthat._data.followerCount + 1,
      followers: userthat._data.followers + email,
  })
    .then(async () => {
  
      
  
    }) 
  }

  if(userthat._data.followerCount != 0) {
    
  firestore()
  .collection('Users')
  .doc(followWho)
  .update({
    followerCount: userthat._data.followerCount + 1,
    followers: userthat._data.followers + '//' + email,
})
  .then(async () => {

    

  }) 
  }

}

export const unFollowPerson = async (email, followWho) => {

  const userme = await firestore().collection('Users').doc(email).get();
  const userthat = await firestore().collection('Users').doc(followWho).get();

  console.log(email, followWho)
  console.log(userme._data.followingCount)
  console.log(userthat._data.followerCount)
  
  await firestore()
  .collection('Notifications')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      
      let docdata = doc._data

      if(docdata.title == `${userme._data.firstname} ${userme._data.lastname} started following you!` && docdata.toWhom == followWho){
      

        firestore()
        .collection('Notifications')
        .doc(doc.id)
        .delete()
        .then(() => {


        });      
      }
   
      });
            

  });

  if(userme._data.followingCount == 1) {

    await firestore()
    .collection('Users')
    .doc(email)
    .update({
      followingCount: userme._data.followingCount - 1,
      followings: ''
  })
    .then(async () => {
  
      
  
    }) 
  }

  if(userme._data.followingCount != 1) {
    
    await firestore()
  .collection('Users')
  .doc(email)
  .update({
    followingCount: userme._data.followingCount - 1,
    followings: removeFollow(userme._data.followings, followWho),
})
  .then(async () => {

    

  }) 
  }

  if(userthat._data.followerCount == 1) {

    await firestore()
    .collection('Users')
    .doc(followWho)
    .update({
      followerCount: userthat._data.followerCount - 1,
      followers: ''
  })
    .then(async () => {
  
      
  
    }) 
  }

  if(userthat._data.followerCount != 1) {
    
    await firestore()
  .collection('Users')
  .doc(followWho)
  .update({
    followerCount: userthat._data.followerCount - 1,
    followers: removeFollow(userthat._data.followings, followWho)
})
  .then(async () => {

    

  }) 
  }

}

export const checkFollow = async (myemail, email) => {

  console.log(myemail, email)

  const userme = await firestore().collection('Users').doc(myemail).get();

  const followings = await userme._data.followings

  const arr = await followings.split('//')
    
  const checked = await arr.includes(email)
  
  return await checked

}

export const postShower = async (email, duration, type) => {
        
  let user = await firestore().collection('Users').doc(email).get()

  await firestore()
  .collection('Showers')
  .add({
    id: email,
    duration: duration,
    calBurned: duration * 1,
  })
  .then(async () => {

        Alert.alert('Shower is done!', `You burned ${duration} calories`)

  })

  await firestore()
  .collection('Showers')
  .doc(email)
  .update({
    showerDidTimes: user._data.showerDidTimes + 1,
    avgBathTime: user._data.avgBathTime + duration / user._data.showerDidTimes,
    calBurned: user._data.calBurned + duration,
})
  .then(async () => {

    

  }) 
  
}

export const getDaysLeftEndWeek = () => {
  let date = new Date()
  let day = date.getDay();
  let remaining = day == 0 ? 1 : 8 - day
  return remaining
}

export const getRemainingGoal = (one, two) => {
  return one - two
}

export const setBioo = (val) => {
  setData('bio', val)
}

export const setProperty = async (email, firstname, lastname, bio, gender, height, weight, locationISO2, locationName) => {

  console.log(email, firstname, lastname, bio, gender, height, weight, locationISO2, locationName)

  setData('firstname',firstname)
  setData('lastname',lastname)
  setData('bio',bio)
  setData('gender',gender)
  setData('height',height)
  setData('weight',weight)
  setData('locationIso2',locationISO2)
  setData('locationName',locationName)


    firestore()
    .collection('Users')
    .doc(email)
    .update({
      firstname: firstname,
      lastname: lastname,
      bio: bio,
      gender: gender,
      height: height,
      weight: weight,
      locationISO2: locationISO2,
      locationName: locationName,
  })
    .then(async () => {
  

  
    }) 
}

export const setProperties = async (email, firstname, lastname, bio, gender, height, weight, locationISO2, locationName) => {

  firestore()
  .collection('Users')
  .doc(email)
  .update({
    firstname: firstname,
    lastname: lastname,
    bio: bio,
    gender: gender,
    height: height,
    weight: weight,
    locationISO2: locationISO2,
    locationName: locationName,
})
  .then(async () => {

    setData('firstname',firstname)
    setData('lastname',lastname)
    setData('bio',bio)
    setData('gender',gender)
    setData('height',height)
    setData('weight',weight)
    setData('locationISO2',locationISO2)
    setData('locationName',locationName)

  }) 
}

export const saveGoal = (input, is1, is2, nav) => {
  // const goal1 = isClickedFirst ? 'Cold' : 'Hot' 
  // const goal2 = isClickedFirstTime ? 'Day' : 'Week'
  // const goal3 = selectedIndex == 1 ? 'Frequency' : selectedIndex == 2 ? 'Duration' : selectedIndex == 3 ? 'Time of the day' : 'Calories'
  // const goal4 = input

  // const Goal = goal1 + '/' + goal2 + '/' + goal3 + '/' + goal4

  setData('weeklyGoalMin', Number(input))
  console.log(Number(input))

  setData('timeFrameGoal', 'This Week')

  if(is1){
    setData('bathGoal', 'cold')
  }

  if(is2){
    setData('bathGoal', 'hot')
  }

  console.log(getDataNumber('weeklyGoalMin'))

  nav.goBack()

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
