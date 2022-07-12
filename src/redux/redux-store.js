import {applyMiddleware, createStore,compose} from "redux";
import thunkMiddleware from "redux-thunk"
import {combineReducers,configureStore} from "@reduxjs/toolkit"
import booking_reducer from "./booking_reducer.ts";
import admin_reducer from "./admin_reducer.ts";
import settings_reducer from "./settings_reducer";
// import {reducer as formReducer} from "redux-form";
import { getDefaultMiddleware } from '@reduxjs/toolkit';


let reducers = combineReducers({
     book: booking_reducer,
     admin: admin_reducer,
    //  form: formReducer,
     settings: settings_reducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
        {reducer:reducers,
            middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware({
                serializableCheck: false,
              }),},
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );

window.__store__ = store;

export default store;

// 19-05-2022 - Eva

// 245
// 56
// O 
