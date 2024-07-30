// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

import {
  type Company,
  type Companies,
} from "../features/companies/companiesInitialState"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export function useSelectRows(
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
