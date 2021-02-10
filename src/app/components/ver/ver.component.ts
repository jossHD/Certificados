import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from './../../services/certificado.service';


@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html'
})
export class VerComponent implements OnInit {

  certificado$:Observable<CertificadoI>;

  constructor(private activatedRoute:ActivatedRoute,
              private certificadoService:CertificadoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      const id = params["id"];
      this.certificado$ = this.certificadoService.getOneCertificado(id);
    })
    
  }

}
