import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, OneItemSummary, SCREEN_HEIGHT, Space } from '../../components/Utilities/Utilities';
// import Contacts from 'react-native-contacts';
import { data, datablogs } from '../../components/Data/Data';
import { getDataNumber, getDataString, setData, setDocId, storage } from '../../components/Storage/MMKV';
import { AddPersonSheet, AddPersonSheetRefProps, AddPostSheet, AddPostSheetRefProps } from '../../components/Functions/1-Feed';
import { ConnectContactSheet, ConnectContactsRefProps, ConnectToFacebookRefProps, ConnectToFacebookSheet } from '../../components/Functions/PermissionFunctions';
import { SignWithFacebook, SignWithFacebookRefProps } from '../../components/Functions/AuthFunctions';
import { Linking } from 'react-native';
import { createUser, createUser2, createUserEmail, createUserNew } from '../../components/Storage/Azure';
import { useFocusEffect } from '@react-navigation/native';
import { Animation, Posts, addUsers, checkFollow, goToProfile, reportPost, reportUser, sharePost } from '../../components/Functions/Functions';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import uuid from 'react-native-uuid';
import IconI from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog";
import IconMa from 'react-native-vector-icons/MaterialIcons'

const Feed = ({route, navigation}) => {
  
  useFocusEffect(
    React.useCallback(() => {
      
      const add = route.params == undefined ? '' : 'add'

    }, [])
  );

  const [name, setName] = React.useState(`${getDataString('firstname')} ${getDataString('lastname')}`)
  const [when, setWhen] = React.useState('')
  const [activity, setActivity] = React.useState('Cold Bath')
  const [duration, setDuration] = React.useState(5)
  const [selectedPost, setSelectedPost] = React.useState(0)
  const [burned, setBurned] = React.useState(1)
  const [email, setEmail] = React.useState(getDataString('email'))
  const [posts, setPosts] = React.useState([])
  const [isSheetOn, setIsSheetOn] = React.useState(false)
  const [isVisibleDots, setIsVisibleDots] = React.useState(false)
  const [isSheetOn2, setIsSheetOn2] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [didCheckThisWeek, setDidCheckThisWeek] = React.useState(getDataNumber('didCheckThisWeek') == 0)
  const [didCheckThisWeek2, setDidCheckThisWeek2] = React.useState(getDataNumber('didCheckThisWeek2') == 0)
  
  const d = new Date();
  let day = d.getDay();

  useFocusEffect(
    React.useCallback(() => {
      
      if(!didCheckThisWeek && day == 1){
        setData('weeklySpentBath', 0)
        setData('weeklyTimes', 0)
        setData('didCheckThisWeek', 1)
      }
  
    }, [])
  );

const ref = React.useRef<AddPersonSheetRefProps>(null);
const openSheet = React.useCallback(() => {
  ref?.current?.scrollTo(-400)
}, []);

const refPost = React.useRef<AddPostSheetRefProps>(null);
const AddPost = React.useCallback(() => {
  refPost?.current?.scrollTo(-400)
}, []);

const openSheet2 = React.useCallback(() => {
  ref?.current?.openSheet2()
}, []);

const setSheet = (id) => {
  setIsSheetOn(false)

  id == 2 ? setIsSheetOn2(false)  : {}

}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

React.useEffect(() => {

refresh()
},[])

const refresh = () => {
  setPosts([])
  setIsLoading(true)

  const keys = storage.getAllKeys() // ['user.name', 'user.age', 'is-mmkv-fast-asf']

  console.log(keys)

  firestore()
  .collection('Posts')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(async(doc) => {
      
      // if(!keys.includes(doc.id)){

      //  if(await checkFollow(email, doc._data.id)){
         setPosts(arr => [...arr, {uuid: uuid.v4(), id: doc._data.id,  byWho:doc._data.id, followercount: doc._data.followercount, postDate: doc._data.postDate, postTitle: doc._data.postTitle, postText:doc._data.postTxt, postId: doc.id}])
      //  }
      
      // }
   
      });
            
      setIsLoading(false)

  });
}

