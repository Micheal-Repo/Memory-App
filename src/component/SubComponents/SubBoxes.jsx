import react,{useContext,useState} from 'react'
import {NavLink,useNavigate} from 'react-router-dom';
import {motion} from "framer-motion"

import {Context} from "./ContextApi"
import {SideHead} from "../ReuseAble/ReuseAble"
import {
  useFetchSubBoxesQuery
} from "../../features/apiSlice"

//icons
import {BiArrowBack} from "react-icons/bi"
import {MdAddToPhotos,MdDelete} from "react-icons/md"
import {GrChapterAdd,GrAdd} from "react-icons/gr"
import {FaSearch} from "react-icons/fa"
import {RiEditFill} from "react-icons/ri"
import {BsFolderFill} from "react-icons/bs"
import {MdClose} from "react-icons/md"


//redux
import {setIsPoped,setPop} from "../../features/MemoryState"
import {useSelector,useDispatch} from "react-redux"

export const SubBoxes =()=>{
 const {
   setSideNav,
   BoxDetails,
   setSubBoxDetails
 } = useContext(Context)
 
 //redux
 const dispatch = useDispatch()
 
 // handleSubBox
 const handleSubBox =(box)=>{
   setSubBoxDetails(box)
 }
 
 //handleEditSB
 const handleEditSB=()=>{
   dispatch(setIsPoped(true))
   dispatch(setPop("editSB"))
 }
 
 //handleDeleteSB
 const handleDeleteSB=()=>{
   dispatch(setPop("deleteSB"))
   dispatch(setIsPoped(true))
 }
 
 
 // fetching  SubBoxes
 const {
    data:subBoxes,
    isLoading,
    isSuccess,
    isError,
    error
  }= useFetchSubBoxesQuery()
  
  
  //Search
    // Search
  const SearchMotion ={
    close:{y:"-3rem",opacity:0},
    open:{y:0,opacity:1}
  }
  const [isSearch,setIsSearch] = useState(false)
  const [Search,setSearch]=useState("")
  
let Filter;
  if(subBoxes){
  Filter= subBoxes.filter((box)=> ((box.title).toLowerCase()).includes(Search.toLowerCase())) 
  }
  
  
  
  let Content;
  if(isLoading){
    Content= <p>Loading....</p>
  }else if(isSuccess){
    Content = Filter.reverse().map((subBox)=>(
      subBox.boxId == BoxDetails.id &&
       <div className="w-full p-3 font-medium text-lg border-2 border-gray-500 rounded-md flex"
       onClick={()=> handleSubBox(subBox)}>
     
       <NavLink to={`/SubCards/${subBox.id}`} className="w-full flex gap-3 items-center">
         <BsFolderFill/>
         <p className="w-[9rem] overflow-auto">{subBox.title}</p>
       </NavLink>
   
      <div className="flex gap-3">
       <RiEditFill size={25} onClick={handleEditSB}/>
       <MdDelete size={25}
       onClick={handleDeleteSB}/>
       </div>
       
       </div>

      
      ))
  }else if(isError){
    Content = error
  }
  
  
  
 
 const handleBack=()=>{
   setSideNav("boxes")
 }
 
 //handlingAddSB
 const handlingAddSB=()=>{
   dispatch(setIsPoped(true))
   dispatch(setPop("addSB"))
 }
 
 
 
  return(
    <div className="relative">
     <span className="absolute top-0 h-8 w-8 bg-bg-1 rounded-br-xl flex justify-center items-center font-bold left-0 text-red-400 z-50 " onClick={handleBack}><BiArrowBack size={25}/></span>
       <SideHead title={BoxDetails.box}/>
        
       
            
    {/*Search*/}
    <motion.div className="absolute w-full  top-[8.8rem] bg-bg-1 left-0 px-[0.6rem] py-4 border-y-2 border-gray-500 shadow-xl "
    
    variants={SearchMotion}
       initial="close"
       animate= {isSearch ? "open" : "close"}
       transition={{ duration:0.2}}
    >
    <div className=" flex gap-2 items-center ">
      <input className="w-full bg-bg-1 border-2 border-gray-600 text-md p-2 rounded-md"
      placeholder="Search...."
      onChange={(e)=> setSearch(e.target.value)}/>
      <span className="border-2 border-blue-light   px-1 rounded-md"
      onClick={()=> setIsSearch(false)}><MdClose size={40}/>
      </span>
    </div>
    
    </motion.div>
    
        <div className="w-full my-2 p-3 flex justify- items-end gap-2 ">
       <p className="text-white  p-2 bg-blue-light rounded-md w-[4rem] flex justify-center items-center text-right hover:bg-orange-200"
       onClick={handlingAddSB}><MdAddToPhotos size={26}/></p>
       <p className="text-white  p-2 bg-blue-light rounded-md w-[4rem] flex justify-center items-center text-right hover:bg-orange-200"
       onClick={()=> setIsSearch(true)}><FaSearch size={26}/></p>
      </div>
      
      
      <div className="w-full px-3 flex flex-col gap-3 py-2 h-[25rem] my-5 overflow-auto ">
       {Content}
      </div>
    </div>
    )
}