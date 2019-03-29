import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CollectionOfMultimediaAlbumsComponent,
} from '../features/collection-of-multimedia-albums/collection-of-multimedia-albums.component';
import { MultimediaAlbumComponent } from './../features/multimedia-album/multimedia-album.component';

const routes: Routes = [
  {
    path: "",
    component: CollectionOfMultimediaAlbumsComponent
  },
  {
    path: ":id",
    component: MultimediaAlbumComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
