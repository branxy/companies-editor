import { type FunctionComponent } from "react"

import { useAppDispatch, useAppSelector } from "../app/redux-hooks"
import {
  companyAdded,
  companyDeleted,
} from "../features/companies/companiesSlice"
import {
  selectWorkersByCompanyId,
  workerAdded,
  workerDeleted,
} from "../features/workers/workersSlice"

import { type Worker } from "../features/workers/workersInitialState"
import DeleteActionBtn from "./DeleteActionBtn"
import { type Company } from "../features/companies/companiesInitialState"

export interface TableActionBtnsProps {
  origin: "companies" | "workers"
  companyId?: number
  selectedCompanies?: number[]
  setSelectedCompanies?: React.Dispatch<React.SetStateAction<Company["id"][]>>
  isInfiniteScroll?: boolean
  setIsInfiniteScroll?: React.Dispatch<React.SetStateAction<boolean>>
  selectedWorkersIds?: Worker["id"][]
  setSelectedWorkers?: React.Dispatch<React.SetStateAction<Worker["id"][]>>
}

const TableActionBtns: FunctionComponent<TableActionBtnsProps> = ({
  origin,
  selectedCompanies,
  setSelectedCompanies,
  selectedWorkersIds,
  setSelectedWorkers,
  companyId,
  isInfiniteScroll,
  setIsInfiniteScroll,
}) => {
  const employees = useAppSelector(state =>
    selectWorkersByCompanyId(state, companyId),
  )

  const dispatch = useAppDispatch()

  function handleAddRow() {
    switch (origin) {
      case "companies":
        dispatch(companyAdded(1))
        break
      case "workers":
        dispatch(workerAdded(companyId!, employees.length + 1))
        break
      default:
        throw new Error("Unknown type of origin:" + origin)
    }
  }

  function handleDeleteRow() {
    switch (origin) {
      case "companies":
        dispatch(companyDeleted(selectedCompanies!))
        if (setSelectedCompanies) setSelectedCompanies([])
        break
      case "workers":
        dispatch(workerDeleted({ selectedWorkersIds: selectedWorkersIds! }))
        if (setSelectedWorkers) setSelectedWorkers([])
        break
      default:
        throw new Error("Unknown type of origin:" + origin)
    }
  }

  return (
    <div className="action-btns">
      <button className="add" onClick={handleAddRow}>
        <span className="material-symbols-outlined">add</span>
      </button>
      <DeleteActionBtn
        origin={origin}
        handleDeleteRow={handleDeleteRow}
        selectedCompanies={selectedCompanies}
        selectedWorkers={selectedWorkersIds}
      />
      {origin === "companies" && setIsInfiniteScroll && (
        <div className="infinite-scroll">
          <input
            type="checkbox"
            name="infinite-scoll"
            checked={isInfiniteScroll}
            onChange={() => setIsInfiniteScroll(!isInfiniteScroll)}
          />
          <label htmlFor="infinite-scroll">Бесконечный скролл</label>
        </div>
      )}
    </div>
  )
}

export default TableActionBtns
