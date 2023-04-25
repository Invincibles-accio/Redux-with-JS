
const redux = require("redux")
const createStore = redux.createStore

// api => get => data 


// initial state 

let initialState = {
    loading: true,
    data: [],
    error: ""
}

// actions: 

const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST"   // LIST OF PRODUCTS 
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"

// action creators: 
const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    }
}

const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}

const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload,
            }
        case FETCH_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
    }
}

const store = createStore(reducer)