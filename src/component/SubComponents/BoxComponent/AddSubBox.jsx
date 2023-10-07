import react,{useContext,useState} from 'react'
import {MdAddToPhotos} from "react-icons/md"
import {
  useAddSubBoxMutation,
  useFetchSubBoxesQuery
} from "../../../features/apiSlice"
import {Context} from "../ContextApi"

//redux
import {setIsPoped,setPop} from "../../../features/MemoryState"
import {useDispatch} from "react-redux"

export const AddSubBox =()=>{
  
  const [addSubBox] = useAddSubBoxMutation()
  const {data:subBoxes} = useFetchSubBoxesQuery()
  let Boxes;
  if(subBoxes){
    Boxes = subBoxes
  }
  
  //redux
  const dispatch = useDispatch()
  
  const {
 BoxDetails
} = useContext(Context)
  
  const [BoxTitle,setBoxTitle] = useState("")
  const [AddAlert,setAddAlert] = useState("")
  
  const handleAdd=()=>{
    const SBId = Boxes.length ? Boxes[Boxes.length - 1].id + 1 : 1
    
    const NewSB ={id:SBId,boxId:BoxDetails.id,title:BoxTitle}
    
    if(BoxTitle){
      addSubBox(NewSB)
      setAddAlert("New sub box added successfully ")
      
     // dispatch(setIsPoped(false))
      
      setTimeout(()=>{
        dispatch(setIsPoped(false))
      },1000)
      
    }else{
      setAddAlert("pls type the name of the sub box")
    }
    
    
    //setAddAlert("successful")
  
  }
  
  return(
        <div className="w-full mt-4 mb-12 h-8  pt-2 relative">
       
       <p className ="italic font-medium mb-2 absolute left-0 top-[-1.5rem]">Add New Memory Sub Box</p>
          <div className="w-full flex gap-1 relative">
            <input className="bg-blue-light border-gray-400  p-2 w-[80%] rounded text-[1rem] text-white inputAdd" 
            placeholder="Enter Text.." 
            autofocus
            value={BoxTitle}
            onChange={(e)=> setBoxTitle(e.target.value)}
            />
           <span className="rounded p-2 bg-blue-light border-2 border-gray-400 hover:border-orange-200" 
           onClick={handleAdd}> 
             <MdAddToPhotos size={25}/>
           </span>
           
           <p className="absolute bottom-[-2rem] text-[16px] text-orange-200 italic">{AddAlert}</p>
          </div>
       
          
      </div>
    )
}