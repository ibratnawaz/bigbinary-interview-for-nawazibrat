import React from 'react'
import DataTable from './components/DataTable'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div className='container mt-3'>
        <h1 className='text-center mb-3 font-play'>SpaceX Dashboard</h1>
        <hr className='mb-5' />
        <Route path='/' component={DataTable} />
      </div>
    </Router>
  )
}

export default App
