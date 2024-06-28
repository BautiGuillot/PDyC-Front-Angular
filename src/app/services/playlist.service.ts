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

  deletePlaylist(playlistId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); //se crea un nuevo objeto HttpHeaders y se establece el encabezado 'Authorization' con el valor Bearer ${token}. Este es un esquema común de autenticación que se utiliza en las APIs REST.
    return this.http.delete(`${this.api_url}/${playlistId}`, { headers }); // Petición DELETE a la API con el token en los headers y el id de la playlist
  }

  getSongsFromPlaylist(id: number): Observable<any> { // getSongFromPlaylist recibe un id de tipo number y devuelve un Observable<any>
    console.log(`Making request to: ${this.api_url}/${id}/songs`); // Log para verificar la URL de la petición
    return this.http.get(`${this.api_url}/${id}/songs`); 
  }

  editNamePlaylist(id: number, name: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    const body = { name };
    return this.http.put(`${this.api_url}/${id}`, body, { headers });
  }

  deleteSongFromPlaylist(playlistId: number, songId: number): Observable<any> { // deleteSongFromPlaylist recibe dos parámetros: playlistId y songId, ambos de tipo number, y devuelve un Observable<any>
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.api_url}/${playlistId}/songs/${songId}`, { headers }); //la url seria: http://localhost:8080/playlists/${playlistId}/songs/${songId}
  }

  addSongToPlaylist(playlistId: number, songId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    const body = { id: songId };
    return this.http.post(`${this.api_url}/${playlistId}/songs`, body, { headers });
  }
}
