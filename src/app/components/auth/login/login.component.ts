import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { UserI } from './../../../models/user.interface';
import Swal from 'sweetalert2';

import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  private isValidEmail = /\S+@\S+\.\S+/;

  constructor(private authService:AuthService,
              private router:Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isValidEmail)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void { 
  
  }

  onLogin(form:UserI){

    if (this.loginForm.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    this.authService.loginByEmail(form) 
    .then(response=>{
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch(error=>{
      console.log(error);
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error al autenticar',
        text: 'Datos incorrectos'
      });
    }) 
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'Ingresar su correo electrónico.';
    } else if (this.loginForm.get(field).hasError('pattern')){
      message = 'El correo electrónico es inválido.';
    } else if (this.loginForm.get(field).hasError('minlength')){
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `Debe de ingresar una contraseña mas larga que ${minLength} caracteres`;
    }
    return message;
  }

  isValidField(field: string): boolean{
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) 
    && !this.loginForm.get(field).valid
    );
  }
}



