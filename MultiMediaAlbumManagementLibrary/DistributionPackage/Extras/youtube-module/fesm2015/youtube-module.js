import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Component, Input, ViewEncapsulation, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YoutubeModuleService {
    constructor() { }
}
YoutubeModuleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
YoutubeModuleService.ctorParameters = () => [];
/** @nocollapse */ YoutubeModuleService.ngInjectableDef = defineInjectable({ factory: function YoutubeModuleService_Factory() { return new YoutubeModuleService(); }, token: YoutubeModuleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YoutubeModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.source = this.source.replace("watch?v=", "embed/");
    }
}
YoutubeModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-youtube-module",
                template: `
    <iframe
      [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="height:100%;width:100%;overflow:auto;border: 0px;"
    ></iframe>
  `,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
YoutubeModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
YoutubeModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YoutubeModuleModule {
}
YoutubeModuleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [YoutubeModuleComponent],
                imports: [],
                exports: [YoutubeModuleComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { YoutubeModuleService, YoutubeModuleComponent, YoutubeModuleModule };

//# sourceMappingURL=youtube-module.js.map