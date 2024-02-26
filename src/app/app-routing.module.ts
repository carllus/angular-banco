import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisarComponent } from './cliente/pesquisar/pesquisar.component';

const routes: Routes = [{
  path:"",
  component: PesquisarComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
