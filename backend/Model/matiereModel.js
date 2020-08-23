const mongoose=require('mongoose')
const Joi=require('joi');
const shemaMatiere=mongoose.Schema({
    nom:{type:String,required:true},
    coef:{type:Number,required:true},
    class:{type:mongoose.Schema.Types.ObjectId,ref:'Class'},
    prof:{type:mongoose.Types.ObjectId,ref:'User'},
    semestre:{type:String,required:true},
    anne:String
})

const Matiere=mongoose.model('Matiere',shemaMatiere)

function validateMatiere(mat){

    schema={
        
        nom:Joi.string().required(),
        coef:Joi.number().required(),
        class:Joi.string().required(),
        prof:Joi.string().required(),
        semestre:Joi.string().required(),
       anne:Joi.string().required(),
    }
    return Joi.validate(mat,schema)
}

module.exports.validateMatiere=validateMatiere
module.exports.Matiere=Matiere