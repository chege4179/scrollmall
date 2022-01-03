import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Text, View,StyleSheet,Image,ToastAndroid,ScrollView} from 'react-native';
import axios from "axios";
import BaseURL from "../../BaseURL";
import Product from "../../Components/Product";

const SellerScreen = ({route,navigation}) => {
    const {username} = route.params;
    const [products,setProducts] = useState([])
    const [SellerInfo,setSellerInfo] = useState({})
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:username
        })
    },[])
    useEffect(() => {
        const FetchProducts = axios.get(`${BaseURL}/product/all?username=${username}`)
            .then((res) => {
                setProducts(res.data.products)
            })
        return FetchProducts
    },[])
    useEffect(() => {
        const FetchSellerInfo = axios.get(`${BaseURL}/shop/seller?username=${username}`)
            .then((res) => {
                setSellerInfo(res.data.seller)

            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.SHORT)
            })
        return FetchSellerInfo
    },[])
    const description=''
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                    <Image style={styles.image} source={{uri:'https://picsum.photos/300/300'}}/>
                    <View>
                        <Text style={{fontSize:15}}>Business Name :{SellerInfo?.BusinessName}</Text>
                        <Text style={{fontSize:15}}>Category : {SellerInfo?.BusinessCategory}</Text>
                        <Text style={{fontSize:15}}>Email Addresss :{SellerInfo?.email}</Text>
                        <Text style={{fontSize:15}}>Phone : {SellerInfo?.phone}</Text>
                        <Text style={{fontSize:15}}>Username: {username}</Text>
                    </View>
                </View>
                {
                    description !== '' && (<View style={{ marginRight:10,marginLeft:10,marginTop:10 }}>
                        <Text style={{paddingLeft:10,paddingTop:5,fontSize:15,fontWeight:'bold'}}>Description</Text>
                        <Text style={{padding:7,}}>{description}</Text>
                    </View>)
                }

                <View style={styles.products}>
                    {
                        products.map((product) => {
                            return(<Product
                                id={product._id}
                                key={product._id}
                                imageUrl={product.imageUrl}
                                description={product.description}
                                price={product.price}
                                seller={product.username}
                                name={product.name}/>)
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
};
const styles= StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    image:{
        height:90,
        width:90,
        borderRadius:45,

    },
    products:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default SellerScreen;
