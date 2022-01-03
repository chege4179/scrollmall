import React, {useEffect} from 'react';

import {Text, View,StyleSheet,Image,Dimensions,Alert,ScrollView,Share,ToastAndroid} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import BaseURL, {socket} from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";


const SellerProductScreen = ({ route,navigation }) => {
    const {imageUrl,name,price,seller,description,id} = route.params
    const user = useSelector(SelectUser)
    const EditProductInfo = () => {
        navigation.navigate('EditProductInfo',{ name,price,description ,id})
    }

    const ShareFunction = async () => {
        try {
            const result = await Share.share({
                message:
                    `Go check this product ${name} by ${seller} `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const ConfirmDeleteProduct = () => {
        Alert.alert("Delete Product",
            "Are you sure you want to delete this product",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: DeleteProduct }
            ])
    }
    const DeleteProduct = () => {
        console.warn('Deleted')

        axios.delete(`${BaseURL}/product/delete/${id}`)
            .then((res) => {
                socket.emit('DeleteProduct')
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('An error ocurred..Please try again',ToastAndroid.SHORT)
            })
    }
    const GoToSellerScreen = () => {
        navigation.navigate('Seller',{seller,imageUrl})
    }
    console.warn(id)
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:imageUrl}}/>
                <View style={styles.info}>
                    <View style={styles.infoProfile}>
                        <Image style={styles.profileImage} source={{uri:imageUrl}} />
                        <Text style={styles.seller}></Text>
                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={ConfirmDeleteProduct}>
                            <AntDesign name='delete' style={styles.icon} size={30}/>
                        </TouchableOpacity>

                        <Ionicons name='paper-plane-outline' style={styles.icon} size={30} />
                        <Entypo name='share'size={30} style={styles.icon} onPress={ShareFunction}/>

                    </View>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>Ksh {price} /=</Text>
                </View>
                <TouchableOpacity style={styles.button}onPress={EditProductInfo}>
                    <Text style={styles.placeorder}>Edit this Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:20,width:Dimensions.get('screen').width * 0.9 }}onPress={GoToSellerScreen}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <View style={styles.descriptionInfo}>
                        <Image style={styles.descriptionImage} source={{uri:imageUrl}}/>
                        <View style={styles.description}>
                            <Text style={styles.sellerDescription}>{seller}</Text>
                            <Text style={styles.descriptionText}>{description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

        </ScrollView>

    );
};
const styles = StyleSheet.create({
    container:{
        marginRight:20,
        marginLeft:20,
        marginTop:10,
        marginBottom:10,
        justifyContent:'center',
    },
    image:{
        width:Dimensions.get('screen').width * 0.9,
        height:250,
        borderRadius:20

    },
    info:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width * 0.9
    },
    icons:{
        flexDirection: 'row'
    },
    icon:{
        paddingRight:20,
        paddingTop:10,
    },
    seller:{
        paddingTop:10,
        fontWeight:'bold',
        fontSize:14,
        paddingLeft: 10,
    },
    profileImage:{
        width:40,
        height: 40,
        borderRadius: 20,

    },
    infoProfile:{
        flexDirection:'row',
        paddingTop:10,

    },
    name:{
        paddingTop:10,
        fontWeight:'bold',
        fontSize:20,
        paddingLeft: 10,
        textAlign:'left'
    },
    price:{
        fontSize:14,
        paddingLeft: 10,
        textAlign:'left'
    },
    productInfo:{
        alignItems: 'flex-start'
    },
    button:{
        width:Dimensions.get('screen').width * 0.9,
        height:50,
        backgroundColor:'blue',
        borderRadius:10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    placeorder:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:16,

    },
    descriptionTitle:{
        fontSize:16,
        marginTop:15,
    },
    descriptionImage:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight: 20,

    },
    descriptionInfo:{
        marginTop:20,
        flexDirection:'row'

    },
    descriptionText:{

    },
    sellerDescription:{
        fontWeight:'bold',
        fontSize:14,
        flexWrap:'wrap',
    },
    moreItems:{
        marginTop:20,

    },
    moreText:{
        fontWeight:'bold',
        fontSize:18,
        marginLeft: 20
    },
    items:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }

})
export default SellerProductScreen;
