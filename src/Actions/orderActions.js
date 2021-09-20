import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

} from '../Constants/orderConstants'

import {CART_CLEAR_ITEMS} from '../Constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async(dispatch,getState)=>{
    try{
        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{'Content-type' :'Application/json',
                     Authorization: 'Bearer '+userInfo.token
                    }

        }
        dispatch({type:ORDER_CREATE_REQUEST})

        const {data} = await axios.post(`/api/orders/add/`,
                        order,
                        config)

        dispatch({type: ORDER_CREATE_SUCCESS, payload:data})
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })
        localStorage.removeItem('cartItems')
  
    }catch(error) {
        dispatch({type: ORDER_CREATE_FAIL, 
            payload:error.response&&error.response.data.detail
                    ?error.response.data.detail
                    :error.message})     
    }

}

export const getOrderDetails = (id) => async(dispatch,getState) => {
    try{
        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{'Content-type' :'Application/json',
                     Authorization: 'Bearer '+userInfo.token
                    }

        }
        dispatch({type:ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/orders/${id}/`,
                        config)

        dispatch({type: ORDER_DETAILS_SUCCESS, payload:data})
 
  
    }catch(error) {
        dispatch({type: ORDER_DETAILS_FAIL, 
            payload:error.response&&error.response.data.detail
                    ?error.response.data.detail
                    :error.message})     
    }

}

export const listMyOrders = () => async(dispatch,getState) => {
    try{
        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{'Content-type' :'Application/json',
                     Authorization: 'Bearer '+userInfo.token
                    }

        }
        dispatch({type:ORDER_LIST_MY_REQUEST})

        const {data} = await axios.get(`/api/orders/myorders/`,
                        config)

        dispatch({type: ORDER_LIST_MY_SUCCESS, payload:data})
 
  
    }catch(error) {
        dispatch({type: ORDER_LIST_MY_FAIL, 
            payload:error.response&&error.response.data.detail
                    ?error.response.data.detail
                    :error.message})     
    }

}



export const listOrders = () => async(dispatch,getState) => {
    try{
        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{'Content-type' :'Application/json',
                     Authorization: 'Bearer '+userInfo.token
                    }

        }
        dispatch({type:ORDER_LIST_REQUEST})

        const {data} = await axios.get(`/api/orders/`,
                        config)

        dispatch({type: ORDER_LIST_SUCCESS, payload:data})
 
  
    }catch(error) {
        dispatch({type: ORDER_LIST_FAIL, 
            payload:error.response&&error.response.data.detail
                    ?error.response.data.detail
                    :error.message})     
    }

}