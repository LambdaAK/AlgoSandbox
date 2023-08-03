import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home/Home'
import "./App.css"
import Nav from '../components/nav/Nav'
import Algos from '../pages/Algos/Algos'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/algos" element={<Algos/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
