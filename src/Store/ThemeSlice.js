import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme") || "dark";

const ThemeSlice = createSlice({

    name: "Theme",
    initialState: { mode: savedTheme},
    reducers:{
        toggleTheme:(state)=>{

            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        }
    }
})

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;