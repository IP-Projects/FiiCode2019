import { Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: "app-stand-alone",
  templateUrl: "./stand-alone.component.html",
  styleUrls: ["./stand-alone.component.scss"]
})
export class StandAloneComponent implements OnInit {
  @Input()
  gridSize: number; // number of albums displayed on a row

  @Input()
  gridSizeSuggestions: number;

  @Input()
  skip: number;

  @Input()
  take: number;

  @Input()
  albumUrl: string; // api call to retrieve the albums in the Album it can be used for both local and remote resources like a local json or from a server

  @Input()
  suggestedEntityUrl: string; // api call to retrieve the Entities in the Entity

  @Input()
  deleteEntityUrl: string; // api call to delete the Entities in the Entity

  @Input()
  addEntitiesUrl: string;

  @Input()
  getEntityUrl: string;

  @Input()
  slideShow: boolean;

  @Input()
  lockSlideShow: boolean;

  @Input()
  slideShowTimeBeforeNext: number;

  @Input()
  configPath: string;

  // used to redirect to the album
  //placeholders for the images of the album(in 3d mode or image in 2d)
  @Input()
  bootstrapAccentPrimary: string;

  @Input()
  bootstrapAccentSecondary: string;

  constructor(public api: ApiService) {}

  ngOnInit() {}

  loadInputOptionsOrDefault() {
    this.configPath = "../../../assets/config.json";
    if (typeof this.configPath != "undefined") {
      this.api
        .getData(this.configPath)
        .pipe(
          catchError((err) => {
            this.loadDefault();

            return EMPTY;
          }),
          take(1),
          map((data) => {
            console.log("here");
            return data;
          })
        )
        .subscribe((config) => {
          if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
            this.gridSize = config["gridSize"];
          }
          if (
            typeof config["gridSizeSuggestions"] != "undefined" &&
            typeof this.gridSizeSuggestions == "undefined"
          ) {
            this.gridSizeSuggestions = config["gridSizeSuggestions"];
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
          if (typeof config["albumUrl"] != "undefined" && typeof this.albumUrl == "undefined") {
            this.albumUrl = config["albumUrl"];
          }
          if (
            typeof config["suggestedEntityUrl"] != "undefined" &&
            typeof this.suggestedEntityUrl == "undefined"
          ) {
            this.suggestedEntityUrl = config["suggestedEntityUrl"];
          }
          if (
            typeof config["deleteEntityUrl"] != "undefined" &&
            typeof this.deleteEntityUrl == "undefined"
          ) {
            this.deleteEntityUrl = config["deleteEntityUrl"];
          }
          if (
            typeof config["addEntitiesUrl"] != "undefined" &&
            typeof this.addEntitiesUrl == "undefined"
          ) {
            this.addEntitiesUrl = config["addEntitiesUrl"];
          }
          if (
            typeof config["getEntityUrl"] != "undefined" &&
            typeof this.getEntityUrl == "undefined"
          ) {
            this.getEntityUrl = config["getEntityUrl"];
          }
          if (typeof config["slideShow"] != "undefined" && typeof this.slideShow == "undefined") {
            this.slideShow = config["slideShow"];
          }
          if (
            typeof config["lockSlideShow"] != "undefined" &&
            typeof this.lockSlideShow == "undefined"
          ) {
            this.lockSlideShow = config["lockSlideShow"];
          }
          if (
            typeof config["slideShowTimeBeforeNext"] != "undefined" &&
            typeof this.slideShowTimeBeforeNext == "undefined"
          ) {
            this.slideShowTimeBeforeNext = config["slideShowTimeBeforeNext"];
          }
          this.loadDefault();
        });
    } else {
      this.loadDefault();
    }
  }

  loadDefault() {
    if (typeof this.gridSize == "undefined") {
      this.gridSize = 10;
    }
    if (typeof this.gridSizeSuggestions == "undefined") {
      this.gridSizeSuggestions = 3;
    }
    if (typeof this.skip == "undefined") {
      this.skip = 0;
    }
    if (typeof this.take == "undefined") {
      this.take = 10;
    }
    if (typeof this.bootstrapAccentPrimary == "undefined") {
      this.bootstrapAccentPrimary = "danger";
    }
    if (typeof this.bootstrapAccentSecondary == "undefined") {
      this.bootstrapAccentSecondary = "dark";
    }
    if (typeof this.albumUrl == "undefined") {
      this.albumUrl = "";
    }
    if (typeof this.suggestedEntityUrl == "undefined") {
      this.suggestedEntityUrl = "";
    }
    if (typeof this.deleteEntityUrl == "undefined") {
      this.deleteEntityUrl = "";
    }
    if (typeof this.addEntitiesUrl == "undefined") {
      this.addEntitiesUrl = "";
    }
    if (typeof this.getEntityUrl == "undefined") {
      this.getEntityUrl = "";
    }
    if (typeof this.slideShow == "undefined") {
      this.slideShow = false;
    }
    if (typeof this.lockSlideShow == "undefined") {
      this.lockSlideShow = false;
    }
    if (typeof this.slideShowTimeBeforeNext == "undefined") {
      this.slideShowTimeBeforeNext = 5000;
    }

    var albumInputs = {
      gridSize: this.gridSize,
      gridSizeSuggestions: this.gridSizeSuggestions,
      skip: this.skip,
      take: this.take,
      bootstrapAccentPrimary: this.bootstrapAccentPrimary,
      bootstrapAccentSecondary: this.bootstrapAccentSecondary,
      albumUrl: this.albumUrl,
      suggestedEntityUrl: this.suggestedEntityUrl,
      deleteEntityUrl: this.deleteEntityUrl,
      addEntitiesUrl: this.addEntitiesUrl,
      getEntityUrl: this.getEntityUrl,
      lockSlideShow: this.lockSlideShow,
      slideShow: this.slideShow,
      slideShowTimeBeforeNext: this.slideShowTimeBeforeNext
    };
    sessionStorage.setItem("albumInputs", JSON.stringify(albumInputs));
  }
}
