import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Component, Input, ViewEncapsulation, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PdfModuleService {
    constructor() { }
}
PdfModuleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PdfModuleService.ctorParameters = () => [];
/** @nocollapse */ PdfModuleService.ngInjectableDef = defineInjectable({ factory: function PdfModuleService_Factory() { return new PdfModuleService(); }, token: PdfModuleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PdfModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
PdfModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-pdf-module",
                template: `
    <iframe
      [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
      style="height:100%;width:100%;overflow:auto;border: 0px;"
    >
    </iframe>
  `,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PdfModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
PdfModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PdfModuleModule {
}
PdfModuleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PdfModuleComponent],
                imports: [],
                exports: [PdfModuleComponent]
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

export { PdfModuleService, PdfModuleComponent, PdfModuleModule };

//# sourceMappingURL=pdf-module.js.map