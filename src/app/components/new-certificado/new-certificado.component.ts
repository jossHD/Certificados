import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from 'src/app/services/certificado.service';


@Component({
  selector: 'app-new-certificado',
  templateUrl: './new-certificado.component.html',
  styleUrls: ['./new-certificado.component.css']
})
export class NewCertificadoComponent implements OnInit {

  private image:File;

  constructor(private certificadoService:CertificadoService) { }

  public newCertificadoForm = new FormGroup({
    nombres: new FormControl('',Validators.required),
    tema: new FormControl('',Validators.required),
    encargado: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required),
    duracion: new FormControl('',Validators.required),
    imagePlantilla: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
  }

  enviar(certificadoI:CertificadoI){
    this.certificadoService.preAddAndUpdate(certificadoI,this.image);
    console.log(certificadoI);
    
  }

  // Seleccionando la imagen
  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
  }
}
