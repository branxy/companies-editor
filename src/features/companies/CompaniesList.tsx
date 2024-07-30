import { useCallback, useRef, useState, type FunctionComponent } from "react"

import { useAppDispatch, useAppSelector, useSelectRows } from "../../app/hooks"
import { nanoid } from "@reduxjs/toolkit"
import { companyAdded } from "./companiesSlice"

import WorkersList from "../workers/WorkersList"
import TableActionBtns from "../../components/TableActionBtns"
import CompaniesTableRow from "./CompaniesTableRow"

const CompaniesList: FunctionComponent = () => {
  const companies = useAppSelector(state => state.companies)
  const workers = useAppSelector(state => state.workers)
  const dispatch = useAppDispatch()
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)

  const [
    selectedCompaniesIds,
    setSelectedCompaniesIds,
    handleSelectCompany,
    handleSelectAllCompanies,
    lastSelectedCompany,
    isCheckedCheckbox,
  ] = useSelectRows(companies)

  const observer = useRef<IntersectionObserver | undefined>()
  const observerTarget = useCallback(
    (node: HTMLTableRowElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            let twentyMoreCompanies = []
            let nextId = companies.length + 1

            for (let i = 0; i < 20; i++) {
              nextId++
              const newCompany = {
                id: nanoid(),
                name: `Новая компания №${nextId - 1}`,
                address: "",
                employees: [],
              }

              twentyMoreCompanies.push(newCompany)
            }
            dispatch(companyAdded({ twentyMoreCompanies }))
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
            {companies.map((company, i) => {
              const team = workers.find(e => e.companyId === company.id)
              const employeesNumber = team?.employees.length || 0

              // if the company is last on the list, an infinite scroll observer is added as ref
              if (i === companies.length - 1) {
                return (
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
                )
              } else {
                return (
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
              }
            })}
          </tbody>
        </table>
      </div>
      {selectedCompaniesIds.length ? (
        <WorkersList
          companyId={lastSelectedCompany}
          selectedCompanies={selectedCompaniesIds}
        />
      ) : (
        ""
      )}
    </>
  )
}

export default CompaniesList
