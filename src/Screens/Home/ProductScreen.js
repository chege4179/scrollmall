import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, Alert, ScrollView,
    TouchableOpacity, ToastAndroid,Share} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Product from "../../Components/Product";
import BaseURL from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import axios from "axios";
import messaging from '@react-native-firebase/messaging';
import moment from 'moment'


const ProductScreen = ({ route,navigation }) => {
    const [productInfo,setProductInfo] = useState({})
    const user = useSelector(SelectUser)
    const {imageUrl,name,price,seller,description,id} = route.params
    const [otherproducts,setOtherProducts] = useState([])

    useEffect(() => {
        const FetchSellerProducts = axios.get(`${BaseURL}/product/all?username=${seller || productInfo.username}`)
                .then((res) => {
                    setOtherProducts(res.data.products)
                })

        return FetchSellerProducts;

    }, [])
    useEffect(() => {
        axios.get(`${BaseURL}/product/${id}`)
            .then((res) => {
                setProductInfo(res.data.product)
            })

    },[])
    const addToWishList = () => {
        if (user !== null){
            axios.post(`${BaseURL}/wishlist/add?buyer=${user.name}`,
                {imageUrl,name,price,seller,description,email:user.email})
                .then((res) => {
                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.SHORT)
                })

        }else {
            ToastAndroid.show('Please login or sign up to add items to your wishlist',ToastAndroid.SHORT)
        }
    }
    const PlaceOrder = () => {
        if(user === null){
            alert('Please login to place an order')
        }else {
            messaging()
                .getToken()
                .then(token => {
                    axios.post(`${BaseURL}/order/neworder`, {
                            name:name || productInfo.name ,
                            price:price || productInfo.price,
                            seller:seller || productInfo.username  ,
                            token,
                            imageUrl:imageUrl || productInfo.imageUrl,
                            customer:user.name,
                            phone:user.phone,
                            date:moment().format('MMMM Do YYYY'),
                            time: moment().format('h:mm:ss a')
                        })
                        .then((res) => {
                            ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                });
        }
    }
    const OrderPlaceOrder = () => {
        Alert.alert("Place Order",
            "Are you sure you want to place an order",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: PlaceOrder }
            ])
    }
    const NavigateToChatScreen = () => {
        if (user === null){
            ToastAndroid.show('Please log in to contact this seller',ToastAndroid.LONG)
        }else {
            navigation.navigate('Chats',{
                screen:'ChatPage',
                params: {
                    receiver: seller || productInfo.username,
                },
            })
        }

    }
    const ShareProduct = async () => {
        console.warn('share')
        try {
            const result = await Share.share({
                message:`https://www.scrollmall.com/product/${id || productInfo._id}`,
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
    }
    const GoToSellerScreen = () => {
        navigation.navigate('Seller',{username:seller|| productInfo.username})
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:`${imageUrl || productInfo.imageUrl}`}}/>
                <View style={styles.info}>
                    <View style={styles.infoProfile}>
                        <Image style={styles.profileImage} source={{uri:`${BaseURL}${imageUrl || productInfo.imageUrl}`}} />
                        <Text style={styles.seller}>{seller || productInfo.username}</Text>

                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={NavigateToChatScreen}>
                            <Ionicons name='paper-plane-outline' style={styles.icon} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ShareProduct}>
                            <Entypo name='share'size={30} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addToWishList}>
                            <FontAwesome name='bookmark-o' style={{paddingTop:10}}  size={30}/>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.productInfo}>
                    <Text style={styles.name}>{name || productInfo.name}</Text>
                    <Text style={styles.price}>Ksh {price || productInfo.price} /=</Text>
                </View>
                <TouchableOpacity style={styles.button}onPress={OrderPlaceOrder}>
                    <Text style={styles.placeorder}>Place an Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:20,width:Dimensions.get('screen').width * 0.9 }}onPress={GoToSellerScreen}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <View style={styles.descriptionInfo}>
                        <Image style={styles.descriptionImage} source={{uri:`${BaseURL}${imageUrl || productInfo.imageUrl}`}}/>
                        <View style={styles.description}>
                            <Text style={styles.sellerDescription}>{seller || productInfo.username}</Text>
                            <Text style={styles.descriptionText}>{description  || productInfo.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={styles.moreItems}>
                <Text style={styles.moreText}>More from this Shop</Text>
                <View style={styles.items}>
                    {
                        otherproducts.map((product) => {
                            return(<Product key={product._id} name={product.name} description={product.description}
                            price={product.price} seller={product.seller} imageUrl={product.imageUrl} id={product._id}/>)
                        })
                    }
                </View>
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
export default ProductScreen;
