import BaseURL from "../BaseURL";
import {UserActions} from "./UserConstants";
import axios from "axios";
import {Alert} from 'react-native'

export const LoginBuyer = (email,password) => async (dispatch) => {
    dispatch({
        type:UserActions.LOGIN_REQUEST
    })
    await axios.post(`${BaseURL}/auth/user/login`,{
        email:email,
        password:password
    })
        .then((res) => {
            if (res.data.login){
                dispatch({
                    type:UserActions.LOGIN_SUCCESS,
                    payload:res.data.user
                })
                alert(res.data.msg)
                return true
            }else {
                dispatch({
                    type:UserActions.LOGIN_FAILED,
                    payload:null
                })
                alert(res.data.msg)
                return false
            }
        }).catch((err) => {
            dispatch({
                type:UserActions.LOGIN_ERROR,
                payload:err

            })
            console.log(err.message)
            return false
        })
}


export const LoginSeller = (email,password) => async (dispatch) => {
    dispatch({
        type:UserActions.LOGIN_REQUEST
    })
    await axios.post(`${BaseURL}/auth/admin/login`,{
        email:email,
        password:password
    })
        .then((res) => {
            if (res.data.login){
                dispatch({
                    type:UserActions.LOGIN_SUCCESS,
                    payload:res.data.admin

                })
                alert(res.data.msg)
                return true
            }else {
                dispatch({
                    type:UserActions.LOGIN_FAILED,
                    payload:null
                })
                alert(res.data.msg)
                return false
            }
        }).catch((err) => {
            dispatch({
                type:UserActions.LOGIN_ERROR,
                payload:err

            })
            console.log(err.message)
            return false
        })
}

export const LoginSuperAdmin = (email,password) => async (dispatch) => {
    dispatch({
        type:UserActions.LOGIN_REQUEST
    })
    await axios.post(`${BaseURL}/auth/student/login`,{
        admno:admno,
        password:password
    })
        .then((res) => {
            if (res.data.login){
                dispatch({
                    type:UserActions.LOGIN_SUCCESS,
                    payload:{
                        user:res.data,
                        type:'superadmin'
                    },
                })
            }else {
                dispatch({
                    type:UserActions.LOGIN_FAILED,
                    payload:null
                })
            }
        }).catch((err) => {
            dispatch({
                type:UserActions.LOGIN_ERROR,
                payload:err

            })
            console.log(err.message)
            return false
        })
}

export const LogoutUser = () => (dispatch) =>  {
    dispatch({
        type:UserActions.LOGOUT_REQUEST,
    })
    dispatch({
        type:UserActions.LOGOUT_SUCCESS,
    })

}





























