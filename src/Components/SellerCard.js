import React from 'react';

import {Text, View,StyleSheet,Image,ImageBackground} from 'react-native';

const SellerCard = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:'https://picsum.photos/200/300'}}/>
            <View style={styles.info}>

            </View>
        </View>
    );
};
const styles =StyleSheet.create({
    container:{
        width:'95%',
        alignItems:'center',
        // borderWidth:2,
        // borderColor:'black',
        height:200,
        marginBottom:50,
        borderRadius:15,
    },
    image:{
        height: '100%',
        width: '100%',
        borderRadius:30,
        resizeMode:'cover',
    },
    info:{
        borderColor:'black',
        borderWidth:2,
        width:'100%',
        height:50,
        borderRadius:10,
    }

})
export default SellerCard;
