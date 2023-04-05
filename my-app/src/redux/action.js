import { DELETE_BUY_SUCCESS, GET_BUY_SUCCESS, GET_SELL_SUCCESS, POST_BUY_SUCCESS, POST_SELL_SUCCESS, UPDATE_BUY_SUCCESS, UPDATE_SELL_SUCCESS } from "./actionTypes"



export const postBuySuccess=(payload)=>{
 return {
    type:POST_BUY_SUCCESS,payload
 }
}


export const postSellSuccess=(payload)=>{
    return {
       type:POST_SELL_SUCCESS,payload
    }
   }

   export const getSellSuccess=(payload)=>{
    return {
        type:GET_SELL_SUCCESS,payload
    }
   }

   export const getBuySuccess=(payload)=>{
    return {
        type:GET_BUY_SUCCESS,payload
    }
   }


   export const updateSellSuccess=()=>{
    
     return {
        type:UPDATE_SELL_SUCCESS
     }
   }


   export const updateBuySuccess=()=>{
     
   return {
    type:UPDATE_BUY_SUCCESS
   }
   }


   export const deleteBuySuccess=()=>{
      return {
         type:DELETE_BUY_SUCCESS
      }
   }