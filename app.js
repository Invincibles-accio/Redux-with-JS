const redux = require("redux")
const produce = require("immer").produce

const createStore = redux.createStore


const FAVOURITE_SUBJECT = "FAVOURITE_SUBJECT"

function favouriteSubject(subject){
    return{
        type: FAVOURITE_SUBJECT,
        subject: subject
    }
}


let initialState = {
    name: "John",
    age: 20,
    subjects: {
        favourite: "Maths",
        leastFavourite: "English"
    }
}

const reducer = (state=initialState, action) =>{

    switch(action.type){
        case FAVOURITE_SUBJECT:
                // return{
                //     ...state,
                //     subjects: {
                //         ...state.subjects,
                //         favourite: action.subject
                //     }
                    
                // }
                return produce(state , (draft)=>{
                      draft.subjects.favourite = action.subject
                })
        
        default:
            return state
    }

}


const store = createStore(reducer) // store is an object , store is created

console.log("Initial state", store.getState()) // intital state => 1000

store.subscribe((()=> console.log("Updated state", store.getState())))

store.dispatch(favouriteSubject("Science"))