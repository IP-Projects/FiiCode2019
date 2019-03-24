import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api/api.service';

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
  userId: String;

  @Input()
  collectionUrl: String; // api call to retrieve the albums in the collection it can be used for both local and remote resources like a local json or from a server

  @Input()
  suggestedCollectionUrl: String; // api call to retrieve the albums in the collection

  @Input()
  deleteCollectionUrl: String; // api call to delete the albums in the collection

  @Input()
  albumUrl: String; // api call to retrieve the album in the collection

  @Input()
  skip: Number; // api call to retrieve the album in the collection

  @Input()
  take: Number; // api call to retrieve the album in the collection

  @Input()
  configPath: string;

  // used to redirect to the album
  //placeholders for the images of the album(in 3d mode or image in 2d)
  @Input()
  bootstrapAccentPrimary: String;

  @Input()
  bootstrapAccentSecondary: String;

  _collectionData;
  _suggestedCollectionData;
  _searchText;
  _toggleView;

  _bootstrapAccentPrimary;
  _bootstrapAccentSecondary;

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.loadInputOptionsOrDefault();
    this.api
      .getData("http://localhost:49773/api/Users/public/00000000-0000-0000-0000-000000000000/10/0")
      .subscribe((data) => {
        this._collectionData = data;
        console.log(data);
      });

    this.api
      .getData(
        "http://localhost:49773/api/Users/public/00000000-0000-0000-0000-000000000000/10/0/a,d"
      )
      .subscribe((data) => {
        this._suggestedCollectionData = data;
        console.log(data);
      });
  }

  loadInputOptionsOrDefault() {
    this.api
      .getData(this.configPath)
      .pipe(take(1))
      .subscribe((config) => {
        if (typeof config["userId"] != "undefined" && typeof this.userId == "undefined") {
          this.userId = config["userId"];
        }
        if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
          this.gridSize = config["gridSize"];
        }
        if (
          typeof config["collectionUrl"] != "undefined" &&
          typeof this.collectionUrl == "undefined"
        ) {
          this.collectionUrl = config["collectionUrl"];
        }
        if (
          typeof config["suggestedCollectionUrl"] != "undefined" &&
          typeof this.suggestedCollectionUrl == "undefined"
        ) {
          this.suggestedCollectionUrl = config["suggestedCollectionUrl"];
        }
        if (
          typeof config["deleteCollectionUrl"] != "undefined" &&
          typeof this.deleteCollectionUrl == "undefined"
        ) {
          this.deleteCollectionUrl = config["deleteCollectionUrl"];
        }
        if (typeof config["albumUrl"] != "undefined" && typeof this.albumUrl == "undefined") {
          this.albumUrl = config["albumUrl"];
        }
        if (typeof config["skip"] != "undefined" && typeof this.skip == "undefined") {
          this.skip = config["skip"];
        }
        if (typeof config["take"] != "undefined" && typeof this.take == "undefined") {
          this.take = config["take"];
        }
        if (
          typeof config["bootstrapAccentPrimary"] != "undefined" &&
          typeof this.bootstrapAccentPrimary == "undefined"
        ) {
          this.bootstrapAccentPrimary = config["bootstrapAccentPrimary"];
        }
        if (
          typeof config["bootstrapAccentSecondary"] != "undefined" &&
          typeof this.bootstrapAccentSecondary == "undefined"
        ) {
          this.bootstrapAccentSecondary = config["bootstrapAccentSecondary"];
        }
        this.loadDefault();
      });
  }
  loadDefault() {
    if (typeof this.userId == "undefined") {
      this.userId = "00000000-0000-0000-0000-000000000000";
    }
    if (typeof this.gridSize == "undefined") {
      this.gridSize = 10;
    }
    if (typeof this.collectionUrl == "undefined") {
      this.collectionUrl = "";
    }
    if (typeof this.suggestedCollectionUrl == "undefined") {
      this.suggestedCollectionUrl = "";
    }
    if (typeof this.deleteCollectionUrl == "undefined") {
      this.deleteCollectionUrl = "";
    }
    if (typeof this.albumUrl == "undefined") {
      this.albumUrl = "";
    }
    if (typeof this.skip == "undefined") {
      this.skip = 0;
    }
    if (typeof this.take == "undefined") {
      this.take = 0;
    }
    if (typeof this.bootstrapAccentPrimary == "undefined") {
      this.bootstrapAccentPrimary = "dark";
    }
    if (typeof this.bootstrapAccentSecondary == "undefined") {
      this.bootstrapAccentSecondary = "secondary";
    }
  }
}
