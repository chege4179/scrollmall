import React from 'react';
import { useNavigation } from '@react-navigation/native'
import {Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import { Button } from "react-native-paper";

const Category = ({name}) => {
    const navigation = useNavigation();
    const GoToCategoryPage =() => {
        navigation.navigate('CategoryPage',{category:name})
    }
    return (
        <TouchableOpacity style={styles.container} labelStyle={styles.name} onPress={GoToCategoryPage} >
            <Text numberOfLines={1} style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container:{
      borderWidth:1,
      borderColor:'black',
      borderRadius:10,

      height:30,
      alignItems:'center',
      justifyContent:'center',
      marginRight:10,

    },
    name:{
        paddingTop:2,
        paddingLeft:10,
        paddingRight:10,
        flex:1,
        textAlign:'center',
        paddingBottom:0,
        fontSize:16,
        fontWeight:'900',
        color:'black',
    },

})
export default Category;
