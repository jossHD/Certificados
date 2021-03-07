import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routes
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VerComponent } from './components/ver/ver.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TableComponent } from './components/shared/table/table.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { NewCertificadoComponent } from './components/new-certificado/new-certificado.component';
import { NewPlantillaComponent } from './components/new-plantilla/new-plantilla.component';
import { EditCertificadoComponent } from './components/edit-certificado/edit-certificado.component';

// Firebase
import {AngularFirestoreModule} from '@angular/fire/firestore' ;
import {AngularFireStorageModule, BUCKET } from '@angular/fire/storage' ;
import {AngularFireModule} from '@angular/fire' ;
import { environment } from './../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";

//Formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';


//Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerComponent,
    ToolbarComponent,
    LoginComponent,
    TableComponent,
    DialogComponent,
    NewCertificadoComponent,
    NewPlantillaComponent,
    EditCertificadoComponent
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
