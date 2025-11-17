import { createSlice } from "@reduxjs/toolkit";

const todayDate = new Date().toLocaleDateString("en-CA"); 

const savedData = JSON.parse(localStorage.getItem("habitData")) || {
  habits: {
    water: false,
    meditation: false,
    exercise: false,
    screenTime: false
  },
  history: [{ date: "2025-01-06", habitsCompleted: 0 },], 
  lastUpdated: "2025-01-06"
  };


const habitSlice = createSlice({

  name: "habits",
  initialState: savedData,
  reducers: 
{
    toggleHabit(state, action) 
    {
      const habitName = action.payload;

      state.habits[habitName] = !state.habits[habitName];

      const completedCount = Object.values(state.habits).filter(Boolean).length;

      state.history = state.history.filter((h) => h.date !== todayDate );
      state.history = state.history.filter((h) => h.date !== "2025-01-06" );
      
      state.history.push({
        date: todayDate,
        habitsCompleted: completedCount,
      });


      localStorage.setItem("habitData", JSON.stringify(state));

      console.log(state)
    },

    checkNewDay(state) 
    {
      if (state.lastUpdated !== todayDate)
        {

            state.habits = {
              water: false,
              meditation: false,
              exercise: false,
              screenTime: false
            };

            state.lastUpdated = todayDate;

            localStorage.setItem("habitData", JSON.stringify(state));
        }
    },

    addExampleDays(state) {
      const exampleData = {
        habits: {
          water: true,
          meditation: false,
          exercise: true,
          screenTime: false,
        },
        history: [
          { date: "2025-01-01", habitsCompleted: 2 },
          { date: "2025-01-02", habitsCompleted: 2 },
          { date: "2025-01-03", habitsCompleted: 4 },
          { date: "2025-01-04", habitsCompleted: 3 },
          { date: "2025-01-05", habitsCompleted: 2 },
          { date: "2025-01-06", habitsCompleted: 3 },
        ],
        lastUpdated: "2025-01-07"
      };
    
    
      state.habits = exampleData.habits;
      state.history = exampleData.history;
      state.lastUpdated = exampleData.lastUpdated;
    
      localStorage.setItem("habitData", JSON.stringify(exampleData));
    }

    
  },
  
});

export const { toggleHabit, checkNewDay, addExampleDays } = habitSlice.actions;
export default habitSlice.reducer;
