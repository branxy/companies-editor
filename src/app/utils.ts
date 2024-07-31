import { type Company } from "../features/companies/companiesInitialState"

export function addMoreCompanies(
  companiesLength: number,
  quantity: number = 20,
) {
  const moreCompanies = []
  let nextCompanyNumber = companiesLength + 1

  for (let i = 0; i < quantity; i++) {
    nextCompanyNumber++
    const newCompany: Company = {
      id: nextCompanyNumber,
      name: `Новая компания №${nextCompanyNumber - 1}`,
      address: "",
    }

    moreCompanies.push(newCompany)
  }

  return moreCompanies
}
