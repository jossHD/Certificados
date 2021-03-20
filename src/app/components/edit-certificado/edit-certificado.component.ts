import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from 'src/app/services/certificado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-certificado',
  templateUrl: './edit-certificado.component.html',
  styleUrls: ['./edit-certificado.component.css']
})
export class EditCertificadoComponent implements OnInit {

  private image;
  private imageOriginal;

  @Input()
  certificado:CertificadoI;

  constructor(private certificadoService:CertificadoService,  private dialogRef: MatDialogRef <EditCertificadoComponent>) { }

  ngOnInit(): void {
    this.image = this.certificado.url;
    this.imageOriginal = this.certificado.url;
    
    this.cagarValores();
  }

  public editPostForm = new FormGroup({
    id: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    tema: new FormControl('',Validators.required),
    encargado: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required),
    duracion: new FormControl('',Validators.required),
    url: new FormControl('')
  });

  edit(certificado:CertificadoI){

    if( this.editPostForm.invalid) {
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error',
        text: 'Complete todos los datos'
      });
      return;
    } 

    if(this.image === this.imageOriginal){
      certificado.url = this.imageOriginal;
      this.certificadoService.editCertificadoId(certificado);
    }else{
      this.certificadoService.editCertificadoId(certificado,this.image);
    }

    Swal.fire({
      allowOutsideClick: true,
      icon: 'success',
      title: 'Exito',
      text: 'Datos guardados correctamente'
    });
    this.dialogRef.close();

  }

  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
    Swal.fire({
      allowOutsideClick: true,
      icon: 'success',
      title: 'Exito',
      text: 'Imagen cargada correctamente'
    });
  }

  private cagarValores(){
    this.editPostForm.patchValue({
      id: this.certificado.id,
      nombres: this.certificado.nombres,
      tema: this.certificado.tema,
      encargado: this.certificado.encargado,
      rol: this.certificado.rol,
      duracion: this.certificado.duracion
    })
  }

}
