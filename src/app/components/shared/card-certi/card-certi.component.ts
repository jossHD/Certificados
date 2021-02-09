import { Component, Input, OnInit } from '@angular/core';
import { CertificadoI } from './../../../models/certificado.interface';


@Component({
  selector: 'app-card-certi',
  templateUrl: './card-certi.component.html',
  styleUrls: ['./card-certi.component.css']
})
export class CardCertiComponent implements OnInit {

  @Input()
  certi:CertificadoI[];

  constructor() { }

  ngOnInit(): void {
  }

}
