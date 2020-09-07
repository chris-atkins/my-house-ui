import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DailyGraphComponent} from "./daily.graph.component";

const routes: Routes = [
  { path: ':dateString', component: DailyGraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
