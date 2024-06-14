import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private http = inject(HttpClient);  // Dependency Injection of HttpClient

  api_url:string = 'http://localhost:8080/playlists';

  getPlaylists() {
    return this.http.get(this.api_url);
  }

  // getMyPlaylists() {
  //   const headers = { headers : new HttpHeaders({ 'Authorization': localStorage.getItem('token') ?? '' ,
  //   'Content-Type': 'application/json'
  //   }) };
  //   return this.http.get(`${this.api_url}/misPlaylists`, headers);
  // }
  

  getMyPlaylists(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '');
    return this.http.get<any[]>(`${this.api_url}/misPlaylists`, { headers });
  }


  
}
