import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { VerComponent } from './components/ver/ver.component';

//guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'ver/:id',component:VerComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'**',pathMatch:'full',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
