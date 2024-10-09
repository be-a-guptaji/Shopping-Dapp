import { createSlice } from '@reduxjs/toolkit'  

export const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i] === action.payload) {
                    return
                }
            }
            state.push(action.payload)
        },
        remove: (state, action) => {
            const newArray = [];
            for (let i = 0; i < state.length; i++) {
                if (state[i] !== action.payload) {
                    newArray.push(state[i]); 
                }
            }
            state = [...newArray];
            
            for (let i = 0; i < newArray.length; i++) { 
                state[i] = newArray[i];
            }
            return state.filter((item)=>item.id !== action.payload);
        },
        clear:(state)=>{
            return [];
        }
    }
});
export const {add,remove,clear} = CartSlice.actions;
export default CartSlice.reducer;
