
import React, {useEffect, useState,useCallback} from 'react';
import {ScrollView, Text, View, RefreshControl, ToastAndroid,TouchableOpacity} from 'react-native';
import axios from "axios";
import BaseURL, {socket} from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import OrderComponent from "../../Components/OrderComponent";
import messaging from "@react-native-firebase/messaging";

const OrderHomePage = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const [orders,setOrders] = useState([])
    const [refresh,setRefresh] = useState(false)

    const FetchOrders = () => {
        if (user?.accountType ==='Buyer'){
            setRefresh(true)
            axios.get(`${BaseURL}/order/buyer/allOrders?buyer=${user.name}`)
                .then((res) => {
                    setOrders(res.data.orders)
                    setRefresh(false)
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.SHORT)
                })
        }else if (user?.accountType ==='Seller') {
            setRefresh(true)
            axios.get(`${BaseURL}/order/seller/allOrders?seller=${user.username}`)
                .then((res) => {
                    setOrders(res.data.orders)
                    setRefresh(false)
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.SHORT)
                })
        }
    }
    useEffect(() => {

        FetchOrders()
        return () => {
            FetchOrders();
        }

    },[])
    useEffect(() => {

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            FetchOrders();
        });
        socket.on('UpdateOrders',() => {
            FetchOrders();
        })

        return unsubscribe;
    },[])
    useEffect(() => {
        const onFocus = navigation.addListener('focus',() => {
            FetchOrders();
        })
        return onFocus
    },[navigation])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        FetchOrders();
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
            />
        }>

            <View style={{ marginTop: 10, }}>
                {user == null && (<Text style={{ textAlign:'center' }}>Please log in to view your orders</Text>)}
                {orders.length === 0 && user?.accountType === 'Seller' && (
                    <View style={{ alignItems:'center',justifyContent:'center',marginTop:200,marginRight:20,marginLeft:20}}>
                        <Text style={{ fontSize: 16, }}>No orders Yet..When a customer places order on one of your products you'll be
                            notified...Swipe down to refresh</Text>
                    </View>
                )}
                {orders.length === 0 && user?.accountType === 'Buyer' && (
                    <View style={{ alignItems:'center',justifyContent:'center',marginTop:200,marginRight:20,marginLeft:20}}>
                        <Text style={{ fontSize: 16, }}>You have not ordered anything yet...
                            All your current and pending orders will be visible here...Swipe down to refresh</Text>
                    </View>
                )}
                {
                    orders.map((order) => {
                        return(<OrderComponent name={order.name} key={order._id}
                                               date={order.date} status={order.status} price={order.price} imageUrl={order.imageUrl}
                                               time={order.time} id={order._id} customer={order.customer}/>)
                    })
                }
                {/*<TouchableOpacity onPress={() => setRefreshState(refreshstate + 1)}>*/}
                {/*    <Text>Refresh</Text>*/}
                {/*</TouchableOpacity>*/}



            </View>
        </ScrollView>
    );
};

export default OrderHomePage;
