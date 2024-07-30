import EditableTableCell from "../../components/EditableTableCell"

import { type FunctionComponent } from "react"
import { type Company } from "../companies/companiesInitialState"
import { type Worker } from "./workersInitialState"

interface WorkersTableRowProps {
  companyId: Company["id"]
  workerId: Worker["id"]
  firstName: Worker["firstName"]
  lastName: Worker["lastName"]
  position: Worker["position"]
  selectedWorkersIds: Worker["id"][] | undefined
  handleSelectWorker: (workerId: Worker["id"]) => void
}

const WorkersTableRow: FunctionComponent<WorkersTableRowProps> = ({
  companyId,
  workerId,
  firstName,
  lastName,
  position,
  selectedWorkersIds,
  handleSelectWorker,
}) => {
  const isSelectedRow = selectedWorkersIds?.find(id => id === workerId)
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
