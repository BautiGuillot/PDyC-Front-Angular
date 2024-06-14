import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./Components/songs/songs.component')},
    {path:'playlists',loadComponent: () => import('./Components/playlists/playlists.component')},
    {path:'login',loadComponent: () => import('./Components/login/login.component')},
    {path: 'misPlaylists', loadComponent: () => import('./Components/mis-playlists/mis-playlists.component')},
];
