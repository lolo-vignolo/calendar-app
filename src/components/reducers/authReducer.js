import { types } from "../../types/types";

const initialState = {
    checking : true,
    //uid:null,
    //name:null
}


export const authReducer = (state = initialState, action)=>{
    switch (action.type) {

        case types.authLogin:   
            return{
                ...state, //  {cheking:  true}
                ...action.payload, /*es el user => {name: 'Lorenzo Vignolo', uid: '619a1c4e09e0267e8f46e5ec'}*/
                checking:false,
                
                
                //este action.payload, es el name y el uid. Para entenderlo voy a la accion
                // empieza con startLogin, que dentro tiene una accion asyncrona que llama a la
                //accion authLogin la cual como payload tiene al user el mismo user que me devuelve
                //este reducer.

            }
        
        case types.authChekingFinish:

            return{
                ...state, /* {"ok":true, "uid" : ...., "name": "Lorenzo", "token" : .....} */
                checking:false,
                }

        case types.authLogout:
            return{
                checking:false,
            }
            
        default:
            return state;
         
    }
}