const mongoose=require('mongoose')
const Joi=require('joi');
const jwt=require('jsonwebtoken')
const config=require('config');
const shemeUser=mongoose.Schema({
    nom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,maxLength:10,minLength:5,required:true},
    role:{type:Number,required:true}
})

shemeUser.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,nom:this.nom,role:this.role},config.get('jwtPrivateKey'));
    return token ; 
}

function validateUser(user){

    shema={
        nom:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().max(10).min(5).required(),
        role:Joi.number().required()
    }
    return Joi.validate(user,shema)
}

const User=mongoose.model('User',shemeUser)

function validateLogin(user){

    shema={
        email:Joi.string().email().required(),
        password:Joi.string().max(10).min(5).required()
    }
    return Joi.validate(user,shema)
}


module.exports.User=User
module.exports.validateUser=validateUser
module.exports.validateLogin=validateLogin