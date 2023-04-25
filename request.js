
const redux = require("redux")
const createStore = redux.createStore
const axios = require("axios")
const thunkMiddleware = require("redux-thunk").default
const applyMiddleware = redux.applyMiddleware

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


// 1) return function  => from action creators
// 2) impure function => async call there

const fetchProducts = () => {
      return function(dispatch){
           dispatch(fetchProductsRequest())

             axios.get("https://fakestoreapi.com/products")
             .then(response =>{
                    // console.log(response.data) 
                    let titles = response.data.map(product => product.title)
                    dispatch(fetchProductsSuccess(titles))
             })
             .catch( err =>
                dispatch(fetchProductsFailure(err.message))
                )
      }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(()=> console.log(store.getState()))

store.dispatch(fetchProducts())


// pure function: 


// function sum(a,b){
//     return a+b
// }

// sum(10,20) // 30

// let c = 0
// function count(a){
//     return a + c++
// }

// count(0) // 0 
// count(0) // 1