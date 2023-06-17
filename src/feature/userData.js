import { createSlice } from '@reduxjs/toolkit'
import avatar from "../assets/avatar2.png";

export const userData = createSlice({
    name: 'userData',
    initialState: {
        picture: avatar
    },
    reducers: {
        setPicture: (state, action) => {
            state.picture = action.payload;
        }
    },
});

export const { setPicture } = userData.actions;

export default userData.reducer;