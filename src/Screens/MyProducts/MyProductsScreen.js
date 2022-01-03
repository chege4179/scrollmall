import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import MyProductsHomePage from "./MyProductHomePage";
import SellerProductScreen from "./SellerProductScreen";
import EditProductInfo from "./EditProductInfo";

import Octicons from "react-native-vector-icons/Octicons";


const Stack = createStackNavigator();
const MyProductsScreen = () => {
    return (
        <Stack.Navigator>
           <Stack.Screen name='MyProductsHomePage' component={MyProductsHomePage}
           options={{
               headerShown:true,
               headerTitle:'My Products'
           }}/>
           <Stack.Screen name='SellerProductScreen' component={SellerProductScreen}
           options={{
               headerTitle:'Product Info',
               headerRight:() => {
                   return(
                       <TouchableOpacity style={{marginRight:20}}>
                           <Octicons name='three-bars' size={25}/>
                       </TouchableOpacity>
                   )
               }
           }}/>
           <Stack.Screen name='EditProductInfo' component={EditProductInfo}/>

        </Stack.Navigator>
    );
};

export default MyProductsScreen;
