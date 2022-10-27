import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { SlideShowWrapperComponent } from './slide-show-wrapper/slide-show-wrapper.component';

const routes: Routes = [
  { path: 'board', component: MainComponent, pathMatch: 'full' },
  {
    path: 'board/:id',
    component: SlideShowWrapperComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
