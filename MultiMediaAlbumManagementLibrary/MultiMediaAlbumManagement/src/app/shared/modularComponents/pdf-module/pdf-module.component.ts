import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-pdf-module",
  templateUrl: "./pdf-module.component.html",
  styleUrls: ["./pdf-module.component.scss"]
})
export class PdfModuleComponent implements OnInit {
  @Input()
  source: any;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
