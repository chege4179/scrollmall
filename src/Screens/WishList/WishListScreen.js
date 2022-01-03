import React from 'react';
import { Text,StyleSheet} from 'react-native'
import { createStackNavigator} from "@react-navigation/stack";
import WishListHomePage from "./WishListHomePage";
import WishListProductPage from "./WishListProductPage";

const Stack = createStackNavigator();
const WishListScreen  = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='WishListHomePage' component={WishListHomePage}/>
            <Stack.Screen name='WishListProductPage' component={WishListProductPage}/>
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    container:{

    }
})
export default WishListScreen











//
// export default class WishListScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//
//         this.notif = new NotifService(
//             this.onRegister.bind(this),
//             this.onNotif.bind(this),
//         );
//     }
//
//     render() {
//         return (
//             <ScrollView>
//
//
//             <View style={styles.container}>
//                 <Text style={styles.title}>
//                     Example app react-native-push-notification
//                 </Text>
//                 <View style={styles.spacer}></View>
//                 <TextInput
//                     style={styles.textField}
//                     value={this.state.registerToken}
//                     placeholder="Register token"
//                 />
//                 <View style={styles.spacer}></View>
//
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.localNotif('Hello World',2344,'My norification');
//                     }}>
//                     <Text>Local Notification (now)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.localNotif('sample.mp3');
//                     }}>
//                     <Text>Local Notification with sound (now)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.scheduleNotif();
//                     }}>
//                     <Text>Schedule Notification in 30s</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.scheduleNotif('sample.mp3');
//                     }}>
//                     <Text>Schedule Notification with sound in 30s</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.cancelNotif();
//                     }}>
//                     <Text>Cancel last notification (if any)</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.cancelAll();
//                     }}>
//                     <Text>Cancel all notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.checkPermission(this.handlePerm.bind(this));
//                     }}>
//                     <Text>Check Permission</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.requestPermissions();
//                     }}>
//                     <Text>Request Permissions</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.abandonPermissions();
//                     }}>
//                     <Text>Abandon Permissions</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.getScheduledLocalNotifications(notifs => console.log(notifs));
//                     }}>
//                     <Text>Console.Log Scheduled Local Notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.getDeliveredNotifications(notifs => console.log(notifs));
//                     }}>
//                     <Text>Console.Log Delivered Notifications</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.createOrUpdateChannel();
//                     }}>
//                     <Text>Create or update a channel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         this.notif.popInitialNotification();
//                     }}>
//                     <Text>popInitialNotification</Text>
//                 </TouchableOpacity>
//
//                 <View style={styles.spacer}></View>
//
//                 {this.state.fcmRegistered && <Text>FCM Configured !</Text>}
//
//                 <View style={styles.spacer}></View>
//             </View>
//             </ScrollView>
//         );
//     }
//
//
//     onRegister(token) {
//         this.setState({registerToken: token.token, fcmRegistered: true});
//     }
//
//     onNotif(notif) {
//         Alert.alert(notif.title, notif.message);
//     }
//
//     handlePerm(perms) {
//         Alert.alert('Permissions', JSON.stringify(perms));
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     button: {
//         borderWidth: 1,
//         borderColor: '#000000',
//         margin: 5,
//         padding: 5,
//         width: '70%',
//         backgroundColor: '#DDDDDD',
//         borderRadius: 5,
//     },
//     textField: {
//         borderWidth: 1,
//         borderColor: '#AAAAAA',
//         margin: 5,
//         padding: 5,
//         width: '70%',
//     },
//     spacer: {
//         height: 10,
//     },
//     title: {
//         fontWeight: 'bold',
//         fontSize: 20,
//         textAlign: 'center',
//     },
// });
