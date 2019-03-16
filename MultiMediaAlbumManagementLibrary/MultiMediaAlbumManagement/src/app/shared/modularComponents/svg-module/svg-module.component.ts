import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-svg-module",
  templateUrl: "./svg-module.component.html",
  styleUrls: ["./svg-module.component.scss"]
})
export class SvgModuleComponent implements OnInit {
  @Input()
  source: any;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
