import {createSlice} from '@reduxjs/toolkit'

// redux slice to store user's authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        login(state,action) {
            state.user = action.payload
        },
        logout(state,action) {
            state.user = null
        }
    }
})

const authActions = authSlice.actions

export {authActions}
export default authSlice