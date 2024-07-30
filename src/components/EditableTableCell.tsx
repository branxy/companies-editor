import { useState, type FunctionComponent, useRef } from "react"
import { useAppDispatch } from "../app/hooks"
import { companyChanged } from "../features/companies/companiesSlice"
import { workerChanged } from "../features/workers/workersSlice"

import { type Worker } from "../features/workers/workersInitialState"
import { type Company } from "../features/companies/companiesInitialState"

export interface EditableTableCellProps {
  origin:
    | "company/name"
    | "company/address"
    | "worker/lastName"
    | "worker/firstName"
    | "worker/position"
  companyId?: Company["id"]
  workerId?: Worker["id"]
  cellValue: string
}

const EditableTableCell: FunctionComponent<EditableTableCellProps> = ({
  origin,
  companyId,
  workerId,
  cellValue,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [inputValue, setInputValue] = useState(cellValue)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()

  function handleInputBlur(origin: string, value: string) {
    setIsEditing(false)
    setIsHovered(false)

    switch (origin) {
      case "company/name":
        dispatch(
          companyChanged({
            origin,
            companyId,
            name: value,
          }),
        )
        break
      case "company/address":
        dispatch(
          companyChanged({
            origin,
            companyId,
            address: value,
          }),
        )
        break
      case "worker/lastName":
        dispatch(
          workerChanged({
            origin,
            companyId: companyId!,
            workerId: workerId!,
            lastName: value,
          }),
        )
        break
      case "worker/firstName":
        dispatch(
          workerChanged({
            origin,
            companyId: companyId!,
            workerId: workerId!,
            firstName: value,
          }),
        )
        break
      case "worker/position":
        dispatch(
          workerChanged({
            origin,
            companyId: companyId!,
            workerId: workerId!,
            position: value,
          }),
        )
        break
      default: {
        throw new Error("Unknown type of origin:" + origin)
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.length) {
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  if (isEditing) {
    return (
      <td className="editable">
        <input
          ref={inputRef}
          autoFocus={isEditing}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={() => handleInputBlur(origin, inputValue)}
          onKeyDown={handleKeyDown}
        />
      </td>
    )
  } else {
    return (
      <td
        className="editable"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{inputValue}</span>
        {isHovered && (
          <button onClick={() => setIsEditing(true)}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        )}
      </td>
    )
  }
}

export default EditableTableCell
