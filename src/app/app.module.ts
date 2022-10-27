import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SlideShowWrapperComponent } from './slide-show-wrapper/slide-show-wrapper.component';

@NgModule({
  declarations: [AppComponent, MainComponent, SlideShowComponent, TopbarComponent, SlideShowWrapperComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
