import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SlideShowWrapperComponent } from './slide-show-wrapper/slide-show-wrapper.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { LetterGameComponent } from './game/letter-game/letter-game.component';
import { LetterValidatorDirective } from './directives/letter-validator.directive';
import { FormsModule } from '@angular/forms';
import { LetterPermutationsGameComponent } from './game/letter-permutations-game/letter-permutations-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SlideShowComponent,
    TopbarComponent,
    SlideShowWrapperComponent,
    HomePageComponent,
    GamesListComponent,
    GameComponent,
    LetterGameComponent,
    LetterValidatorDirective,
    LetterPermutationsGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
