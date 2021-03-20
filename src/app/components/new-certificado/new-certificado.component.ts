import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { FileI } from 'src/app/models/file.interface';
import { CertificadoService } from 'src/app/services/certificado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-certificado',
  templateUrl: './new-certificado.component.html',
  styleUrls: ['./new-certificado.component.css']
})
export class NewCertificadoComponent implements OnInit {

  private image:FileI;

  constructor(private certificadoService:CertificadoService, private dialogRef: MatDialogRef<NewCertificadoComponent>) { }

  ngOnInit(): void {
  }

  public newCertificadoForm = new FormGroup({
    nombres: new FormControl('',Validators.required),
    tema: new FormControl('',Validators.required),
    encargado: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required),
    duracion: new FormControl('',Validators.required),
    url: new FormControl('')
  })
  
  enviar(certificadoI:CertificadoI){
    if( this.newCertificadoForm.invalid) {
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error',
        text: 'Complete todos los datos'
      });
      return;
    } 
    
     
      if(this.image === undefined){
        this.certificadoService.preAddAndUpdate(certificadoI);
      }else{
        this.certificadoService.preAddAndUpdate(certificadoI,this.image);
      }
    
      Swal.fire({
        allowOutsideClick: true,
        icon: 'success',
        title: 'Exito',
        text: 'Datos guardados correctamente'
      });
      this.dialogRef.close();
      
    }

  

  // Seleccionando la imagen
  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
    Swal.fire({
      allowOutsideClick: true,
      icon: 'success',
      title: 'Exito',
      text: 'Imagen cargada correctamente'
    });
  }
}
