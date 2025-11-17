import { configureStore } from "@reduxjs/toolkit"
import  ThemeSlice  from "./ThemeSlice.js"
import habitSlice from "./habitSlice.js"
import GoalSlice from "./GoalSlice.js"


export const Store = configureStore({

    reducer:{
        Theme: ThemeSlice,
        habits : habitSlice,
        goals: GoalSlice,
    }
})  