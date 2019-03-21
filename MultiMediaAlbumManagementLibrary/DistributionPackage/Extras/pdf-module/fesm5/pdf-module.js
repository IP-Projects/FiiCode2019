import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, NgModule, Component, Input, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PdfModuleService = /** @class */ (function () {
    function PdfModuleService() {
    }
    PdfModuleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PdfModuleService.ctorParameters = function () { return []; };
    /** @nocollapse */ PdfModuleService.ngInjectableDef = defineInjectable({ factory: function PdfModuleService_Factory() { return new PdfModuleService(); }, token: PdfModuleService, providedIn: "root" });
    return PdfModuleService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PdfModuleComponent = /** @class */ (function () {
    function PdfModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    PdfModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    PdfModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-pdf-module',
                    template: "\n  <iframe\n  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n  style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n  >\n  </iframe>\n  "
                }] }
    ];
    /** @nocollapse */
    PdfModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    PdfModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return PdfModuleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PdfModuleModule = /** @class */ (function () {
    function PdfModuleModule() {
    }
    PdfModuleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [PdfModuleComponent],
                    imports: [],
                    exports: [PdfModuleComponent]
                },] }
    ];
    return PdfModuleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PdfModuleService, PdfModuleComponent, PdfModuleModule };

//# sourceMappingURL=pdf-module.js.map