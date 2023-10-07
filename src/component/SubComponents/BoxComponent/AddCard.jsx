
import react,{useState,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {Context} from "../ContextApi"
import {
  useFetchCardsQuery,
  useAddCardMutation
} from "../../../features/apiSlice"

//icons
import {MdAddToPhotos} from "react-icons/md"
import {BiArrowBack} from "react-icons/bi"

//library 
import {format} from "date-fns"



export const AddCard =()=>{
  
  const {card} = useParams()
  
   const {
 SubBoxDetails,
 setIsCardMenu,
   setSubCardDisplay
 } = useContext(Context)
  
  const {
    data:SubCards,
    isLoading,
    isSuccess,
    isError,
    error
  }= useFetchCardsQuery()
  
  const [addCard]= useAddCardMutation()
  
    //add Card
  const [CardTitle,setCardTitle] = useState("")
  const [CardContent,setCardContent] = useState("")
  const [AddAlert,setAddAlert]=useState("")
  
  //data fns
  const date = format(new Date(), "do/MMM/yyyy")
  
  let Card ;
  if(SubCards){
    Card = SubCards
  }
  
  const handleAddCard =()=>{
     const CardId = Card.length ? Card[Card.length - 1].id + 1: 1
    
    const NewCard = {
      id:CardId,
      boxId:SubBoxDetails.boxId,
      subBoxId:SubBoxDetails.id,
      title:CardTitle,
      content:CardContent,
      date:date,
      favorite:false
    }
    
      if(SubBoxDetails && CardTitle && CardContent){
     addCard(NewCard)
     
     setTimeout(()=>{
     setSubCardDisplay("subCard")
     setIsCardMenu(true)
      setAddAlert("")
     },1500)
     
     setAddAlert("Card Added Successfully ")
      }else if(!CardTitle){
        setAddAlert("Pls Add Card Title")
      }else if(!CardContent){
        setAddAlert("Pls Add Card Content")
      }else if(!SubBoxDetails){
        setAddAlert("error! pls refresh the page")
      }
    
    
     
     
  }
  
  const handleBack=()=>{
    
    setSubCardDisplay("subCard")
    setIsCardMenu(true)
  }
  
  
  return(
    <div>
    <div className="flex justify-between items-center border-b-2 border-orange-100 shadow-2xl shadow-black py-2 mb-3">
      <div className="p-1 ml-3 bg-blue-light text-orange-200 w-12 flex justify-center items-center rounded-lg"
      onClick={handleBack}><BiArrowBack size={25}/>
      </div>
            <p className="font-bold italic  text-xl p-2  border-orange-100 ">{SubBoxDetails.title}</p>
      </div>
      
    
      <div className="flex flex-col gap-2 p-4 mt-10">
      <p className=" text-lg font-medium italic text-orange-200 w-full grid place-content-center">{AddAlert}</p>
      
    <input className="w-full p-2 text-lg border-2 border-gray-500 bg-bg-1 mb-4 rounded-md overflow-auto"
    onChange={(e)=> setCardTitle(e.target.value)}
    placeholder="card title..."/>
    
      
    <textarea className="w-full p-2 text-lg bg-bg-1 h-56 rounded-md overflow-auto border-2 border-gray-500"
    onChange={(e)=> setCardContent(e.target.value)}
    placeholder="card content....." />
    
    <div className="w-full flex justify-center items-center  mt-3">
      <p className=" text-center text-lg font-medium px-7  top-20 right-4 bg-bg-1 py-2 rounded-lg
      " 
      onClick={handleAddCard}>Add</p>
  
      </div>
         </div>
    </div>
    )
}