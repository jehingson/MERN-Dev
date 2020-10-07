import React, { createContext, useState, useEffect } from "react";
import ProductosAPI from "api/ProductosAPI";
import UserAPI from "api/UserAPI";
import CategoryAPI from "api/CategoryAPI";

import axios from "axios";

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  

  useEffect(() => {
    const session = localStorage.getItem('Session', true)
    if(session){
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
      }
  
      refreshToken()
      setTimeout(() => {
        refreshToken()
      },10 * 60 * 1000 ) 
    }
  },[])

  const state = {
    token: [token, setToken],
    ProductosAPI: ProductosAPI(),
    userAPI: UserAPI(token),
    categoryAPI: CategoryAPI(token)
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}