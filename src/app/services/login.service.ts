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

  
  login(credentials:LoginRequest){
    return this.http.post<any>('http://localhost:8080/login', credentials, {observe: 'response'}).pipe(map(res => {
      const authorizationHeader = res.headers.get('Authorization');
      if(authorizationHeader !== null){
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  };

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  };

}


