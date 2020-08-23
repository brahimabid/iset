import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) },
   { path: 'responsable', loadChildren: () => import('./responsable/responsable.module').then(m => m.ResponsableModule) },
    { path: 'prof', loadChildren: () => import('./prof/prof.module').then(m => m.ProfModule) },
  {path:'auth/login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
