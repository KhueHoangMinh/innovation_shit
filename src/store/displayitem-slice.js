import {createSlice} from '@reduxjs/toolkit'

// redux slice to store displaying items, not implemented
const displayItemsSlice = createSlice({
    name: 'displayItems',
    initialState: {
        searchShop: [],
        searchMarket: [],
        shop: [],
        market: []
    },
    reducers: {
        updateSearchShop(state,action) {
            state.searchShop = action.payload
        },
        updateSearchMarket(state,action) {
            state.searchMarket = action.payload
        },
        updateShop(state,action) {
            state.shop = action.payload
        },
        updateMarket(state,action) {
            state.market = action.payload
        },
    }
})

export const displayItemsActions = displayItemsSlice.actions
export default displayItemsSlice