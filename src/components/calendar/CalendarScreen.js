import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';
import {Calendar, momentLocalizer} from 'react-big-calendar';

import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from '../../helpers/calendar-messages-es';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { cleanActiveEvent, eventSetActive, eventStartLoging } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);




// const myEventsList = [{
//     title: "cumpleaños",
//     start: moment().toDate(),
//     end: moment().add(2,"hours").toDate(),
//     bgcolor: "#fafafa",
//     notas:"Comprar regalo",
//     user: {
//         _id: "123",
//         name: "Lorenzo"
//     }
// }]

export const CalendarScreen = () => {

    
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem("lastView")|| "month");

    const {uid} = useSelector(state => state.auth)

    
    useEffect(() => {
        dispatch (eventStartLoging());
    }, [dispatch])
       

   

    //////////////////////////////
     /* ejecuta accion a travez de dispach pasando el modalOpen a true */

    const onDoubleClick = (e)=>{
        //console.log(e); me devuelve un objeto con la info de my EventList
        dispatch(uiOpenModal());

         };

    ///////////////////////////////  


    /* ejecuta accion a travez de dispach para seleccionar un evento*/
        
    const onSelectEvent= (e)=>{

    dispatch(eventSetActive(e))
    
    };
    
    /////////////////////////////

    const onViewChange= (e)=>{
        setLastView(e);
    
        localStorage.setItem("lastView", e)
    };

    const onSelectSlot = (e) =>{
        dispatch(cleanActiveEvent())
    }
    
    

    const eventStyleGetter = (event, start,end,isSelected)=>{

       
        // uid esta arriba
        
            const style ={
                color: "white",
                backgroundColor:( uid === event.user._id ) ? '#367CF7' : '#465660',
                opacity: 0.8,
                display: "block"
            }
            return{
                style
            } 

       
    
        };

     

    

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages = {messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent = {onDoubleClick}
                onSelectEvent = {onSelectEvent}
                onView = {onViewChange}
                onSelectSlot = {onSelectSlot}
                selectable = {true}
                view = {lastView}
                components = {{
                    
                    event : CalendarEvent /*ese evento devuelve un argumento, ese argumento pasa al componente hijo que le pongo "Calendar event", por su parte el argumentoque pasa es la info del evento, o sea info de myEventList */
                }}
            />
            <AddNewFab />

           
            {activeEvent && <DeleteEventFab />}
                
           
            

            <CalendarModal /> 

         
        </div>
    )
}
 