// import redux from "redux" // es6 module
const redux = require("redux") // common js module
const bindActionCreators = redux.bindActionCreators  // helper function

// create store: 
const createStore = redux.createStore
// this createStore variable is tecnically a   a  function 


// create const variables for all actions types
const CUSTOMER_COUNT = "CUSTOMER_COUNT"
const CUSTOMER_LEFT = "CUSTOMER_LEFT"


// action: 
//   {
//     type: CUSTOMER_COUNT,
//     customers:  1000
//   }

  // action creator => simple function that returns an action

function  customerCount(){ //  whenver a customer joins, we will call this function
       return {
        type: CUSTOMER_COUNT,
        customers:  1
      }
}

function customerLeft(count){
    return{
        type: CUSTOMER_LEFT,
        customers: count
    }
}

  // now redcuers: 

let initialState = {
    number_of_customers : 1000
}


const reducer1 = (state=initialState, action) =>{

    switch(action.type){
        case CUSTOMER_COUNT:
                return{
                    ...state,
                    number_of_customers: state.number_of_customers + action.customers
                }
        case CUSTOMER_LEFT:
                return{
                    ...state,
                    number_of_customers: state.number_of_customers - action.customers
                }
        default:
            return state
    }

}

// redux store: {}

// 1) It is like a container which hold your state and actions 
// 2) It is a single source of truth
// 3) Allows you to access state via getState()
// 4) Allows you to update state via dispatch(action)
// 5) JS app  can subscribe to the store to be notified of state changes, also unsubscribe



const store = createStore(reducer1) // store is an object , store is created

console.log("Initial state", store.getState()) // intital state => 1000

store.subscribe((()=> console.log("Updated state", store.getState())))

// store.dispatch(customerCount())
// store.dispatch(customerCount())
// store.dispatch(customerCount())
// store.dispatch(customerLeft(10))

const actions =  bindActionCreators({customerCount, customerLeft}, store.dispatch )

actions.customerCount()
actions.customerCount()
actions.customerCount()
actions.customerLeft(10)
