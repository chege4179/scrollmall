import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Button,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    RefreshControl
} from 'react-native';

import AntDesign from "react-native-vector-icons/AntDesign";
import ChatRoom from "./ChatRoom";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";

import axios from "axios";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";
import {SelectChats} from "../../ReduxStore/ChatStore/ChatReducer";
import ChatConstants from "../../ReduxStore/ChatStore/ChatConstants";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const ChatHomePage = ({ navigation,route }) => {

    const dispatch = useDispatch();
    const user = useSelector(SelectUser)
    const chatsfromstore = useSelector(SelectChats)
    const [refresh,setRefresh] = useState(false)
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "........" : str;
    }


    const LoadChats = () => {
        if (user?.accountType ==='Seller'){
            axios.get(`${BaseURL}/chat/seller?seller=${user.username}`)
                .then((res) => {
                    dispatch({
                        type:ChatConstants.GET_CHATS,
                        payload:res.data.chats
                    })
                    //ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.LONG)
                })
        }else if (user?.accountType ==='Buyer'){
            axios.get(`${BaseURL}/chat/buyer?buyer=${user.name}`)
                .then((res) => {
                    dispatch({
                        type:ChatConstants.GET_CHATS,
                        payload:res.data.chats
                    })
                })
                .catch((err) => {
                    ToastAndroid.show(err.message,ToastAndroid.LONG)
                })
        }
    }
    useEffect(() => {
        return LoadChats();
    },[])
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage)
            LoadChats();
        });
        return unsubscribe;
    })
    function getProfilePhoto(seller){
        let sellerImageUrl;
        axios.get(`${BaseURL}/shop/seller?username=${seller}`)
            .then((res) => {
                return  res.data.seller.ProfilePhoto
            })
            .catch((err) => {
                ToastAndroid.show(err.message,ToastAndroid.SHORT)
            })

    }


    const GoToChatSearchPage = () => {
        navigation.navigate('ChatSearchPage')
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    function getUnreadMessages(chatMessages){
        if (user.accountType ==='Seller'){
            const unreadMessages = chatMessages.filter((message) => message.readSeller ===false)
            return unreadMessages.length
        }else if (user?.accountType ==='Buyer'){
            const unreadMessages = chatMessages.filter((message) => message.readBuyer ===false)
            return unreadMessages.length
        }
    }

    const onRefresh = React.useCallback(() => {
        LoadChats();
        setRefresh(true);
        wait(2500).then(() => setRefresh(false));
    }, []);
    return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{paddingTop:0}} refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }>
                    {user === null && (<Text style={{textAlign:'center'}}>Please login to view chats</Text>)}
                    { user !== null && (
                        <View>
                            {
                                chatsfromstore.map((chat) => {
                                    return(
                                        <ChatRoom key={chat._id} receiver={user?.accountType ==='Seller' ? chat.Buyer :chat.Seller } unread={getUnreadMessages(chat.chatMessages)}
                                                  messages={chat.chatMessages} lastText={truncate(chat.chatMessages[chat.chatMessages.length -1].message,40)}
                                                  imageUrl={`${BaseURL}${getProfilePhoto(chat.Seller)}`} time={chat.chatMessages[chat.chatMessages.length -1].date}/>
                                    )

                                })
                            }
                        </View>
                    )}
                </ScrollView>
                {user?.accountType ==='Buyer' &&(<TouchableOpacity
                    title='Add'
                    style={styles.fab}
                    onPress={GoToChatSearchPage}>
                    <AntDesign name='plus' size={30} />
                </TouchableOpacity>)}
                {/*<TouchableOpacity onPress={LoadChats}>*/}
                {/*    <Text>Refresh</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>



    );
};
const styles = StyleSheet.create({
    fab: {
        zIndex:1,
        backgroundColor:'#128c7e',
        borderRadius:30,
        width:60,
        height:60,
        top:Dimensions.get('screen').height * 0.66,
        left:Dimensions.get('screen').width * 0.8,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    container:{
        marginTop:0,
        backgroundColor: 'white',
        flex:1,
    }
})
export default ChatHomePage;
//
// const test =[
//     // buyer-seller
//     {
//         chatId:1,
//         Buyer:'Francis Lerionka',
//         Seller:'peterkicks',
//         chatMessage:[
//             {
//                 id:1,
//                 message:'Hello Peter',
//                 sender:'peterkicks',
//                 time:'ii',
//                 read:true
//             },
//             {
//                 id:2,
//                 message:'Hello Francis',
//                 sender:'Francis Lerionka',
//                 time:'iii',
//                 read:true
//             },
//             {
//                 id:3,
//                 message:'Hello Peter',
//                 sender:'peterkicks',
//                 time:'ii',
//                 read:true
//             },
//             {
//                 id:4,
//                 message:'Hello Francis',
//                 sender:'Francis Lerionka',
//                 time:'ggg',
//                 read:true
//             },
//
//         ]
//     },
//     {
//         chatId:2,
//         Buyer:'Peter Chege',
//         Seller :'franciskicks',// buyer-seller
//         chatMessage:[
//             {
//                 id:1,
//                 message:'Hello Peter',
//                 sender:'Peter Chege',
//                 time:'ggg',
//                 read:true
//             },
//             {
//                 id:2,
//                 message:'Hello Francis',
//                 sender:'Peter Chege',
//                 time:'ggg',
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
//         Buyer:'Rita Wambui',
//         Seller:'franciskicks',// buyer-seller
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
// get chats
// add chats
// send message
// receive message
// get individual message

// #17212d
