import { useState, type FunctionComponent, useRef, useCallback } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"

import CompaniesTableRow from "./CompaniesTableRow"
import WorkersList from "../workers/WorkersList"
import TableActionBtns from "../../components/TableActionBtns"
import { companyAdded } from "./companiesSlice"
import { nanoid } from "@reduxjs/toolkit"

const CompaniesList: FunctionComponent = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)

  const companies = useAppSelector(state => state.companies)
  const dispatch = useAppDispatch()

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

  const lastSelectedCompany =
    selectedCompanies && selectedCompanies[selectedCompanies?.length - 1]

  const isCheckedCheckbox =
    selectedCompanies.length === companies.length &&
    selectedCompanies.length > 0

  function handleSelectCompany(companyId: number) {
    if (!selectedCompanies) {
      setSelectedCompanies([companyId])
    } else if (!selectedCompanies.includes(companyId)) {
      setSelectedCompanies([...selectedCompanies, companyId])
    } else {
      setSelectedCompanies(selectedCompanies.filter(id => id !== companyId))
    }
  }

  function handleSelectAll() {
    if (selectedCompanies.length < companies.length) {
      const allCompaniesIds = companies.map(c => c.id)
      setSelectedCompanies(allCompaniesIds)
    } else setSelectedCompanies([])
  }

  return (
    <>
      <div className="table companies">
        <h2>Компании</h2>
        <TableActionBtns
          origin="companies"
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
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
                  onChange={handleSelectAll}
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
              if (i === companies.length - 1) {
                const employeesNumber = company.employees.length || 0
                return (
                  <CompaniesTableRow
                    ref={observerTarget}
                    key={company.id}
                    companyId={company.id}
                    companyName={company.name}
                    employeesNumber={employeesNumber}
                    address={company.address}
                    selectedCompanies={selectedCompanies}
                    handleSelectCompany={handleSelectCompany}
                  />
                )
              } else {
                return (
                  <CompaniesTableRow
                    key={company.id}
                    companyId={company.id}
                    companyName={company.name}
                    employeesNumber={company.employees.length}
                    address={company.address}
                    selectedCompanies={selectedCompanies}
                    handleSelectCompany={handleSelectCompany}
                  />
                )
              }
            })}
          </tbody>
        </table>
      </div>
      {selectedCompanies.length ? (
        <WorkersList
          companyId={lastSelectedCompany}
          selectedCompanies={selectedCompanies}
        />
      ) : (
        ""
      )}
    </>
  )
}

export default CompaniesList
