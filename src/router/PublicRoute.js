
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
    const {uid} = useSelector(state => state.auth)
  
    return ( !!uid
        ? <Navigate to="/" />
        : children 
        
        )
        
}

export default PublicRoute;

// import React from 'react';

// import { Route} from 'react-router-dom';


// const PublicRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
// }) => {

//     return (
//         <Route { ...rest }
//             component={ (props) => (
//                 ( isAuthenticated )
//                     ? ( <Route path="/" /> )
//                     : ( <Component { ...props } /> )
//             )}
        
//         />
//     )
// }


// export default PublicRoute;