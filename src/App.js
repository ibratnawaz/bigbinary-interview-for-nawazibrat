import React, { useEffect, useState } from 'react'
import DataTable from './components/DataTable'
import Paginate from './components/Paginate'

import fetchData from './utils/FetchData'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [launches, setLaunches] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true)
      setLaunches(await fetchData())
      setLoading(false)
    }
    if (!launches) fetchLaunches()
  }, [launches])

  console.dir(launches)

  return (
    <div className='container mt-3'>
      <h1 className='text-center mb-3 font-play'>SpaceX Dashboard</h1>
      <hr className='mb-5' />
      <DataTable launches={launches} loading={loading} />
      <Paginate />
    </div>
  )
}

export default App
