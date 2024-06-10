import { Component, OnInit, inject } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export default class PlaylistsComponent implements OnInit{

  private playlistService = inject(PlaylistService); // Dependency Injection of PlaylistService

  playlists: any[] = []; 
  
  ngOnInit(): void{
    this.playlistService.getPlaylists()
    .subscribe((playlists: any) => {
      this.playlists = playlists;
    });
  }

}
