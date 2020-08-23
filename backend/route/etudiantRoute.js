const {Etudiant,validateEtudiant}=require('../Model/etudiantModel')
const express=require('express')
const router=express.Router()

router.post('/newEtudiant',async (req,res)=>{
    const{error}=validateEtudiant(req.body)
    if(error)
    res.status(400).send({status:false,message:error.details[0].message})
    
    const etud=new Etudiant({
        nom:req.body.nom,
        prenom:req.body.prenom,
        numInscrit:req.body.numInscrit,
        sexe:req.body.sexe,
        email:req.body.email,
        class:req.body.class
        
        
    })
    
    
    const result =await etud.save()
    
    res.send({status:true,resultat:result})
    
    
    
    })

    router.get('/getEtudiant',async (req,res)=>{
  
        const result=await Etudiant.find()
        .populate('class')
        
         if(!result) res.send('aucun etudiant ')

         res.send(result)


    })

    module.exports.routeEtudiant=router