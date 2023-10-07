
import {createSlice} from "@reduxjs/toolkit"

const initialState={
   CardDetails : "",
   Pop : "wow",
   isPoped: false,
}

const MState = createSlice({
  name:"MState",
  initialState,
  reducers:{
    
    SetCardDetails:(state,action)=>{
      state.CardDetails = action.payload
    },
    
    setPop:(state,action)=>{
      state.Pop = action.payload
    },
    
    setIsPoped:(state,action)=>{
      state.isPoped = action.payload
    },
    
  }
})

export  const {
  SetCardDetails,
  setPop,
  setIsPoped
} = MState.actions
export default MState.reducer