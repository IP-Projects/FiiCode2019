/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var VideoModuleComponent = /** @class */ (function () {
    function VideoModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    VideoModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    VideoModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-video-module",
                    template: "<video style=\"height:100%;width:100%;border: 0px;\" controls>\n  <source [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\" />\n</video>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    VideoModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    VideoModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return VideoModuleComponent;
}());
export { VideoModuleComponent };
if (false) {
    /** @type {?} */
    VideoModuleComponent.prototype.source;
    /** @type {?} */
    VideoModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tbW9kdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9tb2R1bGFyQ29tcG9uZW50cy92aWRlby1tb2R1bGUvdmlkZW8tbW9kdWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpEO0lBUUUsOEJBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHVDQUFROzs7SUFBUixjQUFZLENBQUM7O2dCQVZkLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwrSkFBNEM7O2lCQUU3Qzs7OztnQkFOUSxZQUFZOzs7eUJBUWxCLEtBQUs7O0lBS1IsMkJBQUM7Q0FBQSxBQVhELElBV0M7U0FOWSxvQkFBb0I7OztJQUMvQixzQ0FDWTs7SUFDQSx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYXBwLXZpZGVvLW1vZHVsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3ZpZGVvLW1vZHVsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vdmlkZW8tbW9kdWxlLmNvbXBvbmVudC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc291cmNlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uSW5pdCgpIHt9XG59XG4iXX0=