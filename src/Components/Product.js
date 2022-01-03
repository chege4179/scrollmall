import React from 'react';

import {Text, View,StyleSheet,Dimensions,Image,Pressable,ToastAndroid} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import BaseURL from "../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import axios from "axios";
import { socket } from "../BaseURL";

const Product = ({ imageUrl,name,price,seller,description,id} ) => {
    const user = useSelector(SelectUser)
    const navigation = useNavigation();

    const GoToProductScreen = () => {
        navigation.navigate('Product',{ imageUrl,name,price,seller,description,id })
    }
    const addToWishList = () => {
        if (user !== null){
            axios.post(`${BaseURL}/wishlist/add?buyer=${user.name}`,
                {imageUrl,name,price,seller,description,email:user.email})
                .then((res) => {
                    socket.emit('addToWishList')
                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.SHORT)
                })

        }else {
            ToastAndroid.show('Please login or sign up to add items to your wishlist',ToastAndroid.SHORT)
        }
    }
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "........" : str;
    }

    return (
        <View style={styles.mainContainer} >
            <TouchableOpacity style={styles.container} onPress={GoToProductScreen}>
                <Image style={styles.image} source={{uri:`${imageUrl}`}}/>
            </TouchableOpacity>
            <View style={styles.info}>
                <View>
                    <Text style={styles.text}>{truncate(name,17)}</Text>
                    <Text style={styles.text}>Ksh {price} /=</Text>
                </View>
                <TouchableOpacity onPress={addToWishList}>
                    <FontAwesome name='bookmark-o' size={20} />
                </TouchableOpacity>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer:{

    },
    container:{
        width:Dimensions.get('screen').width / 2.6,
        // borderWidth:2,
        // borderColor:'black',
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:10,
        height:120,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width: Dimensions.get('screen').width /2.6,
        height: 120,
        borderRadius: 15,
    },
    text:{
        marginLeft:20,
    },
    info:{
        flexDirection:'row',
        justifyContent: 'space-around'
    },


})
export default Product;
