/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class SvgModuleComponent {
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
SvgModuleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-svg-module',
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
SvgModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
SvgModuleComponent.propDecorators = {
    source: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SvgModuleComponent.prototype.source;
    /** @type {?} */
    SvgModuleComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLW1vZHVsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdmctbW9kdWxlLyIsInNvdXJjZXMiOlsibGliL3N2Zy1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFjekQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUk3QixZQUFtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQzs7OztJQUU5QyxRQUFRO0lBQ1IsQ0FBQzs7O1lBbkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7R0FPVDthQUVGOzs7O1lBYlEsWUFBWTs7O3FCQWVsQixLQUFLOzs7O0lBQU4sb0NBQ1k7O0lBRUEsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXN2Zy1tb2R1bGUnLFxuICB0ZW1wbGF0ZTogYFxuICA8aWZyYW1lXG4gIFtzcmNdPVwic2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChzb3VyY2UpXCJcbiAgc3R5bGU9XCJoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87Ym9yZGVyOiAwcHg7XCJcbj5cbjwvaWZyYW1lPlxuXG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgU3ZnTW9kdWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc291cmNlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiJdfQ==