import { Alert, ImageBackground, SafeAreaView } from "react-native"
import { ChallengeContent, Choose, Discover, FollowerList, Followers, Followings, HeaderHome, Line, MyDialog, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target, UserList } from "../../../components/Utilities/Utilities"
import { View } from "react-native"
import { Text } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { FlashList } from "@shopify/flash-list"
import { azureConstant, datablogs } from "../../../components/Data/Data"
import { shareMyProfile } from "../../../components/Functions/2-FunctionsCommunity"
import firestore from '@react-native-firebase/firestore';
import { checkFollow, followPerson, unFollowPerson } from "../../../components/Functions/Functions"
import { getDataString, setData } from "../../../components/Storage/MMKV"
import { useFocusEffect } from "@react-navigation/native"
import { Button, Dialog, Portal, PaperProvider, Text as Text2, TextInput } from 'react-native-paper';


export const Users = ({route, navigation}) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = React.useState(getDataString('email'))
    const [users, setUsers] = React.useState([])
    const [selectedUser, setSelectedUser] = React.useState({
      firstname: '',
      lastname: '',
      email: '',
      name: '',
    })
    const [posts, setPosts] = React.useState([])
    const [isVisible, setIsVisible] = React.useState(false)
    const [isVisible2, setIsVisible2] = React.useState(false)
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [newEmail, setNewEmail] = React.useState("");


    const addUsers = async () => {

      setUsers([])

      await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async (doc) => {
          
          let docData = doc._data

            setUsers(arr => [...arr, {
              firstname: docData.firstname, 
              lastname: docData.lastname, 
              name: docData.firstname + ' ' + docData.lastname, 
              email: docData.email,  
            }])
          
       
          });

          setIsLoading(false)
    
      });
      
    }
            
    useEffect(() => {
      addUsers()
      // addPosts()
  },[])

  const openUser = (user) => {
    setSelectedUser(user)
    setIsVisible(true);
  }

  const delUser = (user) => {

    setSelectedUser(user)

    firestore()
      .collection('Users')
      .doc(user.email)
      .delete()
      .then(() => {
        setIsVisible(false)
        Alert.alert('User succesfully deleted!');
      });  
    
    }

  const editUser = () => {
    setIsVisible(false)
    setIsVisible2(true);
  }

  const hideDialog2 = () => {
    setIsVisible2(false)
  }

  const hideDialog = () => {
    setIsVisible(false)
  }

  const saveUser = () => {

    firestore()
    .collection('Users')
    .doc(selectedUser.email)
    .update({
    firstname: firstname,
    lastname: lastname,
    email: email,
    })
    .then(async () => {
  
      Alert.alert('User succesfully updated!');
  
    }) 
  }

    return (
                    <PaperProvider>
        <SafeAreaView>

      <View>
        <Portal>
          <Dialog visible={isVisible} onDismiss={hideDialog}>
            <Dialog.Title>User Info: </Dialog.Title>
            <Dialog.Content>
                <Text2 variant="bodyMedium">User Name: {selectedUser.name}</Text2>
                <Text2 variant="bodyMedium">User Email: {selectedUser.email}</Text2>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={delUser}>Delete User</Button>
              <Button onPress={editUser}>Edit User</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
            <HeaderHome onPressBack={() => { navigation.goBack() } } type={'notif'} title={'USERS'} txt={'Done'} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined}/>
           
                <Line space={undefined} />
      <View>
        <Portal>
          <Dialog visible={isVisible2} onDismiss={hideDialog2}>
            <Dialog.Title>User Info: </Dialog.Title>
            <Dialog.Content>
                <Text2 variant="bodyMedium">Old user Name: {selectedUser.name}</Text2>
                <Text2 variant="bodyMedium">Old user Email: {selectedUser.email}</Text2>

                <TextInput
        label="New User Name"
        value={firstname}
        onChangeText={text => setFirstname(text)}
      />
                      <TextInput
        label="New User Surname"
        value={lastname}
        onChangeText={text => setLastname(text)}
      />

                      <TextInput
        label="New User Email"
        value={newEmail}
        onChangeText={text => setNewEmail(text)}
      />

            </Dialog.Content>
            <Dialog.Actions>

              <Button onPress={hideDialog2}>Cancel</Button>
              <Button onPress={saveUser}>Save Data</Button>

            </Dialog.Actions>
          </Dialog>


        </Portal>
      </View>
                {/* <FollowerList navigation={navigation} changeFollowings={()=>{}} changeFollowers={()=>{}} followers={followers} followings={followings}  onPressText={()=>{shareMyProfile(email)}} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} /> */}
                
                <UserList openUser={openUser} users={users} navigation={navigation} users={users}  onPressText={()=>{shareMyProfile(email)}} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} />
        
        </SafeAreaView>        
    </PaperProvider>
    )
}

export default Users