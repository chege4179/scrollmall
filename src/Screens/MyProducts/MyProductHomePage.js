import React, {useEffect, useState} from 'react';

import {Text, View,ScrollView,StyleSheet,ToastAndroid,TouchableOpacity} from 'react-native';
import axios from "axios";
import BaseURL, {socket} from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import Product from "../../Components/Product";
import SellerProductScreen from "./SellerProductScreen";
import SellerProduct from "./SellerProduct";
import Category from "../../Components/Category";

const MyProductsHomePage = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const [products,setProduct] = useState([])
    const FetchProducts = () => {
        axios.get(`${BaseURL}/product/all?username=${user.username}`)
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                setProduct(res.data.products)
            })
    }
    useEffect(() => {
        const unsubcribe = navigation.addListener('focus',() => {
            FetchProducts();
        })
        return unsubcribe
    },[navigation])
    socket.on('DeleteProduct',() => {
        FetchProducts()
    })
    useEffect(() => {

        FetchProducts();

        return () => {
            FetchProducts();
        }
    },[])

    return (
        <ScrollView>

            <View style={styles.container}>
                {products.length ===0 && (
                    <View style={{ alignItems:'center',justifyContent: 'center'}}>
                        <Text style={{ fontSize:16, }}>
                            You don't have any products uploaded ...Yet Go and upload a product and view it here
                        </Text>
                    </View>
                )}
                {
                    products.map((product) => {
                        return(<SellerProduct key={product._id} id={product._id} price={product.price} imageUrl={`${product.imageUrl}`} name={product.name} description={product.description}/>)
                    })
                }
            </View>

        </ScrollView>

    );
};
const  styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

    },
})
export default MyProductsHomePage;
