import React,{ useState } from 'react';

import {Text, View,StyleSheet,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import axios from "axios";
import BaseURL from "../../BaseURL";

const EditProductInfo = ({ navigation,route }) => {
    const { name,price,description,id } = route.params
    const [newname,setNewName] = useState(name)
    const [newprice,setNewPrice] = useState(price)
    const [NewDescription,setNewDescription] = useState(description)
    
    const UpdateProduct =() => {
        axios.put(`${BaseURL}/product/update/${id}`,
            {
                name:newname,
                price:newprice,
                description:NewDescription
            })
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}> New Name</Text>
                <TextInput style={styles.textInput} value={newname} onChangeText={text => setNewName(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}> New Price</Text>
                <TextInput style={styles.textInput} value={newprice} onChangeText={text => setNewPrice(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}> New Description</Text>
                <TextInput  style={styles.textInput} value={NewDescription} onChangeText={text => setNewDescription(text)}
                            numberOfLines={4} multiline={true}/>
            </View>
            <TouchableOpacity onPress={UpdateProduct} style={styles.button}>
                <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop: 10,
    },
    inputContainer:{
      width:'90%',

    },
    title:{
        fontSize:18,
        fontWeight:'900',
        paddingBottom:10,

    },
    textInput:{
        backgroundColor:'grey',
        borderColor:'black',
        borderRadius:20,
        //borderWidth:2,
        // borderColor:'black',
        // borderRadius:20,

    },
    button:{
        backgroundColor: 'blue',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:20,
        borderRadius: 15

    },
    buttonText:{
        padding:20,
        color:'white'
    }
})
export default EditProductInfo;
