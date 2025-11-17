
import { useSelector,useDispatch } from 'react-redux'
import {toggleHabit, checkNewDay} from '../Store/habitSlice'
import {  useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid, ResponsiveContainer } from 'recharts';


const Dashboard = () => {

  const theme = useSelector ((state)=>state.Theme.mode);
  const {habits} = useSelector((state)=> state.habits);
  const dispatch = useDispatch();
  const firstRun = useRef(true);

                        // for water intake notification    
  useEffect(()=>{    
    
    if (firstRun.current)
    {;
      return;
    }
    const notify = ()=>{
      toast.success(` Task Completed !\n"Another step toward better health!" `,{style:{color:"#000", whiteSpace:"pre-line", textAlign:"center"}})
    }

    if(habits.water )
      {
        notify();
    }

  },[habits.water])

                            //for meditaion notification
  useEffect(()=>{   
    
    if (firstRun.current)
    {
      return;
    }
    const notify = ()=>{
      toast.success(` Task Completed !\n"Well done! You just earned a moment of calm. 🌿" `,{style:{color:"#000", whiteSpace:"pre-line", textAlign:"center"}})
    }

    if(habits.meditation )
      {
        notify();
    }

  },[habits.meditation])
  
                        ////for exercise notification
  useEffect(()=>{  
    
    if (firstRun.current)
    {
      return;
    }
    const notify = ()=>{
      toast.success(` Task Completed !\n"Workout done! You're getting stronger! 💪🔥" `,{style:{color:"#000", whiteSpace:"pre-line", textAlign:"center"}})
    }

    if(habits.exercise )
      {
        notify();
    }

  },[habits.exercise])

                         // for screen time notification
  useEffect(()=>{  
    
    if (firstRun.current)
    {
      firstRun.current = false;
      return;
    }
    const notify = ()=>{
      toast.success(` Task Completed !\n"Balanced digital habits lead to a healthy mind ✨" `,{style:{color:"#000", whiteSpace:"pre-line", textAlign:"center"}})
    }

    if(habits.screenTime )
      {
        notify();
    }

  },[habits.screenTime])


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


                // History section

  const history = useSelector((state)=> state.habits.history)
  const sortedHistory = [...history].sort((a,b)=> a.date.localeCompare(b.date));
  const  lastWeak = sortedHistory.slice(-7);

  const dayLable = lastWeak.map((element, index)=> ({
     day: index === lastWeak.length -1 ? "Today" : `Day ${index+1}`,
     habitsCompleted: element.habitsCompleted
  }));

  return (
  <div  id='Dashboard-Body' >
    <div className='container' >

      <h1 className='display-4 mb-3 pt-4' >Today's Tracker</h1>

      <div className="row">  
                        {/*          row-1 col-2 */}

        <div  className=' my-4 col-12 col-lg-4 E-Choose_Box'> 
          <h1 className='ps-4 h2 pt-3'>Daily Habits</h1>
          <div className="mt-3 pb-1">

            <hr />

            <div className="form-check ms-5 fs-5">
              <input
                type="checkbox"
                className="form-check-input"
                checked={habits.water} defaultChecked={true}
                onChange={() => dispatch(toggleHabit("water"))}
              />
              <label className="form-check-label">Water Intake</label>
            </div>

            <hr />

            <div className="form-check  ms-5 fs-5 mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={habits.meditation}
                onChange={() => dispatch(toggleHabit("meditation"))}
              />
              <label className="form-check-label">Meditation</label>
            </div>

            <hr />

            <div className="form-check ms-5 fs-5 mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={habits.exercise}
                onChange={() => dispatch(toggleHabit("exercise"))}
              />
              <label className="form-check-label">Exercise</label>
            </div>

            <hr />

            <div className="form-check ms-5 fs-5 mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={habits.screenTime}
                onChange={() => dispatch(toggleHabit("screenTime"))}
              />
              <label className="form-check-label">Screen Time Control</label>
            </div>
          </div>
        </div>

        <div className="col-0 col-lg-1">
          
        </div>
                {/*          row-1 col-2 */}
        <div className=" mt-4 col-12 col-lg-6">

          <div className='E-Choose_Box'>
            <h1 className='ps-4 h2 pt-3'>Progress Overview</h1>

             <div style={{ width: "100%", height: 350 }}>

              <ResponsiveContainer>

                <LineChart data={dayLable}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#444" />
                    {theme=== "light" ? <>
                    <XAxis  dataKey="day" stroke="#2e2e2eff" />
                    <YAxis allowDecimals={false} domain={[0, 4]} stroke="#313131ff"/></> :
                    <>
                    <XAxis  dataKey="day" stroke="#e1e0e0ff" />
                    <YAxis allowDecimals={false} domain={[0, 4]} stroke="#e1e1e1ff"/></>  }

                  <Tooltip  />
                  <Line type="monotone" dataKey="habitsCompleted" stroke="#0d75fdff" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard