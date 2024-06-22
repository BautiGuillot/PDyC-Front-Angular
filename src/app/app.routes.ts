import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./Components/songs/songs.component')},
    {path:'playlists',loadComponent: () => import('./Components/playlists/playlists.component')},
    {path:'login',loadComponent: () => import('./Components/login/login.component')},
    {path: 'misPlaylists', loadComponent: () => import('./Components/mis-playlists/mis-playlists.component')},
    {path: 'createPlaylist', loadComponent: () => import('./Components/create-playlist/create-playlist.component')}, 
    {path: 'playlist/:id/songs', loadComponent: () => import('./Components/playlist-songs/playlist-songs.component')},
];
