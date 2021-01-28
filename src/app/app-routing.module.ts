import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { HomeComponent } from './components/home/home.component';
import { NuevaPlantillaComponent } from './components/nueva-plantilla/nueva-plantilla.component';

const routes: Routes = [
  
  { path: "home", 
    component: HomeComponent 
  },
  {
    path: "nuevaPlantilla",
    component: NuevaPlantillaComponent
  },
  {
    path:"nuevoCertificado",
    component: CertificadoComponent
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'home'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
