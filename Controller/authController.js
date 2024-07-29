const express = require('express')
const {Validator} = require('node-input-validator')
const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const siteHelper = require('../helpers/site_helper')

module.exports = {

    register :async function(req , resp , next){
        try {
            const v = new Validator(req.body , {
                username :'required|string',
                email :'required|email',
                role:'required|in:admin,user',
                password :'required|length:20,8',
                cpassword : 'required|same:password'
            })
            const matched = await v.check();
            if(!matched){
                return resp.status(200).send({
                    status: 'val_err', 
                    message: "Validation error", 
                    val_msg: v.errors 
                });
             
            }
            let hashedPassword = await bcrypt.hash(req.body.password , 10);
            let doc ={
                username : req.body.username,
                email : req.body.email,
                role : req.body.role,
                bio : req.body.bio ?? null,
                password :hashedPassword,
            }
            const data = await User.create(doc);
            // console.log(data)
            return resp.status(200).send({
                status:'sucess',
                message :'User registerd successfully',
                data :data
            })
        } catch (e) {
            console.log(e.message);
            return resp.status(200).send({
                status :'error',
                message :e?.message ?? 'something went wrong'
            })
        }
    },
    signin : async function (req , resp , next){
        try {
            const v = new Validator(req.body  ,{
                email :'required|email',
                password :'required'
            })
            const matched  = await v.check();
            if(!matched){
                return resp.status(200).send({
                    status :'val_err',
                    message: "Validation error", 
                    val_msg: v.errors 
                })
            }
            let user_details = await User.findOne({ where :{email : req.body.email}});
            console.log(user_details.dataValues.password)
            if (!user_details) {
                return resp.status(200).send({
                  status :"error",
                  message :"user not found."
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, user_details.dataValues.password);
            if(!validPassword){
                return resp.status(200).send({
                    status :'error',
                    message : 'Please enter valid credential'
                })
            }
            let payload ={
                id: user_details.id, 
                role: user_details.role,
                username :user_details.username,
                email :user_details.email
            }
            const token = await siteHelper.generateToken(payload);
            return resp.status(200).send({
                status:"success",
                message:"Loggedin successfully.!",
                token:token,
                user_data: user_details,
            })


        } catch (e) {
            return resp.status(200).send({
                status :'error',
                message : e?.message ?? 'something went wrong!'
            })
        }
    }
  
}