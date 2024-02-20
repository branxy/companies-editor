import { type FunctionComponent } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  companyAdded,
  companyDeleted,
  workerAdded,
  workerDeleted,
} from "../features/companies/companiesSlice"
import { nanoid } from "@reduxjs/toolkit"

interface TableActionBtnsProps {
  origin: "companies" | "workers"
  selectedCompanies?: number[]
  setSelectedCompanies?: React.Dispatch<React.SetStateAction<number[]>>
  selectedWorkers?: number[]
  setSelectedWorkers?: React.Dispatch<React.SetStateAction<number[]>>
  companyId?: number
  isInfiniteScroll?: boolean
  setIsInfiniteScroll?: React.Dispatch<React.SetStateAction<boolean>>
}

const TableActionBtns: FunctionComponent<TableActionBtnsProps> = ({
  origin,
  selectedCompanies,
  setSelectedCompanies,
  selectedWorkers,
  setSelectedWorkers,
  companyId,
  isInfiniteScroll,
  setIsInfiniteScroll,
}) => {
  const companies = useAppSelector(state => state.companies)

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
        {
          const employees = companies.find(c => c.id === companyId)?.employees

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
      <button className="delete" onClick={handleDeleteRow}>
        <span className="material-symbols-outlined">delete</span>
      </button>
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
