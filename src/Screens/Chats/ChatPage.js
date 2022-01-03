import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Text, View,ScrollView,TouchableOpacity,StyleSheet,Image,TextInput,ToastAndroid,Keyboard,KeyboardAvoidingView} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import axios from "axios";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";
import ChatConstants from "../../ReduxStore/ChatStore/ChatConstants";
import {SelectChats, SelectIndividualChat } from "../../ReduxStore/ChatStore/ChatReducer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const ChatPage = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const { receiver ,messages  } = route.params
    const [MessageInput,setMessageInput] = useState('')
    const user = useSelector(SelectUser)
    const [chatMessages,setChatMessages] = useState([])
    const scrollViewRef = useRef();

    function UpdateUnreadMessage(){
        if (user.accountType ==='Buyer'){
            axios.put(`${BaseURL}/chat/updateReadMessages?userType=${user.accountType}&seller=${receiver}&buyer=${user.name}`)
                .then((res) => {

                })
                .catch((err) => {
                    console.warn(err.message)
                })
        }else if (user.accountType === 'Seller'){
            axios.put(`${BaseURL}/chat/updateReadMessages?userType=${user.accountType}&buyer=${receiver}&seller=${user.username}`)
                .then((res) => {

                })
                .catch((err) => {
                    console.warn(err.message)
                })
        }

    }

    const FetchIndividualChats = () => {
        if (user.accountType ==='Buyer'){
            axios.get(`${BaseURL}/chat/mychats?buyer=${user.name}&seller=${receiver}`)
                .then(res => {
                    if (res.data.chats.chatMessages === null){
                        setChatMessages([])
                    }else {
                        setChatMessages(res.data.chats.chatMessages)
                    }

                })
        }else if (user.accountType ==='Seller') {
            axios.get(`${BaseURL}/chat/mychats?buyer=${receiver}&seller=${user.username}`)
                .then(res => {
                    if (res.data.chats.chatMessages === null){
                        setChatMessages([])
                    }else {
                        setChatMessages(res.data.chats.chatMessages)
                    }
                })
        }
    }
    useLayoutEffect(() => {
        FetchIndividualChats();
        UpdateUnreadMessage();
    },[])
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            FetchIndividualChats();

        });
        return unsubscribe;
    },[])
    useEffect(() => {
        const subscribe = navigation.addListener('focus',() => {
            FetchIndividualChats();
        })
    },[navigation])
    const SendMessage = () => {
        Keyboard.dismiss()
        if (user?.accountType ==='Seller'){
            let message = {
                message:MessageInput,
                sender:user.username,
                time:moment().format("MMMM Do YY"),
                date:moment().format("h:mm:ss a"),
                receiverType:'Buyer',
                receiver,
                readBuyer:false,
                readSeller:true,
            }

            axios.post(`${BaseURL}/chat/newchat?seller=${user.username}&buyer=${receiver}`,message)
                .then((res) => {
                    FetchIndividualChats();
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.SHORT)
                })
        }else if (user?.accountType === 'Buyer'){
            let message = {
                message:MessageInput,
                sender:user.name,
                time:moment().format("MMMM Do YY"),
                date:moment().format("h:mm:ss a"),
                receiverType:'Seller',
                receiver:receiver,
                readBuyer:true,
                readSeller:false,
            }

            axios.post(`${BaseURL}/chat/newchat?seller=${receiver}&buyer=${user.name}`,message)
                    .then((res) => {
                        FetchIndividualChats();
                    })
                    .catch((err) => {
                        ToastAndroid.show(err.message,ToastAndroid.SHORT)
                    })
            }
            setMessageInput('')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:receiver,
            headerRight:() => {
                return(
                    <View style={{ flexDirection:'row'}}>
                        <TouchableOpacity style={{ paddingRight:30, }}>
                            <Feather name='phone' size={23}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight:15, }}>
                            <Entypo name='dots-three-vertical' size={23}/>
                        </TouchableOpacity>
                    </View>
                )
            },

        })
    },[])

    return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} >
                    {
                        chatMessages.map((message) => {
                            if (user?.accountType === 'Seller'){
                                if (message.sender === user.username){
                                    return(
                                        <View style={styles.receiver} key={message._id}>
                                            <Text style={styles.receiverText}>{message.message}</Text>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={styles.receiverText}>{message.date}</Text>
                                                <FontAwesome5 name='check' size={13} color={message.readSeller ? 'blue' : 'grey'} style={{paddingTop:5,paddingLeft:5}}/>
                                            </View>

                                        </View>
                                    )
                                }else {
                                    return (
                                        <View style={styles.sender} key={message._id}>
                                            <Text style={styles.senderText}>{message.message}</Text>
                                            <Text style={styles.senderName}>{message.date}</Text>
                                        </View>
                                    )
                                }
                            }else if (user?.accountType === 'Buyer'){
                                if (message.sender === user.name){
                                    return(
                                        <View style={styles.receiver} key={message._id}>
                                            <Text style={styles.receiverText}>{message.message}</Text>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={styles.receiverText}>{message.date}</Text>
                                                <FontAwesome5 name='check' size={13} color={message.readSeller ? 'blue' : 'grey'} style={{paddingTop:5,paddingLeft:5}}/>
                                            </View>

                                        </View>
                                    )
                                }else {
                                    return (
                                        <View style={styles.sender} key={message._id}>
                                            <Text style={styles.senderText}>{message.message}</Text>
                                            <Text style={styles.senderName}>{message.date}</Text>

                                        </View>
                                    )
                                }
                            }

                        })
                    }
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput placeholder='Type a Message' style={styles.textInput} value={MessageInput}
                    onChangeText={(text) => setMessageInput(text)}/>
                    <TouchableOpacity  activeOpacity={0.5} onPress={SendMessage}>
                        <Ionicons name='send' color='#2B68E6' size={27}/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

    );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#282535'
    },

    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,


    },
    textInput:{
        bottom:0,
        height:40,
        flex: 1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ECECEC',
        borderWidth:1,
        padding: 10,
        color:'grey',
        borderRadius:30,
    },
    receiver:{
        padding:10,
        backgroundColor: '#ECECEC',
        alignSelf:'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative',

    },
    sender:{
        padding:8,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:0,
        marginBottom: 5,
    },
    receiverText:{
        color:'black',
        fontWeight: '500',
        marginLeft:10,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white',

    }
})
export default ChatPage;

