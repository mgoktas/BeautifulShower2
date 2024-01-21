import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { Discover, HeaderHome, Line, PremiumBox, Space } from '../../components/Utilities/Utilities';
// import Contacts from 'react-native-contacts';
import { data } from '../../components/Data/Data';
import { GetAllContacts, GetAllContactsRefProps } from '../../components/Functions/2-FunctionsCommunity';
import { ConnectToFacebookRefProps, ConnectToFacebookSheet } from '../../components/Functions/PermissionFunctions';

const Community = ({route, navigation}) => {

    const [name, setName] = React.useState('Muhammet')
    
    const contactRef = React.useRef<GetAllContactsRefProps>(null);
    const getContacts = React.useCallback(() => {
      contactRef?.current?.getContacts()
    }, []);

    const metaRef = React.useRef<ConnectToFacebookRefProps>(null);
    const connectFriendsFromFacebook = React.useCallback(() => {
      metaRef?.current?.connectFB()
    }, []);


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white',}}>

        <HeaderHome title={'COMMUNITY'} type={5} />
        <Line />
        
        <ScrollView> 
      
            {/* <Discover onPress={() => {navigation.navigate('OneChallenge', {data: {title: data[0].title, time: data[0].duration, count: data[0].count, image: data[0].image, desc: data[0].desc, dateDesc: data[0].dateDesc}})}} type={2} onPressRight={() => {getContacts()}} title={'CHALLENGES'} subtitle={''} data={data} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}
            
            {/* <Discover type={3} onPressRight={() => {getContacts()}} title={'EVENTS'} subtitle={'PAST EVENTS'} data={data} text1={'COLD IS MERCILESS'} text2={'STARTS IN 5 DAYS'} text3={'257.306 PARTICIPANTS'} /> */}

            {/* <Discover duration={'0 mins'} name={name} info={'Track a session to participate in the leaderboard'} type={3} title={'LEADERBOARD'} subtitle={'PAST CHALLENGES'} data={data}/> */}
            

            {/* <Discover type={true} onPressLeft={() => {connectFriendsFromFacebook()}} onPressRight={() => {getContacts()}} title={'DISCOVER PEOPLE'} text21={'Contacts'} text22={'Follow people you know'} text11={'Facebook'} text12={'Follow friends from Facebook'} text3={true ? 'CONNECTED' : 'CONNECT'}  /> */}

        
            <Discover onPress={() => {navigation.navigate('Connections', {which: 0})}} duration={'0 mins'} name={'Followers & Following'} info={'Get inspired and motivate others'} type={4} title={'CONNECTIONS'} data={data}/>

            <Space space={50} />

            {/* <Discover duration={'0 mins'} name={'Groups & Communities'} info={'Longeivty is more fun together'} type={4} title={'GROUPS & COMMUNITIES'} data={data}/> */}


            <GetAllContacts ref={contactRef}/>

            <Space space={50} />

        </ScrollView>

        <ConnectToFacebookSheet ref={metaRef} />

    </SafeAreaView>
  );
};

export default Community;

