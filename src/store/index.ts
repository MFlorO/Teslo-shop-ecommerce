import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/uiSlice'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



//HOOKS
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector