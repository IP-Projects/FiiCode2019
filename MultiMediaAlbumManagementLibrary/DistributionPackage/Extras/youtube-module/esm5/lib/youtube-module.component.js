/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
        { type: Component, args: [{
                    selector: "app-youtube-module",
                    template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      frameborder=\"0\"\n      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n      allowfullscreen\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    ></iframe>\n  "
                }] }
    ];
    /** @nocollapse */
    YoutubeModuleComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    YoutubeModuleComponent.propDecorators = {
        source: [{ type: Input }]
    };
    return YoutubeModuleComponent;
}());
export { YoutubeModuleComponent };
if (false) {
    /** @type {?} */
    YoutubeModuleComponent.prototype.source;
    /** @type {?} */
    YoutubeModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFpQkUsZ0NBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGlUQVFUO2lCQUVGOzs7O2dCQWRRLFlBQVk7Ozt5QkFnQmxCLEtBQUs7O0lBUVIsNkJBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQVRZLHNCQUFzQjs7O0lBQ2pDLHdDQUNZOztJQUVBLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC15b3V0dWJlLW1vZHVsZVwiLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8aWZyYW1lXHJcbiAgICAgIFtzcmNdPVwic2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChzb3VyY2UpXCJcclxuICAgICAgZnJhbWVib3JkZXI9XCIwXCJcclxuICAgICAgYWxsb3c9XCJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZVwiXHJcbiAgICAgIGFsbG93ZnVsbHNjcmVlblxyXG4gICAgICBzdHlsZT1cImhlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztib3JkZXI6IDBweDtcIlxyXG4gICAgPjwvaWZyYW1lPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWW91dHViZU1vZHVsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBzb3VyY2U6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc291cmNlID0gdGhpcy5zb3VyY2UucmVwbGFjZShcIndhdGNoP3Y9XCIsIFwiZW1iZWQvXCIpO1xyXG4gIH1cclxufVxyXG4iXX0=