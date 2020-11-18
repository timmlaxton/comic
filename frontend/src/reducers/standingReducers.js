
import {
  STANDING_ORDER_CREATE_REQUEST,
  STANDING_ORDER_CREATE_SUCCESS,
  STANDING_ORDER_CREATE_FAIL,
  STANDING_ORDER_CREATE_RESET,
  STANDING_ORDER_UPDATE_REQUEST,
  STANDING_ORDER_UPDATE_SUCCESS,
  STANDING_ORDER_UPDATE_FAIL,
  STANDING_ORDER_UPDATE_RESET,
  STANDING_ORDER_DETAILS_REQUEST,
  STANDING_ORDER_DETAILS_SUCCESS,
  STANDING_ORDER_DETAILS_FAIL,
  STANDING_ORDER_LIST_REQUEST,
  STANDING_ORDER_LIST_SUCCESS,
  STANDING_ORDER_LIST_FAIL,
  STANDING_ORDER_DELETE_REQUEST,
  STANDING_ORDER_DELETE_SUCCESS,
  STANDING_ORDER_DELETE_FAIL
  

} from '../constants/standingConstants'

export const standingOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case  STANDING_ORDER_CREATE_REQUEST:
      return { loading: true }
    case STANDING_ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, standing: action.payload }
     case STANDING_ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STANDING_ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const standingOrderUpdateReducer = (state = {standing: {}}, action) => {
  switch (action.type) {
    case STANDING_ORDER_UPDATE_REQUEST:
      return { loading: true }
    case STANDING_ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, standing: action.payload }
    case STANDING_ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STANDING_ORDER_UPDATE_RESET:
      return {standing: {}}
    default:
      return state
  }
}

export const standingOrderDetailsReducer = (state = {standing: {} }, action) => {
  switch(action.type) {
    case STANDING_ORDER_DETAILS_REQUEST: 
      return {loading: true, ...state}
    case STANDING_ORDER_DETAILS_SUCCESS:
      return {loading: false, standing: action.payload}
    case STANDING_ORDER_DETAILS_FAIL:
      return {loading: false, error: action.payload}
    default: 
    return state
  }
}

export const standingOrderListReducer = (state = {standings: []}, action) => {
  switch(action.type) {
      case STANDING_ORDER_LIST_REQUEST:
        return {loading: true, standings: []}
      case STANDING_ORDER_LIST_SUCCESS :
        return {loading: false, standings: action.payload}
      case STANDING_ORDER_LIST_FAIL :
        return {loading: false, standings: [], error: action.payload}
        default: 
        return state
  }
}

export const standingOrderDeleteReducer = (state = {}, action) => {
  switch(action.type) {
    case STANDING_ORDER_DELETE_REQUEST: 
      return {loading: true}
    case STANDING_ORDER_DELETE_SUCCESS:
      return {loading: false, success: true}
    case STANDING_ORDER_DELETE_FAIL:
      return {loading: false, error: action.payload}
    default: 
    return state
  }
}