import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http:Http) { }

  mesMatiere(id:string){
    return this.http.get('http://localhost:3000/gererNote/getMatierres/prof/'+id).map(res=>{
      return res.json()
    })
  }


 insererNotes(tab,id){
    return this.http.put('http://localhost:3000/gererNote/updateNote/matiere/'+id,{detail:tab}).map(res=>{
      return res.json()
    })
  }
}
