import { Component, OnInit, inject } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [SidebarComponent,CommonModule,FormsModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export default class SongsComponent implements OnInit {

  private songsService = inject(SongsService); // Dependency Injection of SongsService

  songs: any[] = [];
  filteredSongs: any[] = []; //Este array almacenará las canciones que pasan el filtro
  autor: string = '';
  genre: string = '';
  
  ngOnInit(): void { 
    this.loadSongs();
  }

  loadSongs(): void {
    this.songsService.list().subscribe((songs: any) => {
      this.songs = songs;
      this.applyFilters();
    });
  }

  applyFilters(): void { 
    this.filteredSongs = this.songs.filter(song => { 
      return (!this.autor || song.autor.toLowerCase().includes(this.autor.toLowerCase())) &&
             (!this.genre || song.genre.toLowerCase().includes(this.genre.toLowerCase()));
    });
  }

  filterSongs(): void { //
    this.applyFilters();
  }

  trackByFn(index: number, item: any): number { //Función que Angular utiliza para identificar de forma única cada elemento de la lista de canciones
    return item.id;
  }

}


