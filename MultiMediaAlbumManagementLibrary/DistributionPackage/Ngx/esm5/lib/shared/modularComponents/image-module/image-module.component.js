/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ImageModuleComponent = /** @class */ (function () {
    function ImageModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ImageModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    ImageModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-image-module",
                    template: "<img\n  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n  style=\"height:100%;width:100%;border: 0px;\"\n/>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ImageModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    ImageModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return ImageModuleComponent;
}());
export { ImageModuleComponent };
if (false) {
    /** @type {?} */
    ImageModuleComponent.prototype.source;
    /** @type {?} */
    ImageModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbW9kdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9tb2R1bGFyQ29tcG9uZW50cy9pbWFnZS1tb2R1bGUvaW1hZ2UtbW9kdWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpEO0lBU0UsOEJBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHVDQUFROzs7SUFBUixjQUFZLENBQUM7O2dCQVhkLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixxSUFBNEM7O2lCQUU3Qzs7OztnQkFOUSxZQUFZOzs7eUJBUWxCLEtBQUs7O0lBTVIsMkJBQUM7Q0FBQSxBQVpELElBWUM7U0FQWSxvQkFBb0I7OztJQUMvQixzQ0FDWTs7SUFFQSx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYXBwLWltYWdlLW1vZHVsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2ltYWdlLW1vZHVsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vaW1hZ2UtbW9kdWxlLmNvbXBvbmVudC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc291cmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCkge31cbn1cbiJdfQ==