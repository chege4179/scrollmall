import React, {useState} from 'react';
import axios from "axios";
import {Text, View, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator,
     KeyboardAvoidingView,ScrollView ,Dimensions} from 'react-native';
import DeviceInfo from "react-native-device-info";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";
import {Picker} from '@react-native-picker/picker'
const SignUpScreen = ({ navigation }) => {

    const [accountType,setAccountType] = useState('Buyer')
    const [BusinessCategory,setBusinessCategory] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [Loader,setLoader] = useState(false)
    const [username,setUsername] = useState('')
    const [BusinessName,setBusinessName] = useState('')


    const SignUp = () => {
        if (accountType ==='Buyer'){
            if (name ==='' || email === '' || phone ==='' || password === ''){
                alert('Please fill in all the fields..buyer')
            }else {
                setLoader(true)
                messaging().getToken()
                    .then(token => {
                        axios.post(`${BaseURL}/auth/buyer/signup`,{ accountType,name,email,phone,password ,deviceId:[]})
                            .then((res) => {
                                setLoader(false)
                                if (res.data.signup){
                                    alert(`${res.data.msg}..now go and login`)
                                    navigation.navigate('Login')
                                }
                            })
                            .catch((err) => {
                                console.warn(err)
                            })
                    });

            }
        }else if (accountType ==='Seller'){

            if (BusinessCategory === '' || name ==='' || email === '' || phone ==='' || password === ''|| BusinessName ==='' || username ===''){
                alert('Please fill in all the fields..seller')
            }else {
                setLoader(true)
                messaging()
                    .getToken()
                    .then(token => {
                        axios.post(`${BaseURL}/auth/seller/signup`,
                            { accountType,BusinessOwner:name,email,phone,password ,deviceId:[],BusinessCategory,BusinessName,username})
                            .then((res) => {
                                alert(res.data.msg)
                                setLoader(false)
                                if (res.data.signup){
                                    alert(`${res.data.msg}..now go and login`)
                                    navigation.navigate('Login')
                                }
                            })
                            .catch((err) => {
                                console.warn(err)
                            })
                    });

            }

        }else if (accountType ==='') {
            alert('Please select an account type')

        }
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <ActivityIndicator size='large' animating={Loader} color="#0000ff"/>
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} placeholder='Enter your Full Name'
                                onChangeText={(text) => setName(text)}/>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>E-mail Address</Text>
                    <TextInput style={styles.input} placeholder='Enter your Email Address'
                                onChangeText={(text) => setEmail(text)}/>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} placeholder='Enter your Phone Number'
                               onChangeText={(text) => setPhone(text)}/>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} placeholder='Enter your Password'
                               secureTextEntry onChangeText={(text) => setPassword(text)}/>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>Account Type</Text>
                    <Picker selectedValue={accountType} style={styles.accountType}
                            onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}>
                        <Picker.Item label="Buyer" value="Buyer" />
                        <Picker.Item label="Seller" value="Seller" />
                    </Picker>
                </View>

                {
                    accountType ==='Seller' &&(
                        <>
                            <View style={styles.loginContainer}>
                                <Text style={styles.label}>Business Category</Text>
                                <Picker selectedValue={BusinessCategory} style={styles.accountType}
                                        onValueChange={(itemValue, itemIndex) => setBusinessCategory(itemValue)}>
                                    <Picker.Item label="Health and Beauty" value="Health and Beauty" />
                                    <Picker.Item label="Home and Office" value="Home and Office" />
                                    <Picker.Item label="Phone and Tablets" value="Phone and Tablets" />
                                    <Picker.Item label="Computing" value="Computing" />
                                    <Picker.Item label="Electronics" value="Electronics" />
                                    <Picker.Item label="Fashion" value="Fashion" />
                                    <Picker.Item label="Food" value="Food" />
                                    <Picker.Item label="Real Estate" value="Real Estate" />
                                    <Picker.Item label="Gaming" value="Gaming" />
                                    <Picker.Item label="Customer services e.g Hair Cuts" value="Services" />

                                </Picker>
                            </View>
                            <View style={styles.loginContainer}>
                                <Text style={styles.label}>Official Business Name</Text>
                                <TextInput style={styles.input} placeholder='Enter your official Business Name'
                                           onChangeText={(text) => setBusinessName(text)}/>
                            </View>
                            <View style={styles.loginContainer}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput style={styles.input} placeholder='Enter your username (No spaces)'
                                           onChangeText={(text) => setUsername(text)}/>
                            </View>
                        </>
                    )
                }
                <TouchableOpacity style={styles.button} onPress={SignUp}>
                    <Text style={styles.logintext}>Sign Up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
    container:{
        alignItems:'center',

        flex:1,
    },
    loginContainer:{
        width:Dimensions.get('screen').width * 0.9,
        height:90,
    },
    label:{
        textAlign:'left',
        marginBottom:5,

    },
    input:{
        backgroundColor:'grey',
        borderRadius:10,
    },
    accountType:{
        width: Dimensions.get('screen').width * 0.9,
        height:60,

    },
    button:{
        marginTop:20,
        width:150,
        backgroundColor: 'blue',
        height:60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:'center'
    },
    logintext:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
})
export default SignUpScreen;
