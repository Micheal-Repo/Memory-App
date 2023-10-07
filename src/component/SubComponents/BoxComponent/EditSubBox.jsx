import react,{useState,useContext} from 'react'
import {Context} from "../ContextApi"
import {RiEditFill} from "react-icons/ri"
import {
  useEditSubBoxMutation
} from "../../../features/apiSlice"

//redux
import {setIsPoped,setPop} from "../../../features/MemoryState"
import {useSelector,useDispatch} from "react-redux"


export const EditSubBox =()=>{
  
  const [editSubBox] = useEditSubBoxMutation()
  
  const {
 SubBoxDetails
} = useContext(Context)


//redux
const dispatch = useDispatch()

//handleEdit
  const [EditingBox,setEditingBox] = useState(SubBoxDetails.title)
  
  const [EditAlert,setEditAlert] = useState("")
  
  
  const handleEdit =()=>{
    editSubBox({...SubBoxDetails,title:EditingBox})
    
    setEditAlert("successfully Edited Box Name ")
    
    setTimeout(()=>{
      
    setEditingBox("")
    },2000)
    
    setTimeout(()=>{
      dispatch(setIsPoped(false)),
      setAddAlert("")
    },1500)
  }
  
  return(
     <div className="w-full flex gap-1 relative mt-7 mb-8">
     <p className="absolute left-[5rem] top-[-2.5rem] italic font-medium text-lg">Edit Box</p>
            <input className="bg-blue-light border-gray-400  p-2 w-[80%] rounded text-[1rem] text-white inputAdd" 
            placeholder="Enter Text.." 
            autofocus
            value= {EditingBox}
            onChange={(e)=> setEditingBox(e.target.value)}
            />
           <span className="rounded p-2 bg-blue-light border-2 border-gray-400 hover:scale-[0.9]"
           onClick={handleEdit}> 
               <RiEditFill size={25}/>
           </span>
           
           <p className="absolute bottom-[-1.8rem] font-medium text-orange-200 italic">{EditAlert}</p>
 </div>
    )
}