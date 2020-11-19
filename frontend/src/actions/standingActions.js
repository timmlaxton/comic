import axios from 'axios'
import {
  STANDING_ORDER_CREATE_REQUEST,
  STANDING_ORDER_CREATE_SUCCESS,
  STANDING_ORDER_CREATE_FAIL,
  STANDING_ORDER_UPDATE_REQUEST,
  STANDING_ORDER_UPDATE_SUCCESS,
  STANDING_ORDER_UPDATE_FAIL,
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

export const createStanding = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STANDING_ORDER_CREATE_REQUEST,
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }
     const {data} = await axios.post(`/api/standings`, {}, config)

    dispatch({
      type: STANDING_ORDER_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: STANDING_ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateStandingOrder = (standing) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STANDING_ORDER_UPDATE_REQUEST,
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }
     const {data} = await axios.put(`/api/standings/${standing._id}`, standing, config)

    dispatch({
      type:  STANDING_ORDER_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type:  STANDING_ORDER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listStandingOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: STANDING_ORDER_DETAILS_REQUEST})

    const {data} = await axios.get(`/api/standings/${id}`)

    dispatch({
      type: STANDING_ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STANDING_ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listStandingOrders = () => async (dispatch) => {
  try {
    dispatch({type: STANDING_ORDER_LIST_REQUEST})

    const {data} = await axios.get(`/api/standings`)

    dispatch({
      type: STANDING_ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: STANDING_ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteStandingOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STANDING_ORDER_DELETE_REQUEST,
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers: {
        
        Authorization: `Bearer ${userInfo.token}`
      },
    }
    await axios.delete(`/api/standings/${id}`, config)

    dispatch({
      type: STANDING_ORDER_DELETE_SUCCESS,
      })
  } catch (error) {
    dispatch({
      type: STANDING_ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}