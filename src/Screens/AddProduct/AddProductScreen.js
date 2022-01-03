import React, {useState} from 'react';

import {Text, View, StyleSheet,Button,Image, TextInput,Dimensions,Pressable,Platform,ToastAndroid} from 'react-native';
import * as  ImagePicker from 'react-native-image-picker'
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {TouchableOpacity} from "react-native-gesture-handler";
import axios from "axios";
import BaseURL from "../../BaseURL";

const AddProductScreen = ({ navigation }) => {

    const [photo,setPhoto] = useState(null)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const user = useSelector(SelectUser)
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
    };
    const ChooseAPhoto = () => {
        const options = {
            mediaType:'photo'

        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                setPhoto(response)
            }
        })
    }
    const UploadProduct = () => {
        axios.post(`${BaseURL}/product/add`,
            createFormData(photo,{ name,username:user.username,description,price }))
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                setPhoto(null)
                setName('')
                setPrice('')
                setDescription('')
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.SHORT)
            })

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.text}>Add Product Screen</Text>
                </View>
                <Pressable onPress={ChooseAPhoto} style={styles.choosePhoto}>
                    <Text>Choose a photo</Text>
                </Pressable>
            </View>
            <View style={{width:'100%'}}>
                {photo && (
                    <View style={styles.uploadform}>
                        <View style={{ flexDirection:'row',width:'100%' }}>
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 80, height: 80 , margin:20}}
                            />
                            <TextInput placeholder='Enter product name' style={{ fontSize: 16, }}
                            onChangeText={text => setName(text)}/>
                        </View>
                        <View style={{ marginLeft:20,marginRight:20 }}>
                            <TextInput placeholder='Enter Product Price' style={{ fontSize: 16, }}
                                       onChangeText={text => setPrice(text)}/>
                        </View>
                        <View style={{ marginLeft:20,marginRight:20}}>
                            <TextInput placeholder='Enter Product Description'style={{ fontSize: 16, }}
                                       onChangeText={text => setDescription(text)} numberOfLines={4} multiline={true}/>
                        </View>
                    </View>

                )}
            </View>
            {photo &&(<Button title='Upload Product' onPress={UploadProduct}/>)}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',

        margin:0,
    },
    text:{
        fontWeight:'500',
        fontSize:20,

    },
    uploadform:{
        width:'100%'
    },
    choosePhoto:{
        borderRadius:50,
        height:30,
        backgroundColor:'blue',
        width:120,
        justifyContent:'center',
        alignItems: 'center',
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-around',

        width:Dimensions.get('screen').width,
        alignItems:'center',
        height:60
    },



})
export default AddProductScreen;
