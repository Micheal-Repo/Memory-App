import react from 'react'
import {useState} from "react"
import {MdAddToPhotos} from "react-icons/md"
import {Context} from "../ContextApi"

//redux
import {useSelector,useDispatch} from "react-redux"
import {setIsPoped,setPop} from "../../../features/MemoryState"
import {
  useAddBoxMutation,
  useFetchBoxesQuery
} from "../../../features/apiSlice"


export const AddMemoryBox =()=>{
  
  //context

  
  
  
  
  const [BoxTitle,setBoxTitle] = useState("")
  const [AddAlert,setAddAlert] = useState("")
  
  // apISlicr Hook
  const [addBox] = useAddBoxMutation()
  const {data:boxes} = useFetchBoxesQuery()
  let Boxes;
  if(boxes){
    Boxes = boxes
  }
  const dispatch = useDispatch()
  
  //handleAdd
  const handleAdd =()=>{
    if(BoxTitle){
      setTimeout(()=>{
        dispatch(setIsPoped(false))
      },1000)
    }
    
    const BoxId = Boxes.length ? Boxes[Boxes.length - 1].id + 1 : 1;
    const newBox = {id:BoxId,box:BoxTitle};
   
   if(!BoxTitle){
     setAddAlert("Pls Enter The Name of The Box")
   }else{
    addBox(newBox);
    setAddAlert("New Box Added Successful")
    setTimeout(()=>{
      setAddAlert("")
    },2000)
   }
    
    setBoxTitle("")
  }
  
  
  //handlingAddBox
  const handlingAddBox=()=>{
     setAddNewBox(true),
     setIsPoped(true)
  }
  
  return(
    
    <div className="w-full mt-4 mb-12 h-8  pt-2 relative">
       
       <p className ="italic font-medium mb-2 absolute left-0 top-[-1.5rem]">Add New Memory Box</p>
          <div className="w-full flex gap-1 relative">
            <input className="bg-blue-light border-gray-400  p-2 w-[80%] rounded text-[1rem] text-white inputAdd" 
            placeholder="Enter Text.." 
            autofocus
            value={BoxTitle}
            onChange={(e)=> setBoxTitle(e.target.value)}
            />
           <span className="rounded p-2 bg-blue-light border-2 border-gray-400" onClick={handleAdd}> 
             <MdAddToPhotos size={25}/>
           </span>
           
           <p className="absolute bottom-[-2rem] text-[16px] text-orange-200 italic">{AddAlert}</p>
          </div>
       
          
      </div>
    )
}