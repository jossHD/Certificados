import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HomeComponent } from './components/home/home.component';
import { NuevaPlantillaComponent } from './components/nueva-plantilla/nueva-plantilla.component';
import { VerComponent } from './components/ver/ver.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'nuevaPlantilla',component: NuevaPlantillaComponent},
  {path:'nuevoCertificado',component: CertificadoComponent},
  {path:'ver/:id',component:VerComponent},
  {path:'**',pathMatch:'full',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
