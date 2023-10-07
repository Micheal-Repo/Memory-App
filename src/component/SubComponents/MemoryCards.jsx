import react,{useState} from 'react'
import {useParams} from 'react-router-dom';
import {
  useFetchCardsQuery
} from "../../features/apiSlice"

import {MCards} from "./BoxComponent/MCards"

//icons
import {FaSearch} from "react-icons/fa"

export const Cards =()=>{
  
  const {id} = useParams()
  

  
  //Rtk Query
  const {
    data:cards,
    isLoading,
    isSuccess,
    isError,
    error
  }= useFetchCardsQuery()
  
    //Search
  const [Search,setSearch]=useState("")
  
  let Filter;
  if(cards){
  Filter= cards.filter((card)=> ((card.content).toLowerCase()).includes(Search.toLowerCase()) 
  || ((card.title).toLowerCase()).includes(Search.toLowerCase())
  || ((card.date).toLowerCase()).includes(Search.toLowerCase())) 
  }
  
  //const CardFilter= Filter
  
  //content 
  let content;
  if(isLoading){
    content = <p>Loading...</p>
  }else if(isSuccess){
    content = Filter.reverse().map((card)=> {
      return (
         id == card.boxId && 
         <MCards key={card.id} card={card}/>

        )
    })
  }else if(isError){
    content = <p>error</p>
  }
  
  
  return(
    <div className="w-full  p-4 px-5">
    <div className="p-2 bg-bg-1 rounded-md flex gap-2 items-center mb-5">
       <input className="bg-bg-1 border-2 border-gray-500 text-md rounded-md p-2 w-full" placeholder="Search...."
       onChange={(e)=> setSearch(e.target.value)}/>
       
    </div>
    <div className="w-full mt-4 flex flex-col gap-5 h-[32rem] overflow-auto ">
    
       {content}
    </div>
    </div>
    )
}