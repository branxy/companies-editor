import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initialState"

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
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

    workerAdded(state, action) {
      const { companyId, newWorker } = action.payload
      const company = state.find(c => c.id === companyId)

      if (company) {
        company.employees.push(newWorker)
      }
    },

    workerChanged(state, action) {
      const { origin, companyId, workerId } = action.payload

      const worker = state
        .find(c => c.id === companyId)
        ?.employees.find(e => e.id === workerId)
      if (worker) {
        switch (origin) {
          case "worker/lastName":
            worker.lastName = action.payload.lastName
            break
          case "worker/firstName":
            worker.firstName = action.payload.firstName
            break
          case "worker/position":
            worker.position = action.payload.position
            break
          default:
            throw new Error("Unknown type of origin:" + origin)
        }
      }
    },

    workerDeleted(state, action) {
      const company = state.find(c => c.id === action.payload.companyId)
      const workersToDelete = action.payload.selectedWorkers
      if (company) {
        const employees = company.employees
        const newState = employees.filter(employee => {
          if (workersToDelete.includes(employee.id)) {
            return false
          } else return true
        })
        company.employees = newState
      }
    },
  },
})
export const {
  companyAdded,
  companyChanged,
  companyDeleted,
  workerAdded,
  workerChanged,
  workerDeleted,
} = companiesSlice.actions

export default companiesSlice.reducer
