import axios from 'axios'


//constants
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR_ITEMS,

    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../Constants/cartConstants'

export const addToCart = (id,qty) => async(dispatch,getState) => {
    try{
        const {data} = await axios.get(`/api/products/${id}/`)
        const item  = {
                         product : id,
                         name: data.name,
                         image: data.image,
                         price: data.price,
                         countInStock: data.countInStock,
                         qty
                        }
        dispatch({type: CART_ADD_ITEM, payload:item})


    }catch(error){
        console.log(error)
    }
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch,getState) => {
   
        dispatch({type: CART_REMOVE_ITEM, payload:id})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingAddress) => async(dispatch) => {
   
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload:shippingAddress})
localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}

export const savePaymentMethod = (paymentMethod) => async(dispatch) => {
   
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload:paymentMethod})
localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}

