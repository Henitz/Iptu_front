import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IptuListComponent } from './iptu-list/iptu-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: IptuListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
