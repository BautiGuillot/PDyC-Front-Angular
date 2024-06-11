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
        console.log("Token guardado" + localStorage.getItem('token'));
      };
    
      return res;
    }))
  }
}
