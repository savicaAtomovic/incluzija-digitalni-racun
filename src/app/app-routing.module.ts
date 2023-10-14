import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { SlideShowWrapperComponent } from './slide-show-wrapper/slide-show-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  { path: 'board', component: MainComponent, pathMatch: 'full' },
  {
    path: 'board/:id',
    component: SlideShowWrapperComponent,
    pathMatch: 'full',
  },
  { path: 'games', component: GamesListComponent, pathMatch: 'full' },
  {
    path: 'games/:id',
    component: GameComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
