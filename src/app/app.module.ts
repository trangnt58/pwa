import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { GlobalVarsService } from './services/global-vars.service';

import { HomeComponent } from './pages/home/home.component';
import { PlayWordComponent } from './games/play-word/play-word.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { SongpopComponent } from './games/songpop/songpop.component';
import { NavLoginComponent } from './components/nav-login/nav-login.component';
import { LoginFacebookComponent } from './components/login-facebook/login-facebook.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchFriendComponent } from './components/search-friend/search-friend.component';
import { WritingComponent } from './games/writing/writing.component';
import { ReadingComponent } from './games/reading/reading.component';
import { MyAnswerComponent } from './components/my-answer/my-answer.component';
import { MyFriendsComponent } from './components/my-friends/my-friends.component';
import { GameRequestComponent } from './components/game-request/game-request.component';
import { WaitingGameComponent } from './components/waiting-game/waiting-game.component';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { GamePlayerComponent } from './components/game-player/game-player.component';
import { LearningComponent } from './components/learning/learning.component';
import { WordDialogComponent } from './components/word-dialog/word-dialog.component';
import { GameRequestDialogComponent } from './components/game-request-dialog/game-request-dialog.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menugame', component: MenuGameComponent },
  { path: 'playword', component: PlayWordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login-google', component: LoginGoogleComponent },
  { path: 'songpop', component: SongpopComponent },
  { path: 'learn', component: LearningComponent },
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
    SongpopComponent,
    NavLoginComponent,
    LoginFacebookComponent,
    RegisterComponent,
    ProfileComponent,
    SearchFriendComponent,
    WritingComponent,
    ReadingComponent,
    MyAnswerComponent,
    MyFriendsComponent,
    GameRequestComponent,
    WaitingGameComponent,
    CircleProgressComponent,
    GamePlayerComponent,
    LearningComponent,
    WordDialogComponent,
    GameRequestDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GlobalVarsService ],
  entryComponents: [
    WaitingGameComponent,
    WordDialogComponent,
    GameRequestDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
