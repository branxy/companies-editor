import { useState, type FunctionComponent, useEffect } from "react"
import { type RootState } from "../../app/store"

import WorkersTableRow from "./WorkersTableRow"
import { useAppSelector } from "../../app/hooks"
import TableActionBtns from "../../components/TableActionBtns"

interface WorkersListProps {
  companyId: RootState["companies"][0]["id"] | undefined
  selectedCompanies: number[]
}

const WorkersList: FunctionComponent<WorkersListProps> = ({
  companyId,
  selectedCompanies,
}) => {
  const company = useAppSelector(state =>
    state.companies.find(company => company.id === companyId),
  )
  const employees = useAppSelector(
    state =>
      state.workers.find(team => team.companyId === company?.id)?.employees,
  )

  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([])

  useEffect(() => {
    setSelectedWorkers([])
  }, [selectedCompanies])

  function handleSelectWorker(workerId: number) {
    if (!selectedWorkers) {
      setSelectedWorkers([workerId])
    } else if (!selectedWorkers.includes(workerId)) {
      setSelectedWorkers([...selectedWorkers, workerId])
    } else {
      setSelectedWorkers(selectedWorkers.filter(id => id !== workerId))
    }
  }

  function handleSelectAll() {
    if (company && employees) {
      if (selectedWorkers.length < employees.length) {
        const allWorkersIds = employees?.map(e => e.id)
        setSelectedWorkers(allWorkersIds)
      } else setSelectedWorkers([])
    }
  }

  if (company && employees) {
    const isCheckedSelectAllCheckbox =
      employees.length === selectedWorkers.length && employees.length > 0

    return (
      <div className="table workers">
        <h2>{`Сотрудники: ${company.name}`}</h2>
        <TableActionBtns
          origin="workers"
          companyId={companyId}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
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
                  onChange={handleSelectAll}
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
                companyId={companyId}
                workerId={worker.id}
                firstName={worker.firstName}
                lastName={worker.lastName}
                position={worker.position}
                selectedWorkers={selectedWorkers}
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
