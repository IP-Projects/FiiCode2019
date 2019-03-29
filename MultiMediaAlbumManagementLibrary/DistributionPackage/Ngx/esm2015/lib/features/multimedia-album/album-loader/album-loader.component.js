/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
export class AlbumLoaderComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getEntity(this.sourceUrl.replace("/$entityId", `/${this.entityId}`));
    }
    /**
     * @param {?} entityUrl
     * @return {?}
     */
    getEntity(entityUrl) {
        this.api.getData(entityUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.source = data.data;
            this.extension = data.extension;
        }));
    }
}
AlbumLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: "app-album-loader",
                template: "<div [ngSwitch]=\"extension\" class=\"wh-100 \">\n  <div *ngSwitchCase=\"'audio'\" class=\"wh-100\">\n    <app-audio-module source=\"{{ source }}\" class=\"wh-100\"> </app-audio-module>\n  </div>\n  <div *ngSwitchCase=\"'video'\" class=\"wh-100\">\n    <app-video-module source=\"{{ source }}\" class=\"wh-100\"> </app-video-module>\n  </div>\n  <div *ngSwitchCase=\"'image'\" class=\"wh-100\">\n    <app-image-module source=\"{{ source }}\" class=\"wh-100\"> </app-image-module>\n  </div>\n  <div *ngSwitchCase=\"'pdf'\" class=\"wh-100\">\n    <app-pdf-module source=\"{{ source }}\" class=\"wh-100\"> </app-pdf-module>\n  </div>\n  <div *ngSwitchCase=\"'svg'\" class=\"wh-100 \">\n    <app-svg-module source=\"{{ source }}\" class=\"wh-100 \"> </app-svg-module>\n  </div>\n  <div *ngSwitchCase=\"'youtube'\" class=\"wh-100 h-90\">\n    <app-youtube-module source=\"{{ source }}\" class=\"wh-100 \"> </app-youtube-module>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
AlbumLoaderComponent.ctorParameters = () => [
    { type: ApiService }
];
AlbumLoaderComponent.propDecorators = {
    sourceUrl: [{ type: Input }],
    entityId: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxidW0tbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL211bHRpbWVkaWEtYWxidW0vYWxidW0tbG9hZGVyL2FsYnVtLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU83RCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBUy9CLFlBQW1CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQUcsQ0FBQzs7OztJQUV0QyxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLFNBQVM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMDdCQUE0Qzs7YUFFN0M7Ozs7WUFOUSxVQUFVOzs7d0JBUWhCLEtBQUs7dUJBRUwsS0FBSzs7OztJQUZOLHlDQUNVOztJQUNWLHdDQUNTOztJQUVULHNDQUFPOztJQUNQLHlDQUFVOztJQUVFLG1DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2FwaS9hcGkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtYWxidW0tbG9hZGVyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vYWxidW0tbG9hZGVyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9hbGJ1bS1sb2FkZXIuY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWxidW1Mb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzb3VyY2VVcmw7XG4gIEBJbnB1dCgpXG4gIGVudGl0eUlkO1xuXG4gIHNvdXJjZTtcbiAgZXh0ZW5zaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhcGk6IEFwaVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRFbnRpdHkodGhpcy5zb3VyY2VVcmwucmVwbGFjZShcIi8kZW50aXR5SWRcIiwgYC8ke3RoaXMuZW50aXR5SWR9YCkpO1xuICB9XG5cbiAgZ2V0RW50aXR5KGVudGl0eVVybCkge1xuICAgIHRoaXMuYXBpLmdldERhdGEoZW50aXR5VXJsKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5zb3VyY2UgPSBkYXRhLmRhdGE7XG4gICAgICB0aGlzLmV4dGVuc2lvbiA9IGRhdGEuZXh0ZW5zaW9uO1xuICAgIH0pO1xuICB9XG59XG4iXX0=