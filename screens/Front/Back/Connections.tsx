import { ImageBackground, SafeAreaView } from "react-native"
import { ChallengeContent, Choose, Discover, FollowerList, Followers, Followings, HeaderHome, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target } from "../../../components/Utilities/Utilities"
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


export const Connections = ({route, navigation}) => {

    const {which} = route.params

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const flatlistRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = React.useState(getDataString('email'))
    const [users, setUsers] = React.useState([])

    const changeFollowings = async (user) => {
      setFollowings((current) => 
      current.filter((item) => item.email !== user.email)
    );    

      await unFollowPerson(email, user.email)

  };

    const changeFollowers = async (user) => {
      setFollowers((current) => 
      current.filter((item) => item.email !== user.email)
    );    

      await followPerson(email, user.email)

};


useFocusEffect(
  React.useCallback(() => {
    
    if(which == 1){
      
    }    

  }, [])
);

    const addUsers = async () => {

      setFollowers([])
      setFollowings([])


      await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async (doc) => {
          
          let docData = doc._data

          if(await checkFollow(email, docData.email)){
            setFollowings(arr => [...arr, {
              name: docData.firstname + ' ' + docData.lastname, 
              email: docData.email,  
            }])
          }
          
       
          });

      });

      
      await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async (doc) => {
          
          let docData = doc._data

          console.log(await checkFollow(docData.email, email), docData.email)
          

          if(await checkFollow(docData.email, email)){
            setFollowers(arr => [...arr, {
              name: docData.firstname + ' ' + docData.lastname, 
              email: docData.email,  
            }])
          }
          
       
          });

          setIsLoading(false)
    
      });
      
    }
            
    useEffect(() => {
      addUsers()
  },[])

    return (
        <SafeAreaView>
            <HeaderHome onPressBack={() => { navigation.goBack() } } type={'notif'} title={'CONNECTIONS'} txt={'Done'} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined}/>
           
                <Line space={undefined} />
                
                <FollowerList navigation={navigation} changeFollowings={changeFollowings} changeFollowers={changeFollowers} followers={followers} followings={followings}  onPressText={()=>{shareMyProfile(email)}} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} />
        
        </SafeAreaView>        
    )
}

export default Connections