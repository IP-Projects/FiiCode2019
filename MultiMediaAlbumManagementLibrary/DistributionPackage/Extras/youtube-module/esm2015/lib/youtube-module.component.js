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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1tb2R1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veW91dHViZS1tb2R1bGUvIiwic291cmNlcyI6WyJsaWIveW91dHViZS1tb2R1bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFlekQsTUFBTSxPQUFPLHNCQUFzQjs7OztJQUlqQyxZQUFtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQzs7OztJQUU5QyxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7YUFFRjs7OztZQWRRLFlBQVk7OztxQkFnQmxCLEtBQUs7Ozs7SUFBTix3Q0FDWTs7SUFFQSwyQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAteW91dHViZS1tb2R1bGVcIixcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGlmcmFtZVxyXG4gICAgICBbc3JjXT1cInNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoc291cmNlKVwiXHJcbiAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXHJcbiAgICAgIGFsbG93PVwiYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmVcIlxyXG4gICAgICBhbGxvd2Z1bGxzY3JlZW5cclxuICAgICAgc3R5bGU9XCJoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87Ym9yZGVyOiAwcHg7XCJcclxuICAgID48L2lmcmFtZT5cclxuICBgLFxyXG4gIHN0eWxlczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIFlvdXR1YmVNb2R1bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgc291cmNlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuc291cmNlLnJlcGxhY2UoXCJ3YXRjaD92PVwiLCBcImVtYmVkL1wiKTtcclxuICB9XHJcbn1cclxuIl19