const {Matiere,validateMatiere}=require('../Model/matiereModel')
const express=require('express')
const router=express.Router()

router.post('/newMatiere', async (req,res)=>{
const{error}=validateMatiere(req.body)
if(error)
res.status(400).send({status:false,message:error.details[0].message})

const mat=new Matiere({
    nom:req.body.nom,
    coef:req.body.coef,
    class:req.body.class,
    prof:req.body.prof,
    semestre:req.body.semestre,
    anne:req.body.anne
    
})

const result =await mat.save()

res.send({status:true,resultat:result})

})
router.get('/getAll',async(req,res)=>{
    const result=await Matiere.find()
    .populate('prof','-password' )
    .populate('class','nom depart niveau')

    res.send(result)
})

module.exports.routeMatiere=router