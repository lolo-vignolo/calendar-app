
import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

/* este es el body (res:)
name: "Lorenzo"
ok: true
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTk0MzNjNjZhN2E3MjE4YzQ2M2YwOWMiLCJuYW1lIjoiTG9yZW56byIsImlhdCI6MTYzNzQxMjYyNiwiZXhwIjoxNjM3NDE5ODI2fQ.Q_PbnLRmBp9dCOWqbo5c5onwhb3N4ppgB_cF3wWbnNA"
uid: "619433c66a7a7218c463f09c"
*/


export const startLogin= (email, password) =>{
    //esta acción se ejecuta en LoginScreen

    return async (dispatch) => {
        const resp = await fetchSinToken ("auth", {email, password}, "POST" );
        const body = await resp.json(); // capta las res del back., es el body que veo arriba

    
        if (body.ok){
            localStorage.setItem("token", body.token)
            localStorage.setItem("token-init-date", new Date().getTime())

            dispatch(login({
                name: body.name,
                uid: body.uid
            }))
        
        }else{
                Swal.fire("Error", `Check your email and the Password must include one lowercase character, one uppercase character, a number, and a special character.`, "error");
        }    
    }        
} 



/*res:
   "ok": true,
    "msg": "61995cee65c86c49b5f172e6",
    "name": "Lorenzo",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e....."
 */  

export const startRegister = (email, password, name ) =>{
    return async (dispatch) => {
        const resp = await fetchSinToken ("auth/new", {email, password, name}, "POST" );
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem("token", body.token)
            localStorage.setItem("token-init-date", new Date().getTime())

            dispatch(login({
                name: body.name,
                uid: body.uid
            }))
        }else{
            Swal.fire("Error", body.msg, "error");
        }  
    }
}


export const startChecking = ()=> {
    return async (dispatch) => {
        const resp = await fetchConToken ("auth/renew", "POST" );
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem("token", body.token)
            localStorage.setItem("token-init-date", new Date().getTime())

            dispatch(login({
                name: body.name,
                uid: body.uid
            }))
        }else{
            
            dispatch(checkingFinish());
        }  

    }
}

const checkingFinish = () =>({
    type: types.authChekingFinish
})




//creo una accion syncrona. Esta accion me sirve para cambiar el usuario en mi codigo,
// es la que realmente cambia mi estado inidial., la que defino arriba llamada startLogin
//es creada para agarrar la informacion del usuario existente y ejecutar el req y el res.

const login = (user)=> ({
    
    type: types.authLogin,
    payload:user,
    
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());

    }
}



const logout = () =>({
    type:types.authLogout
})

