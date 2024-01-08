import RNFetchBlob from "rn-fetch-blob";
import { localhost } from "../Data/Data";
import { setData } from "./MMKV";

export const putImage = async (file, email) => {


    const customBlobName = email
     
    const sasContainerUri = 'https://csb10032003198f8088.blob.core.windows.net/avatarcontainer-beautifulshower'

    const sasToken =
      "sp=racwdl&st=2023-11-27T05:24:42Z&se=2024-11-27T13:24:42Z&sip=0.0.0.0-255.255.255.255&sv=2022-11-02&sr=c&sig=MFni%2Buwpy933l6QZaTshJLqQIz%2BiIYHNbyC0bLaqzGo%3D"; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
    
    const localUri = file.uri.replace('file://', '')
    
    const assetPath = `${sasContainerUri}/${customBlobName}`;
    
        try {
          await RNFetchBlob.fetch(
            "PUT",
            `${assetPath}?${sasToken}`,
            {
              "x-ms-blob-type": "BlockBlob",
              "content-type": "application/octet-stream",
              "x-ms-blob-content-type": file.type
            },
            RNFetchBlob.wrap(localUri)
          );
          console.log("success");
        } catch (e) {
          console.log("Error at saving image into Azure Storage", e);
        }

}

export const putBackgroundImage = async (file, email) => {

  console.log('back')

  const customBlobName = email
   
  const sasContainerUri = 'https://csb10032003198f8088.blob.core.windows.net/wallpapercontainer-beautifulshower'

  const sasToken =
    "sp=racwd&st=2023-11-27T15:35:55Z&se=2024-11-27T23:35:55Z&sip=0.0.0.0-255.255.255.255&sv=2022-11-02&sr=c&sig=Ytd8mCzuwplP2uRFkr%2BhlNtmh12OJl4drEYijd8%2Bqqg%3D"; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
  
  const localUri = file.uri.replace('file://', '')
  
  const assetPath = `${sasContainerUri}/${customBlobName}`;
  
      try {
        await RNFetchBlob.fetch(
          "PUT",
          `${assetPath}?${sasToken}`,
          {
            "x-ms-blob-type": "BlockBlob",
            "content-type": "application/octet-stream",
            "x-ms-blob-content-type": file.type
          },
          RNFetchBlob.wrap(localUri)
        );
        console.log("success");
      } catch (e) {
        console.log("Error at saving image into Azure Storage", e);
      }

}

export const createData = () => {
//   fetch(`${localhost}/`, {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'value 1',
//     secondParam: 'value 2',
//   }),
// });
}

export const readData = async () => {
  const response = await fetch(`${localhost}/read`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
  });

  const { paymentIntent, ephemeralKey, customer, amount} = await response.json();

  console.log('amount: ' ,amount)

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };

}

export const createUser = async (email) => {
  try{
    console.log('response1: ')
    const response = await fetch(`${localhost}/sign-user`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        secondParam: 'value 2',
      }),
    });

    const {doc} = await response.json()

    console.log('response2: ' , await doc)
    return doc
    // console.log('response: ',await response.json())
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const updateUser = async (
  email: any, user: any
) => {
  try{
    console.log('response1: ')
    const response = await fetch(`${localhost}/update-user`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        locationISO2: user.locationISO2,
        locationName: user.locationName,
        birthdateDATE: user.birthdateDATE,
        birthdateName: user.birthdateName,
      }),
    });

    const {doc} = await response.json()

    console.log('response2: ' , doc)
    return doc
    // console.log('response: ',await response.json())
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const updateUser2 = async (
  email: any, user: any
) => {
  try{
    const response = await fetch(`${localhost}/update-user`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        height: user.height,
        weight: user.weight,
        goals: user.goals,
      }),
    });

    const {doc} = await response.json()

    return doc
    // console.log('response: ',await response.json())
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const createUserEmail = async (
  email: any, user: any
) => {
  try{
    const response = await fetch(`${localhost}/create-user-email`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        locationISO2: user.locationISO2,
        locationName: user.locationName,
        birthdateDATE: user.birthdateDATE,
        birthdateName: user.birthdateName,
      }),
    });

    const {doc} = await response.json()

    return doc
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const checkUserFriends = async (
  // email
) => {
  try{
    const response = await fetch(`${localhost}/check-user-friends`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    });

    const {doc} = await response.json()


  // setData('didItGetContacts', 1)

    return doc
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const createUserNew = async (
) => {
  try{
    const response = await fetch(`${localhost}/create-new-user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'khgkjkgls',
      }),
    });

    const {doc} = await response.json()


      // setData('didItGetContacts', 1)

    return doc
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const addToFollowingList = async (
  user: any
) => {
  try{
    const response = await fetch(`${localhost}/add-user-to-followers`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        imageUrl: user.imageUrl,
        name: user.name,
      }),
    });

    const {doc} = await response.json()

    return doc
    // console.log('response: ',await response.json())
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}

export const removeFromFollowingList = async (
  user: any
) => {
  try{
    const response = await fetch(`${localhost}/delete-user-from-followers`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    const {doc} = await response.json()

    return doc
    // console.log('response: ',await response.json())
  }
  catch(err){
    console.log('err: ')
    console.log('err: ',err)
  }

}