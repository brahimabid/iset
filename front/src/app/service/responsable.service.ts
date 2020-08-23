import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
tabMatierres=[]
affMatierres=[]
  tabNotes=[]
  constructor(private http:Http) { }

  allProf(){
    return this.http.get('http://localhost:3000/user/getallProf').map(res=>{
      return res.json()
    })
  }
  allMatierre(){
   this.http.get('http://localhost:3000/matierre/getAll').map(res=>{
      return res.json()
    }).subscribe(res=>{
      this.tabMatierres=res
    })
  }
  
  filterMatierre(id){
    this.affMatierres=this.tabMatierres.filter(m=>m.prof._id==id)
  }
  allNote(){
    this.http.get('http://localhost:3000/gererNote/responsbale/all').map(res=>{
      return res.json()
    }).subscribe(res=>{
      this.tabNotes=res
      console.log(this.tabNotes)
    })
  }
}
