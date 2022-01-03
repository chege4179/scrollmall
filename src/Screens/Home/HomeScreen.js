import React from 'react';
import {Text, View, StyleSheet,ScrollView} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "./HomePage";
import ProductScreen from "./ProductScreen";
import SellerScreen from "./SellerScreen";
import CategoryPage from "./CategoryPage";

const Stack = createStackNavigator();
const HomeScreen = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='HomePage' component={HomePage} options={{
                headerShown:false,
            }}/>
            <Stack.Screen name='Product'component={ProductScreen} options={{
                headerTitle:'Scroll Mall Online Market'
            }}/>
            <Stack.Screen name='Seller'component={SellerScreen}/>
            <Stack.Screen name='CategoryPage' component={CategoryPage}/>
        </Stack.Navigator>
    );
};

export default HomeScreen;
