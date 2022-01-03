import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Platform, Image, ToastAndroid, Button} from 'react-native';
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";
import BaseURL from "../../BaseURL";



const ProfileInfoScreen = () => {
    const user = useSelector(SelectUser)
    const [photo,setPhoto] = useState(null)
    const ChooseAPhoto =() => {
        const options = {

        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                setPhoto(response)
            }
        })
    }
    const createFormData = (photo, body) => {
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    }
    const UpdateProfilePhoto = () => {
        axios.post(`${BaseURL}/auth/seller/updateprofile`,createFormData(photo,{
            username:user.username
        }))
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.SHORT)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri:'https://picsum.photos/200/300' }} style={styles.profileImage}/>
            </View>
            <View style={styles.viewholder}>
                <Text style={styles.text}>Profile Info Screen</Text>
            </View>
            <View style={styles.viewholder}>
                <Text style={styles.text}>Name:{ user?.accountType ==='Seller' ? user?.BusinessOwner : user?.name}</Text>
            </View>
            <View style={styles.viewholder}>
                <Text style={styles.text}>Email Address:{user?.email}</Text>
            </View>
            <View style={styles.viewholder} >
                <Text style={styles.text}>Phone Number:{user?.phone}</Text>
            </View>
            <View style={styles.viewholder}>
                <Text style={styles.text}>Account Type:{user?.accountType}</Text>

            </View>
            <View style={styles.viewholder}>
                {user?.accountType ==='Seller' &&(<Text style={styles.text}>Username: {user?.username}</Text>)}
            </View>
            {
                user?.accountType ==='Seller' &&(
                    <View>
                        <View>
                            <Text style={styles.text}>Update Your Profile Photo</Text>
                        </View>
                        <Pressable onPress={ChooseAPhoto} style={styles.choosePhoto}>
                            <Text>Choose a photo</Text>
                        </Pressable>
                    </View>
                )
            }
            {photo && (
                <View style={styles.uploadform}>
                    <View style={{ flexDirection:'row',width:'100%' }}>
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 80, height: 80 , margin:20}}
                        />
                    </View>
                </View>
            )}
            {photo &&(<Button title='Update Profile Photo' onPress={UpdateProfilePhoto}/>)}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    viewholder:{
        marginTop:10,
        width:'90%',
        height:40,
        borderRadius:15,
        borderColor:'grey',
        backgroundColor:'white',
        paddingLeft:20,
        justifyContent: 'center'
    },
    text:{
        fontSize:16,
        textAlign:'left'
    },
    profile:{
        alignItems: 'center',
        justifyContent:'center'
    },
    profileImage:{
        height: 150,
        width: 150,
        borderRadius: 75,
    }
})
export default ProfileInfoScreen;
