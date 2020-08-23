import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsableComponent } from './responsable.component';
import { DetailMatiereComponent } from './detail-matiere/detail-matiere.component';

const routes: Routes = [{ path: '', component: ResponsableComponent },
{ path: 'listMatiere/:nom/:id', component: DetailMatiereComponent,pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableRoutingModule { }
