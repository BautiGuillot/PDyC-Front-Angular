import { Injectable, inject } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private http = inject(HttpClient);  // Dependency Injection of HttpClient

  
  login(credentials:LoginRequest){ // Método que realiza una petición POST al servidor para loguear al usuario.
    return this.http.post<any>('http://localhost:8080/login', credentials, {observe: 'response'}).pipe(map(res => { 
      const authorizationHeader = res.headers.get('Authorization'); // Obtenemos el token del header de la respuesta.
      if(authorizationHeader !== null){ // Si el token no es nulo, lo guardamos en el localStorage junto con el email del usuario.
        localStorage.setItem('token', authorizationHeader);
        localStorage.setItem('userEmail', credentials.email);
        console.log("Token guardado" + localStorage.getItem('token'));
      };
    
      return res; 
    }))
  };

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  isLoggedIn(): boolean { // Método que devuelve true si el token existe en el localStorage, de lo contrario, devuelve false.
    return !!localStorage.getItem('token'); // El operador !! es una forma de convertir cualquier valor en JavaScript a su equivalente booleano. Si el token existe devolverá true, de lo contrario, devolverá false.
  };

  getUserEmail(): string | null { // Método que devuelve el email del usuario logueado en el localStorage.
    return localStorage.getItem('userEmail');
  };

}


