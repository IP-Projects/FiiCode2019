/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    ApiService.prototype.getData = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.get(url);
    };
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    ApiService.prototype.postData = /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    function (url, data) {
        return this.http.post(url, data);
    };
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    ApiService.prototype.putData = /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    function (url, data) {
        return this.http.put(url, data);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ApiService.prototype.deleteData = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.delete(url);
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] }
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient)); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());
export { ApiService };
if (false) {
    /** @type {?} */
    ApiService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbXVsdGktbWVkaWEtYWxidW0tbWFuYWdlbWVudC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvYXBpL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRTNDO0lBSUUsb0JBQW1CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBRyxDQUFDOzs7OztJQUNoQyw0QkFBTzs7OztJQUFkLFVBQWUsR0FBRztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUNNLDZCQUFROzs7OztJQUFmLFVBQWdCLEdBQUcsRUFBRSxJQUFJO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUNNLDRCQUFPOzs7OztJQUFkLFVBQWUsR0FBRyxFQUFFLElBQUk7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFDTSwrQkFBVTs7OztJQUFqQixVQUFrQixHQUFHO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Z0JBaEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTFEsVUFBVTs7O3FCQUFuQjtDQW9CQyxBQWpCRCxJQWlCQztTQWRZLFVBQVU7OztJQUNULDBCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50KSB7fVxuICBwdWJsaWMgZ2V0RGF0YSh1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xuICB9XG4gIHB1YmxpYyBwb3N0RGF0YSh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBkYXRhKTtcbiAgfVxuICBwdWJsaWMgcHV0RGF0YSh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIGRhdGEpO1xuICB9XG4gIHB1YmxpYyBkZWxldGVEYXRhKHVybCkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCk7XG4gIH1cbn1cbiJdfQ==