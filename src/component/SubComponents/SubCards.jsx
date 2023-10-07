import react,{useState,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {Context} from "./ContextApi"
import {
  useFetchCardsQuery,
  useAddCardMutation
} from "../../features/apiSlice"

import {motion} from "framer-motion"


//icons
import {MdClose} from "react-icons/md"
import {MdAddToPhotos} from "react-icons/md"
import {FaSearch} from "react-icons/fa"


import {AddCard} from "./BoxComponent/AddCard"
import {MCards} from "./BoxComponent/MCards"

export const SubCards =()=>{
  const {card} = useParams()
  
   const {
 SubBoxDetails,
 BoxDetails
 
 } = useContext(Context)
  
  const {
    data:Cards,
    isLoading,
    isSuccess,
    isError,
    error
  }= useFetchCardsQuery()
  
  
  //subCard display 
  const [SubCardDisplay,setSubCardDisplay] = useState("subCard")
  
  // Search
  const SearchMotion ={
    close:{y:"4rem",opacity:0},
    open:{y:0,opacity:1}
  }
  const [isSearch,setIsSearch] = useState(false)
  const [Search,setSearch]=useState("")
  
  let Filter;
  if(Cards){
  Filter= Cards.filter((card)=> ((card.content).toLowerCase()).includes(Search.toLowerCase()) 
  || ((card.title).toLowerCase()).includes(Search.toLowerCase()) 
  || ((card.date).toLowerCase()).includes(Search.toLowerCase())) 
  }
  
  
  
  
  
  //content 
  let content
  if(isLoading){
    content = <p>Loading...</p>
  }else if (isSuccess){
    content  = Filter.reverse().map((card)=> {
      return (
         SubBoxDetails.id == card.subBoxId && 
        <MCards  card={card}/>
        )
    })
  }else if(isError){
    content = error
    
  }
  
  const [isCardMenu,setIsCardMenu]= useState(true)
  const handleCardDisplay=()=>{
   setSubCardDisplay("addCard")
   setIsCardMenu(false)
  }
  
  
  
  
  return(
    
   <Context.Provider value={{
   SubBoxDetails,
   setIsCardMenu,
   setSubCardDisplay
   }}>
    <div className="p-2  h-[33rem] px-6 ">
   
    {/*Search*/}
    <motion.div className="absolute w-full  top-[4.5rem] bg-bg-1 left-0 px-[2rem] py-3 "
    
    variants={SearchMotion}
       initial="close"
       animate= {isSearch ? "open" : "close"}
       transition={{ duration:0.3}}
    >
    <div className=" flex gap-2 items-center ">
      <input className="w-full bg-bg-1 border-2 border-gray-600 text-lg p-3 rounded-md"
      placeholder="Search...."
      onChange={(e)=> setSearch(e.target.value)}/>
      <span className="border-2 border-blue-light  py-1 px-2 rounded-md"
      onClick={()=> setIsSearch(false)}><MdClose size={42}/>
      </span>
    </div>
    
    </motion.div>
    
    {isCardMenu &&
       <div className="flex justify-between items-center font-medium italic py-3 border-b-2 border-b-orange-100 shadow-black shadow-2xl">
       {SubBoxDetails &&
        <div className="py-2 overflow-auto w-[14rem] flex gap-2 ">
         <span>{BoxDetails.box} </span>
         <p> {">"} </p>
         <span className="w-[8rem]  overflow-auto">{SubBoxDetails.title}</span>
       </div> 
       }
       
       <div className="flex gap-1">
        <span className="bg-blue-light p-2 rounded hover:bg-amber-400"
        onClick={handleCardDisplay}><MdAddToPhotos size={25}/></span>
        <span className="bg-blue-light p-2 rounded hover:bg-red-500"
        onClick={()=> setIsSearch(true)}><FaSearch size={25}/></span>
       </div>
       
       </div>
    }
  
   { SubCardDisplay === "addCard" &&
    <AddCard/>}
   
   { SubCardDisplay === "subCard" &&
    <div className="w-full  py-4 flex flex-col gap-5 mt-8 h-[25rem] overflow-auto">
       {content}
    </div>
   }
    
   </div>
   </Context.Provider>
    )
}