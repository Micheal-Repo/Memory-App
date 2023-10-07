import react,{useContext,useState} from 'react'
import {Context} from "./ContextApi"

//redux
import {useSelector,useDispatch} from "react-redux"
import {setIsPoped,setPop} from "../../features/MemoryState"

//ucon
import {MdClose} from "react-icons/md"

//Components
//Box CRUD
import {AddMemoryBox} from "./BoxComponent/AddBox"
import {EditBox} from "./BoxComponent/EditBox"
import {DeleteBox} from "./BoxComponent/DeleteBox"

//SUB Box CRUD
import {AddSubBox} from "./BoxComponent/AddSubBox"
import {EditSubBox} from "./BoxComponent/EditSubBox"
import {DeleteSubBox} from "./BoxComponent/DeleteSubBox"

//Card CRUD
import {DeleteCard} from "./BoxComponent/DeleteCard"


export const PopNav =()=>{
const {
 BoxDetails,
 SubBoxDetails
} = useContext(Context)

// redux
const Pops = useSelector(state=>  state.MState.Pop)
const dispatch = useDispatch()

//close
const handleClose=()=>{
  dispatch(setIsPoped(false))
  
}


  return(
    <Context.Provider value={{
    setIsPoped,
      BoxDetails,
      setPop,
      SubBoxDetails
    }}>
    <div className="z-50 absolute top-0 left-0 w-full h-screen flex justify-center items-center ">
    
       <div className="absolute top-0 left-0 w-full h-full bg-black  bg-opacity-70"></div>
       <div className="w-[18rem]  bg-main border-2 border-bg-1 z-20 rounded-md relative overflow-hidden flex justify-center items-center p-5 pt-10">
       
       <span className="absolute top-0 right-0 p-2 bg-bg-1 rounded-bl-xl" 
       onClick={handleClose}><MdClose size={23}/></span>

       
       {Pops == "add" && <AddMemoryBox />}
       {Pops == "edit" && <EditBox />}
       {Pops == "delete" && <DeleteBox />}
       
       {Pops == "addSB" && <AddSubBox />}
       {Pops == "editSB" && <EditSubBox />}
       {Pops == "deleteSB" && <DeleteSubBox />}
       
       {Pops == "deleteCard" && <DeleteCard/>}
       
       
       </div>
    </div>
    </Context.Provider>
    )
}

