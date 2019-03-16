import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-youtube-module",
  templateUrl: "./youtube-module.component.html",
  styleUrls: ["./youtube-module.component.scss"]
})
export class YoutubeModuleComponent implements OnInit {
  @Input()
  source: any;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
