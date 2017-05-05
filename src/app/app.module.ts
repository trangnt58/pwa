import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { CoolStorageModule } from 'angular2-cool-storage';

import { GlobalVarsService } from './services/global-vars.service';

import { HomeComponent } from './pages/home/home.component';
import { PlayWordComponent } from './games/play-word/play-word.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { NavLoginComponent } from './components/nav-login/nav-login.component';
import { LoginFacebookComponent } from './components/login-facebook/login-facebook.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchFriendComponent } from './components/search-friend/search-friend.component';
import { WritingComponent } from './games/writing/writing.component';
import { ReadingComponent } from './games/reading/reading.component';
import { MyAnswerComponent } from './components/my-answer/my-answer.component';
import { MyFriendsComponent } from './components/my-friends/my-friends.component';
import { WaitingGameComponent } from './components/waiting-game/waiting-game.component';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { GamePlayerComponent } from './components/game-player/game-player.component';
import { LearningComponent } from './components/learning/learning.component';
import { GameRequestDialogComponent } from './components/game-request-dialog/game-request-dialog.component';
import { RandomUserComponent } from './components/random-user/random-user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { HistoryComponent } from './components/history/history.component';
import { PushNotificationsModule } from 'angular2-notifications';
import { UserItemComponent } from './components/user-item/user-item.component';
import { TopicComponent } from './components/topic/topic.component';
import { SectionComponent } from './components/section/section.component';
import { WarningOfflineComponent } from './components/warning-offline/warning-offline.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menugame', component: MenuGameComponent },
  { path: 'playword', component: PlayWordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'login-google', component: LoginGoogleComponent },
  { path: 'topic', component: TopicComponent },
  { path: 'topic/:topicId', component: SectionComponent },
  { path: 'topic/:topicId/:sectionId', component: LearningComponent },
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
    NavLoginComponent,
    LoginFacebookComponent,
    ProfileComponent,
    SearchFriendComponent,
    WritingComponent,
    ReadingComponent,
    MyAnswerComponent,
    MyFriendsComponent,
    WaitingGameComponent,
    CircleProgressComponent,
    GamePlayerComponent,
    LearningComponent,
    GameRequestDialogComponent,
    RandomUserComponent,
    UserCardComponent,
    HistoryComponent,
    UserItemComponent,
    TopicComponent,
    SectionComponent,
    WarningOfflineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    PushNotificationsModule,
    CoolStorageModule
  ],
  providers: [ GlobalVarsService ],
  entryComponents: [
    WaitingGameComponent,
    GameRequestDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
