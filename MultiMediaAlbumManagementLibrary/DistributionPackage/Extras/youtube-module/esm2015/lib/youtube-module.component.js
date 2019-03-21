/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class YoutubeModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
YoutubeModuleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-youtube-module',
                template: `
  <iframe
  [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="height:100%;width:100%;overflow:auto;border: 0px;"
  ></iframe>

  `
            }] }
];
/** @nocollapse */
YoutubeModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
YoutubeModuleComponent.propDecorators = {
    source: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    YoutubeModuleComponent.prototype.source;
    /** @type {?} */
    YoutubeModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnQnpELE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFJakMsWUFBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7Ozs7SUFFOUMsUUFBUTtJQUNSLENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUVGOzs7O1lBZlEsWUFBWTs7O3FCQWlCbEIsS0FBSzs7OztJQUFOLHdDQUNZOztJQUVBLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC15b3V0dWJlLW1vZHVsZScsXG4gIHRlbXBsYXRlOiBgXG4gIDxpZnJhbWVcbiAgW3NyY109XCJzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNvdXJjZSlcIlxuICBmcmFtZWJvcmRlcj1cIjBcIlxuICBhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXCJcbiAgYWxsb3dmdWxsc2NyZWVuXG4gIHN0eWxlPVwiaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO2JvcmRlcjogMHB4O1wiXG4gID48L2lmcmFtZT5cblxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFlvdXR1YmVNb2R1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzb3VyY2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19