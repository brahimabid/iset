import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DetailMatiereComponent } from './detail-matiere/detail-matiere.component';
import {MatListModule} from '@angular/material/list';
import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [ResponsableComponent, DetailMatiereComponent],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    ExportAsModule
  ]
})
export class ResponsableModule { }
