/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
                    template: "\n    <iframe\n      [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n      frameborder=\"0\"\n      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n      allowfullscreen\n      style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n    ></iframe>\n  ",
                    encapsulation: ViewEncapsulation.Native
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFrQkUsZ0NBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQXRCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGlUQVFUO29CQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO2lCQUN4Qzs7OztnQkFmUSxZQUFZOzs7eUJBaUJsQixLQUFLOztJQVFSLDZCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FUWSxzQkFBc0I7OztJQUNqQyx3Q0FDWTs7SUFFQSwyQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC15b3V0dWJlLW1vZHVsZVwiLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8aWZyYW1lXHJcbiAgICAgIFtzcmNdPVwic2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChzb3VyY2UpXCJcclxuICAgICAgZnJhbWVib3JkZXI9XCIwXCJcclxuICAgICAgYWxsb3c9XCJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZVwiXHJcbiAgICAgIGFsbG93ZnVsbHNjcmVlblxyXG4gICAgICBzdHlsZT1cImhlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztib3JkZXI6IDBweDtcIlxyXG4gICAgPjwvaWZyYW1lPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmVcclxufSlcclxuZXhwb3J0IGNsYXNzIFlvdXR1YmVNb2R1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgc291cmNlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuc291cmNlLnJlcGxhY2UoXCJ3YXRjaD92PVwiLCBcImVtYmVkL1wiKTtcclxuICB9XHJcbn1cclxuIl19