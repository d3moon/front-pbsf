import React, { createContext, useContext, useState } from "react"

const VaccineIdContext = createContext()

export const useVaccineId = () => {
  return useContext(VaccineIdContext)
}

export const VaccineIdProvider = ({ children }) => {
  const [vaccineId, setVaccineId] = useState(null)

  return (
    <VaccineIdContext.Provider value={{ vaccineId, setVaccineId }}>
      {children}
    </VaccineIdContext.Provider>
  )
}
