import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Slices/CartSlice'

export default configureStore({
  reducer: {
    cart:CartSlice
  },
})