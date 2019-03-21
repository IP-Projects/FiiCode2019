/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
export { SvgModuleComponent };
if (false) {
    /** @type {?} */
    SvgModuleComponent.prototype.source;
    /** @type {?} */
    SvgModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLW1vZHVsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdmctbW9kdWxlLyIsInNvdXJjZXMiOlsibGliL3N2Zy1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFnQkUsNEJBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHFDQUFROzs7SUFBUjtJQUNBLENBQUM7O2dCQW5CRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDhKQU9UO2lCQUVGOzs7O2dCQWJRLFlBQVk7Ozt5QkFlbEIsS0FBSzs7SUFRUix5QkFBQztDQUFBLEFBckJELElBcUJDO1NBVFksa0JBQWtCOzs7SUFDN0Isb0NBQ1k7O0lBRUEsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3ZnLW1vZHVsZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICA8aWZyYW1lXHJcbiAgW3NyY109XCJzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNvdXJjZSlcIlxyXG4gIHN0eWxlPVwiaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO2JvcmRlcjogMHB4O1wiXHJcbj5cclxuPC9pZnJhbWU+XHJcblxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3ZnTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIHNvdXJjZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19