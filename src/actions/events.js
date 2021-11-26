

import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvent";


import { types } from "../types/types";




export const eventStartAddNew= (event) =>{
    
    
    /* my evento tiene la siguiente forma 
    {
           end: ....... , 
           staart : ...... ,
           title : " .....",
           notes: " ......."
        }*/
        
       //getSatate es para buscar info del estado del Redux. es parecido al useSelector.
        return async (dispatch, getState) =>{
            
            const {name, uid} = getState().auth;

            try {
                const resp = await fetchConToken ("events", event, "POST" );
                //este body es lo que devuelve la req. 
                const body = await resp.json();
                
                

                if(body.ok){

                    //como obervo arriba este evento no tiene ni el id, ni el nombre. Por lo cual se lo grego de esta forma
                    // y esta información la saco de la base de datos.
                    event.id = body.event._id;
                    event.user = {
                        user_id : uid,
                        name: name
                    }

                    
                    dispatch(eventAddNew (event)); 
                    
                }

                
                
            } catch (error) {
                console.log(error);
            }
            
        }      
        
    }
    
    const eventAddNew = (event)=>{
        return{
            type:types.eventAddNew,
            payload : event
        }
    }
    
    // aqui donde dice event, es el evento que viende del formulario. 
    
    export const eventSetActive = (event)=>{
        return{
            type:types.eventSetActive,
            payload : event
        }
    }


export const cleanActiveEvent = () =>{
    return{
        type: types.cleanActiveEvent,
        //payload: null
    }
}

export const eventSatrtUpdatedEvent = (event) => {

    return async (dispatch) => {

       
        const myEvent = event.id
        console.log(myEvent);
        
        try {
            const resp = await fetchConToken (`events/${myEvent}`, event, "PUT");
            const body = await resp.json();

                if (body.ok){
          
                    dispatch (updatedEvent (event));

                }else{
                    Swal.fire("Error", body.msg , "error" ) ;
                }
            
        } catch (error) {
            
        console.log(error);

        }
       
    }
}

const updatedEvent = (event) => ({
    
        type: types.updatedEvent,
        payload: event
    
});




export const delatedEvent = () =>{
    return {
       // type: types.delatedEvent,
    }

}

export const eventStartLoging = () =>{
    return async (dispatch) => {

        try {

            //para esta petición get no debo paras ninguna info, si no lo veo claro mirar PostMan
            const resp = await fetchConToken ( "events" );
            const body = await resp.json();
            console.log(body);

            const events = prepareEvents (body.events);
          
            
            dispatch(eventLoaded(events));

            console.log(events);
   

        } catch (error) {
            
            console.log(error);
    
            }
   
}
}

const eventLoaded = (events) =>({
   
        type:types.eventLoaded,
        payload:events 
})

