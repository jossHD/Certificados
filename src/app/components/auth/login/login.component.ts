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

  constructor(private authService:AuthService,
              private router:Router) { }

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  ngOnInit(): void { 
  
  }

  onLogin(form:UserI){
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
}
