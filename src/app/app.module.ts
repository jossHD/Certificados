import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NuevaPlantillaComponent } from './components/nueva-plantilla/nueva-plantilla.component';
import { HomeComponent } from './components/home/home.component';
import { CardCertiComponent } from './components/shared/card-certi/card-certi.component';
import { CartPlantillaComponent } from './components/shared/cart-plantilla/cart-plantilla.component';
import { CertificadoComponent } from './components/certificado/certificado.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NuevaPlantillaComponent,
    HomeComponent,
    CardCertiComponent,
    CartPlantillaComponent,
    CertificadoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
