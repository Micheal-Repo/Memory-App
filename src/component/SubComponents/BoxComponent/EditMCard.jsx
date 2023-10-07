import react,{useState,useContext} from 'react'

import {useSelector,useDispatch} from "react-redux"
import {useParams,useNavigate} from 'react-router-dom';
import {
  useEditCardMutation
} from "../../../features/apiSlice"

//icons
import {MdAddToPhotos} from "react-icons/md"
import {BiArrowBack} from "react-icons/bi"


export const EditCard =()=>{
  
  //hook
  const CardD = useSelector(state=>  state.MState.CardDetails)
  const [editCard] = useEditCardMutation()
  
  const Navigate = useNavigate()
  const {cardId} = useParams()
  
  //back
  const handleBack=()=>{
    Navigate(-1)
  }
  
 
  
  //card details 
  const [CardTitle,setCardTitle] = useState(CardD.title)
  const [CardContent,setCardContent] = useState(CardD.content)
  const [EditAlert,setEditAlert] = useState("")
  
  //handleEditCard
  const handleEditCard=()=>{
    setEditAlert("Successfully Updated ")
    setTimeout(()=>{
      Navigate(-1)
      setEditAlert("")
    },1500)
    
    editCard({...CardD,title:CardTitle , content:CardContent })
  }
  
 
 

 
  
  // const Card = Cards.filter(card => card.id === cardId )
 
  
  return(
      <div className="px-4">

    <div className="flex justify-between items-center border-b-2 border-orange-100 shadow-2xl shadow-black py-4 mb-3">
      <div className="p-1 ml-3 bg-blue-light text-orange-200 w-12 flex justify-center items-center rounded-lg"
      onClick={handleBack}><BiArrowBack size={25}/>
      </div>
            <p className="font-bold italic  text-xl p-2  border-orange-100 "></p>
      </div>
      
      
    
      <div className="flex flex-col gap-2 p-4 mt-3">

     <p className="text-center italic font-medium text-lg text-orange-200">{EditAlert}</p>
    <input className="w-full p-2 py-3 text-xl bg-bg-1 border-2 border-gray-500 mb-5 rounded-md overflow-auto"
    onChange={(e)=> setCardTitle(e.target.value)}
    value={CardTitle}
    placeholder="enter text...."/>
    
     
    <textarea className="w-full p-2 text-lg bg-bg-1 h-64 rounded overflow-auto  border-2 border-gray-500"
    value={CardContent}
    onChange={(e)=> setCardContent(e.target.value)}
    placeholder="enter text..." />
    
    <div className="w-full flex justify-center items-center  mt-3">
      <p className=" text-center text-lg font-medium px-7  top-20 right-4 bg-bg-1 py-2 rounded-lg  border-2 border-gray-500
      " 
      onClick={handleEditCard}>Update</p>
  
      </div>
         </div>
    </div>
    )
}