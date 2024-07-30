import { type FunctionComponent } from "react"

import { type RootState } from "../../app/store"
import { useAppSelector, useSelectWorkerTableRows } from "../../app/hooks"

import { type Company } from "../companies/companiesInitialState"

import WorkersTableRow from "./WorkersTableRow"
import TableActionBtns from "../../components/TableActionBtns"
import { selectCompanyById } from "../companies/companiesSlice"
import { selectWorkersByCompanyId } from "./workersSlice"

interface WorkersListProps {
  companyId: RootState["companies"][0]["id"]
  selectedCompaniesIds: Company["id"][]
}

const WorkersList: FunctionComponent<WorkersListProps> = ({
  companyId,
  selectedCompaniesIds,
}) => {
  const company = useAppSelector(state => selectCompanyById(state, companyId))!
  const employees = useAppSelector(state =>
    selectWorkersByCompanyId(state, companyId),
  )

  const [
    selectedWorkersIds,
    setSelectedWorkersIds,
    handleSelectWorker,
    handleSelectAllWorkers,
  ] = useSelectWorkerTableRows(company, employees, selectedCompaniesIds)

  if (company && employees) {
    const isCheckedSelectAllCheckbox =
      employees.length === selectedWorkersIds.length && employees.length > 0

    return (
      <div className="table workers">
        <h2>{`Сотрудники: ${company.name}`}</h2>
        <TableActionBtns
          origin="workers"
          companyId={companyId}
          selectedWorkersIds={selectedWorkersIds}
          setSelectedWorkers={setSelectedWorkersIds}
        />
        <table>
          <colgroup>
            <col className="checkbox" />
            <col className="last-name" />
            <col className="first-name" />
            <col className="position" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="select-all"
                  checked={isCheckedSelectAllCheckbox}
                  onChange={handleSelectAllWorkers}
                />
              </th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Должность</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(worker => (
              <WorkersTableRow
                key={`${worker.id}-${worker.lastName}-${worker.firstName}-${worker.position}`}
                companyId={companyId!}
                workerId={worker.id}
                firstName={worker.firstName}
                lastName={worker.lastName}
                position={worker.position}
                selectedWorkersIds={selectedWorkersIds}
                handleSelectWorker={handleSelectWorker}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return <p>Эта компания не имеет сотрудников</p>
  }
}

export default WorkersList
