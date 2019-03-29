import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class AudioModuleComponent implements OnInit {
    sanitizer: DomSanitizer;
    source: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
}
