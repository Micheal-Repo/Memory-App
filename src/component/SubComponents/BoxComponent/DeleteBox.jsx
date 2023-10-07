import react,{useContext,useState} from 'react'
import {Context} from "../ContextApi"

//redux
import {setIsPoped,setPop} from "../../../features/MemoryState"
import {useDispatch} from "react-redux"
import {
  useDeleteBoxMutation
} from "../../../features/apiSlice"


export const DeleteBox =()=>{
  const {
      BoxDetails,
  } = useContext(Context)
  
  //redux
  const dispatch = useDispatch()
  
  
  const [deleteBox]= useDeleteBoxMutation()
  const [deleteAlert,setDeleteAlert]=useState("you are about to delete the entire information under👇")
  
  
  const handleDelete=()=>{
    deleteBox({id:BoxDetails.id})
   // alert("wow")
   setDeleteAlert("Deleted Successfully ")
   setTimeout(()=>{
     dispatch(setIsPoped(false))
   },500)
  }
  
  
  return(
    <div className="relative">
    <p className="mb-3 py-1 font-medium border-b-orange-200 text-xl border-b-2 w-20">Warning</p>
       <p className="italic font-medium text-orange-200 w-[15rem]">{deleteAlert}</p>
       <p className="w-full text-center p-3 my-3 bg-bg-1 font-medium rounded-xl text-xl">{BoxDetails.box}</p>
       
       <div className="w-full flex justify-center ">
       <span className="text-center p-2 px-3 text-orange-200 font-medium rounded bg-main shadow-amber-100 shadow mt-3 hover:bg-white hover:text-bg-1 transition-all duration-300" 
       onClick={handleDelete}>Delete</span>
       </div>
       
    </div>
    )
}