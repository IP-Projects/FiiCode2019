/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
export { PdfModuleComponent };
if (false) {
    /** @type {?} */
    PdfModuleComponent.prototype.source;
    /** @type {?} */
    PdfModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLW1vZHVsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wZGYtbW9kdWxlLyIsInNvdXJjZXMiOlsibGliL3BkZi1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFlRSw0QkFBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7Ozs7SUFHOUMscUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZ0tBTVQ7aUJBRUY7Ozs7Z0JBWlEsWUFBWTs7O3lCQWNsQixLQUFLOztJQVNSLHlCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FWWSxrQkFBa0I7OztJQUM3QixvQ0FDWTs7SUFFQSx1Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1wZGYtbW9kdWxlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gIDxpZnJhbWVcclxuICBbc3JjXT1cInNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoc291cmNlKVwiXHJcbiAgc3R5bGU9XCJoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87Ym9yZGVyOiAwcHg7XCJcclxuICA+XHJcbiAgPC9pZnJhbWU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQZGZNb2R1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgc291cmNlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuXHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19