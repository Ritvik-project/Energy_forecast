import React from 'react'
import MapPage from './pages/MapPage'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Forteen_days from './pages/Forteen_days'
import Dashboard from './pages/Dashboard'
import Compare from './pages/Compare'
import SolarGraphPage from './pages/SolarGraphPage'
import WindGraphPage from './pages/WindGraphPage'

function App() {
  return(
    <>
      <Router>
          <Routes>
            <Route path='/' element={<MapPage />} />
            {/* <Route path='/' element={<Dashboard1 />} /> */}
            {/* <Route path='/dashboard' element={<Dashboard1 />} /> */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/forteen_days' element={<Forteen_days />} />
            <Route path='/dashboard/forteen_days' element={<Forteen_days />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/solaroutput' element={<SolarGraphPage />} />
            <Route path='/windoutput' element ={<WindGraphPage />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
