import React from 'react'
import {Text, View,StyleSheet,Dimensions,Image,Pressable,ToastAndroid} from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import BaseURL from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { socket } from "../../BaseURL";

const WishListProduct = ({ imageUrl,name,price,seller,description}) => {
    const user = useSelector(SelectUser)
    const navigation = useNavigation();

    const GoToProductScreen = () => {
        navigation.navigate('WishListProductPage',{ imageUrl,name,price,seller,description })
    }
    const RemoveFromWishList = () => {
        axios.put(`${BaseURL}/wishlist/remove?buyer=${user.name}&imageUrl=${imageUrl}`)
            .then((res) => {
                socket.emit('RemoveItemFromWishList')
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.SHORT)
            })

    }

    return (
        <View style={styles.mainContainer} >
            <TouchableOpacity style={styles.container} onPress={GoToProductScreen}>
                <Image style={styles.image} source={{uri:`${BaseURL}${imageUrl}`}}/>
            </TouchableOpacity>
            <View style={styles.info}>
                <View>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>Ksh {price} /=</Text>
                </View>
                <TouchableOpacity onPress={RemoveFromWishList}>
                    <AntDesign name='delete' size={20} />
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
        marginLeft:20
    },
    info:{
        flexDirection:'row',
        justifyContent: 'space-around'

    },


})
export default WishListProduct;
