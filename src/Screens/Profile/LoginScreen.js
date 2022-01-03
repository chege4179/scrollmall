import React, {useState} from 'react';

import {Text, View, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView,ToastAndroid} from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import {UserActions} from "../../ReduxStore/UserConstants";
import axios from "axios";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";
import {Picker} from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [accountType,setAccountType] = useState('Buyer')
    const dispatch = useDispatch();
    const LoginUser = () => {
        if (email ==='' || password ===''){
            ToastAndroid.show('Please fill in all the fields',ToastAndroid.SHORT)
        }else {
            dispatch({
                type:UserActions.LOGIN_REQUEST,

            })
            if (accountType ==='Buyer'){
                messaging()
                    .getToken()
                    .then(token => {
                        axios.post(`${BaseURL}/auth/buyer/login`,{email,password,token})
                            .then((res) => {
                                if (res.data.login) {
                                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                                    dispatch({
                                        type:UserActions.LOGIN_SUCCESS,
                                        payload:res.data.user,
                                    })
                                    AsyncStorage.setItem('UserData',JSON.stringify(res.data.user),(err) => {
                                        console.log('Data saved in the async storage')
                                    })
                                }else {
                                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                                }
                            })
                    });

            }else if (accountType ==='Seller') {
                messaging()
                    .getToken()
                    .then(token => {
                        axios.post(`${BaseURL}/auth/seller/login`,{email,password,token})
                            .then((res) => {
                                if (res.data.login) {
                                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                                    dispatch({
                                        type:UserActions.LOGIN_SUCCESS,
                                        payload:res.data.user,
                                    })
                                    AsyncStorage.setItem('UserData',JSON.stringify(res.data.user),(err) => {
                                        console.log('Data saved in the async storage')
                                    })
                                }else {
                                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                                }
                            })
                    });
            }
        }
    }
    const GoToSignUp = () => {
        navigation.navigate('SignUp')
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            {/*<TouchableOpacity onPress={LoginUser}>*/}
            {/*    <Text>Login</Text>*/}
            {/*</TouchableOpacity>*/}
            <View style={styles.loginContainer}>
                <Text style={styles.label}>E-mail Address</Text>
                <TextInput style={styles.input} placeholder='Enter your Email Address'
                           onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder='Enter your Password'
                           onChangeText={text => setPassword(text)} secureTextEntry
                           />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.label}>Account Type</Text>
                <Picker selectedValue={accountType} style={styles.accountType}
                        onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}>
                    <Picker.Item label="Buyer" value="Buyer" />
                    <Picker.Item label="Seller" value="Seller" />
                </Picker>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={LoginUser} >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.info}>Don't have an account .....Create One</Text>

            <TouchableOpacity style={styles.loginButton} onPress={GoToSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      padding:10,
    },
    loginContainer:{
        width:Dimensions.get('screen').width * 0.9,
        height:90,
    },
    label:{
      textAlign:'left',
      marginBottom:10,

    },
    input:{
      backgroundColor:'grey',
      borderRadius:10,
      fontSize: 16,
    },
    loginButton:{
        width:Dimensions.get('screen').width * 0.45,
        backgroundColor: 'blue',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:'center',
        marginTop:20,
    },
    loginButtonText:{
        textAlign: 'center',
        color:'white',
        fontWeight:'bold',
        fontSize:18,

    },
    info:{
        paddingTop:20,
    }


})
export default LoginScreen;
