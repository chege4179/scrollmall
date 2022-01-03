import React from 'react';
import {Text, View,StyleSheet,Image,Dimensions,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import BaseURL from "../BaseURL";
import {Card} from "react-native-elements";

const ShopRoom = ({ username,businessName,imageUrl }) => {
    const navigation = useNavigation();
    const GoToSellerScreen =() => {
        navigation.navigate('Seller',{ username })
    }
    return (
        <Card wrapperStyle={{ justifyContent:'center',width:Dimensions.get('screen').width * 0.85,borderRadius:20, }}>
            <Pressable style={styles.container}  onPress={GoToSellerScreen}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}source={{uri:`${BaseURL}${imageUrl}`}}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.name}>{businessName}</Text>
                </View>
            </Pressable>
        </Card>

    );
};
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width * 0.9,
        height:80,
        // borderWidth:2,
        // borderColor:'black',
        // borderRadius:20,
        marginTop:10,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        shadowColor:'#000',
        shadowOpacity:.3,
        backgroundColor:'rgba(255,255,255,0.8)',
        shadowOffset:{
            width:0,
            height:20,

        }
    },
    image:{
        width:70,
        height: 70,
        borderRadius: 35,

    },
    info:{
        justifyContent: 'center',
        marginRight:150
    },
    imageContainer:{
        marginLeft:20,
    },
    username:{
        fontSize:18,
        paddingBottom:5

    },
    name:{
        fontSize: 16,
        fontWeight:'bold'

    }

})
export default ShopRoom;
