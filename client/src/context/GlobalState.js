import React, { createContext, useState } from "react";
import ProductosAPI from "api/ProductosAPI";


export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)


  const state = {
    token: [token, setToken],
    ProductosAPI: ProductosAPI()
  }


  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}