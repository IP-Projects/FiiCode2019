import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-module',
  template: `
  <iframe
  [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="height:100%;width:100%;overflow:auto;border: 0px;"
  ></iframe>

  `,
  styles: []
})
export class YoutubeModuleComponent implements OnInit {
  @Input()
  source: any;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

}
