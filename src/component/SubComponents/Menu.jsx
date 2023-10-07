import react,{useContext} from 'react'

//Library 
import {Link} from "react-router-dom"

//Components 
import {SideHead} from "../ReuseAble/ReuseAble"
import {Context} from "./ContextApi"

//Icons
import {AiFillHome} from "react-icons/ai"
import {FcAbout} from "react-icons/fc" 
import {AiFillSetting} from "react-icons/ai"
import {BiSolidUserDetail} from "react-icons/bi"
import {BsFillBriefcaseFill} from "react-icons/bs"



export const Menu =()=>{
  
  const {setSideNav} = useContext(Context)
  
  return(
    <div>
       <SideHead title="Menu"/>
       <div className="flex flex-col w-full mt-5 p-5 gap-4 text-xl font-medium ">
       
         <Link to="/" className="menu-L">
             <span><AiFillHome/></span>
              Home
         </Link>
         
         <Link to="/about" className="menu-L">
           <span><BiSolidUserDetail/></span>
             About
         </Link>
         
          <span 
          className="menu-L"
          onClick={()=> setSideNav("boxes")}> 
             <span><BsFillBriefcaseFill/></span>
            Memory Boxes
         </span>
         
         <span className="menu-L">
           <span><AiFillSetting/></span>
           Settings
         </span>
         
       
       </div>
    </div>
    )
}