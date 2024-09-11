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
  styleUrls: ['./playlist-songs.component.css']
})
export default class PlaylistSongsComponent implements OnInit {

  playlistId: number = 0;
  songs: Song[] = []; // Lista de canciones que pertenecen a la playlist
  availableSongs: Song[] = []; // Lista de todas las canciones disponibles para agregar a la playlist
  errorMessage: string = '';

  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService
  private songsService = inject(SongsService); // Dependency Injection of SongsService
  private route = inject(ActivatedRoute); // Dependency Injection of ActivatedRoute

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.playlistId = +params['id']; // Obtiene el id de la URL y lo convierte a número para asignarlo a playlistId
      console.log('Playlist ID:', this.playlistId); // Añade un log para verificar el ID
      this.loadSongs(); // Carga las canciones de la playlist y las disponibles para agregar
      this.loadAvailableSongs(); // Carga las canciones disponibles
    });
  }

  loadSongs(): void { 
    this.playlistService.getSongsFromPlaylist(this.playlistId).subscribe({ // Obtiene las canciones de la playlist con el ID playlistId 
      next: (data) => { 
        this.songs = data; //Cuando recibe los datos (data), asigna las canciones recibidas a la variable this.songs. Estas son las canciones que pertenecen a la playlist. 
        console.log('Songs:', this.songs); // Añade un log para verificar las canciones
        // Remover las canciones que ya están en la playlist de las canciones disponibles
        this.availableSongs = this.availableSongs.filter(song =>  // Lo que hace es filtrar todas las canciones en availableSongs y mantener solo aquellas que no están en la playlist (this.songs).
          !this.songs.some(playlistSong => playlistSong.id === song.id)  // Verifica si la canción ya está en la playlist. Si no está, la mantiene en availableSongs. 
        );
      },
      error: (error) => {
        this.errorMessage = 'Error loading songs';
        console.error('Error loading songs:', error); // Añade un log para verificar errores
      }
    });
  }

  loadAvailableSongs(): void {
    this.songsService.list().subscribe({
      next: (data: any) => { // Obtiene todas las canciones disponibles
        this.availableSongs = data; 
        console.log('All songs:', this.availableSongs); // Log para verificar que las canciones están cargadas
        // Remover las canciones que ya están en la playlist de las canciones disponibles
        this.availableSongs = this.availableSongs.filter(song =>  
          !this.songs.some(playlistSong => playlistSong.id === song.id)
        );
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
        // Encontrar la canción eliminada y agregarla a availableSongs
        const deletedSong = this.songs.find(song => song.id === songId);
        if (deletedSong) {
          this.availableSongs.push(deletedSong); // Agregar de nuevo la canción a availableSongs
        }
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
        // Encontrar la canción añadida y eliminarla de availableSongs
        this.availableSongs = this.availableSongs.filter(song => song.id !== songId); // Filtrar las canciones disponibles y mantener solo aquellas que no son la que se acaba de agregar
        this.loadSongs(); // Recargar las canciones después de agregar una
      },
      error: (error) => {
        this.errorMessage = 'Error adding song';
        console.error('Error adding song:', error);
      }
    });
  }
}
