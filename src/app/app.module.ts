import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterValidatorDirective } from './directives/letter-validator.directive';
import { GameComponent } from './game/game.component';
import { LetterGameComponent } from './game/letter-game/letter-game.component';
import { LetterPermutationsGameComponent } from './game/letter-permutations-game/letter-permutations-game.component';
import { MissingWordComponent } from './game/missing-word/missing-word.component';
import { GamesListComponent } from './games-list/games-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PracticalLessonComponent } from './practical-lesson/practical-lesson.component';
import { PracticalLessonsListComponent } from './practical-lessons-list/practical-lessons-list.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { SocialSituationsListComponent } from './social-situation-list/social-situation-list.component';
import { SocialSituationComponent } from './social-situation/social-situation.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from './lazy-image/lazy-image.component';

@NgModule({
  declarations: [
    AppComponent,
    SocialSituationsListComponent,
    SlideShowComponent,
    TopbarComponent,
    SocialSituationComponent,
    HomePageComponent,
    GamesListComponent,
    GameComponent,
    LetterGameComponent,
    LetterValidatorDirective,
    LetterPermutationsGameComponent,
    MissingWordComponent,
    PracticalLessonsListComponent,
    PracticalLessonComponent,
    LazyImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
