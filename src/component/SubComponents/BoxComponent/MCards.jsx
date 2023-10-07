import react,{useState} from 'react'

//library 
import {Link,useNavigate} from 'react-router-dom';
import {format} from "date-fns"

//hooks
import {useDispatch} from "react-redux"
import {SetCardDetails,setIsPoped,setPop} from "../../../features/MemoryState"
import {
 useFavoriteMutation
} from "../../../features/apiSlice"

//Icons
import {MdDelete,MdFullscreen} from "react-icons/md"
import {RiEditFill} from "react-icons/ri"
import {BsStar,BsStarFill} from "react-icons/bs"



export const MCards =({card})=>{
  
  //hooks
    const dispatch = useDispatch()
    
    //Data fns
    
   
   //handleEdit 
  const handleEdit=()=>{
    dispatch(SetCardDetails(card))
  }
  
  //handleDelete
  const handleDelete=()=>{
    dispatch(setPop("deleteCard"))
    dispatch(setIsPoped(true))
    dispatch(SetCardDetails(card))
  }
  
  //handleView
  const handleView =()=>{
    dispatch(SetCardDetails(card))
  }
  
  //favorite 
  const [isFavorite, setIsFavorite ]=useState(false)
  const [favorite]= useFavoriteMutation()
  
  const handleInFavorite = ()=>{
    //setIsFavorite(pre => !pre)
    favorite({...card,favorite:!card.favorite})
  }
  const handleOutFavorite = ()=>{
    
    favorite({...card,favorite:!card.favorite})
   // setIsFavorite(pre => !pre)
  }
  
  return(
  <div className="  w-full rounded-md  border-gray-600 border-[3px] " >
       <div className="px-3 py-2  border-b-gray-500 border-b-[3px] bg-gray-700 text-orange-200 w-full overflow-auto flex justify-between items-baseline">
          <p className="w-[13.5rem] text-[1.3rem] font-bold  text-orange-200 overflow-auto">{card.title}</p>
         <p className="text-[0.9rem]  font-medium font-serif">{card.date}</p>
       </div>
        
          <div className="px-3 pt-4 font-medium text-lg h-[6rem] overflow-auto">
      {card.content}
          </div>
          
          {/*down part*/}
          <div className="bg-blue-light w-full  text-red-700 flex justify-between items-center px-4 py-2 text-lg">
          
          {/*left*/}
          <div className="border-gray-600"
          onClick={handleView}>
            <div className="flex gap-3 items-center">
            { card.favorite ? 
            <BsStarFill size={23} onClick={handleInFavorite} />  :
            <BsStar size={23} onClick={handleOutFavorite} /> 
            }
            <Link to={`/CardView/${card.id}`} >
              <MdFullscreen size={35}/>
            </Link>
          </div>
          </div>
          
          {/*right*/}
            <div className="flex items-center gap-3">
            
            <span onClick={handleEdit} className="p-[5px] bg-bg-1 rounded-md border-2 border-bg-1 text-orange-200">
              <Link to={`/editCard/${card.id}`} 
              >
              <RiEditFill size={25} />
              </Link>
              </span>
              
              <span className="p-[5px] bg-bg-1 rounded-md border-2 border-bg-1 text-orange-200"
              onClick={handleDelete}>
              <MdDelete size={25}/>
              </span>
            </div>
            
      </div>
          
   </div> 
    )
}


            // {(card.content).length <= 80 ? card.content : `${(card.content).slice(0, 80)}...`}