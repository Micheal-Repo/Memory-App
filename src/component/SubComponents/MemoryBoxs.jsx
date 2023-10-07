import react,{useContext} from 'react'
import {useState} from 'react'

//library 
import {Link,useNavigate} from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useClickAway } from "@uidotdev/usehooks";
import {motion} from "framer-motion"

//Icons
import {BiArrowBack} from "react-icons/bi"
import {MdAddToPhotos,MdDelete} from "react-icons/md"
import {BsThreeDotsVertical} from "react-icons/bs"
import {BsFolderFill} from "react-icons/bs"
import {RiEditFill} from "react-icons/ri"
import {BsFillBriefcaseFill} from "react-icons/bs"
import {MdClose} from "react-icons/md"
import {FaSearch} from "react-icons/fa"

//components 
import {SideHead} from "../ReuseAble/ReuseAble"
import {AddMemoryBox} from "./BoxComponent/AddBox"
import {EditBox} from "./BoxComponent/EditBox"
import {Context} from "./ContextApi"
import {
  useFetchBoxesQuery,
  useAddBoxMutation
} from "../../features/apiSlice"

//hooks
import {useSelector,useDispatch} from "react-redux"
import {setIsPoped,setPop} from "../../features/MemoryState"


export const Boxes =()=>{
  
  //context 
 const {
   setSideNav,
   setIsSideNavOpen,
  setBoxDetails
 
 } = useContext(Context)
  
  
  const handleClick =()=>{
    setIsSideNavOpen(false)
  }
  
  //redux 
  const dispatch = useDispatch()
  
  // Rtk Query
  const {
    data:boxes,
    isLoading,
    isSuccess,
    isError,
    error
  }= useFetchBoxesQuery()
  
   // Search
  const SearchMotion ={
    close:{y:"-3rem",opacity:0},
    open:{y:0,opacity:1}
  }
  const [isSearch,setIsSearch] = useState(false)
  const [Search,setSearch]=useState("")
  
let Filter;
  if(boxes){
  Filter= boxes.filter((box)=> ((box.box).toLowerCase()).includes(Search.toLowerCase())) 
  }
  
  
  // content
const [displayId,setDisplayId] = useState(0)
const [display,setDisplay] = useState(false)

const handleDisplay =(Id)=>{
  setDisplayId(Id)
  
  if(displayId === Id){
  setDisplay(!display)
  }else{
    setDisplay(true)
  }
}

//ref
const ref = useClickAway(()=>{
  setDisplay(false)
})

// isediting
const [isEditing,setIsEditing]=useState(false)
 const handleEditing=(box)=>{
    dispatch(setIsPoped(true))
   dispatch(setPop("edit"))
   setBoxDetails(box)
 } 
 
 
 //handleDeleting
 const handleDeleting=(box)=>{
   dispatch(setIsPoped(true))
   dispatch(setPop("delete"))
   setBoxDetails(box)
 }
 
 
 //handleSubBoxes
 const handleSubBoxes=(box)=>{
   setSideNav("subBoxes")
   setBoxDetails(box)
 }

  let content;
  if(isLoading){
    content = <p>Loading...</p>
  }else if(isSuccess){
    content = Filter.reverse().map((box)=> {
      return (
     
     <div  className="w-[100%] p-3 pl-4 bg-light shadow-2xl rounded-md border-gray-500 border-2 relative flex justify-between items-center" > 
   
     <div onClick={handleClick}  >
     
        <Link to={`/Cards/${box.id}`} key={box.id}  className="flex gap-3 items-center " >
        <BsFillBriefcaseFill size={20}/>
          <div className="font-bold text-lg ">{box.box}</div>

         </Link>
     </div>
         
        <span onClick={()=> handleDisplay(box.id)}><BsThreeDotsVertical size={25}/>
        </span>
        
        
        <div className="fixed top-[15rem] right-[50%] translate-x-[50%] w-[12rem]  bg-main z-40  drop-shadow-2xl rounded flex flex-col gap-3 p-2 px-3 justify-center items-center displayS border-2 border-gray-500 "  style={{display:box.id === displayId && display ? "block" : "none"}}>
        <p className="font-medium text-lg mb-3 text-orange-200">{box.box}</p>
        <span onClick={()=> handleEditing(box)}>
            <RiEditFill/>
           <p>Edit</p>
        </span>
        <span onClick={()=> handleDeleting(box)}>
           <MdDelete/>
           <p>Delete</p>
       </span>
        <span className="border-none"
        onClick={()=> handleSubBoxes(box)}>
            <BsFillBriefcaseFill/>
            <p>Add Sub-Box</p>
        </span>
        
        
        </div>
       
     </div>
        
    
        
        )
    })
  }else if(isError){
    content = <p>error</p>
  }
  
  //boxes
  let Boxes;
  if(boxes){
    Boxes = boxes
  }
  
  // bacck
  const Navigate = useNavigate()
  
  const handleBack =()=>{
    setSideNav("menu")
    Navigate("/home")
    
  }
  
 //handlingAddBox
 
 
  const handlingAddBox=()=>{
   dispatch(setPop("add")),
  dispatch(setIsPoped(true))
  
 
  }
  
  
  
  return(
    <Context.Provider value={{
      
      setIsEditing,
      Boxes,
      
    }}>
 
    <div className="w-full h-screen overflow-auto relative ">
        <span className="absolute top-0 h-8 w-8 bg-bg-1 rounded-br-xl flex justify-center items-center font-bold left-0 text-red-400 z-50 " onClick={handleBack}><BiArrowBack size={25}/></span>
      
      <SideHead title="Memory Boxes" />
      
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
    
    
      <div className="w-[100%] px-4  flex flex-col gap-3 ">
      

      {/*Add New Box*/}
      <div className="w-full mt-5 mb-5 flex justify-between items-center">
         <span className="bg-blue-light flex items-center gap-2 justify-center w-[10rem] p-2 rounded text-orange-200 "
          onClick={handlingAddBox}>
          <MdAddToPhotos size={20}/>
          <p className="font-medium"> Add New Box</p>
          </span>
          <span className="py-2 px-3 rounded-md border-2 border-gray-500 hover:bg-bg-1"
          onClick={()=> setIsSearch(true)}><FaSearch size={23}/></span>
        </div>
          
         
      
        <div className="flex flex-col gap-3 h-[22rem] overflow-auto rounded mt-2" >
       {display && <div className="w-full h-full absolute top-0 left-0 bg-black z-20 opacity-70">
         </div>}
         
         <div ref={ref} className="flex flex-col gap-3">
          {content}
          
         </div>
         </div>
         
      </div>
    </div>
       </Context.Provider>
    )
}



