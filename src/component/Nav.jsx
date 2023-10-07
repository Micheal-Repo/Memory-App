import react from 'react'
import {useState,useContext} from 'react'

//Library 
import {motion} from "framer-motion"
import OutsideClickHandler from 'react-outside-click-handler';

//Icons
import {BiMenuAltLeft} from "react-icons/bi"
import {MdOutlineMemory,MdOutlineClose} from "react-icons/md"
import {IoMdCloseCircleOutline} from "react-icons/io"

// components 
import {Boxes} from "./SubComponents/MemoryBoxs"
import {Menu} from "./SubComponents/Menu"
import {PopNav} from "./SubComponents/PopNav"
import {Context} from "./SubComponents/ContextApi"
import {SubBoxes} from "./SubComponents/SubBoxes"
 
 //redux
 import {useSelector,useDispatch} from "react-redux"

const Nav =()=>{
  
  // framer-motion
  const [isSideNavOpen,setIsSideNavOpen] =useState(false)
  const NavMotion ={
    close:{x:"-100%"},
    open:{x:0}
  }
  
  //redux
  const Poped = useSelector(state=>  state.MState.isPoped)
  
  //PopNav
  const [isPoped,setIsPoped] = useState(false)
  const [Pop,setPop] = useState("")
  
  
  // Condition for Side Navs
  const [SideNav,setSideNav] = useState("menu")
  
   
  const {
   setSubBoxDetails,
   SubBoxDetails,
   BoxDetails,
   setBoxDetails
 } = useContext(Context)
  
  
  return(
    <Context.Provider value={{
      setIsSideNavOpen,
      setSideNav,
      setIsPoped,
      setPop,
      Pop,
      setBoxDetails,
      BoxDetails,
      setSubBoxDetails,
      SubBoxDetails
    }}>

    <div className="bg-light w-full py-[1.2rem] p-sp text-white flex justify-between border-b-2 shadow-2xl border-white relative">
     
       <BiMenuAltLeft size={35} onClick={()=> setIsSideNavOpen(true)}/>
       <p className="text-[1.2rem] font-bold flex gap-1 text-orange-200 ml-4">Memory App <MdOutlineMemory size={30}/>
       </p>
       
       
       {/*PopNav*/}
        {Poped && <PopNav/>}
       
       {/*Memory Box Container*/}
       <OutsideClickHandler 
       onOutsideClick={()=> setIsSideNavOpen(false)}
       >
       
       <motion.div 
       variants={NavMotion}
       initial="close"
       animate= {isSideNavOpen ? "open":"close"}
       transition={{ duration:0.5}}
       
       className="w-[80%] fixed overflow-auto h-screen top-0 left-0 bg-main border-r-2 border-r-white z-40">

       
       {/*Side Nav*/}
       {SideNav == "menu" && 
       <Menu/>}
       {SideNav == "boxes" && 
       <Boxes/> }
       {SideNav == "subBoxes" && 
       <SubBoxes/> }

          
       </motion.div>
       
       </OutsideClickHandler>
       
    </div>
        </Context.Provider>
    )
}

export default Nav;