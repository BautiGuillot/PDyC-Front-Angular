import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export default class CreatePlaylistComponent implements OnInit {
  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService
  private router = inject(Router); // Dependency Injection of Router
  playlistName: string = '';

  ngOnInit(): void {}

  onSubmit(form: NgForm) { // Función que se ejecuta al enviar el formulario de creación de playlist, form es el formulario con el nombre de la playlist, NgForm es un módulo de Angular para manejar formularios.
    this.playlistService.createPlaylist(form.value.playlistName).subscribe({ // Petición POST a la API con el nombre de la playlist en el body de la petición y el token en los headers. El método createPlaylist devuelve un Observable, al que nos suscribimos utilizando el método subscribe.
      next: () => { // Esta función se ejecuta cuando el Observable emite un nuevo valor, es decir, cuando la creación de la lista de reproducción ha sido exitosa.
        this.playlistName = form.value.playlistName;
        console.log('Playlist created successfully');
        this.router.navigate(['misPlaylists']); // Redirige a la página de mis playlists
      },
      error: (err) => {
        console.error('Error creating playlist', err); // Muestra más detalles del error en la consola
      }
    });
    form.reset();
  }
}
