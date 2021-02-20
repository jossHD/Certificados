import { Injectable } from '@angular/core';
//Firebase-firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificadoI } from './../models/certificado.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private certificadosCollection:AngularFirestoreCollection<CertificadoI>

  constructor(private afs:AngularFirestore) { 
    this.certificadosCollection = afs.collection<CertificadoI>('certificados');
  }

  //Obtener todos los certificados
  public getAllCerti():Observable<CertificadoI[]>{

    return this.certificadosCollection
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

  //Obtener un certificado por id 
  public getOneCertificado(id:CertificadoI):Observable<CertificadoI>{
    return this.afs.doc<CertificadoI>(`certificados/${id}`).valueChanges();
  }

  //Borrar un certificado por su id
  public deleteCertificadoById(certificado:CertificadoI):Promise<any>{
    return this.certificadosCollection.doc(certificado.id).delete();
  }

  //Editar un certificado por su id
  public editPostId(certificado:CertificadoI):Promise<any>{
    return this.certificadosCollection.doc(certificado.id).update(certificado);
  }
}
