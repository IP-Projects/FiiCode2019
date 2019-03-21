/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class PdfModuleComponent {
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
PdfModuleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pdf-module',
                template: `
  <iframe
  [src]="sanitizer.bypassSecurityTrustResourceUrl(source)"
  style="height:100%;width:100%;overflow:auto;border: 0px;"
  >
  </iframe>
  `
            }] }
];
/** @nocollapse */
PdfModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
PdfModuleComponent.propDecorators = {
    source: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PdfModuleComponent.prototype.source;
    /** @type {?} */
    PdfModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLW1vZHVsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wZGYtbW9kdWxlLyIsInNvdXJjZXMiOlsibGliL3BkZi1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFhekQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUk3QixZQUFtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQzs7OztJQUc5QyxRQUFRO0lBQ1IsQ0FBQzs7O1lBbkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7OztHQU1UO2FBRUY7Ozs7WUFaUSxZQUFZOzs7cUJBY2xCLEtBQUs7Ozs7SUFBTixvQ0FDWTs7SUFFQSx1Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcGRmLW1vZHVsZScsXG4gIHRlbXBsYXRlOiBgXG4gIDxpZnJhbWVcbiAgW3NyY109XCJzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNvdXJjZSlcIlxuICBzdHlsZT1cImhlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztib3JkZXI6IDBweDtcIlxuICA+XG4gIDwvaWZyYW1lPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBkZk1vZHVsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHNvdXJjZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiJdfQ==