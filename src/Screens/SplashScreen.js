import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
           <Text style={styles.text}>Splash Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    text:{
        fontWeight:'500',
        fontSize:20
    }
})
export default SplashScreen;
