import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PdfModuleModule } from '@multimedia-album-management/extras/pdf-module';
import { SvgModuleModule } from '@multimedia-album-management/extras/svg-module';
import { YoutubeModuleModule } from '@multimedia-album-management/extras/youtube-module';
import { SpeechModule } from 'ngx-speech';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './core/app.component';
import {
  CollectionOfMultimediaAlbumsComponent,
} from './features/collection-of-multimedia-albums/collection-of-multimedia-albums.component';
import { FilterCollectionsPipe } from './features/collection-of-multimedia-albums/pipe/filterCollections.pipe';
import { AlbumLoaderComponent } from './features/multimedia-album/album-loader/album-loader.component';
import { LightboxComponent } from './features/multimedia-album/lightbox/lightbox.component';
import { MultimediaAlbumComponent } from './features/multimedia-album/multimedia-album.component';
import { FilterAlbumPipe } from './features/multimedia-album/pipe/filterAlbum.pipe';
import { StandAloneComponent } from './features/multimedia-album/stand-alone/stand-alone.component';
import { AudioModuleComponent } from './shared/modularComponents/audio-module/audio-module.component';
import { ImageModuleComponent } from './shared/modularComponents/image-module/image-module.component';
import { VideoModuleComponent } from './shared/modularComponents/video-module/video-module.component';
import { UploadComponent } from './features/multimedia-album/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MultimediaAlbumComponent,
    CollectionOfMultimediaAlbumsComponent,
    AlbumLoaderComponent,
    ImageModuleComponent,
    VideoModuleComponent,
    AudioModuleComponent,
    FilterCollectionsPipe,
    FilterAlbumPipe,
    StandAloneComponent,
    LightboxComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpeechModule,
    PdfModuleModule,
    SvgModuleModule,
    YoutubeModuleModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: "SPEECH_LANG", useValue: "en-US" }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
