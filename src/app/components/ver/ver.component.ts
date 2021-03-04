import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificadoI } from 'src/app/models/certificado.interface';
import { CertificadoService } from '../../services/certificado.service';

// PDFMAKE
import { PdfMakeWrapper,Txt,Img,Columns,QR} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import { DomSanitizer } from '@angular/platform-browser';
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  certificado:CertificadoI;

  urlCertificado:any;

  private logo:string = "https://firebasestorage.googleapis.com/v0/b/certificadoapp-3bb25.appspot.com/o/image%2Flogo_ho_opt.jpg?alt=media&token=9b5bad90-fd5f-4d1b-9a81-8b5fbfe37132"

  constructor(private activatedRoute:ActivatedRoute,
              private certificadoService:CertificadoService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      const id = params["id"];
      this.certificadoService.getOneCertificado(id).subscribe(certificado=>{
        this.certificado = certificado;
        this.generarPDF(this.certificado);
      });
    });
  }

  async generarPDF(certificado){
    const pdf = new PdfMakeWrapper();

    //estilos de página
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');
    
    //pdf.pageMargins([100, 100]);

    //Background
    pdf.background(await new Img(this.certificado?.url).build());

    //header logo
    pdf.header(await new Img(this.logo).build());

    
    //titulo-h1
    pdf.add(new Txt('CERTIFICADO').fontSize(40).alignment('center').bold().end);
    // space
    pdf.add(new Txt(' ').fontSize(30).alignment('center').italics().end);
    pdf.add(new Txt('Otorgado a: ').fontSize(15).alignment('center').italics().end);
    // space
    pdf.add(new Txt('\n').end);

    pdf.add(new Txt(this.certificado.nombres).fontSize(30).alignment('center').bold().end);

    // spaces
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    //body
    pdf.add(new Txt(`Por su participación como ${this.certificado.rol.toUpperCase()} en el workshop virtual de "${this.certificado.tema}" brindada por la instructor(a) ${this.certificado.encargado}.`).fontSize(20).alignment('center').end);

  // spaces
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Columns(['______________________________________','______________________________________']).alignment('center').color('#01D56E').end);
    pdf.add(new Txt('\n').end);
    pdf.add(
      new Columns(['José Manuel Antonio Pachas','Kattya Isabel García Velasquez'])
      .alignment('center').end);
    pdf.add(
      new Columns(['CEO DE CROWDEV','COO DE CROWDEV'])
      .alignment('center').end);

    //Abre el pdf en otra ventana
    //pdf.create().open();

    pdf.create().getDataUrl(dataUrl=>{
      this.urlCertificado = this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
      console.log(this.urlCertificado);
    });
  
  }
}


