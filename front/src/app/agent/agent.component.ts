import { Component, OnInit } from '@angular/core';
import { AgentService } from '../service/agent.service';
import { stringify } from 'querystring';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']

})
export class AgentComponent implements OnInit {
  
  tabMatiere=[]
  tabClass=[]
  tabM=[];
  tabMatiere2=[]
  tabClass2=[]
  tabM2=[];
  tabEtudiant=[]
  class: any;
  tabE=[];
  ajouter:boolean
  matierre: any;
  tabCodeEtudiant=[]
  nom: string;
  constructor(private agentServ:AgentService,private auth:AuthService) { }

  ngOnInit() {
    let decoded=this.auth.currentUser()
    this.nom=decoded.nom
  this.agentServ.getallAllMatierres().subscribe(res=>{
    this.tabMatiere=res
    })
    this.agentServ.getallAllClass().subscribe(res=>{
      this.tabClass=res
      })
  }
  
  searchDepartment(depart){
    console.log(depart)

    console.log(this.tabClass)

    this.tabClass2=this.tabClass.filter( m=> m.depart == ""+depart)
  }
  searchClass(c){
   this.class=c
    this.tabM=this.tabMatiere.filter( m=> (m.class.depart == ""+c.depart) && (m.class.nom == ""+c.nom)&& (m.class.niveau == ""+c.niveau))
    console.log(this.tabMatiere)

    console.log(this.tabM)
  }
  searchSemestre(sem){
    console.log(sem)
    this.tabM2=this.tabM.filter( m=> m.semestre == sem)
console.log(this.tabM)
  }


  etudiantClass(m)
{
  this.matierre=m
  this.agentServ.getdetailMatiere(m._id).subscribe(res=>{
    if(res.status == false)
    {
      this.ajouter=false
      this.agentServ.getallEtudiant().subscribe(res=>{
        this.tabEtudiant=res
        this.tabE=this.tabEtudiant.filter(e=>e.class._id == this.class._id)
      })
    }else
    if(res.status == true) {
      this.tabEtudiant=res.resultat[0].detail
      this.ajouter=true

    }
  })


  
}
aff(code,e,min,max){
 if( parseInt(code) < parseInt(min) || parseInt(code) > parseInt(max) ){
alert("votre code doit etre entre "+min+" and "+max)
 }else
 {let det={etudiant:e._id,code:code,note:'null'}
 this.tabCodeEtudiant.push(det)
 console.log(this.tabCodeEtudiant)
}
}
codeInserer(e){
  let find={status:false,code:''}
  console.log(this.tabCodeEtudiant)
 this.tabCodeEtudiant.forEach(element => {
   if(element.etudiant==e._id)
   find={status:true,code:element.code}
 });
 
   return find
 
}
enregistrer(){
  let note={matierre:this.matierre._id,detail:this.tabCodeEtudiant}
  this.agentServ.newCodeMatiere(note).subscribe(res=>{
    if(res.status==true){
      alert("matierre ajouter avec succes")
    }
  })
}
logout(){
  this.auth.logOut()
}
}
