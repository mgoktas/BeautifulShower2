import { ImageBackground, SafeAreaView } from "react-native"
import { ChallengeContent, Choose, Discover, FollowerList, Followers, Followings, HeaderHome, Line, SCREEN_HEIGHT, SCREEN_WIDTH, SmallLine, Space, Target } from "../../../components/Utilities/Utilities"
import { View } from "react-native"
import { Text } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { FlashList } from "@shopify/flash-list"
import { azureConstant, datablogs } from "../../../components/Data/Data"
import { shareMyProfile } from "../../../components/Functions/2-FunctionsCommunity"


export const Connections = ({route, navigation}) => {
    // const {data} = route.params

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const flatlistRef = useRef()
    const [isLoading, setIsLoading] = useState(true)

    const changeFollowings = (name) => {
      const newState = followings.map(obj => {

        if (obj.name == name.name) {
          if (obj.id == 100){
            
            // removeFromFollowingList(obj) //remove from my followings list
          return {...obj, id: 10};
          } else {

            // addToFollowingList(obj) //add to my followings list
            return {...obj, id: 100};

          }

        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      setFollowings(newState);
    };

    const changeFollowers = (name) => {
      const newState = followers.map(obj => {

        if (obj.name == name.name) {
          if (obj.id == 100){
            
            // removeFromFollowingList(obj) //remove from my followings list
          return {...obj, id: 10};
          } else {

            // addToFollowingList(obj) //add to my followings list
            return {...obj, id: 100};

          }

        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      setFollowers(newState);
    };
            
    useEffect(() => {
      dataFetch()
  },[])

  const dataFetch = async () => {
    await dataFetch1()
    await dataFetch2()
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
      setFollowers(json.slice(0,5))
      setIsLoading(false)
  })
  .catch(error => {
      console.error(error);
  });

    }

    const dataFetch2 = async () => {

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
        setFollowings(json.slice(5,10))
        setIsLoading(false)
    })
    .catch(error => {
        console.error(error);
    });
  
      }

    return (
        <SafeAreaView>
            <HeaderHome onPressBack={() => { navigation.goBack() } } type={'notif'} title={'CONNECTIONS'} txt={'Done'} onPress={undefined} onPress0={undefined} onPress1={undefined} onPress2={undefined}/>
           
                <Line space={undefined} />
                {/* <FlashList
                  estimatedItemSize={306}
                  ref={flatlistRef}
                  pagingEnabled={true}
                  data={[0,1]}
                  renderItem={renderItems}
                  horizontal={true}
                //   keyExtractor={item => item}
                //   extraData={`${items.length}`}
                  showsHorizontalScrollIndicator={true}></FlashList> */}
                <FollowerList navigation={navigation} changeFollowings={changeFollowings} changeFollowers={changeFollowers} followers={followers} followings={followings}  onPressText={shareMyProfile} onPress2={() => { setSelectedIndex(1) } } selectedIndex={selectedIndex} onPress1={() => { setSelectedIndex(0) } } isSheetOn={false} type={5} onPressRight={() => { } } title={'OUR BLOG'} subtitle={'PAST CHALLENGES'} data={datablogs} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} info={undefined} name={undefined} duration={undefined} text11={undefined} text12={undefined} text21={undefined} text22={undefined} onPressLeft={undefined} onPress={undefined} />
        
        </SafeAreaView>        
    )
}

export default Connections