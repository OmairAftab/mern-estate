import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import ListingCard from '../Components/ListingCard.jsx'



const Home = () => {

  SwiperCore.use([Navigation])

  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  console.log(offerListings)
  console.log(saleListings)
  console.log(rentListings)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

        const [offerRes, rentRes, saleRes] = await Promise.all([
          axios.get(`${backendUrl}/api/listing/get?offer=true&limit=4`),
          axios.get(`${backendUrl}/api/listing/get?type=rent&limit=4`),
          axios.get(`${backendUrl}/api/listing/get?type=sale&limit=4`),
        ])

        setOfferListings(offerRes.data)
        setRentListings(rentRes.data)
        setSaleListings(saleRes.data)
      } catch (error) {
        console.log('Failed to load home listings:', error)
      }
    }

    fetchListings()
  }, [])






  return (
    <div>
      {/* top */}

    <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
      
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span> 
        <br />
        place with ease
      </h1>

      <div className='text-gray-600 mt-4 text-md'>
        PakEstate is the best place to find your next perfect place to live.
        <br />
        We have a wide range of properties for you to choose for.
      </div>


      <Link to={'/search'} className='text-xs sm:text-sm text-blue-500 font-bold hover:underline '>
        Lets get started
      </Link>

    </div>











      {/* swiper */}

    <Swiper navigation>

    {
    offerListings &&  offerListings.length > 0 && offerListings.map((listing) => (
        <SwiperSlide >

          <div key={listing._id} className='h-[500px] relative' style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}}>

          </div>

        </SwiperSlide>
      )
    )}

    </Swiper>





      {/* listing result for offer, sale and rent */}


      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className='flex flex-col gap-6'>

            <div>
            <h2 className='text-2xl font-semibold'>Recent Offers</h2>
              <Link className='text-sm text-blue-700 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div> 


            <div className='flex flex-wrap gap-4'>
              {offerListings && offerListings.map((listing) => (
               <ListingCard listing={listing} key={listing._id} />
            ))}
            </div>
                   
          
          </div>
        )}






        {rentListings && rentListings.length > 0 && (
          <div className='flex flex-col gap-6'>

            <div>
            <h2 className='text-2xl font-semibold'>Recent places for rent</h2>
              <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=rent'}>
                Show more places for sale
              </Link>
            </div> 


            <div className='flex flex-wrap gap-4'>
              {rentListings && rentListings.map((listing) => (
               <ListingCard listing={listing} key={listing._id} />
            ))}
            </div>
                   
          
          </div>
        )}






{/* sales listing now */}

        {saleListings && saleListings.length > 0 && (
          <div className='flex flex-col gap-6'>

            <div>
            <h2 className='text-2xl font-semibold'>Recent Places for sale</h2>
              <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div> 


            <div className='flex flex-wrap gap-4'>
              {saleListings && saleListings.map((listing) => (
               <ListingCard listing={listing} key={listing._id} />
            ))}
            </div>
                   
          
          </div>
        )}
      </div>


    </div>
  )
}

export default Home