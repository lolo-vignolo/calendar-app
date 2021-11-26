import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { Charging } from "../components/auth/Charging";
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

  

export const AppRoute = () => {

  const dispatch = useDispatch();

  const {checking} = useSelector(state => state.auth)

  useEffect(() => {
      dispatch(startChecking())

  }, [dispatch]);
  
  if (checking){
    return ( <Charging /> ) 
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } 
                />
          
          <Route path="/*"  element ={
                  <PrivateRoute>
                       <CalendarScreen/>
                  </PrivateRoute>
              }
          />
          {/* <Route path="*" element={<CalendarScreen />} />   */}

        </Routes>
    </BrowserRouter>
  );
}