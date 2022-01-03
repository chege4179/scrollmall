/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, {useEffect, useLayoutEffect, useState} from 'react';
import SplashScreen from "./src/Screens/SplashScreen";
import {Provider} from "react-redux";
import store from "./src/ReduxStore/Store";
import messaging from "@react-native-firebase/messaging";
import MainApp from "./MainApp";


const App = () => {
    const [isVisible,setIsVisible] = useState(true)
    useLayoutEffect(() => {
        messaging().getToken().then((token) => {

        })
    })


    const HideSplashScreen = () => {
        setIsVisible(false)
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            HideSplashScreen();
        },2000)

    },[])

    return (
        isVisible === true ? (<SplashScreen/>) :
            (
                <Provider store={store}>
                    <MainApp/>
                </Provider>
            )
    );
};

export default App;
