import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import displayItemsSlice from './displayitem-slice'
import barSlice from './sidebar-slice'

//export the redux slices
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        displayItems: displayItemsSlice.reducer,
        barState: barSlice.reducer
    }
})

export default store