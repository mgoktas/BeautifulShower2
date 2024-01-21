import { Alert, ImageBackground, SafeAreaView } from "react-native"
import { ChallengeContent, Choose, Discover, FollowerList, Followers, Followings, HeaderHome, Line, MyDialog, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target, PostList } from "../../../components/Utilities/Utilities"
import { View } from "react-native"
import { Text } from "react-native"
import React, { useEffect, Postef, useState } from "react"
import { FlashList } from "@shopify/flash-list"
import { azureConstant, datablogs } from "../../../components/Data/Data"
import { shareMyProfile } from "../../../components/Functions/2-FunctionsCommunity"
import firestore from '@react-native-firebase/firestore';
import { checkFollow, followPerson, unFollowPerson } from "../../../components/Functions/Functions"
import { getDataString, setData } from "../../../components/Storage/MMKV"
import { useFocusEffect } from "@react-navigation/native"
import { Button, Dialog, Portal, PaperProvider, Text as Text2, TextInput } from 'react-native-paper';


export const Posts = ({route, navigation}) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = React.useState(getDataString('email'))
    const [selectedPost, setSelectedPost] = React.useState({
      postTitle: '',
      postText: '',
      postId: '',
    })
    const [posts, setPosts] = React.useState([])
    const [isVisible, setIsVisible] = React.useState(false);
    const [isVisible2, setIsVisible2] = React.useState(false)
    const [postId, setPostId] = React.useState("");
    const [postTitle, setPostTitle] = React.useState("");
    const [postText, setPostText] = React.useState("");


    const addPosts = async () => {

      setPosts([])
      firestore()
      .collection('Posts')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async(doc) => {
          
             setPosts(arr => [...arr, {uuid: uuid.v4(), id: doc._data.id,  byWho:doc._data.id, followercount: doc._data.followercount, postDate: doc._data.postDate, postTitle: doc._data.postTitle, postText:doc._data.postTxt, postId: doc.id}])
       
          });
                
      });

          setIsLoading(false)
      
    }
            
    useEffect(() => {
      addPosts()
  },[])

  const openPost = (post) => {
    setSelectedPost(post)
    setIsVisible(true);
  }

  const delPost = (post) => {

    setSelectedPost(post)

    firestore()
      .collection('Posts')
      .doc(post.postId)
      .delete()
      .then(() => {
        setIsVisible(false)
        Alert.alert('Post succesfully deleted!');
      });  
    
    }

  const editPost = () => {
    setIsVisible(false)
    setIsVisible2(true);
  }

  const hideDialog2 = () => {
    setIsVisible2(false)
  }

  const hideDialog = () => {
    setIsVisible(false)
  }

  const savePost = () => {

    firestore()
    .collection('Posts')
    .doc(selectedPost.postId)
    .update({
      postTitle: postTitle,
    postText: postText,
    })
    .then(async () => {
  
      Alert.alert('Post succesfully updated!');
  
    }) 
  }

    return (
                    <PaperProvider>
        <SafeAreaView>

      <View>
        <Portal>
          <Dialog visible={isVisible} onDismiss={hideDialog}>
            <Dialog.Title>Post Info: </Dialog.Title>
            <Dialog.Content>
                <Text2 variant="bodyMedium">Post Name: {selectedPost.name}</Text2>
                <Text2 variant="bodyMedium">Post Email: {selectedPost.email}</Text2>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={delPost}>Delete Post</Button>
              <Button onPress={editPost}>Edit Post</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
            <HeaderHome onPressBack={() => { navigation.goBack() } } type={'notif'} title={'Posts'} txt={'Done'} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined}/>
           
                <Line space={undefined} />
      <View>
        <Portal>
          <Dialog visible={isVisible2} onDismiss={hideDialog2}>
            <Dialog.Title>Post Info: </Dialog.Title>
            <Dialog.Content>
                <Text2 variant="bodyMedium">Old Post Name: {selectedPost.name}</Text2>
                <Text2 variant="bodyMedium">Old Post Email: {selectedPost.email}</Text2>

                <TextInput
        label="New Post Title"
        value={postTitle}
        onChangeText={text => setPostTitle(text)}
      />
                      <TextInput
        label="New Post Text"
        value={postText}
        onChangeText={text => setPostText(text)}
      />


            </Dialog.Content>
            <Dialog.Actions>

              <Button onPress={hideDialog2}>Cancel</Button>
              <Button onPress={savePost}>Save Data</Button>

            </Dialog.Actions>
          </Dialog>


        </Portal>
      </View>
                {/* <FollowerList navigation={navigation} changeFollowings={()=>{}} changeFollowers={()=>{}} followers={followers} followings={followings}  onPressText={()=>{shareMyProfile(email)}} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} /> */}
                
                <PostList openPost={openPost} posts={posts} navigation={navigation} Posts={Posts}  onPressText={()=>{shareMyProfile(email)}} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} />
        
        </SafeAreaView>        
    </PaperProvider>
    )
}

export default Posts