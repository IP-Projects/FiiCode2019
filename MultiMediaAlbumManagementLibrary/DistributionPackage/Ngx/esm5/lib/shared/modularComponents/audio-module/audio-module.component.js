/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var AudioModuleComponent = /** @class */ (function () {
    function AudioModuleComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    AudioModuleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    AudioModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-audio-module",
                    template: "<audio style=\"height:100%;width:100%;border: 0px;\" controls>\n  <source [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\" />\n</audio>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AudioModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    AudioModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return AudioModuleComponent;
}());
export { AudioModuleComponent };
if (false) {
    /** @type {?} */
    AudioModuleComponent.prototype.source;
    /** @type {?} */
    AudioModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tbW9kdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9tb2R1bGFyQ29tcG9uZW50cy9hdWRpby1tb2R1bGUvYXVkaW8tbW9kdWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpEO0lBU0UsOEJBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHVDQUFROzs7SUFBUixjQUFZLENBQUM7O2dCQVhkLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwrSkFBNEM7O2lCQUU3Qzs7OztnQkFOUSxZQUFZOzs7eUJBUWxCLEtBQUs7O0lBTVIsMkJBQUM7Q0FBQSxBQVpELElBWUM7U0FQWSxvQkFBb0I7OztJQUMvQixzQ0FDWTs7SUFFQSx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYXBwLWF1ZGlvLW1vZHVsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2F1ZGlvLW1vZHVsZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vYXVkaW8tbW9kdWxlLmNvbXBvbmVudC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEF1ZGlvTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc291cmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCkge31cbn1cbiJdfQ==