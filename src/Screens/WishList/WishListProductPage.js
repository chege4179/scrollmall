import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, Alert, ScrollView, TouchableOpacity, Share} from 'react-native';
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


const WishListProductPage = ({ route,navigation }) => {
    const user = useSelector(SelectUser)
    const {imageUrl,name,price,seller,description} = route.params
    const [otherproducts,setOtherProducts] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:' Wish List Product Info'
        })
    },[])
    useEffect(() => {
        const FetchSellerProducts = axios.get(`${BaseURL}/product/all?username=${seller}`)
            .then((res) => {
                setOtherProducts(res.data.products)
            })

        return FetchSellerProducts;

    }, [])



    const PlaceOrder = () => {
        if(user === null){
            alert('Please login to place an order')
        }else {
            messaging()
                .getToken()
                .then(token => {
                    axios.post(`${BaseURL}/order/neworder`, {
                        name, price, seller, token, imageUrl,
                        customer:user.name ,phone:user.phone,
                        date:moment().format('MMMM Do YYYY'),
                        time: moment().format('h:mm:ss a')
                    })
                        .then((res) => {
                            alert(res.data.msg)
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
        navigation.navigate('Chats',{
            screen:'ChatPage',
            params: {
                receiver:seller

            },
        })
    }

    const GoToSellerScreen = () => {
        navigation.navigate('Seller',{seller,imageUrl})
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:`${BaseURL}${imageUrl}`}}/>
                <View style={styles.info}>
                    <View style={styles.infoProfile}>
                        <Image style={styles.profileImage} source={{uri:`${BaseURL}${imageUrl}`}} />
                        <Text style={styles.seller}>{seller}</Text>
                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={NavigateToChatScreen}>
                            <Ionicons name='paper-plane-outline' style={styles.icon} size={30} />
                        </TouchableOpacity>



                    </View>
                </View>

                <View style={styles.productInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>Ksh {price} /=</Text>
                </View>
                <TouchableOpacity style={styles.button}onPress={OrderPlaceOrder}>
                    <Text style={styles.placeorder}>Place an Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:20,width:Dimensions.get('screen').width * 0.9 }}onPress={GoToSellerScreen}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <View style={styles.descriptionInfo}>
                        <Image style={styles.descriptionImage} source={{uri:`${BaseURL}${imageUrl}`}}/>
                        <View style={styles.description}>
                            <Text style={styles.sellerDescription}>{seller}</Text>
                            <Text style={styles.descriptionText}>{description}</Text>
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
                                            price={product.price} seller={product.seller} imageUrl={product.imageUrl}/>)
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
export default WishListProductPage;
