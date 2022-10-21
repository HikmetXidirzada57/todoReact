import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducers/todoSlice";
import userReducer from "../reducers/userSlice";


export const store = configureStore({
    reducer: {
        todos: todoReducer,
        user: userReducer,
    },  
});