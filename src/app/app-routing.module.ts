import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlToPdfComponent } from './html-to-pdf/html-to-pdf.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HtmlToPdfComponent},
  {path:'**', redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
