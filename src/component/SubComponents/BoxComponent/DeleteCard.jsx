import react,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {
  useDeleteCardMutation
} from "../../../features/apiSlice"

import {setIsPoped} from "../../../features/MemoryState"

export const DeleteCard =()=>{
  
  //redux
  const Card = useSelector(state=>  state.MState.CardDetails)
  const [deleteCard]= useDeleteCardMutation()
  const dispatch = useDispatch()
  
  const [deleteAlert,setDeleteAlert] = useState("Are you sure you want to delete this Card 👇")
  
  const handleDelete=()=>{
    deleteCard({id:Card.id})
    setDeleteAlert("Card Deleted Successfully")
    
    setTimeout(()=>{
      dispatch(setIsPoped(false))
    },500)
  }
  
  return(
 <div className="relative">
    <p className="mb-3 py-1 font-medium border-b-orange-200 text-xl border-b-2 w-20">Warning</p>
       <p className="italic font-medium text-orange-200 w-[15rem]">{deleteAlert}</p>
       <p className="w-full text-center p-3 my-3 bg-bg-1 font-medium rounded-xl text-xl overflow-auto">{Card.title}</p>
       
       <div className="w-full flex justify-center ">
       <span className="text-center p-2 px-3 text-orange-200 font-medium rounded bg-main shadow-amber-100 shadow mt-3 hover:bg-white hover:text-bg-1 transition-all duration-300" 
       onClick={handleDelete}>Delete</span>
       </div>
       
    </div>
    )
}