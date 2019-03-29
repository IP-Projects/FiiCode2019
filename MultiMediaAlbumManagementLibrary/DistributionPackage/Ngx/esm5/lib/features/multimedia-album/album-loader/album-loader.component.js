/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
var AlbumLoaderComponent = /** @class */ (function () {
    function AlbumLoaderComponent(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    AlbumLoaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getEntity(this.sourceUrl.replace("/$entityId", "/" + this.entityId));
    };
    /**
     * @param {?} entityUrl
     * @return {?}
     */
    AlbumLoaderComponent.prototype.getEntity = /**
     * @param {?} entityUrl
     * @return {?}
     */
    function (entityUrl) {
        var _this = this;
        this.api.getData(entityUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.source = data.data;
            _this.extension = data.extension;
        }));
    };
    AlbumLoaderComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-album-loader",
                    template: "<div [ngSwitch]=\"extension\" class=\"wh-100 \">\n  <div *ngSwitchCase=\"'audio'\" class=\"wh-100\">\n    <app-audio-module source=\"{{ source }}\" class=\"wh-100\"> </app-audio-module>\n  </div>\n  <div *ngSwitchCase=\"'video'\" class=\"wh-100\">\n    <app-video-module source=\"{{ source }}\" class=\"wh-100\"> </app-video-module>\n  </div>\n  <div *ngSwitchCase=\"'image'\" class=\"wh-100\">\n    <app-image-module source=\"{{ source }}\" class=\"wh-100\"> </app-image-module>\n  </div>\n  <div *ngSwitchCase=\"'pdf'\" class=\"wh-100\">\n    <app-pdf-module source=\"{{ source }}\" class=\"wh-100\"> </app-pdf-module>\n  </div>\n  <div *ngSwitchCase=\"'svg'\" class=\"wh-100 \">\n    <app-svg-module source=\"{{ source }}\" class=\"wh-100 \"> </app-svg-module>\n  </div>\n  <div *ngSwitchCase=\"'youtube'\" class=\"wh-100 h-90\">\n    <app-youtube-module source=\"{{ source }}\" class=\"wh-100 \"> </app-youtube-module>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AlbumLoaderComponent.ctorParameters = function () { return [
        { type: ApiService }
    ]; };
    AlbumLoaderComponent.propDecorators = {
        sourceUrl: [{ type: Input }],
        entityId: [{ type: Input }]
    };
    return AlbumLoaderComponent;
}());
export { AlbumLoaderComponent };
if (false) {
    /** @type {?} */
    AlbumLoaderComponent.prototype.sourceUrl;
    /** @type {?} */
    AlbumLoaderComponent.prototype.entityId;
    /** @type {?} */
    AlbumLoaderComponent.prototype.source;
    /** @type {?} */
    AlbumLoaderComponent.prototype.extension;
    /** @type {?} */
    AlbumLoaderComponent.prototype.api;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxidW0tbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL211bHRpbWVkaWEtYWxidW0vYWxidW0tbG9hZGVyL2FsYnVtLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU3RDtJQWNFLDhCQUFtQixHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtJQUFHLENBQUM7Ozs7SUFFdEMsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBSSxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7OztJQUVELHdDQUFTOzs7O0lBQVQsVUFBVSxTQUFTO1FBQW5CLGlCQUtDO1FBSkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsSUFBUztZQUM5QyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBekJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwwN0JBQTRDOztpQkFFN0M7Ozs7Z0JBTlEsVUFBVTs7OzRCQVFoQixLQUFLOzJCQUVMLEtBQUs7O0lBa0JSLDJCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FyQlksb0JBQW9COzs7SUFDL0IseUNBQ1U7O0lBQ1Ysd0NBQ1M7O0lBRVQsc0NBQU87O0lBQ1AseUNBQVU7O0lBRUUsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYXBpL2FwaS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImFwcC1hbGJ1bS1sb2FkZXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9hbGJ1bS1sb2FkZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2FsYnVtLWxvYWRlci5jb21wb25lbnQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBBbGJ1bUxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHNvdXJjZVVybDtcbiAgQElucHV0KClcbiAgZW50aXR5SWQ7XG5cbiAgc291cmNlO1xuICBleHRlbnNpb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFwaTogQXBpU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldEVudGl0eSh0aGlzLnNvdXJjZVVybC5yZXBsYWNlKFwiLyRlbnRpdHlJZFwiLCBgLyR7dGhpcy5lbnRpdHlJZH1gKSk7XG4gIH1cblxuICBnZXRFbnRpdHkoZW50aXR5VXJsKSB7XG4gICAgdGhpcy5hcGkuZ2V0RGF0YShlbnRpdHlVcmwpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICB0aGlzLnNvdXJjZSA9IGRhdGEuZGF0YTtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uID0gZGF0YS5leHRlbnNpb247XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==