import moment from "moment"



export const prepareEvents = (events = []) =>{
    return events.map(
        (e) =>({
            ...e,
            end:moment(e.end , 'DD-MM-YYYY').toDate(),
            start: moment(e.start , 'DD-MM-YYYY' ).toDate(),
        })
    );
}