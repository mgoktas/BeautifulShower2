import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, HeaderHome, Line, LineBwCell, PremiumBox, SCREEN_HEIGHT, SettingsBox, Space } from '../../components/Utilities/Utilities';
import { LogOut } from '../../components/Functions/AuthFunctions';
import { GetAllContacts, GetAllContactsRefProps } from '../../components/Functions/2-FunctionsCommunity';
import { ConnectContactsRefProps } from '../../components/Functions/PermissionFunctions';
import { companyUrl, privacyPolicyUrl, supportUrl, termsAndConditionsUrl } from '../../components/Data/Data';
import { getDataNumber, getDataString, setData } from '../../components/Storage/MMKV';
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  clearProductsIOS,
  SubscriptionPurchase,
  finishTransaction,
  requestSubscription,
} from 'react-native-iap';
import OfferSheet, { OfferSheetRefProps } from '../../components/Sheets';
import { useState } from 'react';
import Dialog from "react-native-dialog";

const Settings = ({route, navigation}) => {

  const [isAdmin, setIsAdmin] = React.useState(getDataNumber('isAdmin') == 1)  
  const [isPremiumSheetOn, setIsPremiumSheetOn] = useState(false)
  const [isPremiumCanceledSheetOn, setIsPremiumCanceledSheetOn] = useState(false)
  
  const refCon = React.useRef<GetAllContactsRefProps>(null)

  const goTo = React.useCallback((url) => {
    refCon?.current?.goTo(url)
  }, [])

  const [isSheetOn, setIsSheetOn] = React.useState(false);

  React.useEffect(() => {
    // Product IDs for in-app purchases
    // Fetch product information from the app store
    
    const productIds = ['com.beautifulshower.99'];

    getProducts({skus: productIds}).then((products) => {
      console.log('Products:', products);
    }).catch((error) => {
      console.log('Error fetching products:', error);
});
  },[])

  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  React.useEffect(() => {


    if(Platform.OS == 'android'){
      initConnection().then(() => {
        // we make sure that "ghost" pending payment are removed
        // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
        flushFailedPurchasesCachedAsPendingAndroid()
          .catch(() => {
            // exception can happen here if:
            // - there are pending purchases that are still pending (we can't consume a pending purchase)
            // in any case, you might not want to do anything special with the error
          })
          .then(() => {
            const purchaseUpdateSubscription = purchaseUpdatedListener(
              async (purchase: SubscriptionPurchase | ProductPurchase) => {
                console.log('purchaseUpdatedListener', purchase);
  
  
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                  await finishTransaction({purchase, isConsumable: false});
                  await openPremiumConfirmedDialog()
                } else {
                  await openPremiumCanceledDialog()
                }
              },
            );
  
  
            const purchaseErrorSubscription = purchaseErrorListener(
              (error: PurchaseError) => {
                console.warn('purchaseErrorListener', error);
              },
            );
          });
      });
    }

    if(Platform.OS == 'ios'){
    initConnection().then(() => {
      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
      clearProductsIOS()
        .catch(() => {
          // exception can happen here if:
          // - there are pending purchases that are still pending (we can't consume a pending purchase)
          // in any case, you might not want to do anything special with the error
        })
        .then(() => {
          const purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase: SubscriptionPurchase | ProductPurchase) => {
              console.log('purchaseUpdatedListener', purchase);


              const receipt = purchase.transactionReceipt;
              if (receipt) {
                await finishTransaction({purchase, isConsumable: false});
                await openPremiumConfirmedDialog()
              } else {
                await openPremiumCanceledDialog()
              }
            },
          );


          const purchaseErrorSubscription = purchaseErrorListener(
            (error: PurchaseError) => {
              console.warn('purchaseErrorListener', error);
            },
          );
        });
    });
  }
  
  
  },[])


  React.useEffect(() => {
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
  
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    }
}, [])


const subscribe = async (sku: string, offerToken: string) => {
  try {
    await requestSubscription({
      sku,
      ...(offerToken && {subscriptionOffers: [{sku, offerToken}]}),
    });

  } catch (err) {
    console.warn('erre',err.code, err.message);
  }
};


const closeSheet = async () => {
  setTimeout(function () {
    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    setIsSheetOn(false);
  }, 200);
};

const pay = async () => {
  try {

    await ref3?.current?.scrollTo(60);

    await closeSheet()

    await subscribe('com.beautifulshower.99', null)
    
    

  } catch (e) {
    // if (!e.userCancelled) {
    //   // showError(e);
    // }
    console.log(e)
  }
};


const openPremiumConfirmedDialog = async () => {
  setData('isPremium', 1)
  setIsPremiumSheetOn(true)
}

