import axios from "axios";
import BaseURL from "../../BaseURL";
import ChatConstants from "./ChatConstants";
import moment from "moment";
import {ToastAndroid} from "react-native";

const GetAllChats = (user) => async (dispatch) =>{
    if (user.accountType ==='Buyer') {
        await axios.get(`${BaseURL}/chat/buyer?buyer=${user.name}`)
            .then((res) => {
                dispatch({
                    type:ChatConstants.GET_CHATS,
                    payload:res.data.chats
                })
            })
    }else if (user.accountType ==='Seller') {
        await axios.get(`${BaseURL}/chat/seller?seller=${user.username}`)
            .then((res) => {
                dispatch({
                    type:ChatConstants.GET_CHATS,
                    payload:res.data.chats
                })
            })
    }
}
const SendMessage = (message) => async (dispatch) => {



}
const AddChat = () => {

}
