(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('pdf-module', ['exports', '@angular/platform-browser', '@angular/core'], factory) :
    (factory((global['pdf-module'] = {}),global.ng.platformBrowser,global.ng.core));
}(this, (function (exports,platformBrowser,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PdfModuleService = /** @class */ (function () {
        function PdfModuleService() {
        }
        PdfModuleService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PdfModuleService.ctorParameters = function () { return []; };
        /** @nocollapse */ PdfModuleService.ngInjectableDef = i0.defineInjectable({ factory: function PdfModuleService_Factory() { return new PdfModuleService(); }, token: PdfModuleService, providedIn: "root" });
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
            function () { };
        PdfModuleComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: "app-pdf-module",
                        template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    >\n    </iframe>\n  ",
                        encapsulation: i0.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        PdfModuleComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        PdfModuleComponent.propDecorators = {
            source: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
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

    exports.PdfModuleService = PdfModuleService;
    exports.PdfModuleComponent = PdfModuleComponent;
    exports.PdfModuleModule = PdfModuleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=pdf-module.umd.js.map