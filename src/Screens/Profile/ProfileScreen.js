import React, {useEffect} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Alert,ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ProfileInfoScreen from "./ProfileInfoScreen";
import {UserActions} from "../../ReduxStore/UserConstants";
import axios from "axios";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import UpdateProfileScreen from "./UpdateProfileScreen";
import { useNavigation } from '@react-navigation/native'
const Stack =createStackNavigator();

const ProfileScreen = () => {
    const user = useSelector(SelectUser)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const LogOut = () => {
        messaging().getToken().then((token) => {
            if (user?.accountType ==='Seller'){
                axios.put(`${BaseURL}/auth/seller/logout?token=${token}&id=${user._id}`)
                    .then((res) => {
                        AsyncStorage.removeItem('UserData',(err) => {
                            if (err){
                                console.log(err)
                            }else {
                                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                            }
                        })
                    })
            }else if (user?.accountType ==='Buyer'){
                axios.put(`${BaseURL}/auth/buyer/logout?token=${token}&id=${user._id}`)
                    .then((res) => {
                        AsyncStorage.removeItem('UserData',(err) => {
                            if (err){
                                console.log(err)
                            }else {
                                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                            }
                        })
                    })
            }
        })

        dispatch({
            type:UserActions.LOGOUT_REQUEST,
        })
        dispatch({
            type:UserActions.LOGOUT_SUCCESS,
        })
    }
    const LogOutConfirmation = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out ",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => LogOut() }
            ]
        );
    }
    const GoToUpdateProfileScreen = () => {
        navigation.navigate('UpdateProfile')
    }
    return (
        <Stack.Navigator>

            {user === null &&(<Stack.Screen name='Login' component={LoginScreen}/>)}
            {user === null &&(<Stack.Screen name='SignUp' component={SignUpScreen}/>)}
            {user !== null &&(<Stack.Screen name='Profile Info' component={ProfileInfoScreen} options={{
                headerRight:() => {
                    return(
                        <View style={{flexDirection:'row'}}>
                            {
                                user.accountType ==='Seller' && (
                                    <TouchableOpacity onPress={GoToUpdateProfileScreen}>
                                        <FontAwesome5 name='pen' size={25} style={{paddingRight:15}}/>
                                    </TouchableOpacity>
                                )
                            }

                            <TouchableOpacity onPress={LogOutConfirmation}>
                                <Text style={styles.logout}>Log Out</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
            }}/>)}
            {user !==null &&(<Stack.Screen name='UpdateProfile' component={UpdateProfileScreen}
                                           options={{
                                                headerTitle:'Update Account Info'
                                           }}/>)}


        </Stack.Navigator>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    text:{
        fontWeight:'500',
        fontSize:20
    },
    logout:{
        marginRight:15,
        fontWeight: 'bold',
        fontSize: 18,


    }
})
export default ProfileScreen;
