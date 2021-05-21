import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from '../../services/certificado.service';

import { DomSanitizer } from '@angular/platform-browser';
import { PdfMakeWrapper, Txt, Img, Columns } from 'pdfmake-wrapper';
import pdfFonts from 'src/assets/custom-fonts';

//UUID 
import { v4 as uuidv4 } from 'uuid';




@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  certificado: CertificadoI;

  urlCertificado: any;

  private logo: string = "https://firebasestorage.googleapis.com/v0/b/certificadoapp-3bb25.appspot.com/o/image%2Flogo_ho_opt.jpg?alt=media&token=d8ddc77d-6441-4af3-80ea-451e78624df5"

  constructor(private activatedRoute: ActivatedRoute,
    private certificadoService: CertificadoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.certificadoService.getOneCertificado(id).subscribe(certificado => {
        this.generarPDF(certificado);
      });
    });
  }

  async generarPDF(certificado) {
    var pdf = new PdfMakeWrapper();

    //estilos de página
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');

    pdf.pageMargins([50, 70]);

    //Background
    pdf.background(await new Img(certificado?.url).build());

    //header logo
    pdf.header(await new Img(this.logo).build());


    //titulo-h1
    pdf.add(new Txt('CERTIFICADO').fontSize(40).alignment('center').bold().end);
    // space
    pdf.add(new Txt(' ').fontSize(30).alignment('center').italics().end);
    pdf.add(new Txt('Otorgado a:').fontSize(20).alignment('center').italics().end);
    // space
    pdf.add(new Txt('\n').end);

    pdf.add(new Txt(certificado.nombres).font('greatvibes').fontSize(40).alignment('center').bold().end);

    // spaces
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    //body
    pdf.add(new Txt(`Por su participación como ${certificado.rol.toUpperCase()} en el workshop virtual de "${certificado.tema}" brindada por la instructor(a) ${certificado.encargado}.`).fontSize(20).alignment('center').end);

    // spaces
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Columns(['________________________________________', '________________________________________']).alignment('center').color('#135899').bold().end);
    pdf.add(new Txt('\n').end);
    pdf.add(
      new Columns(['José Manuel Antonio Pachas', 'Kattya Isabel García Velasquez'])
        .fontSize(15).alignment('center').end);
    pdf.add(
      new Columns(['CEO DE CROWDEV', 'COO DE CROWDEV'])
        .fontSize(13).alignment('center').end);

    pdf.create().getDataUrl(dataUrl => {
      this.urlCertificado = this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
      this.downloadPdf(dataUrl, certificado);
    });
  }

  //Creando los atributos del ancla <a>
  downloadPdf(url: any, certificado: any) {
    //Generando UUID
    const uuid = uuidv4();
    const ancla = document.querySelector("#ancla_download");
    ancla.setAttribute('href', url);
    ancla.setAttribute('download', `${certificado?.nombres}-${uuid}`);
  }
}


