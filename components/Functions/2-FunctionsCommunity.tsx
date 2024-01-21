import React, { useCallback } from "react";
import { Linking, PermissionsAndroid, Platform, Share } from "react-native";
// import Contacts, { getContactsByEmailAddress } from 'react-native-contacts';
import messages from "../../screens/Front/Back/messages";


  export type GetAllContactsRefProps = {
    getContacts: () => void;
    goTo: () => void;
    
  };
  
  interface GetAllContactsProps {
  }
  
  export const GetAllContacts = React.forwardRef<
  GetAllContactsRefProps
  >((props: GetAllContactsProps, ref) => {


    const getContacts = async () => {

      try{
        // if(Platform.OS == 'android') {
        //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        //     title: 'Contacts',
        //     message: 'This app would like to view your contacts.',
        //     buttonPositive: 'Please accept bare mortal',
        // })
        //     .then((res) => {
        //         Contacts.getAll()
        //             .then((contacts) => {
        //                 // work with contacts
        //             })
        //             .catch((e) => {
        //             }); 
        //     })
        //     .catch((error) => {
        //         console.error('Permission error: ', error);
        //     });
        // }
  
        // if(Platform.OS == 'ios') {
  
        //   try{
        //       await Contacts.getAll().then(contacts => {
        //       })
        //   } catch(err) {
        //       console.log(err)
        //   }
        // }
      }
      catch(err){
        console.log(err)
      }      

   
      
      }

    const goTo = useCallback(async (url) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    }, [])

    React.useImperativeHandle(ref, () => ({ getContacts, goTo}), [ getContacts, goTo]);

  })

  export const shareMyProfile = (email) => {
    
    const content = {
      message: `Follow me on Beautiful Shower \n beautifulshower://userprofile/${email}`
    }

    let options = {
      title: `Follow Me`,
      message: `Follow me on Beautiful Shower {'\n'} \n beautifulshower://userprofile/${email}`,
    };
    
    Share.share(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });    
    
  }