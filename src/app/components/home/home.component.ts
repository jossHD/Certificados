import { Component, OnInit } from '@angular/core';
import { CertificadoService } from './../../services/certificado.service';
import { CertificadoI } from './../../models/certificado.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  certificados:CertificadoI[] = [];

  constructor(private certificadoService:CertificadoService) { }

  ngOnInit(): void {
    this.certificadoService.getAllCerti().subscribe(data=>{
      this.certificados = data; 
    });
  }

}
