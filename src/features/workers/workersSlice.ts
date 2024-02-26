import { createSlice } from "@reduxjs/toolkit"
import { workersInitialState } from "./workersInitialState"

export const workersSlice = createSlice({
  name: "workers",
  initialState: workersInitialState,
  reducers: {
    workerAdded(state, action) {
      const { companyId, newWorker } = action.payload
      const team = state.find(team => team.companyId === companyId)

      if (team) {
        team.employees.push(newWorker)
      }
    },

    workerChanged(state, action) {
      const { origin, companyId, workerId } = action.payload

      const worker = state
        .find(team => team.companyId === companyId)
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
      const team = state.find(c => c.companyId === action.payload.companyId)
      const workersToDelete = action.payload.selectedWorkers
      if (team) {
        const { employees } = team
        const newState = employees.filter(employee => {
          if (workersToDelete.includes(employee.id)) {
            return false
          } else return true
        })
        team.employees = newState
      }
    },
  },
})

export const { workerAdded, workerChanged, workerDeleted } =
  workersSlice.actions

export default workersSlice.reducer
