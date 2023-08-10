import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Edit from "./pages/Edit"

const RoutesDom = () => {
  return (
    <Router>
      <Routes>
        <Route element={<SignUp />} path="/" exact />
        <Route element={<Home />} path="/home" />
        <Route element={<Edit />} path="/edit" />
      </Routes>
    </Router>
  )
}

export default RoutesDom
