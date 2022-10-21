import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState1 = {
    data:{},
    loading: false,
    error: ""
};


export const fetchUser = createAsyncThunk("fetchUser" , async () => {
    const response = await axios.get('https://reqres.in/api/users/2')
    return response.data.data
})

export const userSlice = createSlice({
    name:'user',
    initialState: initialState1,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending , (state , action) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUser.rejected , (state , action) => {
            state.loading = false;
            state.error = "Something went wrong !";
        });
    }
})

  
export default userSlice.reducer;