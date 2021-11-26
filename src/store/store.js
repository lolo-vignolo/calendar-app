import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { rootReducer } from "../components/reducers/rootReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



export const store = createStore (
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk) //uso el thunk por que voy a tener petisions Api las cuales son asincronas.
    ) 
    );