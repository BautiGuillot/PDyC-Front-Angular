import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../services/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{

  private router = inject(Router);
  private loginService = inject(LoginService);


  ngOnInit(): void {
    
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
  });


  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
          this.loginForm.reset();
        },
        error: (e) => {
          alert("Usuario o contraseña incorrectos");
      }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Formulario invalido");
    }
  }

}
