import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-album-loader",
  templateUrl: "./album-loader.component.html",
  styleUrls: ["./album-loader.component.scss"]
})
export class AlbumLoaderComponent implements OnInit {
  _albumData;

  @Input()
  loadExtraModules;
  @Input()
  loadPdf;
  @Input()
  loadSvg;
  @Input()
  loadYoutube;
  @Input()
  pathToExtraModules: string;

  _collectionData;
  constructor() {}

  ngOnInit() {
    // if (JSON.parse(this.loadExtraModules)) {
    //   this.loadExtraModulesFunction();
    // }
  }

  // loadExtraModulesFunction() {
  //   if (!(this.pathToExtraModules == null || typeof (this.pathToExtraModules == undefined))) {
  //     try {
  //       require.resolve("/node_modules/@multimedia-album-management/extras");
  //       this.pathToExtraModules = "/node_modules/@multimedia-album-management/extras";
  //     } catch (e) {
  //       console.error("Modules not install by user or npm");
  //       return;
  //     }

  //     if (JSON.parse(this.loadPdf)) {
  //       require(this.pathToExtraModules + "/pdf-module/index.js");
  //     }
  //     if (JSON.parse(this.loadSvg + "/svg-module/index.js")) {
  //       require(this.pathToExtraModules);
  //     }
  //     if (JSON.parse(this.loadYoutube + "/youtube-module/index.js")) {
  //       require(this.pathToExtraModules);
  //     }
  //   }
  // }
}
