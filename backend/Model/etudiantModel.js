const mongoose=require('mongoose')
const Joi=require('joi');
const {Class}=require('../Model/classModel')
const shemaEtudiant=mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    numInscrit:{type:Number,unique:true,required:true},
    sexe:{type:String,required:true},
    email:{type:String,email:true, required:true},
    class:{type:mongoose.Types.ObjectId,ref:'Class'}

})
const Etudiant=mongoose.model('Etudiant',shemaEtudiant)

function validateEtudiant(etud){

    schema={
        nom:Joi.string().required(),
        prenom:Joi.string().required(),
        numInscrit:Joi.number().required(),
         sexe:Joi.string().required(),
        email:Joi.string().email().required(),
        class:Joi.string().required()
    }
    return Joi.validate(etud,schema)
}

module.exports.validateEtudiant=validateEtudiant
module.exports.Etudiant=Etudiant