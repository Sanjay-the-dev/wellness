import { createSlice } from "@reduxjs/toolkit";

const savedGoals =
  JSON.parse(localStorage.getItem("goals")) || [
    { text: "Wake up at 6 AM", completed: false },
    { text: "5KM jogging", completed: false },
    { text: "Read 20 pages of a book", completed: false }
  ];



const GoalSlice = createSlice({
  name: "goals",
  initialState: { savedGoals },
  reducers: {
    addGoal(state, action) {

      const newGoal = {text: action.payload, completed: false};
      state.savedGoals.push(newGoal);
      localStorage.setItem("goals", JSON.stringify(state.savedGoals));
    },

    deleteGoal(state, action) {

      const index = action.payload;
      state.savedGoals = state.savedGoals.filter((_, i) => i !== index);
      localStorage.setItem("goals", JSON.stringify(state.savedGoals));
    },

    goalCompleted(state, action) {

      const index = action.payload;

      state.savedGoals[index].completed = true;

      localStorage.setItem("goals", JSON.stringify(state.savedGoals));
    }
  }
});

export const { addGoal, deleteGoal, goalCompleted } = GoalSlice.actions;
export default GoalSlice.reducer;
