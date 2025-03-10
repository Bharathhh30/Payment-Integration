import React from 'react'
import Register from './components/Register'
import GetDetails from './components/GetDetails'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <div>

      <Routes>
        <Route path='/' element={<Register />} />
          <Route path='/getDetails' element={<GetDetails />} />
      </Routes>
      </div>
    </div>
  )
}

export default App