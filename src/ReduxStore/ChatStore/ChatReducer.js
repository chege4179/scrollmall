import ChatConstants from "./ChatConstants";
import axios from "axios";


export const ChatReducer =(state={chats:[]},action) => {
    switch (action.type){
        case ChatConstants.GET_CHATS:
            return {
                chats:action.payload
            }
        case ChatConstants.ADD_CHAT:
            return {
                chats:[...state.chats,action.payload]
            }
        case ChatConstants.SEND_MESSAGE:
            const message = action.payload;
            let requiredchat = state.chats.find((chat) => {
                if (message.receiverType ==='Buyer'){
                    return ((message.sender === chat.Seller) && (message.receiver === chat.Buyer))
                }else if (message.receiverType=== 'Seller'){
                    return ((message.sender=== chat.Buyer) && (message.receiverType === chat.Seller))
                }
            })
            let currentchat = requiredchat.chatMessages
            currentchat.push(message)

            return {
                chats: [...state.chats,{
                    ...requiredchat,
                    chatMessages:[...currentchat,message]
                }]
            }
        case ChatConstants.GET_INDIVIDUAL_CHATS:
            const seller = action.payload.seller;
            const buyer = action.payload.buyer;

            const neededchat = state.chats.find((chat) => {

            })
            return {
                chat:neededchat
            }
        case ChatConstants.RECEIVE_MESSAGE:
            const receivedmessage = action.payload;

            let requiredchatss = state.chats.find((chat) => {
                if (message.receiverType ==='Buyer'){
                    return ((message.sender === chat.chatSeller) && (message.receiver === chat.chatBuyer))
                }else if (message.receiverType=== 'Seller'){
                    return ((message.sender=== chat.chatBuyer) && (message.receiverType === chat.chatSeller))
                }
            })
            let currentchats = requiredchatss.chatMessages
            currentchats.push(receivedmessage)

            return {
                chats: [...state.chats, {
                    ...requiredchatss,chatMessages: [...currentchats,receivedmessage]
                }]
            }
        default:
            return state
    }
}
export const SelectChats = state => state.chat.chats
export const SelectIndividualChat= state => state.chat.chat
export default ChatReducer;
//
// message = { id,message,receiver,sender,time,date}
//
//
