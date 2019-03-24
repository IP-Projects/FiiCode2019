import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Component, Input, ViewEncapsulation, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YoutubeModuleService = /** @class */ (function () {
    function YoutubeModuleService() {
    }
    YoutubeModuleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    YoutubeModuleService.ctorParameters = function () { return []; };
    /** @nocollapse */ YoutubeModuleService.ngInjectableDef = defineInjectable({ factory: function YoutubeModuleService_Factory() { return new YoutubeModuleService(); }, token: YoutubeModuleService, providedIn: "root" });
    return YoutubeModuleService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YoutubeModuleComponent = /** @class */ (function () {
    function YoutubeModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    YoutubeModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.source = this.source.replace("watch?v=", "embed/");
    };
    YoutubeModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-youtube-module",
                    template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      frameborder=\"0\"\n      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n      allowfullscreen\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    ></iframe>\n  ",
                    encapsulation: ViewEncapsulation.Native
                }] }
    ];
    /** @nocollapse */
    YoutubeModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    YoutubeModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return YoutubeModuleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YoutubeModuleModule = /** @class */ (function () {
    function YoutubeModuleModule() {
    }
    YoutubeModuleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [YoutubeModuleComponent],
                    imports: [],
                    exports: [YoutubeModuleComponent]
                },] }
    ];
    return YoutubeModuleModule;
}());

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