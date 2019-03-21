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
    };
    YoutubeModuleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-youtube-module',
                    template: "\n  <iframe\n  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n  frameborder=\"0\"\n  allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n  allowfullscreen\n  style=\"height:100%;width:100%;overflow:auto;border: 0px;\"\n  ></iframe>\n\n  "
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFrQkUsZ0NBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDOzs7O0lBRTlDLHlDQUFROzs7SUFBUjtJQUNBLENBQUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLDJSQVNUO2lCQUVGOzs7O2dCQWZRLFlBQVk7Ozt5QkFpQmxCLEtBQUs7O0lBUVIsNkJBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQVRZLHNCQUFzQjs7O0lBQ2pDLHdDQUNZOztJQUVBLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC15b3V0dWJlLW1vZHVsZScsXG4gIHRlbXBsYXRlOiBgXG4gIDxpZnJhbWVcbiAgW3NyY109XCJzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNvdXJjZSlcIlxuICBmcmFtZWJvcmRlcj1cIjBcIlxuICBhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXCJcbiAgYWxsb3dmdWxsc2NyZWVuXG4gIHN0eWxlPVwiaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO2JvcmRlcjogMHB4O1wiXG4gID48L2lmcmFtZT5cblxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFlvdXR1YmVNb2R1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19