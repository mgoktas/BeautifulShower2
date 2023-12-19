import React, { useCallback } from "react";
import { Linking, Share } from "react-native";
import Contacts, { getContactsByEmailAddress } from 'react-native-contacts';


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
            await Contacts.getAll().then(contacts => {
             console.log(contacts)
            })
        } catch(err) {
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

  export const shareMyProfile = (user) => {

    const content = {
      message: `Follow me on Beautiful Shower`
    }

    

    // Share.share()
  }