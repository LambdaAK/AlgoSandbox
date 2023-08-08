import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home/Home'
import "./App.css"
import Nav from '../components/nav/Nav'
import Algos from '../pages/Algos/Algos'
import SelectionSort from '../pages/SelectionSort/SelectionSort'
import InsertionSort from '../pages/InsertionSort/InsertionSort'
import LinearSearch from '../pages/LinearSearch/LinearSearch'
import LeftBisect from '../pages/LeftBisect/LeftBisect'
import MergeSortIterative from '../pages/MergeSortIterative/MergeSortIterative'
import MergeSort from '../pages/MergeSort/MergeSort'
import RightBisect from '../pages/RightBisect/RightBisect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/algos" element={<Algos/>} />
        <Route path="/selectionsort" element={<SelectionSort/>} />
        <Route path = "/insertionsort" element = {<InsertionSort/>}/>
        <Route path = "/mergesort" element = {<MergeSort/>}/>
        <Route path = "/mergesortiterative" element = {<MergeSortIterative/>}/>
        <Route path = "/linearsearch" element = {<LinearSearch/>}/>
        <Route path = "/leftbisect" element = {<LeftBisect/>}/>
        <Route path = "/rightbisect" element = {<RightBisect/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
