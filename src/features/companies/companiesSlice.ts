import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"

import { companiesInitialState, type Company } from "./companiesInitialState"
import { type RootState } from "../../app/store"
import { addMoreCompanies } from "../../app/utils"

const companiesAdaptor = createEntityAdapter<Company>(),
  initialState = companiesAdaptor.getInitialState({}, companiesInitialState)

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: create => ({
    companyAdded: create.reducer((state, action: PayloadAction<number>) => {
      const newCompanies = addMoreCompanies(action.payload)

      companiesAdaptor.addMany(state, newCompanies)
    }),
    companyChanged: create.reducer(
      (
        state,
        action: PayloadAction<
          {
            companyId: Company["id"]
          } & (
            | {
                origin: "company/name"
                name: Company["name"]
              }
            | {
                origin: "company/address"
                address: Company["address"]
              }
          )
        >,
      ) => {
        const { origin, companyId } = action.payload

        const company = state.entities[companyId]
        if (company) {
          switch (origin) {
            case "company/name":
              company.name = action.payload.name
              break
            case "company/address":
              company.address = action.payload.address
              break
            default:
              throw new Error("Unknown type of origin:" + origin)
          }
        }
      },
    ),
    companyDeleted: create.reducer(
      (state, action: PayloadAction<Company["id"][]>) => {
        companiesAdaptor.removeMany(state, action.payload)
      },
    ),
  }),
  selectors: {
    selectAllCompanies: state => state,
  },
})
export const { companyAdded, companyChanged, companyDeleted } =
  companiesSlice.actions

export const { selectAll: selectAllCompanies, selectById: selectCompanyById } =
  companiesAdaptor.getSelectors((state: RootState) => state.companies)

export default companiesSlice.reducer
