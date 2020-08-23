
const express=require('express');
const app=express();
const cors=require('cors')
var mongoose=require('mongoose');
const bp=require('body-parser')
const {routeUser}=require('./route/userRoute')
const {routeEnseignant}=require('./route/enseignantRoute')
const {routeEtudiant}=require('./route/etudiantRoute')
const {routeMatiere}=require('./route/matiereRoute')
const {routeNote}=require('./route/noteRoute')
const {routeClass}=require('./route/classRoute')


mongoose.connect('mongodb://localhost/Iset',{ useUnifiedTopology: true ,useNewUrlParser: true} )
.then(()=>console.log("connected to mongodb..."))
.catch(err=>console.log('cannot connected to mongodb...'))
app.use(cors(
    origin=["http://localhost:4200"]
    ))
    app.use(bp.urlencoded({ extended: true }));
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: false }))

app.use(express.json())
app.use('/user',routeUser)
app.use('/class',routeClass)
app.use('/etudiant',routeEtudiant)
app.use('/enseignant',routeEnseignant)
app.use('/matierre',routeMatiere)
app.use('/gererNote',routeNote)


port=3000;
app.listen(port,()=>console.log("listen on port"+port));

