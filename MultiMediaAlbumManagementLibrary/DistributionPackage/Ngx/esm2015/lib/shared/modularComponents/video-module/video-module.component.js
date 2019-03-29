/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class VideoModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
VideoModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-video-module",
                template: "<video style=\"height:100%;width:100%;border: 0px;\" controls>\n  <source [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\" />\n</video>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
VideoModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
VideoModuleComponent.propDecorators = {
    source: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    VideoModuleComponent.prototype.source;
    /** @type {?} */
    VideoModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tbW9kdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9tb2R1bGFyQ29tcG9uZW50cy92aWRlby1tb2R1bGUvdmlkZW8tbW9kdWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3pELE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFHL0IsWUFBbUIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7Ozs7SUFFOUMsUUFBUSxLQUFJLENBQUM7OztZQVZkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QiwrSkFBNEM7O2FBRTdDOzs7O1lBTlEsWUFBWTs7O3FCQVFsQixLQUFLOzs7O0lBQU4sc0NBQ1k7O0lBQ0EseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImFwcC12aWRlby1tb2R1bGVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi92aWRlby1tb2R1bGUuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3ZpZGVvLW1vZHVsZS5jb21wb25lbnQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBWaWRlb01vZHVsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHNvdXJjZTogYW55O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19