const mongoose=require('mongoose')
const Joi=require('joi');

const shemaEnseignant=mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    sexe:{type:String,required:true},
    email:{type:String,email:true,required:true},

})
const Enseignant=mongoose.model('Enseignant',shemaEnseignant)

function validateEnseignant(ens){

    schema={
        nom:Joi.string().required(),
        prenom:Joi.string().required(),
        sexe:Joi.string().required(),
        email:Joi.string().email().required()
    }
    return Joi.validate(ens,schema)
}

module.exports.validateEnseignant=validateEnseignant
module.exports.Enseignant=Enseignant