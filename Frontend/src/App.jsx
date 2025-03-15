import React from 'react'
import Register from './components/Register'
import GetDetails from './components/GetDetails'
import { Route, Routes } from 'react-router-dom'
import ComponentTesting from './components/ComponentTesting'

function App() {
  return (
    <div>
      <div>

      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/getDetails' element={<GetDetails />} />
        <Route path = '/componentTesting' element={<ComponentTesting />} />
      </Routes>
      </div>
    </div>
  )
}

export default App