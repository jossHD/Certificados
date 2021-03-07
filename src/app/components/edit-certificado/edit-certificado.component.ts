import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from 'src/app/services/certificado.service';

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

  constructor(private certificadoService:CertificadoService) { }

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
    url: new FormControl('',Validators.required)
  });

  edit(certificado:CertificadoI){

    if(this.image === this.imageOriginal){
      certificado.url = this.imageOriginal;
      this.certificadoService.editCertificadoId(certificado);
    }else{
      this.certificadoService.editCertificadoId(certificado,this.image);
    }

  }

  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
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
