import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import {appRoutingProviders, AppRoutes} from './app.routes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import {SongsComponent} from './songs';
import {HttpClientModule} from '@angular/common/http';
import {SongService} from './shared/services/song.service';
import {AuthGuard} from './shared/security/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './account/login';
import {PasswordResetComponent} from './account/password-reset/password-reset.component';
import {RegisterComponent} from './account/register/register.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {EditAccountComponent} from './home/edit-account/edit-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {secondsToMinutesPipe} from './shared/pipes/secondsToMinutes';
import {CommonModule} from '@angular/common';
import {DragulaModule} from 'ng2-dragula';
import { BsModalModule } from 'ng2-bs3-modal';
import {AuthService} from './shared/security/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SongEditComponent} from './song-edit/song-edit.component';
import {SLHHttpClient} from './shared/web/HttpClient';
import {Safe, SongLyricComponent} from './song-lyric';
import {FontColorDropdownComponent} from './shared/font-color-dropdown';
import {DropdownComponent} from './shared/dropDownList';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongsComponent,
    LoginComponent,
    PasswordResetComponent,
    secondsToMinutesPipe,
    TopMenuComponent,
    RegisterComponent,
    EditAccountComponent,
    SongEditComponent,
    SongLyricComponent,
    Safe,
    DropdownComponent,
    FontColorDropdownComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutes,
    DragulaModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BsModalModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders,
    SongService,
    AuthGuard,
    AuthService,
    SLHHttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
