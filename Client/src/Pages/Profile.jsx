import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { supabase } from "../supabase.js";


const Profile = () => {

  const storedUser = localStorage.getItem('currentUser')
  const currentUser = storedUser ? JSON.parse(storedUser) : null


  const [file,setFile] =useState(undefined)
  console.log(file);


  const [fileUploadError, setFileUploadError] = useState('');
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);


  const fileRef=useRef(null);


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])


  

 //THIS FUNCTION WE HAVE USED IN ABOVE USEEFFECT WHICH WILL RUN WHEN FILE IS UPLOADED
  const handleFileUpload = async (file) => {

  setFileUploadError('');
  setUpdateSuccess(false);


  try {
    const fileName = new Date().getTime() + "_" + file.name;       //file k name se pehle time add kr diya k unique rhe
    const filePath = `avatars/${fileName}`;                        //ko meri bucket hai us main avatar folder bne ga and us k andar save hon ge

    const { data, error } = await supabase.storage
      .from("mern_state_bucket") // ✅ updated bucket name
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("mern_state_bucket") // ✅ updated here also
      .getPublicUrl(filePath);

    setFormData((prev) => ({ ...prev, avatar: urlData.publicUrl }));
  } catch (error) {
    setFileUploadError(error?.message || 'File upload failed');
    console.error('Supabase upload error:', error);
  }
};




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-5 max-w-lg mx-auto'>
                                                                  {/* AGAR ZYADA FILES SELECT KRE TO FIRST WALI LO IS LIYE [0] */}
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/> 

{/* USEREF USE KR K IMAGE UPLOAD WALI FUNCTIONALITY PROFILE PIC PE ADD KR DI K JB PROFILE PIC PE CLICK KREN TO FILE SELECT HO SKE */}
{/* src={formData.avatar || currentUser?.avatar} in below line taa k agar nyi pic ho to wo uplload hojae */}
        <img onClick={()=>fileRef.current.click()}  src={formData.avatar || currentUser?.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' alt="" />

        {fileUploadError && <p className='text-sm self-center text-red-700'>{fileUploadError}</p>}

        <input type="text" placeholder='username' id='username' className='bg-white p-3  rounded-lg'  />

        <input type="email" placeholder='email' id='email' className='bg-white p-3  rounded-lg'  />

        <input type="password" placeholder='password' id='password' className='bg-white p-3  rounded-lg'  />

        <button className=' bg-slate-700 hover:bg-slate-500 text-white rounded-xl p-3' > UPDATE </button>

      </form>

      <div className='flex justify-between'>
        <span className='text-red-700 mt-3'> Delete Account</span>
        <span className='text-red-700 mt-3'> Sign Out</span>
      </div>
    </div>
  )
}

export default Profile