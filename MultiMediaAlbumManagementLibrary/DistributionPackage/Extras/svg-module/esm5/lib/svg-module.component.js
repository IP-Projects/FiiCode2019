/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
        { type: Component, args: [{
                    selector: "app-svg-module",
                    template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    >\n    </iframe>\n  ",
                    encapsulation: ViewEncapsulation.None
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
export { SvgModuleComponent };
if (false) {
    /** @type {?} */
    SvgModuleComponent.prototype.source;
    /** @type {?} */
    SvgModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLW1vZHVsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdmctbW9kdWxlLyIsInNvdXJjZXMiOlsibGliL3N2Zy1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFnQkUsNEJBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHFDQUFROzs7SUFBUixjQUFZLENBQUM7O2dCQWxCZCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDhLQU1UO29CQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnQkFiUSxZQUFZOzs7eUJBZWxCLEtBQUs7O0lBTVIseUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVBZLGtCQUFrQjs7O0lBQzdCLG9DQUNZOztJQUVBLHVDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXN2Zy1tb2R1bGVcIixcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGlmcmFtZVxyXG4gICAgICBbc3JjXT1cInNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoc291cmNlKVwiXHJcbiAgICAgIHN0eWxlPVwiaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO2JvcmRlcjogMHB4O1wiXHJcbiAgICA+XHJcbiAgICA8L2lmcmFtZT5cclxuICBgLFxyXG4gIHN0eWxlczogW10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3ZnTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIHNvdXJjZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxufVxyXG4iXX0=