import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private http = inject(HttpClient);  // Dependency Injection of HttpClient
  api_url: string = 'http://localhost:8080/playlists';

  getPlaylists() {
    return this.http.get(this.api_url);
  }

  getMyPlaylists(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Token del usuario logueado en el localStorage
    const headers = new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : ''); 
    return this.http.get<any[]>(`${this.api_url}/misPlaylists`, { headers }); // Petición GET a la API con el token en los headers
  }

  createPlaylist(playlistName: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found'); // Error si el token no está presente
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    const body = { name: playlistName };
    return this.http.post(this.api_url, body, { headers }); // Petición POST a la API con el token en los headers y el nombre de la playlist
  }
}
