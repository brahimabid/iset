const mongoose=require('mongoose')
const Joi=require('joi');

const shemaClass=mongoose.Schema({
    nom:{type:String,required:true},
    niveau:Number,
    depart:String,
    specialite:String

})

const Class=mongoose.model('Class',shemaClass)

function validateClass(mat){

    schema={
        nom:Joi.string().required(),
        niveau:Joi.number().required(),
        depart:Joi.string().required(),
        specialite:Joi.string().required(),
    }
    return Joi.validate(mat,schema)
}

module.exports.validateClass=validateClass
module.exports.Class=Class