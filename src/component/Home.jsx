import react from 'react'
import {format} from "date-fns"

const Home =()=>{
  
 const date = format(new Date(), "EE do MMMM yyyy")
 //const dates = format(new Date(), "do/MM/yyyy")
  
 //const day = getDate(2020/11/10)
 
  return(
    <div>
       <p>Home</p>
       <p>time {date} </p>
       <p> </p>
       
    </div>
    )
}

export default Home;