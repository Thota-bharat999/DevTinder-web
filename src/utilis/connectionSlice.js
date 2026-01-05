import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const connectionSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnections:()=>null
    }
})
export const {addConnections,removeConnections}=connectionSlice.actions
export default connectionSlice.reducer