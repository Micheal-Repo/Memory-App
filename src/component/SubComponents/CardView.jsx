import react from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

//icons
import {BiArrowBack} from "react-icons/bi"


export const CardView =()=>{
  
  const Navigate = useNavigate()
  const card = useSelector(state=>  state.MState.CardDetails)
  
  return(
    <div className="p-3 px-6">
    <div className="py-2 px-3 bg-bg-1 border-2 border-blue-light mb-7 w-[4rem] grid place-content-center rounded-lg"
    onClick={()=> Navigate(-1)}><BiArrowBack size={30}/></div>
      <div className="  w-full rounded-md  border-gray-600 border-[3px] " >
          <p className="px-3 py-3 text-[1.5rem] font-bold border-b-gray-500 border-b-[3px] bg-gray-700 text-orange-200 ">{card.title}</p>
          <div className="px-3 pt-4  text-lg h-[20rem] overflow-auto">{card.content}</div>
          
          {/*down part*/}
          <div className="bg-blue-light w-full  text-red-700 flex justify-between items-center px-4 py-2 text-lg">
          
         
      </div>
          
   </div> 
   </div> 
    )
}