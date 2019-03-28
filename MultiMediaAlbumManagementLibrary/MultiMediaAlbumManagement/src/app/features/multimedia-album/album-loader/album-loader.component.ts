import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: "app-album-loader",
  templateUrl: "./album-loader.component.html",
  styleUrls: ["./album-loader.component.scss"]
})
export class AlbumLoaderComponent implements OnInit {
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

  @Input()
  sourceUrl;
  @Input()
  entityId;

  source;
  extension;

  constructor(public api: ApiService) {}

  ngOnInit() {
    // if (JSON.parse(this.loadExtraModules)) {
    //   this.loadExtraModulesFunction();
    // }
    this.getEntity(this.sourceUrl.replace("/$entityId", `/${this.entityId}`));
  }

  getEntity(entityUrl) {
    this.api.getData(entityUrl).subscribe((data: any) => {
      //if isUrl == true transform to blob
      console.log(data);
      this.source = data.data;
      this.extension = data.extension;
    });
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
