import { useState, type FunctionComponent } from "react"

import { useAppSelector } from "../../app/redux-hooks"

import WorkersList from "../workers/WorkersList"
import TableActionBtns from "../../components/TableActionBtns"
import CompaniesTableContent from "./CompaniesTableContent"
import { useSelectCompanyTableRows } from "../../app/hooks"

const CompaniesList: FunctionComponent = () => {
  const companies = useAppSelector(state => state.companies)

  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)

  const [
    selectedCompaniesIds,
    setSelectedCompaniesIds,
    handleSelectCompany,
    handleSelectAllCompanies,
    lastSelectedCompany,
    isCheckedCheckbox,
  ] = useSelectCompanyTableRows(companies)

  return (
    <>
      <div className="table companies">
        <h2>Компании</h2>
        <TableActionBtns
          origin="companies"
          selectedCompanies={selectedCompaniesIds}
          setSelectedCompanies={setSelectedCompaniesIds}
          isInfiniteScroll={isInfiniteScroll}
          setIsInfiniteScroll={setIsInfiniteScroll}
        />
        <table>
          <colgroup>
            <col className="checkbox" />
            <col className="company" />
            <col className="employees" />
            <col className="address" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="select-all"
                  onChange={handleSelectAllCompanies}
                  checked={isCheckedCheckbox}
                />
              </th>
              <th>Название компании</th>
              <th>Кол-во сотрудников</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            <CompaniesTableContent
              companies={companies}
              selectedCompaniesIds={selectedCompaniesIds}
              handleSelectCompany={handleSelectCompany}
              isInfiniteScroll={isInfiniteScroll}
            />
          </tbody>
        </table>
      </div>
      {selectedCompaniesIds.length > 0 && (
        <WorkersList
          companyId={lastSelectedCompany}
          selectedCompaniesIds={selectedCompaniesIds}
        />
      )}
    </>
  )
}

export default CompaniesList
