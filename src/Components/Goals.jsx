import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGoal, deleteGoal, goalCompleted } from '../Store/GoalSlice'
import completedIcon from '../assets/Icons/check.png'
import deleteIcon from '../assets/Icons/delete.png'
import { toast } from 'react-toastify'

const Goals = () => {

  const theme = useSelector((state) => state.Theme.mode);
  const goals = useSelector((state) => state.goals.savedGoals);
  const dispatch = useDispatch();

  const [goalInput, setGoalInput] = useState("");


  useEffect(() => {
    const body = document.getElementById("Dashboard-Body");
    const box = document.querySelectorAll(".E-Choose_Box");

    body.style.height = "100vh";

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
  }, [theme]);


  const AddNewGoal = (e) => {

    e.preventDefault();

    if (goalInput.trim() === "") return;

    dispatch(addGoal(goalInput));
    setGoalInput(""); 

  };


  const notify = ()=>{
    toast.dismiss();
    toast.success ("Task has been completed successfully !",{style:{color:"#000", textAlign:"center"}})
  }

  return (
    <div id="Dashboard-Body" className="pt-5">

      <div className="E-Choose_Box py-3 px-2 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="display-5 fw-normal">Goals</h2>

        <div>

          <form className="input-group mb-4" onSubmit={AddNewGoal}>
            <input type="text" className="form-control p-2 fs-4" placeholder="Write your new goal..." value={goalInput} onChange={(e) => setGoalInput(e.target.value)} required/>
            <button type="submit" className="btn btn-outline-secondary bg-primary text-light fs-4">
              Create
            </button>
          </form>

          <hr />


          <ul className="list-unstyled ">
            {goals.map((goal, index) => (
              <li key={index} className='E-goal_list'>
                <div className="border border-dark my-3 px-1 px-lg-4 fs-2 rounded d-flex justify-content-between align-items-center">

                  <span className="ps-1 ps-lg-3 fs-5"
                    style={{ textDecoration: goal.completed ? "line-through" : "none" }}>
                    {goal.text}
                  </span>

                    
                  <div className="d-flex gap-3">

                    <button className=" E-complete_btn fs-5 "  onClick={() => {dispatch(goalCompleted(index)); goal.completed ?"":notify()}} >
                      {goal.completed ? (<img src={completedIcon} width="35px" alt="completed" />) : ("Complete")}
                    </button>

                    <button className="btn btn-sm" onClick={() => dispatch(deleteGoal(index))}>
                      <img src={deleteIcon} width="32px" alt="delete" />
                    </button>

                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Goals;
