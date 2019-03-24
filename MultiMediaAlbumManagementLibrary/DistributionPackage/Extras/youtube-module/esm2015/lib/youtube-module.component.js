/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
        this.source = this.source.replace("watch?v=", "embed/");
    }
}
YoutubeModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-youtube-module",
                template: `
    <iframe
      [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="height:100%;width:100%;overflow:auto;border: 0px;"
    ></iframe>
  `,
                encapsulation: ViewEncapsulation.Native
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnQnpELE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFJakMsWUFBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7Ozs7SUFFOUMsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO2dCQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO2FBQ3hDOzs7O1lBZlEsWUFBWTs7O3FCQWlCbEIsS0FBSzs7OztJQUFOLHdDQUNZOztJQUVBLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXlvdXR1YmUtbW9kdWxlXCIsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxpZnJhbWVcclxuICAgICAgW3NyY109XCJzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNvdXJjZSlcIlxyXG4gICAgICBmcmFtZWJvcmRlcj1cIjBcIlxyXG4gICAgICBhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXCJcclxuICAgICAgYWxsb3dmdWxsc2NyZWVuXHJcbiAgICAgIHN0eWxlPVwiaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO2JvcmRlcjogMHB4O1wiXHJcbiAgICA+PC9pZnJhbWU+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWW91dHViZU1vZHVsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBzb3VyY2U6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc291cmNlID0gdGhpcy5zb3VyY2UucmVwbGFjZShcIndhdGNoP3Y9XCIsIFwiZW1iZWQvXCIpO1xyXG4gIH1cclxufVxyXG4iXX0=