import { useState,useContext,useEffect } from 'react'
import './App.css'

import {Routes, Route,useNavigate} from 'react-router-dom';

//ApiSlice
import {Provider} from "react-redux"
import {Store} from "./features/Store"
import {Context} from "./component/SubComponents/ContextApi"

//components 
import {Nav,Home,About} from "./component"

//Subcomponent
import {Cards} from "./component/SubComponents/MemoryCards"
import {SubCards} from "./component/SubComponents/SubCards"
import {CardView} from "./component/SubComponents/CardView"


//Boxcomponents 
import {EditCard} from "./component/SubComponents/BoxComponent/EditMCard"


function App() {
  
  const [SubBoxDetails,setSubBoxDetails]=useState("")
  const [BoxDetails,setBoxDetails]= useState("")
  
  
  const Navigate = useNavigate()
  
  useEffect(()=>{
    Navigate("/")
  },[])
  
  return (
    <>
    
    <main className="w-screen h-screen bg-main overflow-auto">
    
    <Provider store={Store}>
        
         <Context.Provider value={{
           SubBoxDetails, 
           setSubBoxDetails,
           BoxDetails,
           setBoxDetails
        } }>   
        <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            
            {/*Cards*/}
            <Route path="/Cards/:id" element={ <Cards/>}/>
            <Route path="/SubCards/:card" element={ <SubCards/>}/>
            <Route path="/editCard/:cardId" element={ <EditCard/>}/>
            <Route path="/CardView/:view" element={ <CardView/>}/>

         
        </Routes>
         </Context.Provider >   
         
         
    </Provider>
    
    </main>
    
    
    </>
  )
}

export default App
