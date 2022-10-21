import { createSlice } from "@reduxjs/toolkit";

const initialState1 = [];


export const todoSlice = createSlice({
    name:'todos',
    initialState: initialState1,
    reducers: {
        add: (state, action) => {
          const newTodo = { id:  Math.round(Math.random() * new Date() ) , task: action.payload, status: "unCompleted" };
          state.push(newTodo);
        },
        edit: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            todo.task  =action.payload.task;
        },
        remove: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        toggleCompleted: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload);
            todo.completed = !todo.completed;
        },
        statusCompleted: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            todo.status =action.payload.status;
        },
    }
})


export const {
    add,
    edit,
    toggleCompleted,
    remove,
    statusCompleted
  } = todoSlice.actions;
  
  export default todoSlice.reducer;