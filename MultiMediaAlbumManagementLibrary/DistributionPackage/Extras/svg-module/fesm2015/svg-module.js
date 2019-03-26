import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Component, Input, ViewEncapsulation, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SvgModuleService {
    constructor() { }
}
SvgModuleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SvgModuleService.ctorParameters = () => [];
/** @nocollapse */ SvgModuleService.ngInjectableDef = defineInjectable({ factory: function SvgModuleService_Factory() { return new SvgModuleService(); }, token: SvgModuleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SvgModuleComponent {
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
SvgModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-svg-module",
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
SvgModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
SvgModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SvgModuleModule {
}
SvgModuleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SvgModuleComponent],
                imports: [],
                exports: [SvgModuleComponent]
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

export { SvgModuleService, SvgModuleComponent, SvgModuleModule };

//# sourceMappingURL=svg-module.js.map