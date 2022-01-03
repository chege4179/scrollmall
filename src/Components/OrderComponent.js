import React from 'react';

import {Text, View,Image,Dimensions,StyleSheet} from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import BaseURL from "../BaseURL";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
const OrderComponent = ({imageUrl,price,name,status,date,time,id,customer}) => {
    const navigation = useNavigation()
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const NavigateToOrderInfo = () => {
        navigation.navigate('OrderInfo',{ imageUrl,price,name,status,date,time,id,customer })

    }
    return (
        <TouchableOpacity style={styles.container} onPress={NavigateToOrderInfo}>
            <Image style={styles.image} source={{uri:`${BaseURL}${imageUrl}`}} />
            <View style={styles.details}>
                <View style={styles.orderinfo}>
                    <Text style={styles.ordername}>{truncate(name,11)}</Text>
                    <Text style={styles.orderprice}>Ksh {price} /=</Text>
                    <Text style={styles.orderprice}>{status}</Text>
                </View>
                <View style={styles.orderstatus}>
                    <View>
                        <Text style={styles.status}>{date}</Text>
                        <Text style={styles.status}>{time}</Text>
                        <Text style={styles.status}>{customer}</Text>
                    </View>
                </View>
                <View style ={{ justifyContent:'center' }}>
                    {status ==='pending' && (<Entypo name='cross' size={25} style={{ color:'red',fontSize:35}}/>)}
                    {status ==='Approved' && (<AntDesign name='check' size={25} style={{ color:'green',fontSize:35}}/>)}
                    {status ==='Declined' && (<Entypo name='cross' size={25} style={{ color:'red',fontSize:35}}/>)}
                </View>

            </View>

        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container:{
        width:'99%',
        height:70,
        flexDirection:'row',
        borderRadius:20,
        marginBottom:10,
    },
    image:{
        width: 60,
        height:60,
        alignSelf:'center',
        marginLeft:10,
        borderRadius: 20,
        marginRight:10,
    },
    orderinfo:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 30,
    },
    ordername:{
        textAlign:'left',
        fontWeight:'bold',
        fontSize:16

    },
    orderprice:{
        textAlign:'left',
        fontSize: 14
    },
    orderstatus:{
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'row',
        marginRight:30
    },
    details:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})
export default OrderComponent;
