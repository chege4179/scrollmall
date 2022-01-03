import React from 'react';

import { Text, View,TextInput,Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

const SearchField = () => {
    return (
        <View style={styles.search}>
            <TextInput style={styles.input} placeholder='Search..............'/>
            <View style={styles.icon}>
                <TouchableOpacity>
                    <AntDesign name='search1' size={25}/>
                </TouchableOpacity>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    search:{
        width:Dimensions.get('screen').width * 0.90,
        flexDirection:'row',
        marginTop:12,
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        borderRadius: 20,
        backgroundColor:'#cdcdcd',
    },
    input:{
        width:Dimensions.get('screen').width * 0.80,
        backgroundColor:'#cdcdcd',
        borderRadius:17,
        height:45,
    },
    icon:{
        alignItems:'center',
        justifyContent:'center',

    }


})
export default SearchField;
