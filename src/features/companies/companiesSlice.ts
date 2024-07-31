import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSelector } from "../../app/redux-hooks"

import {
  companiesInitialState,
  type Companies,
  type Company,
} from "./companiesInitialState"

export const companiesSlice = createSlice({
  name: "companies",
  initialState: companiesInitialState,
  reducers: {
    companyAdded(state, action: PayloadAction<Company | Companies>) {
      if (!Array.isArray(action.payload)) {
        state.push(action.payload)
      } else {
        const newState = state.concat(action.payload)
        return newState
      }
    },

    companyChanged(state, action) {
      const { origin, companyId } = action.payload
      const company = state.find(c => c.id === companyId)
      if (company) {
        switch (origin) {
          case "company/name":
            company.name = action.payload.name
            break
          case "company/address":
            company.address = action.payload.address
            break
          default:
            throw new Error("Unknown type of origin:" + origin)
        }
      }
    },

    companyDeleted(state, action) {
      return state.filter(company => {
        if (action.payload.selectedCompanies.includes(company.id)) {
          return false
        } else return true
      })
    },
  },
  selectors: {
    selectAllCompanies: state => state,
  },
})
export const { companyAdded, companyChanged, companyDeleted } =
  companiesSlice.actions

export const { selectAllCompanies } = companiesSlice.selectors

export const selectCompanyById = createAppSelector(
  [selectAllCompanies, (state, id: Company["id"]) => id],
  (state, id) => state.find(company => company.id === id),
)

export default companiesSlice.reducer
