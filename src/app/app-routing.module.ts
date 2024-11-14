import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SocialSituationsListComponent } from './social-situation-list/social-situation-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GameComponent } from './game/game.component';
import { PracticalLessonsListComponent } from './practical-lessons-list/practical-lessons-list.component';
import { SocialSituationComponent } from './social-situation/social-situation.component';
import { GamesListComponent } from './games-list/games-list.component';
import { PracticalLessonComponent } from './practical-lesson/practical-lesson.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'social-situations',
    component: SocialSituationsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'social-situations/:id',
    component: SocialSituationComponent,
    pathMatch: 'full',
  },
  {
    path: 'games',
    component: GamesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'games/:id',
    component: GameComponent,
    pathMatch: 'full',
  },
  {
    path: 'practical-lessons',
    component: PracticalLessonsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'practical-lessons/:id',
    component: PracticalLessonComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
