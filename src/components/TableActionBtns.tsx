import { type FunctionComponent } from "react"

import { nanoid } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  companyAdded,
  companyDeleted,
} from "../features/companies/companiesSlice"
import { workerAdded, workerDeleted } from "../features/workers/workersSlice"

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
  const companies = useAppSelector(state => state.companies)
  const employees = useAppSelector(state =>
    state.workers.filter(worker => worker.companyId === companyId),
  )

  const dispatch = useAppDispatch()

  function handleAddRow() {
    switch (origin) {
      case "companies":
        dispatch(
          companyAdded({
            newCompany: {
              id: nanoid(),
              name: `Новая компания №${companies.length + 1}`,
              address: "",
              employees: [],
            },
          }),
        )
        break
      case "workers":
        if (employees) {
          dispatch(
            workerAdded({
              companyId,
              newWorker: {
                id: nanoid(),
                firstName: "",
                lastName: `Новый сотрудник ${employees.length + 1}`,
                position: "",
              },
            }),
          )
        }

        break
      default:
        throw new Error("Unknown type of origin:" + origin)
    }
  }

  function handleDeleteRow() {
    switch (origin) {
      case "companies":
        dispatch(
          companyDeleted({
            selectedCompanies,
          }),
        )
        if (setSelectedCompanies) setSelectedCompanies([])
        break
      case "workers":
        dispatch(
          workerDeleted({
            companyId,
            selectedWorkers,
          }),
        )
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
