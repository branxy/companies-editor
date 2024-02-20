import { forwardRef } from "react"
import EditableTableCell from "../../components/EditableTableCell"

interface CompaniesTableRowProps {
  companyName: string
  companyId: number
  employeesNumber: number
  address: string
  selectedCompanies: number[] | undefined
  handleSelectCompany: (companyId: number) => void
}
const CompaniesTableRow = forwardRef(
  (
    props: CompaniesTableRowProps,
    ref: React.LegacyRef<HTMLTableRowElement>,
  ) => {
    const {
      companyName,
      companyId,
      employeesNumber,
      address,
      selectedCompanies,
      handleSelectCompany,
    } = props
    const isSelectedRow = selectedCompanies?.find(id => id === companyId)
    return (
      <tr className={isSelectedRow ? "selected" : ""} ref={ref}>
        <td>
          <input
            type="checkbox"
            name="select"
            onChange={() => handleSelectCompany(companyId)}
            checked={isSelectedRow ? true : false}
          />
        </td>
        <EditableTableCell
          origin="company/name"
          companyId={companyId}
          cellValue={companyName}
        />
        <td>{employeesNumber}</td>
        <EditableTableCell
          origin="company/address"
          companyId={companyId}
          cellValue={address}
        />
      </tr>
    )
  },
)

export default CompaniesTableRow
