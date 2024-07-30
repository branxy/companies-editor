import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"
import { type Worker, workersInitialState } from "./workersInitialState"
import { type Company } from "../companies/companiesInitialState"
import { type EditableTableCellProps } from "../../components/EditableTableCell"
import { createAppSelector } from "../../app/hooks"

export const workersSlice = createSlice({
  name: "workers",
  initialState: workersInitialState,
  reducers: create => ({
    workerAdded: create.preparedReducer(
      (companyId: Company["id"], newWorkerNumber: number) => {
        const newWorkerId = nanoid()

        return { payload: { companyId, newWorkerId, newWorkerNumber } }
      },
      (state, action) => {
        const { companyId, newWorkerId, newWorkerNumber } = action.payload

        const newWorker: Worker = {
          id: newWorkerId,
          companyId,
          firstName: "",
          lastName: `Новый сотрудник ${newWorkerNumber}`,
          position: "",
        }

        state.push(newWorker)
      },
    ),
    workerChanged: create.reducer(
      (
        state,
        action: PayloadAction<{
          origin: EditableTableCellProps["origin"]
          companyId: Company["id"]
          workerId: Worker["id"]
          firstName?: Worker["firstName"]
          lastName?: Worker["lastName"]
          position?: Worker["position"]
        }>,
      ) => {
        const { origin, workerId } = action.payload

        const worker = state.find(w => w.id === workerId)
        if (worker) {
          switch (origin) {
            case "worker/lastName":
              worker.lastName = action.payload.lastName!
              break
            case "worker/firstName":
              worker.firstName = action.payload.firstName!
              break
            case "worker/position":
              worker.position = action.payload.position!
              break
            default:
              throw new Error("Unknown type of origin:" + origin)
          }
        }
      },
    ),
    workerDeleted: create.reducer(
      (
        state,
        action: PayloadAction<{
          selectedWorkersIds: Worker["id"][]
        }>,
      ) => {
        const { selectedWorkersIds: workersToDelete } = action.payload
        const newState = state.filter(w => !workersToDelete.includes(w.id))

        return newState
      },
    ),
  }),
  selectors: {
    selectAllWorkers: state => state,
  },
})

export const { selectAllWorkers } = workersSlice.selectors

export const selectWorkersByCompanyId = createAppSelector(
  [selectAllWorkers, (state, id?: Company["id"]) => id],
  (state, id) => state.filter(worker => worker.companyId === id),
)

export const { workerAdded, workerChanged, workerDeleted } =
  workersSlice.actions

export default workersSlice.reducer
