const {User,validateUser,validateLogin}=require('../Model/UserModel')
const bcrypt=require ('bcrypt')
const express=require('express')
const router=express.Router()

router.post('/newUser',async (req,res)=>{
const{error}=validateUser(req.body)
if(error)
res.status(400).send({status:false,message:error.details[0].message})

const user=new User({
    nom:req.body.nom,
    email:req.body.email,
    password:req.body.password,
    role:req.body.role
})

const salt=await bcrypt.genSalt(10);

user.password=await bcrypt.hash(user.password,salt);
const result =await user.save()

res.send({status:true,resultat:result})

})

router.post('/auth',async(req,res)=>{
    const {error}=validateLogin(req.body);
    if(error) return res.send({status:false , resultat:error.details[0].message});
    const isExist=await User.findOne({email:req.body.email});
    if(!isExist) return res.send({status:false,resultat:"username or Email n'existe pas "});

    const validPassword=await bcrypt.compare(req.body.password,isExist.password);
    if(!validPassword) return res.send({status:false,resultat:'Invalid password '});
    const token =isExist.generateAuthToken();
    console.log(token);
    return res.header('x-token',token).send({status:true,resultat:token})
});
router.get('/getallProf',async(req,res)=>{
   const result=await User.find({role:1})
   .select("-password")
    return res.send({status:true,resultat:result})
});

router.put('/updatepassword',async(req,res)=>{
    const salt=await bcrypt.genSalt(10);

pass=await bcrypt.hash('hela123',salt);
    await User.updateMany({role: {$in:[1,0,2] }},{$set:{password:pass}},{new:true})
    .then(result=>res.send(result)).catch(err=>res.send(err))
})
module.exports.routeUser=router