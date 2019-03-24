(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('youtube-module', ['exports', '@angular/platform-browser', '@angular/core'], factory) :
    (factory((global['youtube-module'] = {}),global.ng.platformBrowser,global.ng.core));
}(this, (function (exports,platformBrowser,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var YoutubeModuleService = /** @class */ (function () {
        function YoutubeModuleService() {
        }
        YoutubeModuleService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        YoutubeModuleService.ctorParameters = function () { return []; };
        /** @nocollapse */ YoutubeModuleService.ngInjectableDef = i0.defineInjectable({ factory: function YoutubeModuleService_Factory() { return new YoutubeModuleService(); }, token: YoutubeModuleService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: "app-youtube-module",
                        template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      frameborder=\"0\"\n      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n      allowfullscreen\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    ></iframe>\n  ",
                        encapsulation: i0.ViewEncapsulation.Native
                    }] }
        ];
        /** @nocollapse */
        YoutubeModuleComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        YoutubeModuleComponent.propDecorators = {
            source: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
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

    exports.YoutubeModuleService = YoutubeModuleService;
    exports.YoutubeModuleComponent = YoutubeModuleComponent;
    exports.YoutubeModuleModule = YoutubeModuleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=youtube-module.umd.js.map