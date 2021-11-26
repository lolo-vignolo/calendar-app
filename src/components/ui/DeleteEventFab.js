import { useDispatch } from "react-redux";
import { delatedEvent } from "../../actions/events";
import React from 'react';

export const DeleteEventFab = () => {

    const dispatch = useDispatch()
 
    const handleButton = ()=>{
     dispatch(delatedEvent())
    }
 
     return (
         <button
         className = "btn btn-danger fab-danger"
         onClick = {handleButton }
         >
             <i className= "fas fa-trash"></i>
             <span> Delate Event</span>
         </button>
     )
 }
     