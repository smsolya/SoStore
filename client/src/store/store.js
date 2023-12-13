import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FilterReducer from "./reducers/FilterSlice"

const rootReducer = combineReducers({
     FilterReducer
})

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer
    })
}