const openPremiumCanceledDialog = async () => {
  setIsPremiumCanceledSheetOn(true)
}

  const ref3 = React.useRef<OfferSheetRefProps>(null);
  const openSheet = React.useCallback(() => {
    ref3?.current?.scrollTo(-SCREEN_HEIGHT / 1.20 );
  }, []);

  const handleYes = () => {
    setIsPremiumSheetOn(false)
  }

  const handleNo = () => {
    setIsPremiumSheetOn(false)
  }

  const handleYesC = () => {
    setIsPremiumCanceledSheetOn(false)
  }

  return (
    <SafeAreaView>

      <Dialog.Container visible={isPremiumSheetOn}>
        <Dialog.Title>Congratulations!</Dialog.Title>
        <Dialog.Description>
          Welcome to Beautiful Shower Premium!
        </Dialog.Description>
        <Dialog.Button label="Yes" onPress={handleYes} />
        <Dialog.Button label="No" onPress={handleNo} />
      </Dialog.Container>

      <Dialog.Container visible={isPremiumCanceledSheetOn}>
        <Dialog.Title>Failed!</Dialog.Title>
        <Dialog.Description>
          The payment failed.
          {'\n'}
          Please try again.
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={handleYesC} />
      </Dialog.Container>

        <HeaderHome  type={4} title={'SETTINGS'} txt={'Done'} onPress={() => {navigation.goBack()}}/>
        
        <ScrollView>

          {/* <View style={{display: isAdmin ? 'flex' : 'none'}}>

            <HeaderHome type={5} title={'ADMIN PANEL'} />
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <SettingsBox icon={'person-outline'} icon2={true} isFirst={false}  title={'Admin Panel'}  onPress={() => {navigation.navigate('AdminPanel')}}/>
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
  
          </View> */}

            <HeaderHome type={5} title={'PERSONAL SETTINGS'} />

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
                    
            <SettingsBox icon={'person-outline'} icon2={true} isFirst={true}  title={'Edit Profile'}  onPress={() => {navigation.navigate('EditProfile')}}/>
          
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          
            <SettingsBox icon={'person-outline'} title={'Account'}  onPress={() => {navigation.navigate('Account')}}/>
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
            
            <SettingsBox icon={'key-outline'} title={'Privacy'} onPress={() => {navigation.navigate('Privacy')}}/>
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
            
            <PremiumBox onPress={openSheet} txt1={'Premium'}  txt2={'Enjoy Beautiful Shower Premium'}/>
      
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
{/*             
            <SettingsBox type={2} icon={'bell-ring-outline'} title={'Notifications'}  onPress={() => {navigation.navigate('Notifications')}}/>

            <LineBwCell isSettings={true} /> b b
            <LineBwCell isSettings={true} /> 
           
            <Space space={15} /> */}

            {/* <HeaderHome type={5} title={'APP SETTINGS'} />

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
                     
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          
            <SettingsBox type={3} icon={'people-outline'} title={'Social Sharing'} onPress={() => {navigation.navigate('SocialSharing')}}/>

            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} /> */}

            <Space space={15} />
          
            <HeaderHome type={5} title={'MORE'} />

            <Space space={15} />
          
            <SettingsBox onPress={
             async () => {

                Platform.OS == 'ios' ? 
                await goTo(supportUrl)
                :
                await Linking.openURL(supportUrl);

              }
            } type={4} icon={'message-text-outline'} icon2={true} isFirst={true}  title={'Support & Feedback'} />
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <SettingsBox  onPress={
             async () => {
                Platform.OS == 'ios' ? 
                await goTo(termsAndConditionsUrl)
                :
                await Linking.openURL(termsAndConditionsUrl);              }
            } icon={'pencil-sharp'} title={'Terms & Conditions'} />
            
            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />

            <SettingsBox onPress={
             async () => {
              Platform.OS == 'ios' ? 
              await goTo(privacyPolicyUrl)
              :
              await Linking.openURL(privacyPolicyUrl);
                          }
            } icon={'lock-closed-outline'} title={'Privacy Policy'} />
         
            {/* <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
          */}
            {/* <SettingsBox icon={'people-outline'} title={'Community Guidelines'} /> */}
         


            <LineBwCell isSettings={true} />
            <LineBwCell isSettings={true} />
         
            <SettingsBox type={5} onPress={
             async () => {
                await Linking.openURL(companyUrl);
              }
            } title={'mgoktas & Premium'} />
        
            <CustomButton type={3} onPress={() => { LogOut(navigation) }} txt={'LOG OUT'}/>

            <Space space={20}/>
            <Space space={20}/>

        </ScrollView>

      <GetAllContacts ref={refCon}/>
  

      <OfferSheet
        pay={pay}
        ref={ref3}
        closeSheet={closeSheet}
        canceled={openPremiumCanceledDialog} 
        confirmed={openPremiumConfirmedDialog} 
      />

    </SafeAreaView>
  );
};

export default Settings;
