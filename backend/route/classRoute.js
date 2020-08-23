const {validateClass,Class}=require('../Model/classModel')

const express=require('express')
const router=express.Router()

router.post('/newClass',async (req,res)=>{
const{error}=validateClass(req.body)
if(error)
res.status(400).send({status:false,message:error.details[0].message})

const cla=new Class({
    nom:req.body.nom,
    specialite:req.body.specialite,
    depart:req.body.depart,
    niveau:req.body.niveau
})


const result =await cla.save()

res.send({status:true,resultat:result})



})

router.get('/getallClass',async(req,res)=>{
    const result=await Class.find()
    .sort({niveau:1})
    
    res.send(result)
})

module.exports.routeClass=router