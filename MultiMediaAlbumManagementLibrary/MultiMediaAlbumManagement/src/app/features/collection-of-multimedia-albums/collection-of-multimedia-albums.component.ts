import { Component, Input, OnInit } from '@angular/core';
import { ICollectionOptions } from 'src/app/shared/interfaces/ICollectionOptions';

@Component({
  selector: "app-collection-of-multimedia-albums",
  templateUrl: "./collection-of-multimedia-albums.component.html",
  styleUrls: ["./collection-of-multimedia-albums.component.scss"]
})
export class CollectionOfMultimediaAlbumsComponent implements OnInit {
  /**
   * Specific options will override batch options from json object
   */
  @Input()
  gridSize: Number; // number of albums displayed on a row

  @Input()
  collectionUrl: String; // api call to retrieve the albums in the collection

  @Input()
  collectionData: String; // this will be primary data source, if empty the api will be called

  // used to redirect to the album
  //placeholders for the images of the album(in 3d mode or image in 2d)
  @Input()
  options: ICollectionOptions;

  _gridSize;
  _collectionData;
  constructor() {}

  ngOnInit() {
    // this._gridSize = "grid-size-" + this.gridSize;
    // this._gridSize = "grid-size-" + this.options.gridSize
  }
}
