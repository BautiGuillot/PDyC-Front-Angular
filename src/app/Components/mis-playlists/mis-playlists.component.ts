import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mis-playlists',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './mis-playlists.component.html',
  styleUrl: './mis-playlists.component.css'
})
export default class MisPlaylistsComponent implements OnInit{

  playlists: any[] = [];
  errorMessage: string | null = null;

  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService
  private router = inject(Router);

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getMyPlaylists().subscribe({ 
      next: data => {  // si la petición es exitosa, guardar las playlists en la variable playlists 
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



}
