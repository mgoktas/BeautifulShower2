import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderHome, Line, OneNotification } from '../../../components/Utilities/Utilities';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { getDataString, setNotifId, storageNotifications } from '../../../components/Storage/MMKV';
import Dialog from "react-native-dialog";
import { deleteNotification } from '../../../components/Functions/Functions';

const Notifications = ({route, navigation}) => {
  const [notifications, setNotifications] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [id, setId] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)
  const email = getDataString('email')
  
  React.useEffect(() => {

    refresh()

  },[])

  const refresh = () => {
    setNotifications([])

    const keys = storageNotifications.getAllKeys() // ['user.name', 'user.age', 'is-mmkv-fast-asf']

      firestore()
      .collection(email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
          if(doc._data.toWhom == email){

        if(!keys.includes(doc.id)){
          setNotifications(arr => [...arr, {title: doc._data.title, id: doc.id}])
        }
          
          }          
          });
          
          setIsLoading(false)
        
    
      });
    
  }


  const openDialog = (id) => {
    setIsVisible(true)
    setId(id)
  }

  const closePost = (post) => {
    setNotifications((current) => 
    current.filter((item) => item.id !== post.id)
  );
  
    setNotifId(post.postId, 0)
  
  
  }

  return (

    !isLoading ? 
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
   
    <HeaderHome onPressBack={() => { navigation.goBack(); } } type={'notif'} title={'NOTIFICATIONS'} txt={'Done'} onPressR={undefined} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined} onPressShare={undefined} onPressTDots={undefined}/>

    <Dialog.Container visible={isVisible}>
    <Dialog.Title>Do you want to delete the notification!</Dialog.Title>
    <Dialog.Description>
      Click Yes or No.
    </Dialog.Description>
    <Dialog.Button label="No" onPress={() => {setIsVisible(false)}} />
    <Dialog.Button label="Yes" onPress={() => {deleteNotification(id)}} />
  </Dialog.Container>

    <OneNotification openDialog={openDialog} txt1={'Welcome to the Beautiful Shower'} txt2={'You have awarded an first login trophy!'} />
    
    <Notifications closePost={closePost} navigation={navigation} notifications={notifications} goToProfileFeed={goTo} posts={posts} onPressText={undefined} followingsList={undefined} followersList={undefined} selectedIndex={undefined} onPress1={undefined} onPress2={undefined} isSheetOn={undefined} info={undefined} name={undefined} duration={undefined} data={undefined} title={undefined} subtitle={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressRight={undefined} onPressLeft={undefined} type={undefined} text1={undefined} text2={undefined} text3={undefined} onPress={undefined} />
    <Posts closePost={closePost} navigation={navigation} goToProfileFeed={goTo} posts={posts} onPressText={undefined} followingsList={undefined} followersList={undefined} selectedIndex={undefined} onPress1={undefined} onPress2={undefined} isSheetOn={undefined} info={undefined} name={undefined} duration={undefined} data={undefined} title={undefined} subtitle={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressRight={undefined} onPressLeft={undefined} type={undefined} text1={undefined} text2={undefined} text3={undefined} onPress={undefined} />

    <Line space={undefined} type={undefined} />

    </SafeAreaView>
    :    

    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
   
        <HeaderHome onPressBack={() => { navigation.goBack(); } } type={'notif'} title={'NOTIFICATIONS'} txt={'Done'} onPressR={undefined} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined} onPressShare={undefined} onPressTDots={undefined}/>

        <Dialog.Container visible={isVisible}>
        <Dialog.Title>Do you want to delete the notification!</Dialog.Title>
        <Dialog.Description>
          Click Yes or No.
        </Dialog.Description>
        <Dialog.Button label="No" onPress={() => {setIsVisible(false)}} />
        <Dialog.Button label="Yes" onPress={() => {deleteNotification(id)}} />
      </Dialog.Container>

        <OneNotification openDialog={openDialog} txt1={'Welcome to the Beautiful Shower'} txt2={'You have awarded an first login trophy!'} />
        
        <Notifications notifications={notifications} onPressText={undefined} followingsList={undefined} followersList={undefined} selectedIndex={undefined} onPress1={undefined} onPress2={undefined} isSheetOn={undefined} info={undefined} name={undefined} duration={undefined} data={undefined} title={undefined} subtitle={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressRight={undefined} onPressLeft={undefined} type={undefined} text1={undefined} text2={undefined} text3={undefined} onPress={undefined} />

        <Line space={undefined} type={undefined} />

    </SafeAreaView>
  );
};

export default Notifications;

