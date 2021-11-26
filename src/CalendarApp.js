
import React from "react";
import { Provider } from "react-redux";
import { AppRoute } from "./router/AppRoute";
import { store } from "./store/store";


function CalendarApp() {
  return (
    <>
    <Provider store={store}>
      <AppRoute />
    </Provider>
      
    </>
  );
}

export default CalendarApp;
