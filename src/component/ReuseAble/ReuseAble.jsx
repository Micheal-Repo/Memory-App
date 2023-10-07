import react from 'react'

export const SideHead=({title})=>{
  
  
  
  return(
      <div  className="w-full h-[9rem] bg-white text-5xl color-sp font-bold flex justify-center items-center  relative">
     
       <p className="color-sp text-center w-[15rem] overflow-auto">{title}</p>
       </div>
    )
}
