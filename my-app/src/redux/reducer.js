import { DELETE_BUY_SUCCESS, GET_BUY_SUCCESS, GET_SELL_SUCCESS, POST_BUY_SUCCESS, POST_SELL_SUCCESS, UPDATE_BUY_SUCCESS, UPDATE_SELL_SUCCESS } from "./actionTypes"

const initialState={
    buy:[],
    sell:[],
    complete:[],
    isLoading:false,
    isError:false
}



export const reducer=(state=initialState,action)=>{
        const {type,payload}=action
    
       switch(type){

        case POST_BUY_SUCCESS:{
            return {
                ...state
            }
        }

        case POST_SELL_SUCCESS:{
            return {
                ...state
            }
        }

        case GET_BUY_SUCCESS:{
            return {
                ...state,buy:payload
            }
        }
       
        case GET_SELL_SUCCESS:{
           
            return {
                ...state,sell:payload
            }
        }
       
        case UPDATE_SELL_SUCCESS:{
           
            return {
                  
                 ...state
              };
        }

        case UPDATE_BUY_SUCCESS:{
            
            return {
               ...state
            }
        }

case DELETE_BUY_SUCCESS:{
   
    return {
        ...state
    }
}

        default:
            return state
       } 
   

}