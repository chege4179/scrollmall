import React from 'react';

import {Text, View,StyleSheet,Dimensions,Image,Pressable} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

const SellerProduct = ({imageUrl,name,price,description,id}) => {
    const navigation =useNavigation();

    const GoToProductScreen = () => {
        navigation.navigate('SellerProductScreen',{imageUrl,name,price,description,id})
    }
    return (
        <TouchableOpacity style={styles.mainContainer} onPress={GoToProductScreen}>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:imageUrl}}/>
            </View>
            <View style={styles.info}>
                <View>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>Ksh {price} /=</Text>
                </View>
                <FontAwesome name='bookmark-o' size={20}/>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    mainContainer:{

    },
    container:{
        width:Dimensions.get('screen').width / 2.6,
        // borderWidth:2,
        // borderColor:'black',
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:10,
        height:120,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width: Dimensions.get('screen').width /2.6,
        height: 120,
        borderRadius: 15,
    },
    text:{
        marginLeft:20
    },
    info:{
        flexDirection:'row',
        justifyContent: 'space-around'

    },


})
export default SellerProduct;
