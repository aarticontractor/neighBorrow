import { configureStore } from '@reduxjs/toolkit'
import { useProductReducer, reducer } from './reducers';

export default configureStore({
  reducer: reducer,
})