import { Injectable } from '@angular/core';
//Firebase-firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PlantillaI } from '../models/plantilla.interface';
import { CertificadoI } from './../models/certificado.interface';
import { FileI } from './../models/file.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private certificadosCollection:AngularFirestoreCollection<CertificadoI>
  private filePath:any;

  private downloadURL:Observable<string>;

  constructor(private afs:AngularFirestore,
              private storage:AngularFireStorage) { 
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
  public getOneCertificado(id):Observable<CertificadoI>{
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

  //Método intermedio que subirá la imagen para luego guardar el registro del certificado
  public preAddAndUpdate(certificado:CertificadoI,image:File):void{
    this.uploadImage(certificado,image);
  }


  //Método para guardar el registro.
  private saveCertificado(certificado:CertificadoI){
    const certificadoObj = {
      nombres:certificado.nombres,
      tema:certificado.tema,
      encargado:certificado.encargado,
      rol:certificado.rol,
      duracion:certificado.duracion,
      url:this.downloadURL,
      fileRef:this.filePath
    }

    this.certificadosCollection.add(certificadoObj);
  }


  private uploadImage(certificado:CertificadoI,image:File){
    this.filePath = `image/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage=>{
          this.downloadURL = urlImage;
          this.saveCertificado(certificado);
        })
      })
    ).subscribe();
  }

}
