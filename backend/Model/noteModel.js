const mongoose=require('mongoose')
const Joi=require('joi');
const {Etudiant}=require('./etudiantModel')

const details={
    etudiant:{type:mongoose.Schema.Types.ObjectId,ref:'Etudiant'},
    code:{type:String,required:true,unique:true},
    note:{type:String,required:true},
}
const shemaNote=mongoose.Schema({
    matierre:{type:mongoose.Schema.Types.ObjectId,ref:'Matiere'},
   detail:[details],
})

const Note=mongoose.model('Note',shemaNote)

function validateNote(nt){

    schema={
        matierre:Joi.string().required(),
        detail:Joi.array().items(Joi.object()
        .keys({
         etudiant: Joi.string(),
         code: Joi.string(),
         note: Joi.string().required()
        })),
    }
    return Joi.validate(nt,schema)
}

module.exports.validateNote=validateNote
module.exports.Note=Note