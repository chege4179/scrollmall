import React from 'react';

import {Text, View,StyleSheet,Image,TouchableOpacity,ToastAndroid} from 'react-native';
import BaseURL from "../../BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import axios from "axios";
import { socket } from "../../BaseURL";

const OrderInfoPage = ({ route, navigation }) => {
    const user = useSelector(SelectUser)
    const { imageUrl,price,name,status,date,time,id ,customer} = route.params;

    const ApproveOrder = () => {
        axios.put(`${BaseURL}/order/seller/approve/${id}`)
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
                socket.emit('OrderApproved')
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.LONG)
            })
    }
    const DeclineOrder = () => {

        axios.put(`${BaseURL}/order/seller/decline/${id}`)
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
                socket.emit('OrderDeclined')
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.LONG)
            })
    }
    const GoToPaymentScreen = () => {
        navigation.navigate('PaymentScreen')

    }
    return (
        <View style={styles.container}>

            <Image style={styles.image} source={{ uri:`${BaseURL}${imageUrl}` }}/>
            <View style={styles.orderinfo}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.productName}> {name} </Text>
                    <Text style={styles.price}> Ksh {price} /=</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginLeft:15}}>
                        <Text style={{fontSize: 16,fontWeight:'bold'}}>Status :{status}</Text>
                        <Text style={{fontSize: 16}}>Date Ordered : {date}</Text>
                        <Text style={{fontSize: 16}}>Time Ordered : {time}</Text>
                    </View>
                    <View style={{marginRight:25,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: 18,fontWeight:'bold'}}>Ordered By : </Text>
                        <Text style={{fontSize: 16,}}>{customer}</Text>
                    </View>
                </View>


            </View>
            {
                user.accountType ==='Seller' && (

                <View style={{flexDirection:'row',flex:1,justifyContent:'space-evenly',marginTop:20}}>
                    <TouchableOpacity style={styles.approvebutton} onPress={ApproveOrder}>
                        <Text style={styles.text}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declinebutton} onPress={DeclineOrder}>
                        <Text style={styles.text}>Decline</Text>
                    </TouchableOpacity>
                </View>
                )
            }
            <View style={{marginRight: 15,marginLeft: 15,marginTop: 5,}}>
                {user.accountType === 'Buyer' &&(<Text style={{ fontSize:15 }}>N/B once an order has been placed it cannot be reverted ..To revert the order contact the seller
                    using the chat box</Text>)}
                {user.accountType ==='Seller' &&(
                    <Text style={{ fontSize:15 }}>If one of your customers places an order by mistake , he/she should contact your via the chat box</Text>
                )}
            </View>
            {
                (user.accountType ==='Buyer') && (status ==='Approved') &&(
                    <View style={styles.checkout}>
                        <TouchableOpacity style={styles.checkOutButton} onPress={GoToPaymentScreen}>
                            <Text style={styles.checkOutButtonText}>Proceed To Payment</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
       flex:1,
        margin:10,
    },
    image:{
        width:'100%',
        height:270,
        borderRadius:20,
    },
    approvebutton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',
        width:170,
        height:50,
        borderRadius: 15
    },
    declinebutton:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'red',
        width:170,
        height:50,
        borderRadius: 15
    },
    text:{
        color:'white',
        fontSize:18,
    },
    orderinfo:{
        marginTop:20,
    },
    productName:{
        color:'black',
        fontSize: 20,
        marginLeft:15,

    },
    price:{
        color:'black',
        fontSize: 16,
        marginRight:25,
        fontWeight:'bold',

    },
    checkout:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',


    },
    checkOutButton:{
        width:'50%',
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        marginTop: 10,
        borderRadius:10

    }

})
export default OrderInfoPage;
