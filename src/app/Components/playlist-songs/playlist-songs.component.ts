import { Component, OnInit, inject } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../services/songs.service';

interface Song {
  id: number;
  name: string;
  autor: string;
  genre: string;
}

@Component({
  selector: 'app-playlist-songs',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './playlist-songs.component.html',
  styleUrl: './playlist-songs.component.css'
})
export default class PlaylistSongsComponent implements OnInit {

  playlistId: number = 0;
  songs: Song[] = []; // Usa la interfaz Song para el tipo de songs
  availableSongs: Song[] = []; // Lista de todas las canciones disponibles
  errorMessage: string = '';

  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService
  private songsService = inject(SongsService); // Dependency Injection of SongsService
  private route = inject(ActivatedRoute); // Dependency Injection of ActivatedRoute



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = +params['id']; // Obtiene el id de la URL
      console.log('Playlist ID:', this.playlistId); // Añade un log para verificar el ID
      this.loadSongs(); // Carga las canciones de la playlist
      this.loadAvailableSongs(); // Carga las canciones disponibles
    });
  }


  loadSongs(): void {
    this.playlistService.getSongsFromPlaylist(this.playlistId).subscribe({
      next: (data) => {
        this.songs = data;
        console.log('Songs:', this.songs); // Añade un log para verificar las canciones
      },
      error: (error) => {
        this.errorMessage = 'Error loading songs';
        console.error('Error loading songs:', error); // Añade un log para verificar errores
      },
      complete: () => {
        console.log('Request completed'); // Log para verificar que la solicitud se completó
      }
    });
  }

  loadAvailableSongs(): void { // Método para cargar las canciones disponibles
    this.songsService.list().subscribe({  // Llama al método list() del servicio SongsService y le pega al endpoint /songs de la API en la url http://localhost:8080/songs
      next: (data: any) => {
        this.availableSongs = data;
        console.log('All songs:', this.availableSongs); // Log para verificar que las canciones están cargadas
      },
      error: (error) => {
        this.errorMessage = 'Error loading available songs';
        console.error('Error loading available songs:', error);
      }
    });
  }

  deleteSong(songId: number): void {
    console.log('Deleting song with ID:', songId, 'de la playlist:', this.playlistId); // Log para verificar el ID antes de eliminar
    this.playlistService.deleteSongFromPlaylist(this.playlistId, songId).subscribe({
      next: () => {
        this.loadSongs(); // Recargar las canciones después de borrar una
      },
      error: (error) => {
        this.errorMessage = 'Error deleting song';
        console.error('Error deleting song:', error); // Log para verificar errores
      }
    });
  }

  addSong(songId: number): void {
    console.log('Adding song with ID:', songId, 'to playlist:', this.playlistId);
    this.playlistService.addSongToPlaylist(this.playlistId, songId).subscribe({
      next: () => {
        this.loadSongs();
      },
      error: (error) => {
        this.errorMessage = 'Error adding song';
        console.error('Error adding song:', error);
      }
    });
  }

}
