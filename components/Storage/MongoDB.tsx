import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  name!: string;
  useremail!: string;
  userpassword!: string;


  static schema = {
    name: 'User',
    properties: {
      _id: 'string',
      useremail: 'string',
      userpassword: 'string',
      username: 'string',
    },
    primaryKey: '_id',
  };
}


export const realmUserConfig: Realm.Configuration = {
  schema: [User],
  schemaVersion: 1
};

const {RealmProvider, useRealm, useObject, useQuery} = 
createRealmContext(realmUserConfig);

export const UserRealmContext = createRealmContext({
  schema: [User],
  schemaVersion: 2
})



// Place Your RealmApp ID Here
const app = new Realm.App({ id: "beautifulshower-ngzco", timeout: 10000 });

const email = 'mgoktashk@gmail.com'
    const password = '123456'
   
// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
const credentials = Realm.Credentials.emailPassword(
  email,
  password
); // LoggingIn as Anonymous User. 

export const getRealm = async () => {

  // loggedIn as anonymous user
  const loggedInUser = await app.logIn(credentials);
  
  // MongoDB RealmConfiguration
  const configuration = {
    schema: [User], // add multiple schemas, comma seperated.
    // sync: {
    //   // user: app.currentUser, // loggedIn User
    //   // partitionValue: email, // should be userId(Unique) so it can manage particular user related documents in DB by userId
    // }
  schemaVersion: 4
    
  };

  

  return Realm.open(configuration);
}

// export const addToRealm = async () => {

//   // loggedIn as anonymous user
//   const loggedInUser = await app.logIn(credentials);
  
//   // MongoDB RealmConfiguration
//   const configuration = {
//     schema: [User], // add multiple schemas, comma seperated.
//     sync: {
//       user: app.currentUser, // loggedIn User
//       // partitionValue: "2F6092d4c594587f582ef165a0", // should be userId(Unique) so it can manage particular user related documents in DB by userId
//     }
//   };

  

//   return Realm.open(configuration);
// }

