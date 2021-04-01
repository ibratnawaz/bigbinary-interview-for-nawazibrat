import React from 'react'
import DataTable from './components/DataTable'
import Paginate from './components/Paginate'
import { BrowserRouter as Router } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div className='container mt-3'>
        <h1 className='text-center mb-3 font-play'>SpaceX Dashboard</h1>
        <hr className='mb-5' />
        <DataTable />
        <Paginate />
      </div>
    </Router>
  )
}

export default App
