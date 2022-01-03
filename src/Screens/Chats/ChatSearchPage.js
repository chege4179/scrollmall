import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Text, View,ScrollView,TextInput,StyleSheet,TouchableOpacity,Image} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import BaseURL from "../../BaseURL";

const ChatSearchPage = ({ navigation }) => {
    const [sellers,setAllseller] = useState([])
    const [searchresults,setSearchResults] = useState([])
    const [isNotFound,setIsNotFound] = useState(false)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:'Search Sellers'
        })

    },[])

    useEffect(() => {
        let unmounted = false
        if (!unmounted ){
            axios.get(`${BaseURL}/chat/allsellers`)
                .then((res) => {
                    setAllseller(res.data.sellers)
                    setSearchResults(res.data.sellers)
                })
        }
        return () => {
            unmounted = true
        }

    },[])

    const SearchForSellers = (text) => {
        axios.get(`${BaseURL}/shop/search?query=${text}`)
            .then((res) => {
                setSearchResults(res.data.searchresults)
            })
    }

    return (

        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput placeholder='Search Shops.....' style={styles.input}
                onChangeText={SearchForSellers}/>
                <AntDesign name='search1' style={{ paddingRight: 30 }} size={30}/>
            </View>
            {
                searchresults.map((searchresult) => {
                    const GoToChatPage =() => {
                        navigation.navigate('ChatPage',
                            { receiver:searchresult.username,BusinessName:searchresult.BusinessName,messages:[] })
                    }
                    return(
                        <TouchableOpacity onPress={GoToChatPage} key={searchresult._id}>
                            <View style={styles.searchresult}>
                                <View>
                                    <Image style={styles.image} source={{uri:'https://picsum.photos/200/300'}}/>
                                </View>
                                <View style={{justifyContent:'center'}}>
                                    <Text style={styles.email}>{searchresult.username}</Text>
                                    <Text style={styles.businessname}>{searchresult.BusinessName}</Text>
                                </View>
                                <View style={{justifyContent:'center'}}>
                                    <Text style={styles.businessname}>{searchresult.BusinessCategory}</Text>
                                    <Text style={styles.businessname}>{searchresult.email}</Text>
                                    <Text style={styles.businessname}>{searchresult.phone}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }

          <ScrollView>

          </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        marginRight:8,
        marginLeft:8,
        marginTop:10,
    },
    inputView:{
        alignItems:'center',
        justifyContent:'center',

        borderColor:'black',
        borderRadius:20,
        flexDirection:'row',
        backgroundColor:'grey'
    },
    input:{
        width:'90%',
        marginLeft: 20,
        fontSize:18,
        color:'white'
    },
    searchresult:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        borderWidth:1,
        borderColor: 'black',
        borderRadius: 15
    },
    email:{
        fontSize: 20,
        fontWeight:'800',
    },
    businessname:{
        fontSize:16,

    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        margin:10,

    }
})
export default ChatSearchPage;
