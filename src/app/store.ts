import { combineSlices, configureStore } from "@reduxjs/toolkit"

import { companiesSlice } from "../features/companies/companiesSlice"
import { workersSlice } from "../features/workers/workersSlice"

const rootReducer = combineSlices(companiesSlice, workersSlice)

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
