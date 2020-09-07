import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DailyGraphComponent} from "./daily.graph.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: 'data/:dateString', component: DailyGraphComponent },
  { path: 'yesterday', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
