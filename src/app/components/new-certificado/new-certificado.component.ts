import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { FileI } from 'src/app/models/file.interface';
import { CertificadoService } from 'src/app/services/certificado.service';


@Component({
  selector: 'app-new-certificado',
  templateUrl: './new-certificado.component.html',
  styleUrls: ['./new-certificado.component.css']
})
export class NewCertificadoComponent implements OnInit {

  private image:FileI;

  constructor(private certificadoService:CertificadoService) { }

  ngOnInit(): void {
  }

  public newCertificadoForm = new FormGroup({
    nombres: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(30)]),
    tema: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(60)]),
    encargado: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/),Validators.maxLength(30)]),
    rol: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/),Validators.maxLength(20)]),
    duracion: new FormControl('',[Validators.required,Validators.pattern(/^\d+$/),Validators.maxLength(2)]),
    url: new FormControl('')
  })

  
  enviar(certificadoI:CertificadoI){
    if(this.image === undefined){
      this.certificadoService.preAddAndUpdate(certificadoI);
    }else{
      this.certificadoService.preAddAndUpdate(certificadoI,this.image);
    }
  }

  // Seleccionando la imagen
  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
  }



  getErrorNombres(field: string): string {
    let message;
    if(this.newCertificadoForm.get(field).errors.required){
      message = 'este campo es requerido.';
    } else if (this.newCertificadoForm.get(field).hasError('pattern')){
      message = 'solo se admiten letras mayúsculas, minúsculas.'
    } else if ( this.newCertificadoForm.get(field).hasError('maxlength')){
      message = 'solo se admiten 30 caracteres.'
    }
    return message;
  }

  getErrorTema(field: string): string {
    let message;
    if(this.newCertificadoForm.get(field).errors.required){
      message = 'este campo es requerido.';
    } else if (this.newCertificadoForm.get(field).hasError('pattern')){
      message = 'solo se admiten letras mayúsculas, minúsculas, guiones y espacios.'
    } else if ( this.newCertificadoForm.get(field).hasError('maxlength')){
      message = 'solo se admiten 60 caracteres.'
    }
    return message;
  }

  getErrorEnacargado(field: string): string {
    let message;
    if(this.newCertificadoForm.get(field).errors.required){
      message = 'este campo es requerido.';
    } else if (this.newCertificadoForm.get(field).hasError('pattern')){
      message = 'solo se admiten letras mayúsculas, minúsculas.'
    } else if ( this.newCertificadoForm.get(field).hasError('maxlength')){
      message = 'solo se admiten 30 caracteres.'
    }
    return message;
  }

  getErrorRol(field: string): string {
    let message;
    if(this.newCertificadoForm.get(field).errors.required){
      message = 'este campo es requerido.';
    } else if ( this.newCertificadoForm.get(field).hasError('pattern')){
      message = 'Solo se admiten letras mayúsculas y minúsculas'
    } else if ( this.newCertificadoForm.get(field).hasError('maxlength')){
      message = 'solo se admiten 20 caracteres.'
    }
    return message;
  }
  getErrorDuracion(field: string): string {
    let message;
    if(this.newCertificadoForm.get(field).errors.required){
      message = 'este campo es requerido.';
    } else if ( this.newCertificadoForm.get(field).hasError('pattern')){
      message = 'Solo se admiten números y dos puntos'
    } else if ( this.newCertificadoForm.get(field).hasError('maxlength')){
      message = 'solo se admiten 2 caracteres.'
    }
    return message;
  }
  

  isValidDatos(field: string):boolean {
    return (
       ( this.newCertificadoForm.get(field).touched || this.newCertificadoForm.get(field).dirty)
    && !this.newCertificadoForm.get(field).valid
    );
  }
}
