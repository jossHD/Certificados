import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HomeComponent } from './components/home/home.component';
import { NuevaPlantillaComponent } from './components/nueva-plantilla/nueva-plantilla.component';
import { VerComponent } from './components/ver/ver.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'nuevaPlantilla',component: NuevaPlantillaComponent},
  {path:'nuevoCertificado',component: CertificadoComponent},
  {path:'ver/:id',component:VerComponent},
  {path:'login',component:LoginComponent},
  {path:'**',pathMatch:'full',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
