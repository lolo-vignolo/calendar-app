
const baseUrl = process.env.REACT_APP_API_URL;

//los endpiont son /auth, /event, /ui, etc
// method van a ser los GET, POST, PUT, etc.

const fetchSinToken = (endpoint, data, method = "GET") =>{

    const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/auth or event...

    if (method==="GET"){
        return fetch (url)
    } else {
        return fetch(url, {
            //creo una petición HTTPS (method, header, body)
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( data )

        });
    }

}

const fetchConToken = (endpoint, data, method = "GET") =>{

    const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/auth or event...
    const token = localStorage.getItem("token") || " "; // recordar que en el accion auth cuando hice el post del login o register, guarde esa info en el local storage.
    
    if (method==="GET"){
        return fetch (url, {
            method,
            headers:{ // este header mirar el postman, es donde pongo key: x-token y en valu el token.
                "x-token" : token
            }
        })
    } else {
        return fetch(url, {
            //creo una petición HTTPS (method, header, body)
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "x-token" : token
            },
            body: JSON.stringify ( data )

        });
    }

}



export {
    fetchSinToken,
    fetchConToken
}