import { MMKV } from "react-native-mmkv";
import { getDDate } from "../Functions/Functions";

export const addUserToMMKV = (user) => {


    storage.set('user.firstname', user.firstname)
    storage.set('user.lastname', user.lastname )
    storage.set('user.gender', user.gender)
    storage.set('user.email', user.email)
    // storage.set('user.passwordEncrypted', passwordEncrypted)
    storage.set('user.age', user.age)
    storage.set('user.locationIso2', user.locationIso2)
    storage.set('user.locationfullname', user.locationfullname)
    storage.set('user.birthdate', user.birthdate.toString())
}

export const updateUserMMKV = (user) => {

    try{
        setData('firstname', user.firstname)
        setData('lastname', user.lastname)
        setData('emagenderil', user.gender)
        setData('locationISO2', user.locationISO2)
        setData('locationName', user.locationName)
        setData('birthdateDATE', user.birthdateDATE.toString())
        setData('birthdateName', user.birthdateName)
        setData('isEmailActive', 0)
        setData('isNotificationsAllowed', 0)
    }catch(err){
        console.log('err: ',err)
    }


}

export const updateUserMMKV2 = (user) => {

    try{
        setData('showerdays', user.showerdays)
        setData('height', user.height)
        setData('weight', user.weight)
        setData('goals', user.goals)
    }catch(err){
        console.log('err: ',err)
    }
}

export const deleteUserMMKV = () => {

    try{
        setData('firstname', '')
        setData('lastname', '')
        setData('gender', 'Male')
        setData('locationISO2', 'US')
        setData('locationName', 'United States')
        setData('birthdateDATE', getDDate(new Date()))
        setData('birthdateName', '1 Jan 2000')
        setData('isEmailActive', 0)
        setData('isNotificationsAllowed', 0)
        setData('showerdays', '')
        setData('height', 180)
        setData('weight', 80)
        setData('goals', '')
        setData('email', '')

    }catch(err){
        console.log('err: ',err)
    }


}


export const storage = new MMKV()
export const storageNotifications = new MMKV()

export const setData = (key, value) => {
    const keyIntitial = 'user.' + key
    storage.set(keyIntitial, value)
}

export const setDocId = (key, value) => {
    storage.set(key, value)
}

export const setNotifId = (key, value) => {
    storageNotifications.set(key, value)
}

export const getDataNumber = (key) => {
  const keyIntitial = 'user.' + key;
  const value = storage.getNumber(keyIntitial);
  return value;
}

export const getDataString = (key) => {
    const keyIntitial = 'user.' + key
    const value = storage.getString(keyIntitial)
    return value 
}

export const getDataBoolean = (key) => {
    const keyIntitial = 'user.' + key
    const value = storage.getBoolean(keyIntitial)
    return value
}


