import React, {useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import ChatHomePage from "./ChatHomePage";
import ChatSearchPage from "./ChatSearchPage";
import ChatPage from "./ChatPage";

import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const  Stack = createStackNavigator();


const ChatScreen = ({navigation,route}) => {
    navigation.setOptions({
        tabBarVisible:getFocusedRouteNameFromRoute(route) !== 'ChatPage'
    })

    return (
        <Stack.Navigator initialRouteName='ChatHomePage' >
            <Stack.Screen name='ChatHomePage' component={ChatHomePage} options={{
                headerTitle:'My Chats',
            }} />
            <Stack.Screen name='ChatSearchPage' component={ChatSearchPage}
             />
            <Stack.Screen name='ChatPage' component={ChatPage}/>
        </Stack.Navigator>
    );
};
export default ChatScreen;
// Patrick890
