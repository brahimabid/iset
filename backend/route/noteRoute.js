const {Note,validateNote}=require('../Model/noteModel')
const express=require('express')
const { Matiere } = require('../Model/matiereModel')
const { exist } = require('joi')
const router=express.Router()

router.post('/newNote',async (req,res)=>{
    const{error}=validateNote(req.body)
    if(error)
    res.status(400).send({status:false,message:error.details[0].message})
    
    const nt=new Note({
        matierre:req.body.matierre,
        detail:req.body.detail,
    })
    
    const result =await nt.save()
    
    res.send({status:true,resultat:result})
    
    
    })

    router.get('/getMatierres/agent/:id',async(req,res)=>{
    
        const matierre= await Note.find({matierre:req.params.id})
        .populate('detail.etudiant')
       if(!matierre ||matierre.length==0)
       res.send({status:false})
         else
         res.send({status:true,resultat:matierre})

 
     })

    router.get('/getMatierres/prof/:id',async(req,res)=>{
       const matierres= await Note.find()
       .populate('matierre')
       const tabMatierre=await Matiere.find().populate('class').populate('prof').sort({semestre:1})

       const m=matierres.filter(n=>n.matierre.prof==req.params.id)
       const result=tabMatierre.filter(n=>n.prof._id==req.params.id)
       

       
        res.send({saveMatieres:m,allMatiere:result})

    })

    router.get('/responsbale/all',async(req,res)=>{
        const result= await Note.find()
        .populate('matierre')
        .populate('detail.etudiant')
        .select("-code")
        
         res.send(result)
 
     })
    router.put('/updateNote/matiere/:id',async(req,res)=>{

        const result=await Note.updateOne({matierre:req.params.id},{
         $set:{detail:req.body.detail}},{new:true}        
        )
        res.send({status:true,resultat:result})
    })




    module.exports.routeNote=router