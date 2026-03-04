import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-3xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>

        <form className='flex flex-col sm:flex-row'>
            <div className='flex flex-col gap-4 flex-1'>

                <input type="text" placeholder='Name' id='name' className='bg-white p-3 rounded-lg' required />
            
                <textarea type="text" placeholder='Description' id='description'  className='bg-white p-3 rounded-lg' required />

                <input type="text" placeholder='Address' id='address'  className='bg-white p-3 rounded-lg' required />


            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                     <input type="checkbox" id='sale' className='w-5'/>
                     <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                     <input type="checkbox" id='rent' className='w-5'/>
                     <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                     <input type="checkbox" id='parking' className='w-5'/>
                     <span>Parking Spot</span>
                </div>
                <div className='flex gap-2'>
                     <input type="checkbox" id='furnished' className='w-5'/>
                     <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                     <input type="checkbox" id='offer' className='w-5'/>
                     <span>Offer</span>
                </div>
            </div>




            <div className="flex flex-wrap gap-6">
  <div className="flex gap-2 items-center">
    <input
      type="number"
      id="bedrooms"
      min="1"
      required
      className="p-2 w-20 border bg-white border-gray-300 rounded-lg"
    />
    <p>Beds</p>
  </div>

  <div className="flex gap-2 items-center">
    <input
      type="number"
      id="bathrooms"
      min="1"
      required
      className="p-2 w-20 border bg-white border-gray-300 rounded-lg"
    />
    <p>Baths</p>
  </div>

  <div className="flex gap-2 items-center">
    <input
      type="number"
      id="regularPrice"
      min="1"
      required
      className="p-2 w-32 border bg-white border-gray-300 rounded-lg"
    />
    <p>Regular Price ($ / month)</p>
  </div>

  <div className="flex gap-2 items-center">
    <input
      type="number"
      id="discountPrice"
      min="1"
      required
      className="p-2 w-32 border bg-white border-gray-300 rounded-lg"
    />
    <p>Discount Price ($ / month)</p>
  </div>
</div>




            </div>  {/* //end of left div for big screens*/}


            

            <div className='flex flex-col ml-6 flex-1 gap-4'>  {/* start of right div for small screens  */}
                <p className='font-semibold pt-3'>Images: 
                    <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6)</span>
                </p>

                <div className='flex gap-3'>
                    <input type="file" id="images" accept='images/*' multiple className='p-3 bg-white rounded-lg'/>
                    <button className='p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-100 cursor-pointer'>UPLOAD</button>
                </div>

            <button className='p-3 bg-slate-700 text-white cursor-pointer rounded-lg hover:bg-slate-500 disabled:opacity-80'> CREATE LISTING </button>

            </div>

        </form>
    </main>
  )
}

export default CreateListing