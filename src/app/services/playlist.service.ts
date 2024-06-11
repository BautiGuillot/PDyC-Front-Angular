import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private http = inject(HttpClient);  // Dependency Injection of HttpClient

  api_url:string = 'http://localhost:8080/playlists';

  getPlaylists() {
    const headers = { headers : new HttpHeaders({ 'Authorization': localStorage.getItem('token') ?? '' ,
    'Content-Type': 'application/json'
    }) };
    return this.http.get(this.api_url, headers);
  }

  
}
