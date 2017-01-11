import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuGameComponent}    from './menu-game.component';
import { PlayWordComponent }  from './../../games/play-word/play-word.component';
import { SongpopComponent } from './../../games/songpop/songpop.component';

const gamesRoutes: Routes = [
  { path: 'game/playword',  component: PlayWordComponent },
  { path: 'menugame', component:  MenuGameComponent}, 
  { path: 'game/songpop', component: SongpopComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(gamesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule { }