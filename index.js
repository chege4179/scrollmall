/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async remoteMessage => {

    console.log('MESSAGE HANDLED IN THE BACKGROUND',remoteMessage)

    //Notification.localNotif(JSON.parse(remoteMessage.data.owner)[0])
});



AppRegistry.registerComponent(appName, () => App);

