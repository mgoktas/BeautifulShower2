
export const data = [
    {title: 'COLD IS MERCILESS', duration: 'STARTS IN 2 DAYS', count: '206 PARTICIPANTS', image: require('../../components/images/cold.jpg'), desc: '15 Cold Showers', dateDesc: '3 Dec - 13 Dec'},
    {title: 'DAILY BOOST', duration: 'STARTS IN 15 DAYS', count: '106 PARTICIPANTS', image: require('../../components/images/daily.jpg')},
    {title: 'LIVING FOR IT', duration: 'STARTS IN 25 DAYS', count: '306 PARTICIPANTS', image: require('../../components/images/longevity.jpeg')},
]

export const datablogs = [
    {category: 'CARDIO', title: 'JOIN MOVE FOR THE PLANET & START MAKING A DIFFERENCE', duration: '3 minutes', image: require('../../components/images/cold.jpg')},
    {category: 'CARDIO', title: 'ADIDAS RUNNING - WHICH RUNNING WATCHES AND APPS WORK?', duration: '7 minutes', image: require('../../components/images/daily.jpg')},
    {category: 'CARDIO', title: '#HOMETEAMHER O CHALLENGE >> GIVEAWAY: TERMS & CONDITIONS', duration: '2 minutes', image: require('../../components/images/longevity.jpeg')},
]

export const dataFeatured = [
    {title: 'COLD IS MERCILESS', duration: 'STARTS IN 2 DAYS', count: '206 PARTICIPANTS', image: require('../../components/images/cold.jpg')},
]

export const azureConstant = 'https://csb10032003198f8088.blob.core.windows.net/avatarcontainer-beautifulshower/'
export const azureConstantBackground = 'https://csb10032003198f8088.blob.core.windows.net/wallpapercontainer-beautifulshower/'

export const localhost = 'http://localhost:3000'

export const privacyPolicyUrl = 'https://www.freeprivacypolicy.com/live/0b82b9d1-fee6-4b94-88f1-a33906ad64d9'

export const termsAndConditionsUrl = 'https://www.termsandconditionsgenerator.com/live.php?token=YBwUtsNzjCqub4lBmBqUBDou264zb41D'

export const musicUrl = 'https://music.youtube.com'

export const userLink = ''

export const supportUrl = 'https://resetwill.netlify.app/support/beautifulshower'

export const companyUrl = 'https://resetwill.netlify.app'

export const linking = {

    prefixes: ['beautifulshower://'],
    config: {
      initialRouteName: 'First',
      screens: {
        Profile: {
          path: 'profile/:email'
        },
        
      }
    }
}