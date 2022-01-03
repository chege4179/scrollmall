import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, ToastAndroid, ScrollView, TouchableOpacity,Dimensions, RefreshControl} from 'react-native';
import axios from "axios";
import BaseURL from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import WishListProduct from "./WishListProduct";
import { socket } from "../../BaseURL";

const WishListHomePage = ({navigation}) => {
    const user = useSelector(SelectUser)
    const [WishListProducts,setWishListProducts] = useState([])
    const [refresher,setRefresher] = useState(0)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:'My Wish List',

        })
    },[])
    const FetchWishListProducts = () => {
        axios.get(`${BaseURL}/wishlist/all?buyer=${user?.name}`)
            .then((res) => {
                setWishListProducts(res.data.wishlist.wishlist)
            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('Please check your Internet Connection',ToastAndroid.SHORT)
            })

    }
    socket.on('ItemRemoved',() => {
        FetchWishListProducts()
    })
    useEffect(() => {
        if (user !== null){
            FetchWishListProducts();
        }

    },[])
    useEffect(() => {
        const subscribe = navigation.addListener('focus',() => {
            FetchWishListProducts();
        })
        return subscribe
    },[navigation])
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refresh,setRefresh] = useState(false)
    const onRefresh = React.useCallback(() => {
        FetchWishListProducts();
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}>
            <View style={styles.container} onPress={()  => console.warn('Pressed')}>
                {WishListProducts.length === 0 && (<Text style={{ marginTop:350 }}>No Products were found in the wish list</Text>) }
                {user === null && (<Text style={styles.alert}>Login or create an account to view your Wish List</Text>)}
                {
                    WishListProducts.map((product) => {
                        return(<WishListProduct key={product.imageUrl} name={product.name} imageUrl={product.imageUrl}
                              seller={product.seller} description={product.description}
                              price={product.price} />)
                    })
                }
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

    },
    alert:{
        marginTop:360,
        fontSize:16,


    }
})
export default WishListHomePage;
