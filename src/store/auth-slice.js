import {createSlice} from '@reduxjs/toolkit'

// redux slice to store user's authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        login(state,action) {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout(state,action) {
            state.user = null
            state.token = null
        }
    }
})

const authActions = authSlice.actions

export {authActions}
export default authSlice