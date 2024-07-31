import { useEffect, useState, useCallback, useRef } from "react"

import {
  type Company,
  type Companies,
} from "../features/companies/companiesInitialState"
import {
  type Worker,
  type Workers,
} from "../features/workers/workersInitialState"
import { companyAdded } from "../features/companies/companiesSlice"
import { useAppDispatch } from "./redux-hooks"

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

export function useInfiniteScroll(
  companiesLength: number,
  isInfiniteScroll: boolean,
) {
  const dispatch = useAppDispatch()

  const observer = useRef<IntersectionObserver | undefined>()
  const observerTarget = useCallback(
    (node: HTMLTableRowElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            dispatch(companyAdded(20))
          }
        },
        {
          rootMargin: "100px",
        },
      )
      if (node && isInfiniteScroll) observer.current.observe(node)
    },
    [dispatch, isInfiniteScroll],
  )

  return observerTarget
}
