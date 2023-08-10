import React from "react"
import RoutesDom from "./Routes"
import { VaccineIdProvider } from "./hooks/useVaccine"

const App = () => (
  <VaccineIdProvider>
    <RoutesDom />
  </VaccineIdProvider>
)

export default App
