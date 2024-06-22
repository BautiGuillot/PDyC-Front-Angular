import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Playlist {
  id: number;
  name: string;
  songCount: number;
}

@Component({
  selector: 'app-mis-playlists',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './mis-playlists.component.html',
  styleUrls: ['./mis-playlists.component.css'] // corregido el nombre de `styleUrl` a `styleUrls`
})
export default class MisPlaylistsComponent implements OnInit {

  playlists: Playlist[] = [];
  errorMessage: string | null = null;

  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService
  private router = inject(Router);

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getMyPlaylists().subscribe({
      next: data => {  // si la petición es exitosa, guardar las playlists en la variable playlists
        console.log('Playlists loaded:', data); // Verifica que las playlists se carguen correctamente
        this.playlists = data; // data es el array de playlists que devuelve el servicio
      },
      error: err => {
        if (err.status === 403) { // si hay un 403 (no autorizado) redirigir al login
          this.errorMessage = 'No tienes permisos para ver estas playlists. Por favor, inicia sesión.';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Ocurrió un error al cargar las playlists.';
        }
      }
    });
  }

  deletePlaylist(playlistId: number): void {
    console.log('Deleting playlist with ID:', playlistId); // Verificar el ID antes de eliminar
    this.playlistService.deletePlaylist(playlistId).subscribe({
      next: () => {
        this.loadPlaylists(); // recargar las playlists después de borrar una
      },
      error: err => {
        this.errorMessage = 'Ocurrió un error al borrar la playlist.';
        console.error('Error deleting playlist:', err);
      }
    });
  }

  viewSongs(playlistId: number): void { // redirigir a la vista de canciones de la playlist seleccionada
    this.router.navigate([`/playlist/${playlistId}/songs`]);
  }

}
