import { Component, OnInit } from '@angular/core';
import { ProfService } from '../service/prof.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
  tabSaved = []
  tabMatierre = []
  tabFilter = []
  matiere: any;
  submitted: boolean;
  tabDetail = []
  nom: string;

  constructor(private profServ: ProfService, private auth:AuthService) { }

  ngOnInit() {
    this.nom=localStorage.getItem("nom")
    this.submitted = false
    const id = localStorage.getItem("id")
    this.profServ.mesMatiere(id).subscribe(res => {
      this.tabSaved = res.saveMatieres
      this.tabMatierre = res.allMatiere
      console.log(res)
    })
  }

  affMatiere(m) {
    this.matiere = m

    this.tabFilter = this.tabSaved.filter(x => x.matierre._id == m._id)
    if (this.tabFilter.length > 0) {
      console.log(m)
      this.tabFilter = this.tabSaved.filter(x => x.matierre._id == m._id)[0].detail

      console.log(this.tabFilter)
    } else
      if (this.tabFilter.length==0) {
        this.submitted = false

      }
  }

  insert(note, e) {
    console.log(note)
    if (note <= 20 && note >= 0) {
      let i = this.tabFilter.indexOf(e)
      this.tabFilter[i].note = note
      this.tabDetail.push(this.tabFilter[i])
      this.tabFilter.splice(i, 1)
      if (this.tabFilter.length == 0) {
        this.enregistrer()
      }
    }
    else alert(note+" doit etre entre 0 et 20")
  }
  enregistrer() {
    this.submitted = true

    this.profServ.insererNotes(this.tabDetail, this.matiere._id).subscribe(res => {
      console.log(res)
      if (res.status == true) {
        setTimeout(res => {
          this.submitted = false
this.tabFilter=this.tabDetail
        }, 2000)
      }
      
    })


  }
logout(){
  this.auth.logOut()
}
}
