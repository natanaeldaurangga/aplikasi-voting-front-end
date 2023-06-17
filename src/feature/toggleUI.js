import { createSlice } from '@reduxjs/toolkit'

export const toggleUI = createSlice({
    name: 'toggleUI',
    initialState: {
        sidebar: false,
        user: true,
    },
    reducers: {
        toggleSidebar: state => {
            state.sidebar = !state.sidebar;
        },
        closeSidebar: state => {
            state.sidebar = false;
        },
        toggleUser: (state) => {
            state.user = !state.user;
        },
        closeUser: state => {
            state.user = true;
        },
    },
});

export const { toggleSidebar, toggleUser, closeUser, closeSidebar } = toggleUI.actions;

export default toggleUI.reducer;