import {applyMiddleware, combineReducers,createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { editCartReducer } from './Reducers/cartReducers'
import { productCreateReducer, 
    productDeleteReducer, 
    productDetailsReducer, 
    productListReducer, 
    productUpdateReducer} from './Reducers/productReducers'
import {
    userDeleteReducer, userDetailsReducer, 
    userListReducer, userLoginReducer, 
    userRegisterReducer, userUpdateProfileReducer, 
    userUpdateReducer} 
    from './Reducers/userReducers'
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListReducer } from './Reducers/orderReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate: productUpdateReducer,

    cart: editCartReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
                             ?JSON.parse(localStorage.getItem('cartItems'))  
                             :[]
const userInfoFromStorage = localStorage.getItem('userInfo')
                             ?JSON.parse(localStorage.getItem('userInfo'))  
                             :null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
                             ?JSON.parse(localStorage.getItem('shippingAddress'))  
                             :null

const initialState = {
    cart:
    {
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store