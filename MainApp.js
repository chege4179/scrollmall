import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "./src/ReduxStore/UserReducer";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserActions} from "./src/ReduxStore/UserConstants";
import {NavigationContainer} from "@react-navigation/native";
import {Text} from "react-native";
import HomeScreen from "./src/Screens/Home/HomeScreen";
import Entypo from "react-native-vector-icons/Entypo";
import OrderScreen from "./src/Screens/Order/OrderScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import WishListScreen from "./src/Screens/WishList/WishListScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import ChatScreen from "./src/Screens/Chats/ChatScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./src/Screens/Profile/ProfileScreen";
import AddProductScreen from "./src/Screens/AddProduct/AddProductScreen";
import MyProductsScreen from "./src/Screens/MyProducts/MyProductsScreen";
import Feather from "react-native-vector-icons/Feather";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()


const MainApp = () => {
    const user = useSelector(SelectUser)
    const dispatch = useDispatch();
    const config = {
        screens: {
            Home: {
                screens:{
                    Product:'product/:id',
                    Seller:'/:username'
                },
            },
            Wishlist:{
                screens:{
                   WishListProductPage:'wishlist',
                }
            },
        },
    };

    const linking = {
        prefixes: [
            'http://localhost:8000',
            'scrollmall://',
        ],config
    }

    useEffect(() => {
        const GetUserData = () => {
            AsyncStorage.getItem('UserData',(err,data) => {
                if (err){

                }else {
                    if (err){
                        console.log('ASYNC STORAGE ERROR',err)
                    }else {

                        const userdata = JSON.parse(data)
                        if (user ===null){
                            dispatch({
                                type:UserActions.LOGIN_SUCCESS,
                                payload:userdata,
                            })
                        }

                    }
                }
            })
        }
        GetUserData();

        return () => {
            GetUserData();
        }
    },[])

    return (
        <NavigationContainer linking={linking} fallBack={<Text>Loading</Text>}>
            {
                (user === null || user.accountType === 'Buyer') && (
                    <Tab.Navigator
                        tabBarOptions={{
                                    keyboardHidesTabBar: true,
                                    activeTintColor: 'blue',
                                    inactiveTintColor: 'gray',

                                    style:{
                                        height:53,
                                        paddingTop:4,
                                        backgroundColor:'#fff'

                                    },
                                    labelStyle:{
                                        fontSize:14,
                                    }
                    }}>
                        <Tab.Screen name='Home' component={HomeScreen} options={{
                            tabBarIcon:() => {
                                return(<Entypo name='home'size={30} color='black'/>)
                            },

                        }}/>
                        <Tab.Screen name='Orders' component={OrderScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialIcons name='receipt' size={30}color='black' />)
                            }
                        }}/>
                        <Tab.Screen name='Wishlist' component={WishListScreen} options={{
                            tabBarIcon:() => {
                                return(<AntDesign name='hearto' size={30} color='black' />)
                            }
                        }}/>
                        <Tab.Screen name='Chats' component={ChatScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialCommunityIcons name='message' size={30} color='black' />)
                            },

                        }}/>
                        <Tab.Screen name='Account' component={ProfileScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialCommunityIcons name='account-circle' size={30} color='black' />)
                            }
                        }}/>
                    </Tab.Navigator>
                )
            }
            {
                user?.accountType ==='Seller' &&(
                    <Tab.Navigator tabBarOptions={{
                            keyboardHidesTabBar: true,
                            activeTintColor: 'blue',
                            inactiveTintColor: 'gray',

                            style:{
                                height:52.5
                            },
                            labelStyle:{
                                fontSize:14,
                            },

                        }}

                    >
                        <Tab.Screen name='Orders' component={OrderScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialIcons name='receipt' size={30}/>)
                            },tabBarLabel:'Orders'
                        }}/>
                        <Tab.Screen name='Chats' component={ChatScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialCommunityIcons name='message' size={30}/>)
                            },
                        }}/>
                        <Tab.Screen name='Add Products' component={AddProductScreen} options={{
                            tabBarIcon:() => {
                                return(<AntDesign name='pluscircleo'size={35}style={{marginTop:5}}/>)
                            },
                            tabBarLabel:''



                        }}/>
                        <Tab.Screen name='Goods' component={MyProductsScreen} options={{
                            tabBarIcon:() => {
                                return(<Feather name='shopping-bag' size={30}/>)
                            },
                        }}/>

                        <Tab.Screen name='Account' component={ProfileScreen} options={{
                            tabBarIcon:() => {
                                return(<MaterialCommunityIcons name='account-circle' size={30}/>)
                            }
                        }}/>
                    </Tab.Navigator>
                )
            }
        </NavigationContainer>
    )
}

export default MainApp;

// adb shell am start -W -a android.intent.action.VIEW -d "scrollmall://hildashoes" com.scrollmall
