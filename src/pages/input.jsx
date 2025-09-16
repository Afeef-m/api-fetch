import React from 'react'
import { useRef,useState } from 'react'

function Input() {
    const [title,setTitle]=useState("")
    const [category,setCategory]=useState("")
    const [data,setData]=useState([])
    const ref=useRef(null)

   async function handleSub(e){
        e.preventDefault()
        if(!title || !ref.current.value || !category){
            alert("please fill")
            return
        }
    const add={
        title,
        url:ref.current.value,
        category

    }
    try{
        const res = await fetch("http://localhost:3001/bookmarks",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(add)
        });
        if(res.ok){
            const newItem=await res.json()
            setData(prev=>[...prev. newItem])
            setTitle("")
            setCategory("")
            ref.current.value= "";
        }else{
            alert("failed")
        }
    }catch(error){
        console.error("error",error);
        
    }
   }
   
    
  return (
    <div>
    <form onSubmit={handleSub}>

      <input type="text"
      placeholder='add title'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
       />
       <input type="url" 
       ref={ref}
       placeholder='paste url'/>
       <input type="text"
       placeholder='category'
       value={category} 
       onChange={(e)=>setCategory(e.target.value)}/>

       <button type='submit'>Add</button>
       <button type='button'>Edit</button>
       <button type='button'>Delete</button>
        </form>
    </div>
  )
}

export default Input
