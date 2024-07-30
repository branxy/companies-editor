// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"
import { createSelector } from "@reduxjs/toolkit"

import {
  type Company,
  type Companies,
} from "../features/companies/companiesInitialState"
import {
  type Worker,
  type Workers,
} from "../features/workers/workersInitialState"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const createAppSelector = createSelector.withTypes<RootState>()

export function useSelectCompanyTableRows(
  companies: Companies,
): [
  number[],
  React.Dispatch<React.SetStateAction<number[]>>,
  (companyId: Company["id"]) => void,
  () => void,
  number,
  boolean,
] {
  const [selectedCompaniesIds, setSelectedCompaniesIds] = useState<number[]>([])

  const lastSelectedCompany =
    selectedCompaniesIds &&
    selectedCompaniesIds[selectedCompaniesIds?.length - 1]

  const isCheckedCheckbox =
    selectedCompaniesIds.length === companies.length &&
    selectedCompaniesIds.length > 0

  function handleSelectCompany(companyId: Company["id"]) {
    if (!selectedCompaniesIds) {
      setSelectedCompaniesIds([companyId])
    } else if (!selectedCompaniesIds.includes(companyId)) {
      setSelectedCompaniesIds([...selectedCompaniesIds, companyId])
    } else {
      setSelectedCompaniesIds(
        selectedCompaniesIds.filter(id => id !== companyId),
      )
    }
  }

  function handleSelectAllCompanies() {
    if (selectedCompaniesIds.length < companies.length) {
      const allCompaniesIds = companies.map(c => c.id)
      setSelectedCompaniesIds(allCompaniesIds)
    } else setSelectedCompaniesIds([])
  }

  return [
    selectedCompaniesIds,
    setSelectedCompaniesIds,
    handleSelectCompany,
    handleSelectAllCompanies,
    lastSelectedCompany,
    isCheckedCheckbox,
  ]
}

export function useSelectWorkerTableRows(
  company: Company,
  workers: Workers,
  selectedCompaniesIds: Company["id"][],
): [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
  (workerId: Worker["id"]) => void,
  () => void,
] {
  const [selectedWorkersIds, setSelectedWorkersIds] = useState<Worker["id"][]>(
    [],
  )

  useEffect(() => {
    setSelectedWorkersIds([])
  }, [selectedCompaniesIds])

  function handleSelectWorker(workerId: Worker["id"]) {
    if (!selectedWorkersIds) {
      setSelectedWorkersIds([workerId])
    } else if (!selectedWorkersIds.includes(workerId)) {
      setSelectedWorkersIds([...selectedWorkersIds, workerId])
    } else {
      setSelectedWorkersIds(selectedWorkersIds.filter(id => id !== workerId))
    }
  }

  function handleSelectAllWorkers() {
    if (company && workers) {
      if (selectedWorkersIds.length < workers.length) {
        const allWorkersIds = workers?.map(e => e.id)
        setSelectedWorkersIds(allWorkersIds)
      } else setSelectedWorkersIds([])
    }
  }

  return [
    selectedWorkersIds,
    setSelectedWorkersIds,
    handleSelectWorker,
    handleSelectAllWorkers,
  ]
}
