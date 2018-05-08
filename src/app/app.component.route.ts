import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {LoginCompComponent} from './components/login-comp/login-comp.component';
import {MusicSearchComponent} from './components/music-search/music-search.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'login', component: LoginCompComponent, pathMatch: 'full'},
  {path: 'search', component: MusicSearchComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {path: 'playlist', component: PlaylistComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterUserComponent, pathMatch: 'full'}

];