const closePost = (post) => {
  setPosts((current) => 
  current.filter((item) => item.uuid !== post.uuid)
);

  setDocId(post.postId, 0)


}

const openDialogDots = (item) => {
  setSelectedPost(item)
  setIsVisibleDots(true)
}

const goTo = (email) => {
  goToProfile(navigation, email)
}

const openPost = (item) => {
  navigation.navigate('OnePost', {item: item.postId})
}

  return (

    !isLoading ? 
    <SafeAreaView style={{ backgroundColor: isSheetOn || isSheetOn2 ? 'gray' : 'white', height: SCREEN_HEIGHT}}>

    <HeaderHome title={'FEED'}
  onPressR={refresh}
  onPress0={() => { openSheet(); openSheet2(); setIsSheetOn(true); } }
  onPress1={() => { AddPost(); setIsSheetOn2(true); } }
  onPress2={() => { navigation.navigate('Notifications2'); } } onPress={undefined} txt={undefined} type={undefined} onPressBack={undefined} onPressShare={undefined} onPressTDots={undefined}          />
    <Line space={undefined} type={undefined} />

    <Dialog.Container contentStyle={{borderRadius: 30,}} visible={isVisibleDots}>
      <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => {sharePost(selectedPost.postTitle, selectedPost.postText, selectedPost.postId, selectedPost.byWho); setIsVisibleDots(false);}} >
        <IconI name={'share-outline'} size={18} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Share
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => {reportPost(selectedPost.postTitle, selectedPost.postText, selectedPost.postId, selectedPost.byWho, selectedPost.id); setIsVisibleDots(false);  Alert.alert('Report Success')}} >
        <IconMa name={'report-gmailerrorred'} size={18} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Report
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => {reportUser(selectedPost.byWho); setIsVisibleDots(false);  Alert.alert('Block Success')}} >
      <IconMa name={'block'} size={18} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Block user
        </Text>
      </TouchableOpacity>
        <Dialog.Button label="Cancel" onPress={() => {setIsVisibleDots(false)}} />
    </Dialog.Container>

    {/* <ScrollView scrollEnabled={true}> */}

      <OneItemSummary type={'p'} txt1={name} txt2={when} txt3={activity} txt4={duration} txt5={burned} txt6={'Duration'} txt7={'Calories'} txt8={undefined} /> 

      <Posts openPost={openPost} closePost={closePost} onPressDots={openDialogDots} openSheet={openSheet} navigation={navigation} goToProfileFeed={goTo} posts={posts} onPressText={undefined} followingsList={undefined} followersList={undefined} selectedIndex={undefined} onPress1={undefined} onPress2={undefined} isSheetOn={undefined} info={undefined} name={undefined} duration={undefined} data={undefined} title={undefined} subtitle={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressRight={undefined} onPressLeft={undefined} type={undefined} text1={undefined} text2={undefined} text3={undefined} onPress={undefined} />
      
      {/* <Discover isSheetOn={isSheetOn} type={5} onPressRight={() => {getContacts()}} title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} />

      <Discover isSheetOn={isSheetOn} type={6} onPressRight={() => {getContacts()}} title={'FEATURED CHALLENGES'} subtitle={'DISMISS'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} />

      <Discover type={2} onPressRight={() => {getContacts()}} title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}

      {/* <ConnectToFacebookSheet ref={refFB}/>
      <SignWithFacebook ref={refMeta} />
      <ConnectContactSheet openDialog={openDialog}  ref={refCon}/> */}

{/* </ScrollView> */}


      <AddPersonSheet email={email} isSheetOn={isSheetOn} setSheet={setSheet} ref={ref}/>
      {/* <AddPersonSheet isSheetOn={isSheetOn} setSheet={setSheet} connectCon={connectContact} ref={ref}/> */}
      <AddPostSheet name={name} setSheet={setSheet} ref={refPost} connectCon={undefined} isSheetOn={undefined}/>

  </SafeAreaView>

    :

    <View style={{backgroundColor: 'white', height: SCREEN_HEIGHT}}>

    <Animation />

    </View>
  );
};

export default Feed;

 