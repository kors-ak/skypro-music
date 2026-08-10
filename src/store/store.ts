import { trackSliceReducer } from '@/store/features/trackSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      tracks: trackSliceReducer,
    }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
