import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productDeleteReducer, productTopRatedReducer} from './reducers/productReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer} from './reducers/orderReducers'
import {cartReducer} from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer, 
  productDelete: productDeleteReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
  (localStorage.getItem('cartItems')) : []

  const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
  (localStorage.getItem('userInfo')) : null

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
  (localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {cartItems: cartItemsFromStorage, 
  shippingAddress: shippingAddressFromStorage},
  userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store