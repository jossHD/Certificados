import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routes
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NuevaPlantillaComponent } from './components/nueva-plantilla/nueva-plantilla.component';
import { HomeComponent } from './components/home/home.component';
import { CardCertiComponent } from './components/shared/card-certi/card-certi.component';
import { CartPlantillaComponent } from './components/shared/cart-plantilla/cart-plantilla.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { VerComponent } from './components/ver/ver.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { LoginComponent } from './components/auth/login/login.component';

// Firebase
import {AngularFirestoreModule} from '@angular/fire/firestore' ;
import {AngularFireStorageModule, BUCKET } from '@angular/fire/storage' ;
import {AngularFireModule} from '@angular/fire' ;
import { environment } from './../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";

//Formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/shared/table/table.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { NewCertificadoComponent } from './components/new-certificado/new-certificado.component';  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NuevaPlantillaComponent,
    HomeComponent,
    CardCertiComponent,
    CartPlantillaComponent,
    CertificadoComponent,
    VerComponent,
    ToolbarComponent,
    LoginComponent,
    TableComponent,
    DialogComponent,
    NewCertificadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule

  ],
  providers: [
    {provide: BUCKET, useValue: 'gs://certificadoapp-3bb25.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
