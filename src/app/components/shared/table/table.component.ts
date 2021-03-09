import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

//Tabla
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//CertificadoService
import { CertificadoService } from './../../../services/certificado.service';
import { CertificadoI } from './../../../models/certificado.interface';

//SweetAlert
import Swal from 'sweetalert2';

//Dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nombres','tema','encargado','rol','duracion','actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator,{static:true})
  paginator:MatPaginator

  @ViewChild(MatSort,{static:true})
  sort: MatSort;

  constructor(private certiService:CertificadoService,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.certiService.getAllCerti().subscribe(posts=>{
      this.dataSource.data = posts;
    });
  }

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Nuevo certificado
  newCertificado():void{
    this.openDialog();
  }

  //Editar certificado
  editCertificado(element:CertificadoI):void{
    this.openDialog(element);
    console.log(element);
  }

  //Borrar certificado
  deleteCertificado(element:CertificadoI):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result=>{
      
      if(result.value){
        //Llamar al service para borrar
        this.certiService.deleteCertificadoById(element)
        .then(()=> Swal.fire('Éxitoso!','El registro fue borrado','success'))
        .catch(e=>Swal.fire('Fatal!','El registro no se pudo borrar','warning'))
      }
    })
  }

   //Nuevo certificado
   newPlantilla():void{
    this.openDialog();
  }


  //Abrir dialog
  openDialog(certificado?:CertificadoI):void{
    const config = {
      data:{
        message: certificado ? 'Edit Post':'New Post',
        content: certificado
      }
    };

    const dialogRef = this.dialog.open(DialogComponent,config);
    dialogRef.afterClosed().subscribe(result=>{
      
    })
  }
}
