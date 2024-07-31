import { type FunctionComponent } from "react"
import type { Companies, Company } from "./companiesInitialState"

import { useAppSelector } from "../../app/redux-hooks"
import { selectAllWorkers } from "../workers/workersSlice"

import { useInfiniteScroll } from "../../app/hooks"

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
  const observerTarget = useInfiniteScroll(companies.length, isInfiniteScroll)

  return (
    <>
      {companies.map((company, i) => {
        const team = workers.filter(w => w.companyId === company.id)
        const employeesNumber = team?.length || 0

        // if the company is last on the list, an infinite scroll observer is added as ref
        return i === companies.length - 1 ? (
          <CompaniesTableRow
            ref={observerTarget}
            key={company.id + company.address}
            companyId={company.id}
            companyName={company.name}
            employeesNumber={employeesNumber}
            address={company.address}
            selectedCompanies={selectedCompaniesIds}
            handleSelectCompany={handleSelectCompany}
          />
        ) : (
          <CompaniesTableRow
            key={company.id + company.address}
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
