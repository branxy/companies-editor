import { type FunctionComponent, useCallback, useRef } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectAllWorkers } from "../workers/workersSlice"
import { companyAdded } from "./companiesSlice"

import { addMoreCompanies } from "../../app/utils"
import type { Companies, Company } from "./companiesInitialState"

import CompaniesTableRow from "./CompaniesTableRow"

interface CompaniesTableContentProps {
  companies: Companies
  selectedCompaniesIds: Company["id"][]
  handleSelectCompany: (companyId: Company["id"]) => void
  isInfiniteScroll: boolean
}

const CompaniesTableContent: FunctionComponent<CompaniesTableContentProps> = ({
  companies,
  selectedCompaniesIds,
  handleSelectCompany,
  isInfiniteScroll,
}) => {
  const workers = useAppSelector(selectAllWorkers)
  const dispatch = useAppDispatch()

  const observer = useRef<IntersectionObserver | undefined>()
  const observerTarget = useCallback(
    (node: HTMLTableRowElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            const twentyMoreCompanies = addMoreCompanies(companies.length, 20)
            dispatch(companyAdded(twentyMoreCompanies))
          }
        },
        {
          rootMargin: "100px",
        },
      )
      if (node && isInfiniteScroll) observer.current.observe(node)
    },
    [companies.length, dispatch, isInfiniteScroll],
  )

  return (
    <>
      {companies.map((company, i) => {
        const team = workers.filter(w => w.companyId === company.id)
        const employeesNumber = team?.length || 0

        // if the company is last on the list, an infinite scroll observer is added as ref
        return i === companies.length - 1 ? (
          <CompaniesTableRow
            ref={observerTarget}
            key={company.id}
            companyId={company.id}
            companyName={company.name}
            employeesNumber={employeesNumber}
            address={company.address}
            selectedCompanies={selectedCompaniesIds}
            handleSelectCompany={handleSelectCompany}
          />
        ) : (
          <CompaniesTableRow
            key={company.id}
            companyId={company.id}
            companyName={company.name}
            employeesNumber={employeesNumber}
            address={company.address}
            selectedCompanies={selectedCompaniesIds}
            handleSelectCompany={handleSelectCompany}
          />
        )
      })}
    </>
  )
}

export default CompaniesTableContent
