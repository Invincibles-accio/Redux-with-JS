// import redux from "redux" // es6 module
const redux = require("redux") // common js module
const bindActionCreators = redux.bindActionCreators  // helper function
const combineReducers = redux.combineReducers // helper function

const applyMiddleware = redux.applyMiddleware


const reduxLogger = require("redux-logger") 
const logger = reduxLogger.createLogger() // logger is a middleware

// create store: 
const createStore = redux.createStore
// this createStore variable is tecnically a   a  function 


// create const variables for all actions types
const CUSTOMER_ADD = "CUSTOMER_ADD"
const CUSTOMER_LEFT = "CUSTOMER_LEFT"
const POLICY_ADDED = "POLICY_ADDED"
const POLICY_REMOVED = "POLICY_REMOVED"


// action: 
//   {
//     type: CUSTOMER_COUNT,
//     customers:  1000
//   }

  // action creator => simple function that returns an action

function  customerAdd(){ //  whenver a customer joins, we will call this function
       return {
        type: CUSTOMER_ADD,
        customers:  1
      }
}

function customerLeft(count){
    return{
        type: CUSTOMER_LEFT,
        customers: count
    }
}


// action creator for policy added 

function policyAdded(){
    return{
        type: POLICY_ADDED,
        policy: 1
    }
}

function policyRemoved(){
    return{
        type: POLICY_REMOVED,
        policy: 1
    }
}


  // now redcuers: 

// let initialState = {
//     number_of_customers : 1000,
//     number_of_policies: 100
// }
let initialStateCustomers = {
    number_of_customers : 1000
}
let initialStatePolicies = {
    number_of_policies: 100
}


const customerReducer = (state=initialStateCustomers, action) =>{

    switch(action.type){
        case CUSTOMER_ADD:
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

const policyReducer = (state=initialStatePolicies, action) =>{

    switch(action.type){
        case POLICY_ADDED:
                 return{
                    ...state,
                    number_of_policies: state.number_of_policies + action.policy
                 }
        case POLICY_REMOVED:
            return{
                ...state,
                number_of_policies: state.number_of_policies - action.policy
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


// rootReducer:

const rootReducer = combineReducers({
    customer: customerReducer,
    policy: policyReducer
})


const store = createStore(rootReducer, applyMiddleware(logger)) // store is an object , store is created

console.log("Initial state", store.getState()) // intital state => 1000

store.subscribe((()=> console.log("Updated state", store.getState())))

// store.dispatch(customerCount())
// store.dispatch(customerCount())
// store.dispatch(customerCount())
// store.dispatch(customerLeft(10))

const actions =  bindActionCreators({customerAdd, customerLeft, policyAdded, policyRemoved}, store.dispatch )


actions.customerAdd()
actions.customerAdd()
actions.customerAdd()
actions.customerLeft(10)

actions.policyAdded()
actions.policyAdded()
actions.policyRemoved()


//Initial state { number_of_customers: 1000, number_of_policies: 100 }

// Initial state {
//     customer: { number_of_customers: 1000 },
//     policy: { number_of_policies: 100 }
//   }