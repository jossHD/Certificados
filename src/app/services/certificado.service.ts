import { Injectable } from '@angular/core';
//Firebase-firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../models/file.interface';
import { CertificadoI } from './../models/certificado.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private certificadosCollection:AngularFirestoreCollection<CertificadoI>
  private filePath:any;
  private imgPorDefecto:string = "https://firebasestorage.googleapis.com/v0/b/certificadoapp-3bb25.appspot.com/o/image%2F36091797-aa04-4b38-b63c-81a83be45881.jpg?alt=media&token=b0467fb8-993c-42d8-87d3-6f6476733714";

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
  public editCertificadoId(certificado:CertificadoI,newImage?:FileI){
    
    if(newImage){
      this.uploadImage(certificado,newImage);
    }else{
      return this.certificadosCollection.doc(certificado.id).update(certificado);
    }
  }

  //Método intermedio que subirá la imagen para luego guardar el registro del certificado
  public preAddAndUpdate(certificado:CertificadoI,image?:FileI):void{
    if(image){
      this.uploadImage(certificado,image);
    }else{
      this.saveCertificado(certificado,this.imgPorDefecto);
    }
    
  }


  //Método para guardar el registro.
  private saveCertificado(certificado:CertificadoI,imgPorDefecto?:string){

    const certificadoObj = {
      nombres:certificado.nombres,
      tema:certificado.tema,
      encargado:certificado.encargado,
      rol:certificado.rol,
      duracion:certificado.duracion,
      url:this.downloadURL? this.downloadURL:imgPorDefecto,
      fileRef:this.filePath? this.filePath:null
    }
    if(certificado.id){
      return this.certificadosCollection.doc(certificado.id).update(certificado);
    }else{
      this.certificadosCollection.add(certificadoObj);
    }
    
  }


  private uploadImage(certificado:CertificadoI,image:FileI){
    this.filePath = `image/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage=>{
          this.downloadURL = urlImage;
          certificado.url = this.downloadURL;
          this.saveCertificado(certificado);
        })
      })
    ).subscribe();
  }

}
