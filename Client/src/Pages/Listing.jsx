import React from 'react'
import { useParams } from 'react-router-dom'

const Listing = () => {
  const { listingId } = useParams()

  return (
    <main className='max-w-4xl mx-auto p-3'>
      <h1 className='text-3xl font-semibold my-7'>Listing</h1>
      <p className='text-slate-700'>Listing ID: {listingId}</p>
    </main>
  )
}

export default Listing
