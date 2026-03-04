import bcrypt from 'bcrypt'
import userModel from '../Models/userModel.js'


export const updateUserController = async (req,res)=>{
// parameter main b id deni hai jo route bnaya hai beshak us main ja k dekh lo
    if(req.user.id!==req.params.id) return res.status(401).json("Unaunthentiacted")
    
        try{
            const updatePayload = {
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
            }

            if(req.body.password){
                updatePayload.password = await bcrypt.hash(req.body.password,5)
            }

            const updateduser=await userModel.findByIdAndUpdate(req.params.id, {
                $set: updatePayload                                    //jo jo cheezen update hui hon gi un ko upadte kre ga
            },{new:true})

            if (!updateduser) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }

            const { password, ...rest } = updateduser._doc
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: rest,
            })
        }

       

        catch(err){
            return res.status(500).json({ success: false, message: err.message || 'Internal server error' })
        }
    
    }