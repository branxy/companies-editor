import { createSlice } from "@reduxjs/toolkit"
import { companiesInitialState } from "./companiesInitialState"

export const companiesSlice = createSlice({
  name: "companies",
  initialState: companiesInitialState,
  reducers: {
    companyAdded(state, action) {
      if (action.payload.newCompany) {
        state.push(action.payload.newCompany)
      } else if (action.payload.twentyMoreCompanies) {
        const newState = state.concat(action.payload.twentyMoreCompanies)
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
})
export const { companyAdded, companyChanged, companyDeleted } =
  companiesSlice.actions

export default companiesSlice.reducer
