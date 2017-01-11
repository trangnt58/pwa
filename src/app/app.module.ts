import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlayWordComponent } from './games/play-word/play-word.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { SongpopComponent } from './games/songpop/songpop.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menugame', component: MenuGameComponent },
  { path: 'playword', component: PlayWordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-google', component: LoginGoogleComponent },
  { path: 'songpop', component: SongpopComponent },
  {
    path: '',
    redirectTo: '/menugame',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayWordComponent,
    MenuGameComponent,
    LoginComponent,
    LoginGoogleComponent,
    SongpopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
