import { Image, ImageBackground, SafeAreaView, TouchableOpacity } from "react-native"
import { ChallengeContent, HeaderHome, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target } from "../../../components/Utilities/Utilities"
import { View } from "react-native"
import { Text } from "react-native"
import React from "react"
import { getImage, goToProfile } from "../../../components/Functions/Functions"
import firestore from '@react-native-firebase/firestore';


export const OnePost = ({route, navigation}) => {

    const {data, postId} = route.params

    const [post, setPost] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {

      
        firestore()
        .collection('Posts')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            
            if(doc.id == postId){
                setPost({email:doc._data.id, postId: doc.id,  byWho:doc._data.byWho, followercount: doc._data.followercount, postDate: doc._data.postDate, postTitle: doc._data.postTitle, postText:doc._data.postTxt, })
            }

              
            });
            
            
            setIsLoading(false)
      
        });
      
      },[])

    return (
        <SafeAreaView>
        <HeaderHome onPressBack={() => {navigation.goBack()}} type={'notif'} title={data.title} txt={'Done'}/>
        <View>
              
              <View style={{flexDirection: 'row', alignContent: 'center', marginVertical: 5, justifyContent: 'space-around', width: SCREEN_WIDTH}}>

          <TouchableOpacity activeOpacity={.8} onPress={goToProfile(navigation, post.email)}>
                <Image borderRadius={40} width={50} height={50}
          style={{width: 50, height: 50, marginHorizontal: 10, borderRadius: 40, marginVertical: 15}}
          source={{uri :getImage(post.email)}}
        />
          </TouchableOpacity>

                <View style={{justifyContent: 'space-around', height: 80, width: '50%', alignItems: 'flex-start', right: 20}}>
                  <Text style={{fontWeight: '600'}}>
                    {post.byWho}
                  </Text>
                  <Text>
                    {post.followercount}
                  </Text>
                  <Text>
                    {post.postDate}
                  </Text>
                </View>

            <View style={{flexDirection: 'row', width: '15%', justifyContent: 'space-between', alignSelf: 'flex-start', top: 5}}>
              <TouchableOpacity onPress={onPressDots}>
                <IconE color={'gray'} size={20} name='dots-three-horizontal'/> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {closePost(item.uuid)}}>
                <IconF5 color={'gray'} size={20} name='times'/>
              </TouchableOpacity>
  
            </View>
            
              </View>




              <Text style={{justifyContent: 'center', alignSelf: 'flex-start', fontSize: 19, fontWeight: '600', marginHorizontal: 30}}>{item.postTitle}</Text>
              <Text style={{justifyContent: 'center', alignSelf: 'flex-start', marginHorizontal: 30}}>{item.postText}</Text>

              {/* <SmallButton isFollowing={item.id == 100 ? true : false} onPress={() => { changeFollowers(item); } } txt={'FOLLOW'} txt2={'UNFOLLOW'} type={undefined}/> */}
          
              <Line type={3} space={undefined}/>


          </View>
        </SafeAreaView>        
    )
}

export default OnePost