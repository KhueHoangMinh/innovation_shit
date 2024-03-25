import {createSlice} from '@reduxjs/toolkit'

// redux slice to store user's authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        wallet: null
    },
    reducers: {
        login(state,action) {
            state.user = action.payload.user
            state.token = action.payload.token
            state.wallet = action.payload.wallet
        },
        logout(state,action) {
            state.user = null
            state.token = null
            state.wallet = null
        },
        setWallet(state,action) {
            state.wallet = action.payload.wallet
        },
        setToken(state,action) {
            state.token = action.payload.token
        }
    }
})

const authActions = authSlice.actions

export {authActions}
export default authSlice