import {
  createEntityAdapter,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit"
import { type Worker, workersInitialState } from "./workersInitialState"
import { type Company } from "../companies/companiesInitialState"
import { type EditableTableCellProps } from "../../components/EditableTableCell"
import { type RootState } from "../../app/store"
import { createAppSelector } from "../../app/redux-hooks"

const workersAdaptor = createEntityAdapter<Worker>(),
  initialState = workersAdaptor.getInitialState({}, workersInitialState)

export const workersSlice = createSlice({
  name: "workers",
  initialState,
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

        workersAdaptor.addOne(state, newWorker)
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

        const worker = state.entities[workerId]
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
        const { selectedWorkersIds } = action.payload
        workersAdaptor.removeMany(state, selectedWorkersIds)
      },
    ),
  }),
  selectors: {
    selectAllWorkers: state => state,
  },
})

export const { selectAll: selectAllWorkers } = workersAdaptor.getSelectors(
  (state: RootState) => state.workers,
)

export const selectWorkersByCompanyId = createAppSelector(
  [selectAllWorkers, (state, id?: Company["id"]) => id],
  (state, id) => state.filter(worker => worker.companyId === id),
)

export const { workerAdded, workerChanged, workerDeleted } =
  workersSlice.actions

export default workersSlice.reducer
