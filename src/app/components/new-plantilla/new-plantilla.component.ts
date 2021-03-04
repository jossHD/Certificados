import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { PlantillaI } from 'src/app/models/plantilla.interface';
import { CertificadoService } from 'src/app/services/certificado.service';


@Component({
  selector: 'app-new-plantilla',
  templateUrl: './new-plantilla.component.html',
  styleUrls: ['./new-plantilla.component.css']
})
export class NewPlantillaComponent implements OnInit {

  private image:File;

  constructor(private certificadoService:CertificadoService) { }

  public newCertificadoForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    tema: new FormControl('',Validators.required),
    imagePlantilla: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
  }

  enviar(plantillaI:any){
    this.certificadoService.preAddAndUpdate(plantillaI,this.image);
    console.log(plantillaI);
    
  }

  // Seleccionando la imagen
  seleccionarImagen(event:any):void{
    this.image = event.target.files[0];
  }
}
