import { Component, OnInit, inject } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule


@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export default class SongsComponent implements OnInit {
  private songsService = inject(SongsService); // Dependency Injection of SongsService

  songs: any[] = [];
  
  ngOnInit(): void{
    this.songsService.list().subscribe((songs: any)=> {
      this.songs = songs;
    });
  } 



}