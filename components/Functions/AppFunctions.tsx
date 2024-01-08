import React, { useState } from "react"
import { Linking } from "react-native"
import firestore from '@react-native-firebase/firestore';
import { setData } from "../Storage/MMKV";

export const getLinks = () => {
    
}

export type GetLinksRefProps = {
    getLinks1: () => void;
    getLinks2: () => void;
  };
  
  interface GetLinksProps {
  }
  
  export const GetLinks = React.forwardRef<
  GetLinksRefProps
  >((props: GetLinksProps, ref) => {

    const [initialUrl, setInitialUrl] = useState('')

    const getLinks1 = () => { 
        
    Linking.getInitialURL()
    .then((url) => {
      if (url) {
        const a = url.split('.com/')[1].split('?')[0]
        
  
  
        if(a == 'success') {
          setInitialUrl('yes')
        }
  
      }
    })
    .catch((e) => {})}

    const getLinks2 = () => {
        Linking.addEventListener('url', ({url}) =>{
            if (url) {
              const a = url.split('.com/')[1].split('?')[0]
              
          
          
              if(a == 'success') {
                setInitialUrl('yes')
                //   RootNavigation.navigate('Settings', {success: 'yes'})
              }
          
            }
          })
    }

    React.useImperativeHandle(ref, () => ({ getLinks1, getLinks2}), [ getLinks1, getLinks2]);

  })
  
export const addUserDataToMMKV = async ( email, navigation) => {
  
  let userData = await firestore().collection('Users').doc(email).get()._data
  
  try {

    setData('email', email)
    setData('firstname', userData.firstname)
    setData('lastname', userData.lastname)
    setData('gender', userData.gender)
    setData('locationISO2', userData.countryIso)
    setData('locationName', userData.country)
    setData('birthdateDATE', userData.birthdateDATE)
    setData('birthdateName', userData.birthDate)
    setData('showerdays', userData.showerdays)
    setData('height', userData.height)
    setData('weight', userData.weight)
    setData('goals', userData.goals)
    
    await navigation.navigate('Tabs')

  }
  catch(err)
  {



  }

}



