import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Bar,BarChart,XAxis,YAxis,Tooltip,CartesianGrid, ResponsiveContainer } from 'recharts';




const History = () => {

  
    const theme = useSelector ((state)=>state.Theme.mode);

  const history = useSelector((state)=> state.habits.history)
  const sortedHistory = [...history].sort((a,b)=> a.date.localeCompare(b.date));
  const  lastWeak = sortedHistory.slice(-7);

  const dayLable = lastWeak.map((element, index)=> ({
     day: index === lastWeak.length -1 ? "Today" : `Day ${index+1}`,
     habitsCompleted: element.habitsCompleted
  }));
    
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
  
  return (
    <div id='Dashboard-Body' className='pt-5 '>
                <div className='E-Choose_Box mx-auto' style={{maxWidth:"600px"}}>
                  <h2 className="display-6 fw-normal py-2">History-Last 7days</h2>
      
                   <div style={{ width: "100%", height: 350 }}>
      
                    <ResponsiveContainer>
      
                      <BarChart data={dayLable}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#444" />
                        {theme=== "light" ? <>
                        <XAxis  dataKey="day" stroke="#2e2e2eff" />
                        <YAxis allowDecimals={false} domain={[0, 4]} stroke="#313131ff"/></> :
                        <>
                        <XAxis  dataKey="day" stroke="#e1e0e0ff" />
                        <YAxis allowDecimals={false} domain={[0, 4]} stroke="#e1e1e1ff"/></>  }
                        <Tooltip style={{color:"#0f0"}} cursor={false}/>
                        <Bar dataKey="habitsCompleted" fill="#0d6efd" barSize={40} radius={[10, 10, 0, 0]} activeBar={false} />
                      </BarChart>

                    </ResponsiveContainer>
                  </div>
                </div>
    
    </div>
  )
}

export default History