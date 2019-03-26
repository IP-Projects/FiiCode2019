(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('svg-module', ['exports', '@angular/platform-browser', '@angular/core'], factory) :
    (factory((global['svg-module'] = {}),global.ng.platformBrowser,global.ng.core));
}(this, (function (exports,platformBrowser,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SvgModuleService = /** @class */ (function () {
        function SvgModuleService() {
        }
        SvgModuleService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SvgModuleService.ctorParameters = function () { return []; };
        /** @nocollapse */ SvgModuleService.ngInjectableDef = i0.defineInjectable({ factory: function SvgModuleService_Factory() { return new SvgModuleService(); }, token: SvgModuleService, providedIn: "root" });
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
            function () { };
        SvgModuleComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: "app-svg-module",
                        template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    >\n    </iframe>\n  ",
                        encapsulation: i0.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        SvgModuleComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        SvgModuleComponent.propDecorators = {
            source: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
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

    exports.SvgModuleService = SvgModuleService;
    exports.SvgModuleComponent = SvgModuleComponent;
    exports.SvgModuleModule = SvgModuleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=svg-module.umd.js.map