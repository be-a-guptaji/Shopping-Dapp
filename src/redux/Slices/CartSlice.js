import { createSlice } from '@reduxjs/toolkit'

export const CartSlice= createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        add: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i] === action.payload) {
                    return
                }
             }
            state.push(action.payload)
        },
        remove: (state, action) => {
            // for (let i = 0; i < state.length; i++) {
            //   if (state[i] === action.payload) {
            //     state.pop(action.payload)
            //   }
            // }
            return state.filter((item)=>item.id !== action.payload);
        },
    }
});
export const {add,remove} = CartSlice.actions;
export default CartSlice.reducer;
