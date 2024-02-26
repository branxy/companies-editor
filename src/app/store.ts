import { configureStore } from "@reduxjs/toolkit"

import companiesReducer from "../features/companies/companiesSlice"
import workersSlice from "../features/workers/workersSlice"

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    workers: workersSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
