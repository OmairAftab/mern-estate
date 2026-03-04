import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase.js';

const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGES = 6;
const STORAGE_BUCKET = 'mern_state_bucket';

const CreateListing = () => {

    const[files,setFiles]=useState([])

    console.log(files)

    const [formData, setFormData] = useState({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      type: "rent", 
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 50, 
      discountPrice: 0,
      offer: false,
      parking: false,
      furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

    









  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= MAX_IMAGES) {
      const invalidFile = files.find(
        (file) => !file.type.startsWith('image/') || file.size > MAX_IMAGE_SIZE_BYTES
      );

      if (invalidFile) {
        setImageUploadError('Please upload valid images up to 2 MB each');
        return;
      }

      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError(err?.message || "Image upload failed. Please try again.");
          setUploading(false);
        });
    } else if (files.length === 0) {
        setImageUploadError("Please select an image to upload");
    } else {
      setImageUploadError(`You can only upload ${MAX_IMAGES} images per listing`);
      setUploading(false);
    }
  };









  


    const storeImage = async (file) => {
    try {
      const fileName = new Date().getTime() + "_" + file.name;
      const filePath = `listings/${fileName}`;

      // Upload to Supabase
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)                    //top pe define kiya hai : const STORAGE_BUCKET = 'mern_state_bucket';
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        throw new Error(error.message || 'Upload failed');
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to generate image URL');
      }

      return urlData.publicUrl;
    } catch (error) {
      throw new Error(error?.message || 'Image upload failed');
    }
  };





  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };






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
                    <input onChange={(e)=>setFiles(Array.from(e.target.files || []))}  type="file" id="images"  accept="image/*"  multiple className='p-3 bg-white rounded-lg'/>
                    <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-100 cursor-pointer disabled:opacity-70'>{uploading ? 'UPLOADING...' : 'UPLOAD'}</button>
                </div>
            
{/* JO ERROR AAYE GA IDHAR DIKHANA MEAN AGAR PICTURES 6 SE ZYADA HAIN */}
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            

            {/* Display uploaded images */}
           {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}




            <button className='p-3 bg-slate-700 text-white cursor-pointer rounded-lg hover:bg-slate-500 disabled:opacity-80'> CREATE LISTING </button>

            </div>

        </form>
    </main>
  )
}

export default CreateListing