import { createSlice } from '@reduxjs/toolkit'

export const tableRender = createSlice({
    name: 'tableRender',
    initialState: {
        rerender: true
    },
    reducers: {
        reRender: state => {
            state.rerender = !state.rerender;
        }
    }
})

export const { reRender } = tableRender.actions

export default tableRender.reducer