const {Validator} = require('node-input-validator')
const User = require('../Models/user')

module.exports={
    update_user_details : async function(req , resp  , next){
        try {
            const v = new Validator(req.body  ,{
                user_id :'required',
            })
            const matched  = await v.check();
            if(!matched){
                return resp.status(200).send({
                    status :'val_err',
                    message: "Validation error", 
                    val_msg: v.errors 
                })
            }

            let doc = {};
            if(req.body.bio){
                doc.bio = req.body.bio
            }

            const user_data  = await User.findByPk(req.body.user_id);
            if(!user_data){
                return resp.status(200).send({
                    status :'error',
                    message :'User not found.'
                })
            }
            //it can be used for bulk update and as well as single update
            const [affectedRows] = await User.update(doc, {
                where: {
                  id: req.body.user_id
                }
            });
        
            if (affectedRows === 0) {
                return resp.status(400).send({
                    status: 'error',
                    message: 'No changes made to the user data.'
                });
            }
        
            return resp.status(200).send({
                status: 'success',
                message: 'User data updated successfully.',
                data : affectedRows
            });
            
        } catch (e) {
            return resp.status(200).send({
                status :'error',
                message : e?.message ?? 'something went wrong.'
            })
        }
    },
    get_all_user : async function (req, resp , next){
        try {
            const user_data = await User.findAll({where :{role :'admin'}})
            return resp.status(200).send({
                status:'success',
                message :'userdata fetched successfully.',
                data :user_data
            })
            
        } catch (e) {
            return resp.status(200).send({
                status:'error',
                message : e?.message ?? 'something went wrong'
            })
        }
    }
}