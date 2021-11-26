import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { cleanActiveEvent,  eventSatrtUpdatedEvent,  eventStartAddNew} from '../../actions/events';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

const currentDate = moment().minutes(0).seconds(0).add(1,"hours");
const endDate = currentDate.clone().add(1, "hours");

const initEvent = {
    title: "",
    note: "",
    start : currentDate.toDate(),
    end: endDate.toDate()
}

  
export const CalendarModal = () => {

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

    const dispatch = useDispatch();

    const [dateStart, setStartDate] = useState(currentDate.toDate());
    const [dateEnd, setEndtDate] = useState(endDate.toDate());
    const [isValid, setIsValid] =  useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {title, note, start, end} = formValues;

    useEffect(() => {
       if(activeEvent){
           setFormValues(activeEvent);
       }else{
           setFormValues (initEvent)
       }
        
    }, [activeEvent, setFormValues])


    const handleImputChange = ({target})=>{
        setFormValues ({
            ...formValues,
            [target.name] : target.value
        })

    }


    /////////////////////////////
    /* ejecuta accion a travez de dispach pasando el modalOpen a false */
    
    const closeModal = ()=>{
        //console.log(e);
        dispatch(uiCloseModal());
        dispatch(cleanActiveEvent());
        setFormValues(initEvent);
    }
     /////////////////////////////



    const handleStartDateChange = (e)=>{
        setStartDate(e)
        setFormValues({
            ...formValues,
            start : e // e: aqui es una fech
        })

    }


    const handleEndtDateChange = (e)=> {
        setEndtDate(e)
        setFormValues({
            ...formValues,
            end: e // e: aqui es una fecha
        })
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault();
        

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if(momentStart.isSameOrAfter(momentEnd)){
            return  Swal.fire("Error", "End Date must be bigger than Start Date", "error"); 
        }

        if (title.trim().length < 2){
            return setIsValid(false);
        }

      
        if ( activeEvent ) {
            dispatch( eventSatrtUpdatedEvent( formValues ) )
        } else {
            dispatch( eventStartAddNew(formValues) );
        }

        

        setIsValid(true);
        closeModal();
    
    }

   


    return (
        

        <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS = {200}
        className = "modal"
        overlayClassName = "modal-fondo"
        
      >
        <h1> {(activeEvent ? "Modify Event" : "New Event" )} </h1>
        <hr />
        <form
         className="container"
         onSubmit = {handleSubmitForm}
         >

            <div className="form-group">
                <label>Fecha y hora inicio</label>

                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className = "form-control"
                    />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                
                <DateTimePicker
                        onChange={handleEndtDateChange}
                        value={dateEnd}
                        minDate= {dateStart}
                        className = "form-control"
                    />

                
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className= {`form-control ${!isValid && "is-invalid"}`}
                    placeholder="title"
                    name="title"
                    value = {title}
                    onChange = {handleImputChange}
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder= "notes"
                    rows="5"
                    name="note"
                    value = {note}
                    onChange = {handleImputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
                </Modal>

               
            )
}
