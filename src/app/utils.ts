import { type Company } from "../features/companies/companiesInitialState"

let nextId = 10

export function addMoreCompanies(quantity: number = 20) {
  const moreCompanies = []

  for (let i = 0; i < quantity; i++) {
    const newCompany: Company = {
      id: ++nextId,
      name: `Новая компания № ${nextId}`,
      address: "",
    }

    moreCompanies.push(newCompany)
  }

  return moreCompanies
}
