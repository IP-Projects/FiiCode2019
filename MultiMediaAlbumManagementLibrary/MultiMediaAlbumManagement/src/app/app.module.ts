import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import { MultimediaAlbumComponent } from './multimedia-album/multimedia-album.component';
import { MultimediaEntityComponent } from './multimedia-entity/multimedia-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    MultimediaAlbumComponent,
    MultimediaEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
