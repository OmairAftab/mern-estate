import ListingModel from "../Models/listingModel.js"



export const createListing= async(req,res)=>{
    try{
        const listing=await ListingModel.create(req.body)
        return res.status(201).json(listing)
    }catch(err){
        return res.status(500).json(err)
    }
}