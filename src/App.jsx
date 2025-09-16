import React, { useEffect, useState } from 'react'
import Bookmark from './pages/bookmark'
import Input from './pages/input'

function App() {
  const [data,setData]=useState([])
  useEffect(()=>{
    fetch("http://localhost:3001/bookmarks")
      .then((res) => res.json())
      .then((json) => setData(json));
  },[])
  return (
    <div>
      <Input setData={setData}/>
      <Bookmark data={data} setData={setData}/>
    </div>
  )
}

export default App
