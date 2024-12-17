import React from "react"
import styles from "./components/styles.module.css"
import {Routes, Route} from "react-router-dom"
import Home from "./components/Homepage"
import Wordto from "./components/Wordto"
import Pptxto from "./components/Pptxto"

function App() {

  return (
    <Routes>
      <Route exact path="" element={<Home/>} />
      <Route  path="/word" element={<Wordto/>} />
      <Route  path="/pptx" element={<Pptxto/>} />
    </Routes>
  )
}

export default App
