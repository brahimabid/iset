const {Enseignant,validateEnseignant}=require('../Model/enseignantModel')
const express=require('express')
const router=express.Router()

router.post('/newEnseignant',async (req,res)=>{
    const{error}=validateEnseignant(req.body)
    if(error)
    res.status(400).send({status:false,message:error.details[0].message})
    
    const ens=new Enseignant({
        nom:req.body.nom,
        prenom:req.body.prenom,
       
        sexe:req.body.sexe,
        email:req.body.email
        
        
    })
    
    
    const result =await ens.save()
   
    res.send({status:true,resultat:result})
    
    
    
    })
    module.exports.routeEnseignant=router