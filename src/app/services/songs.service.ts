import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private http = inject(HttpClient);  // Dependency Injection of HttpClient

  api_url:string = 'http://localhost:8080/songs';

  list() { //carga todas las canciones
    return this.http.get(this.api_url);
  }
  
  create(song: any) {
    return this.http.post(this.api_url, song);
  }

}
