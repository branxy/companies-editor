import { type FunctionComponent } from "react"

interface DeleteActionBtnProps {
  origin: "companies" | "workers"
  handleDeleteRow: () => void
  selectedCompanies?: number[]
  selectedWorkers?: number[]
}

const DeleteActionBtn: FunctionComponent<DeleteActionBtnProps> = ({
  origin,
  handleDeleteRow,
  selectedCompanies,
  selectedWorkers,
}) => {
  let isDisabled

  if (
    (origin === "companies" && selectedCompanies?.length === 0) ||
    (origin === "workers" && selectedWorkers?.length === 0)
  ) {
    isDisabled = true
  }

  return (
    <button className="delete" onClick={handleDeleteRow} disabled={isDisabled}>
      <span className="material-symbols-outlined">delete</span>
    </button>
  )
}

export default DeleteActionBtn
