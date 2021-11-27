
import { types } from "../../types/types";

// {
//     id :  viene de la base de datos,(DB)
//     title: "cumpleaños",(DB)
//     start: moment().toDate(),
//     end: moment().add(2,"hours").toDate(),
//     note:"Comprar regalo",(DB)
//     user: {
//         _id: "123", (DB)
//         name: "Lorenzo" (DB)
//     }
// }


const initialState = {
    events: [],
    activeEvent : null
};

export const calendarReducer = (state = initialState, action)=>{

    switch (action.type) {

        case types.eventSetActive:
            return{
                ...state,
                activeEvent : action.payload
                

            }
        case types.eventAddNew:
            return {
                ...state,
                events : [
                    ...state.events,
                    action.payload
                ]  
            }

        case types.cleanActiveEvent:
            return{
                ...state,
                activeEvent: null
            }

        case types.updatedEvent:
            return{
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e )
            }

        case types.delatedEvent:
            return{
                ...state,
                events: state.events.filter(
                    e => (e._id !== state.activeEvent._id),
                    ),
                    activeEvent : null

            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }

            case types.eventLogout:
                return{
                    
                   ...initialState
                } 

           
          
    
        default:
            return state;
    }
}