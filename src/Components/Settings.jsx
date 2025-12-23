import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addExampleDays, checkNewDay } from '../Store/habitSlice';
import { toggleTheme } from '../Store/ThemeSlice'
import { toast } from 'react-toastify';

const Settings = () => {

  const [showConfirm,setShowConfirm]=useState(false)
  const theme = useSelector((state)=>state.Theme.mode)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkNewDay());
  },[])

  useEffect (()=>{
    
    const body = document.getElementById("Dashboard-Body");
    const box = document.querySelectorAll(".E-Choose_Box");
    body.style.height = "100vh"

    if(theme ==="light")
    {
      body.style.backgroundColor = "#f3f4f7";
      body.style.color = "#000";
      box.forEach((element)=> element.classList.remove("E-Content_Box_D"));
      box.forEach((element)=> element.classList.add("E-Content_Box_L"));
    }
    else
    {
      body.style.backgroundColor = "#0c0d0f";
      body.style.color = "#fff";
      box.forEach((element)=> element.classList.remove("E-Content_Box_L"));
      box.forEach((element)=> element.classList.add("E-Content_Box_D"));


    }
  },[theme])

  const notify1= ()=>{
    toast.dismiss()
    toast.error("All data has been reset ! Please refresh the page.",{style:{color:"#000", textAlign:"center",fontSize:"1.2rem"}})
  }
  const notify2= ()=>{
    toast.dismiss()
    toast.success(" Example 7Days added !",{style:{color:"#000", textAlign:"center",fontSize:"1.2rem"}})
  }
  const resetData = () =>{
    notify1();
    localStorage.clear();
    setShowConfirm(false)
  }
  return (
    <div id='Dashboard-Body'  >


               {/*           confirm box */}
    {showConfirm && (
      <div className='position-fixed   ' style={{backdropFilter:"blur(10px)", width:"100vw", height:"100%"}}> 
        <div className='E-showConfirm position-relative  start-50  translate-middle border rounded  ' style={{top:"43%"}}  >
          <h1>Are you sure?</h1>
          <p className='fs-5'>This will delete all saved data!</p>

          <div className='pt-2 pt-lg-4 d-flex justify-content-around'>
            <button className=' btn btn-primary  fs-4  px-4 ' onClick={()=>{resetData()}}>
              Yes 
            </button>
            <button className=' btn btn-primary fs-4   px-2 ' onClick={()=> setShowConfirm(false)}>
              Cancel 
            </button>
          </div>

        </div>
      </div>
    )}


      <div className="E-Choose_Box mx-auto py-3 px-1 px-lg-4 pt-5" style={{maxWidth:"600px" }}>
        <h2 className='display-5 fw-normal' >Settings</h2>
        <hr />
        <div className="d-flex align-items-center justify-content-between  px-1 px-lg-2 " > 
        <h4 className='' >Current Theme : {theme}</h4>
        <button className=' rounded p-1 px-lg-3 fs-5 bg-primary text-light ' style={{border:"none"}} onClick={()=> dispatch(toggleTheme())}>Change Theme</button>

        </div>

        <hr />
        <div className="d-flex align-items-center justify-content-between  px-1 px-lg-2 " > 
        <h4  >Add example 7days</h4>
        <button className=' rounded p-1 px-lg-3 fs-5 bg-primary text-light' style={{border:"none"}} onClick={()=>{ dispatch(addExampleDays()); notify2() }}>ADD</button>

        </div>
        <hr />


        <div className="d-flex align-items-center justify-content-between  px-1 px-lg-2 " > 
        <h4  >Reset All Data</h4>
        <button className=' rounded p-1 px-lg-3 fs-5 bg-danger text-light' style={{border:"none"}} onClick={()=>{ setShowConfirm(true)/* localStorage.clear(); notify1() */}}>Reset</button>

        </div>




      </div>

    </div>
  )
}

export default Settings