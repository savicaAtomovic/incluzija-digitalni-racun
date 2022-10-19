import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SlideShowComponent } from './slide-show/slide-show.component';

const routes: Routes = [
  { path: 'board', component: MainComponent, pathMatch: 'full' },
  { path: 'board/:id', component: SlideShowComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
