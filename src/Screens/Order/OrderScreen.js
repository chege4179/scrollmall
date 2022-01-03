import React from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert,useWindowDimensions} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import OrderHomePage from "./OrderHomePage";
import OrderInfoPage from "./OrderInfoPage";
import PaymentScreen from "./PaymentScreen";
const Stack = createStackNavigator();


const OrderScreen = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='OrderHome'component={OrderHomePage}
            options={{
                headerTitle:'My Orders'
            }}/>
            <Stack.Screen name='OrderInfo'component={OrderInfoPage}
            options={{
                headerTitle:'Order Info'
            }}/>
            <Stack.Screen name='PaymentScreen'component={PaymentScreen}
            options={{
                headerTitle:'Payment'
            }}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:10,

    },
    text:{
        fontWeight:'500',
        fontSize:20
    }
})
export default OrderScreen;
