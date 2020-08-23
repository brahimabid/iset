import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ResponsableService } from '../service/responsable.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;
  nom: any;
  tabProf=[]
  constructor(private auth:AuthService,private serv:ResponsableService,private router:Router) { }

  ngOnInit() {
    this.serv.allMatierre()
    this.serv.allNote()

    let decoded=this.auth.currentUser()
    this.nom=decoded.nom
    this.serv.allProf().subscribe(res=>{
      this.tabProf=res.resultat
    })

  }

  affMatieres(p){
this.serv.filterMatierre(p._id)
this.router.navigate(['/responsable/listMatiere',p.nom,p._id])


  }

  logout(){
    this.auth.logOut()
  }
}
