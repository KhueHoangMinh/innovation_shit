import { createSlice } from "@reduxjs/toolkit";

// redux slice to store the sidebar's open/close state
const barSlice = createSlice({
    name: "barState",
    initialState: {
        isOpenning: false,
        isOpenningTemp: false
    },
    reducers: {
        setBarState(state, action) {
            state.isOpenning = action.payload
        },
        setBarStateTemp(state, action) {
            state.isOpenningTemp = action.payload
        },
        toggle(state) {
            state.isOpenning = !state.isOpenning
        }
    }
})

const barActions = barSlice.actions

export {barActions}
export default barSlice