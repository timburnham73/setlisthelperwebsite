import { LoginComponent } from './account/login';
import { SongsComponent } from './songs';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/security/auth.guard';
import {PasswordResetComponent} from './account/password-reset/password-reset.component';
import {RegisterComponent} from './account/register/register.component';
import {HomeComponent} from './home/home.component';
import {SongImportComponent} from './song-import/song-import.component';
import {SetlistComponent} from './setlist/setlist.component';
import {SetlistSongsComponent} from './setlist-songs';


const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'passwordreset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'setlists', children: [
      {
        path: '',
        component: SetlistComponent
      },
      {
        path: ':setlistid/songs',
        component: SetlistSongsComponent
      }]
    ,
    canActivate: [AuthGuard]
  },
  { path: 'import', component: SongImportComponent},
  { path: '', component: SongsComponent, canActivate: [AuthGuard] },
  { path: '**', component: SongsComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes = RouterModule.forRoot(routes);
