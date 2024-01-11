import React, { useEffect, useState } from "react";
import { Notifications } from "react-native-notifications";
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { fbAccessToken } from "../Data/Data";
import Contacts, { getContactsByEmailAddress } from 'react-native-contacts';
import { checkUserFriends } from "../Storage/Azure";
import { getDataNumber, setData } from "../Storage/MMKV";



export type RegisterNotificationRefProps = {
  SetNotifications: () => void;
};

interface RegisterNotificationProps {
}

export const RegisterNotification = React.forwardRef<
RegisterNotificationRefProps
>((props: RegisterNotificationProps, ref) => {
  const [signinInProgress, setSigninInProgress] = useState(false)
      
  const SetNotifications = () => {
    try{
      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        setData('isNotificationsAllowed', 1)
        setData('isNotificationsAllowedBase', 1)
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
      console.error(event);
  });
    }
    catch(err){
      console.log(err)
    }
       
              
              }



  React.useImperativeHandle(ref, () => ({ SetNotifications}), [ SetNotifications]);

})

export type ConnectToFacebookRefProps = {
connectFB: () => void;
}

  
export interface ConnectToFacebookProps {
}


export const ConnectToFacebookSheet = React.forwardRef<ConnectToFacebookRefProps, ConnectToFacebookProps>(({}, ref) => {

// //Create response callback.
//  const responseInfoCallback = async (error, result) => {
//   if (error) {
//     console.log('Error fetching data: ' + error.toString());
//     console.log(Object.keys(error));// print all enumerable 
//     console.log(error.errorMessage); // print error message
//     // error.toString() will not work correctly in this case
//     // so let use JSON.stringify()
//     const meow_json = JSON.stringify(error); // error object => json 
//     console.log(meow_json); // print JSON 
//   } else {
//     console.log('Success fetching data: ' + result.toString());
//     console.log(Object.keys(result)); 
//     const meow_json = JSON.stringify(result.data); // result => JSON
//     console.log(meow_json); // print JSON
//   } 
// }

// // Create a graph request asking for user information with a callback to handle the response.
// const infoRequest = new GraphRequest(
//   '/me/friends',
//   {
//     parameters: {
//       fields: {
//         string: 'email,name,first_name,middle_name,last_name,uid', // what you want to get
//       },
//       access_token: {
//         string: fbAccessToken.toString() // put your accessToken here
//       },
      
//     }
//   },
//   responseInfoCallback,
// );

// // Start the graph request.

// const connectFB = () => {
//   console.log('khkh')
//   new GraphRequestManager().addRequest(infoRequest).start();
// }

// React.useImperativeHandle(ref, () => ({ connectFB}), [ connectFB]);



})

export type ConnectContactsRefProps = {
  connectContact: () => void;
  }

    
  export interface ConnectContactsProps {
    openDialog: Function
  }
  
  
  export const ConnectContactSheet = React.forwardRef<ConnectContactsRefProps, ConnectContactsProps
  >((props: ConnectContactsProps, ref) => {

  
  const [list, setList] = useState([])
  const [listCon, setListCon] = useState([])
    
  const connectContact = async () => {
      try{
          setData('isContactsNotPermitted', 1)
          await Contacts.getAll().then(async contacts => {
           

            contacts.map((key) => {
              setList(list => [...list,  key.emailAddresses[0].email])
            })


            await checkUserFriends(list)

            setListCon(contacts)

          if(getDataNumber('isContactsPermitted') == 1) {
          }
          
          })
      } catch(err) {
          console.log(err)

          if(getDataNumber('isContactsNotPermitted') == 1) {
            props.openDialog()
          }

      }
    }

  
  React.useImperativeHandle(ref, () => ({ connectContact}), [ connectContact]);
  
  })