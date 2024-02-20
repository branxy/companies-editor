import { type FunctionComponent } from "react"
import EditableTableCell from "../../components/EditableTableCell"

interface WorkersTableRowProps {
  companyId: number | undefined
  workerId: number
  firstName: string
  lastName: string
  position: string
  selectedWorkers: number[] | undefined
  handleSelectWorker: (workerId: number) => void
}

const WorkersTableRow: FunctionComponent<WorkersTableRowProps> = ({
  companyId,
  workerId,
  firstName,
  lastName,
  position,
  selectedWorkers,
  handleSelectWorker,
}) => {
  const isSelectedRow = selectedWorkers?.find(id => id === workerId)
  return (
    <tr className={isSelectedRow ? "worker-selected" : ""}>
      <td>
        <input
          type="checkbox"
          name="select"
          checked={isSelectedRow ? true : false}
          onChange={() => handleSelectWorker(workerId)}
        />
      </td>
      <EditableTableCell
        origin="worker/lastName"
        workerId={workerId}
        companyId={companyId}
        cellValue={lastName}
      />
      <EditableTableCell
        origin="worker/firstName"
        workerId={workerId}
        companyId={companyId}
        cellValue={firstName}
      />
      <EditableTableCell
        origin="worker/position"
        workerId={workerId}
        companyId={companyId}
        cellValue={position}
      />
    </tr>
  )
}

export default WorkersTableRow
