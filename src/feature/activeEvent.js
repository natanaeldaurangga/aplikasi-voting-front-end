import { createSlice } from '@reduxjs/toolkit'

export const activeEvent = createSlice({
    name: 'activeEvent',
    initialState: {
        eventId: ''// TODO: lanjut bikin activeEvent ini digunakan disemua menu page
    },
    reducers: {
        setActiveEvent: (state, action) => {
            state.eventId = action.payload;
        }
    },
});

export const { setActiveEvent } = activeEvent.actions;

export default activeEvent.reducer;