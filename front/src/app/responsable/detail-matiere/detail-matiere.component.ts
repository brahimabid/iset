import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/service/responsable.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-detail-matiere',
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.scss']
})
export class DetailMatiereComponent implements OnInit {
nom=localStorage.getItem("nom")
  tabMatierres: any[];
  matiere: any;
  tabNotes: any[];
  Notes=[];
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'myCard', // the id of html/table element
  }
  pasEncore: boolean;
 
  constructor(private serv:ResponsableService,private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.tabMatierres=this.serv.affMatierres
    this.tabNotes=this.serv.tabNotes
    console.log(this.serv.tabNotes)
  }

  affMatierre(m){
    this.matiere=m
    console.log(m)
if(this.tabNotes.filter(nm=> nm.matierre._id==m._id).length!=0)
{this.Notes=this.tabNotes.filter(nm=> nm.matierre._id==m._id)[0].detail
  if(this.Notes[0].note=='null'){
    this.pasEncore=true

  }else
this.pasEncore=false
}
else
{
  this.pasEncore=true
}
console.log(this.Notes)

  }
 export(m) {
    this.exportAsService.save(this.exportAsConfig, m.class.niveau+'-'+m.class.nom+'-'+m.nom+'-semestre'+m.semestre).subscribe(() => {
      // save started
    });
 
  }
}
