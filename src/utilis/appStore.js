import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "./userSlice";
import feedReducer from "./feedSlice"
import connectionReducer from './connectionSlice'

const appStroe=configureStore({
reducer:{
    user:useReducer,
    feed:feedReducer,
    connections:connectionReducer
}
})
export default appStroe