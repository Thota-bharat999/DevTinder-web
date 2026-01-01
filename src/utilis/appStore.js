import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "./userSlice";

const appStroe=configureStore({
reducer:{
    user:useReducer,
}
})
export default appStroe