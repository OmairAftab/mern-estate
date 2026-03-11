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





export const deleteListing= async (req,res)=>{
    const listing= await ListingModel.findById(req.params.id);

    if(!listing){
        return res.status(404).json("Listing doesnt exist")
    }


//check if user is owner of listing mean us ki apni hee listing hai na
    if(req.user.id !==listing.userRef){
        return res.status(400).json("You can delete your own listing")
    }



    try{
        await ListingModel.findByIdAndDelete(req.params.id)
        return res.status(200).json("Listing deleted")
    }
    catch(err){

    }
}