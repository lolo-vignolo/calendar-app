import { types } from "../types/types"


export const uiOpenModal = ()=>{
    return{
        type:types.uiOpenModal,
        playload:true
    }
}
export const uiCloseModal = ()=>{
    return{
        type:types.uiCloseModal,
        playload:false
    }
}