import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Component, Input, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SvgModuleService = /** @class */ (function () {
    function SvgModuleService() {
    }
    SvgModuleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SvgModuleService.ctorParameters = function () { return []; };
    /** @nocollapse */ SvgModuleService.ngInjectableDef = defineInjectable({ factory: function SvgModuleService_Factory() { return new SvgModuleService(); }, token: SvgModuleService, providedIn: "root" });
    return SvgModuleService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SvgModuleComponent = /** @class */ (function () {
    function SvgModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    SvgModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    SvgModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-svg-module',
                    template: "\n  <iframe\n  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n  style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n>\n</iframe>\n\n  "
                }] }
    ];
    /** @nocollapse */
    SvgModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    SvgModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return SvgModuleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SvgModuleModule = /** @class */ (function () {
    function SvgModuleModule() {
    }
    SvgModuleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SvgModuleComponent],
                    imports: [],
                    exports: [SvgModuleComponent]
                },] }
    ];
    return SvgModuleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SvgModuleService, SvgModuleComponent, SvgModuleModule };

//# sourceMappingURL=svg-module.js.map