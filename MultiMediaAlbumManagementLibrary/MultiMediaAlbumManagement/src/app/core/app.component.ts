import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "MultiMediaAlbumManagement";
  constructor() {
    // this.importExternalModule();
  }

  // importExternalModule() {
  //   var ceva = require("../externalModule/pdfModule.js");
  //   ceva.whatever();
  // }
}
