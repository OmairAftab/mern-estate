import ListingModel from "../Models/listingModel.js"



export const createListing= async(req,res)=>{
    try{
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const listingPayload = {
            ...req.body,
            // Always bind listing ownership to the authenticated user.
            userRef: req.user.id,
        }

        const listing=await ListingModel.create(listingPayload)
        return res.status(201).json(listing)
    }catch(err){
        const statusCode = err.name === 'ValidationError' ? 400 : 500
        return res.status(statusCode).json({ success: false, message: err.message || 'Failed to create listing' })
    }
}