//
// const test =[
//     {
//         chatId:1,
//         chatRoom:'Francis Lerionka-peterkicks',// buyer-seller
//         chatMessage:[
//             {
//                 id:1,
//                 message:'Hello Peter',
//                 sender:'peterkicks',
//                 time:moment().format('MMMM Do YYYY, h:mm:ss a'),
//                 read:true
//             },
//             {
//                 id:2,
//                 message:'Hello Francis',
//                 sender:'Francis Lerionka',
//                 time:moment().format('MMMM Do YYYY, h:mm:ss a'),
//                 read:true
//             },
//             {
//                 id:3,
//                 message:'Hello Peter',
//                 sender:'peterkicks',
//                 time:moment().format('MMMM Do YYYY, h:mm:ss a'),
//                 read:true
//             },
//             {
//                 id:4,
//                 message:'Hello Francis',
//                 sender:'Francis Lerionka',
//                 time:moment().format('MMMM Do YYYY, h:mm:ss a'),
//                 read:true
//             },
//
//         ]
//     },
//     {
//         chatId:2,
//         chatRoom:'Peter Chege-franciskicks',// buyer-seller
//         chatMessage:[
//             {
//                 id:1,
//                 message:'Hello Peter',
//                 sender:'Peter Chege',
//                 time:moment().format('MMMM Do YYYY, h:mm:ss a'),
//                 read:true
//             },
//             {
//                 id:2,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//             {
//                 id:3,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//             {
//                 id:4,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//
//         ]
//     },
//     {
//         chatId:3,
//         chatRoom:'Rita Wambui-hildashoes',// buyer-seller
//         chatMessage:[
//             {
//                 id:1,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//             {
//                 id:2,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//             {
//                 id:3,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//             {
//                 id:4,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:Date.now(),
//                 read:true
//             },
//
//         ]
//     },
// ];
//

//const DisplayProductImage =() => {
//     return(
//         <View style={{ flex:1,zIndex:1,position: 'absolute',
//             top: 150,
//             right: 10,
//             elevation: 10, }}>
//             <TouchableOpacity>
//                 <Entypo name='cross' size={35}/>
//             </TouchableOpacity>
//             <Image source={{uri:'https://picsum.photos/200/300'}} style={{ width:100,height:100, }}/>
//         </View>
//     )
// }

// {/*<View  style={styles.receiver}>*/}
// {/*    /!*<TouchableOpacity onPress={DisplayProductImage}>*!/*/}
// {/*    /!*    <Image source={{uri:'https://picsum.photos/200/301'}} style={{width:100,height: 80}}/>*!/*/}
// {/*    /!*</TouchableOpacity>*!/*/}
// {/*    <Text style={styles.receiverText}>Peter</Text>*/}
// {/*    <Text style={styles.receiverText}>Peter.</Text>*/}
// {/*</View>*/}
