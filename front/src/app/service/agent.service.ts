import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:Http) { }
  getallAllClass(){
    return this.http.get('http://localhost:3000/class/getallClass').map(res=>{
      return res.json()
    })
  }
getallAllMatierres(){
  return this.http.get('http://localhost:3000/matierre/getAll').map(res=>{
    return res.json()
  })
}
getallEtudiant(){
  return this.http.get('http://localhost:3000/etudiant/getEtudiant').map(res=>{
    return res.json()
  })
}

getdetailMatiere(id){
  return this.http.get('http://localhost:3000/gererNote/getMatierres/agent/'+id).map(res=>{
    return res.json()
  })
}

newCodeMatiere(det){
  return this.http.post('http://localhost:3000/gererNote/newNote',det).map(res=>{
    return res.json()
  })
}
}
