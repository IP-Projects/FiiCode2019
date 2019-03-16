import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './core/app.component';
import {
  CollectionLoaderComponent,
} from './features/collection-of-multimedia-albums/collection-loader/collection-loader.component';
import {
  CollectionOfMultimediaAlbumsComponent,
} from './features/collection-of-multimedia-albums/collection-of-multimedia-albums.component';
import { AlbumLoaderComponent } from './features/multimedia-album/album-loader/album-loader.component';
import { MultimediaAlbumComponent } from './features/multimedia-album/multimedia-album.component';
import { AudioModuleComponent } from './shared/modularComponents/audio-module/audio-module.component';
import { ImageModuleComponent } from './shared/modularComponents/image-module/image-module.component';
import { PdfModuleComponent } from './shared/modularComponents/pdf-module/pdf-module.component';
import { SvgModuleComponent } from './shared/modularComponents/svg-module/svg-module.component';
import { VideoModuleComponent } from './shared/modularComponents/video-module/video-module.component';
import { YoutubeModuleComponent } from './shared/modularComponents/youtube-module/youtube-module.component';

@NgModule({
  declarations: [
    AppComponent,
    MultimediaAlbumComponent,
    CollectionOfMultimediaAlbumsComponent,
    PdfModuleComponent,
    CollectionLoaderComponent,
    AlbumLoaderComponent,
    YoutubeModuleComponent,
    SvgModuleComponent,
    ImageModuleComponent,
    VideoModuleComponent,
    AudioModuleComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
