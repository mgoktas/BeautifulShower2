import React, { useState } from "react"
import { Linking } from "react-native"

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
        console.log(url)
        const a = url.split('.com/')[1].split('?')[0]
        
        console.log(a)
  
  
        if(a == 'success') {
          setInitialUrl('yes')
          console.log(initialUrl)
        }
  
      }
    })
    .catch((e) => {})}

    const getLinks2 = () => {
        Linking.addEventListener('url', ({url}) =>{
            if (url) {
              console.log(url)
              const a = url.split('.com/')[1].split('?')[0]
              
              console.log(a)
          
          
              if(a == 'success') {
                setInitialUrl('yes')
                console.log(initialUrl)
                //   RootNavigation.navigate('Settings', {success: 'yes'})
              }
          
            }
          })
    }

    React.useImperativeHandle(ref, () => ({ getLinks1, getLinks2}), [ getLinks1, getLinks2]);

  })