import { Injectable } from '@angular/core';
//Firebase-firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificadoI } from './../models/certificado.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  constructor(private afs:AngularFirestore) { }

  //Obtener todos los certificados
  public getAllCerti():Observable<CertificadoI[]>{

    return this.afs.collection('certificados')
          .snapshotChanges()
          .pipe(
            map(actions=>
                actions.map(a=>{
                const data = a.payload.doc.data() as CertificadoI;
                const id = a.payload.doc.id;
                return {id, ...data};
              })
            )
          );
  }
}
