/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApiService } from '../../../shared/api/api.service';
var StandAloneComponent = /** @class */ (function () {
    function StandAloneComponent(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    StandAloneComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    StandAloneComponent.prototype.loadInputOptionsOrDefault = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.configPath = "../../../assets/config.json";
        if (typeof this.configPath != "undefined") {
            this.api
                .getData(this.configPath)
                .pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.loadDefault();
                return EMPTY;
            })), take(1), map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                console.log("here");
                return data;
            })))
                .subscribe((/**
             * @param {?} config
             * @return {?}
             */
            function (config) {
                if (typeof config["gridSize"] != "undefined" && typeof _this.gridSize == "undefined") {
                    _this.gridSize = config["gridSize"];
                }
                if (typeof config["gridSizeSuggestions"] != "undefined" &&
                    typeof _this.gridSizeSuggestions == "undefined") {
                    _this.gridSizeSuggestions = config["gridSizeSuggestions"];
                }
                if (typeof config["skip"] != "undefined" && typeof _this.skip == "undefined") {
                    _this.skip = config["skip"];
                }
                if (typeof config["take"] != "undefined" && typeof _this.take == "undefined") {
                    _this.take = config["take"];
                }
                if (typeof config["bootstrapAccentPrimary"] != "undefined" &&
                    typeof _this.bootstrapAccentPrimary == "undefined") {
                    _this.bootstrapAccentPrimary = config["bootstrapAccentPrimary"];
                }
                if (typeof config["bootstrapAccentSecondary"] != "undefined" &&
                    typeof _this.bootstrapAccentSecondary == "undefined") {
                    _this.bootstrapAccentSecondary = config["bootstrapAccentSecondary"];
                }
                if (typeof config["albumUrl"] != "undefined" && typeof _this.albumUrl == "undefined") {
                    _this.albumUrl = config["albumUrl"];
                }
                if (typeof config["suggestedEntityUrl"] != "undefined" &&
                    typeof _this.suggestedEntityUrl == "undefined") {
                    _this.suggestedEntityUrl = config["suggestedEntityUrl"];
                }
                if (typeof config["deleteEntityUrl"] != "undefined" &&
                    typeof _this.deleteEntityUrl == "undefined") {
                    _this.deleteEntityUrl = config["deleteEntityUrl"];
                }
                if (typeof config["addEntitiesUrl"] != "undefined" &&
                    typeof _this.addEntitiesUrl == "undefined") {
                    _this.addEntitiesUrl = config["addEntitiesUrl"];
                }
                if (typeof config["getEntityUrl"] != "undefined" &&
                    typeof _this.getEntityUrl == "undefined") {
                    _this.getEntityUrl = config["getEntityUrl"];
                }
                if (typeof config["slideShow"] != "undefined" && typeof _this.slideShow == "undefined") {
                    _this.slideShow = config["slideShow"];
                }
                if (typeof config["lockSlideShow"] != "undefined" &&
                    typeof _this.lockSlideShow == "undefined") {
                    _this.lockSlideShow = config["lockSlideShow"];
                }
                if (typeof config["slideShowTimeBeforeNext"] != "undefined" &&
                    typeof _this.slideShowTimeBeforeNext == "undefined") {
                    _this.slideShowTimeBeforeNext = config["slideShowTimeBeforeNext"];
                }
                _this.loadDefault();
            }));
        }
        else {
            this.loadDefault();
        }
    };
    /**
     * @return {?}
     */
    StandAloneComponent.prototype.loadDefault = /**
     * @return {?}
     */
    function () {
        if (typeof this.gridSize == "undefined") {
            this.gridSize = 10;
        }
        if (typeof this.gridSizeSuggestions == "undefined") {
            this.gridSizeSuggestions = 3;
        }
        if (typeof this.skip == "undefined") {
            this.skip = 0;
        }
        if (typeof this.take == "undefined") {
            this.take = 10;
        }
        if (typeof this.bootstrapAccentPrimary == "undefined") {
            this.bootstrapAccentPrimary = "danger";
        }
        if (typeof this.bootstrapAccentSecondary == "undefined") {
            this.bootstrapAccentSecondary = "dark";
        }
        if (typeof this.albumUrl == "undefined") {
            this.albumUrl = "";
        }
        if (typeof this.suggestedEntityUrl == "undefined") {
            this.suggestedEntityUrl = "";
        }
        if (typeof this.deleteEntityUrl == "undefined") {
            this.deleteEntityUrl = "";
        }
        if (typeof this.addEntitiesUrl == "undefined") {
            this.addEntitiesUrl = "";
        }
        if (typeof this.getEntityUrl == "undefined") {
            this.getEntityUrl = "";
        }
        if (typeof this.slideShow == "undefined") {
            this.slideShow = false;
        }
        if (typeof this.lockSlideShow == "undefined") {
            this.lockSlideShow = false;
        }
        if (typeof this.slideShowTimeBeforeNext == "undefined") {
            this.slideShowTimeBeforeNext = 5000;
        }
        /** @type {?} */
        var albumInputs = {
            gridSize: this.gridSize,
            gridSizeSuggestions: this.gridSizeSuggestions,
            skip: this.skip,
            take: this.take,
            bootstrapAccentPrimary: this.bootstrapAccentPrimary,
            bootstrapAccentSecondary: this.bootstrapAccentSecondary,
            albumUrl: this.albumUrl,
            suggestedEntityUrl: this.suggestedEntityUrl,
            deleteEntityUrl: this.deleteEntityUrl,
            addEntitiesUrl: this.addEntitiesUrl,
            getEntityUrl: this.getEntityUrl,
            lockSlideShow: this.lockSlideShow,
            slideShow: this.slideShow,
            slideShowTimeBeforeNext: this.slideShowTimeBeforeNext
        };
        sessionStorage.setItem("albumInputs", JSON.stringify(albumInputs));
    };
    StandAloneComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-stand-alone",
                    template: "<app-multimedia-album class=\"w-100 h-100\"> </app-multimedia-album>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    StandAloneComponent.ctorParameters = function () { return [
        { type: ApiService }
    ]; };
    StandAloneComponent.propDecorators = {
        gridSize: [{ type: Input }],
        gridSizeSuggestions: [{ type: Input }],
        skip: [{ type: Input }],
        take: [{ type: Input }],
        albumUrl: [{ type: Input }],
        suggestedEntityUrl: [{ type: Input }],
        deleteEntityUrl: [{ type: Input }],
        addEntitiesUrl: [{ type: Input }],
        getEntityUrl: [{ type: Input }],
        slideShow: [{ type: Input }],
        lockSlideShow: [{ type: Input }],
        slideShowTimeBeforeNext: [{ type: Input }],
        configPath: [{ type: Input }],
        bootstrapAccentPrimary: [{ type: Input }],
        bootstrapAccentSecondary: [{ type: Input }]
    };
    return StandAloneComponent;
}());
export { StandAloneComponent };
if (false) {
    /** @type {?} */
    StandAloneComponent.prototype.gridSize;
    /** @type {?} */
    StandAloneComponent.prototype.gridSizeSuggestions;
    /** @type {?} */
    StandAloneComponent.prototype.skip;
    /** @type {?} */
    StandAloneComponent.prototype.take;
    /** @type {?} */
    StandAloneComponent.prototype.albumUrl;
    /** @type {?} */
    StandAloneComponent.prototype.suggestedEntityUrl;
    /** @type {?} */
    StandAloneComponent.prototype.deleteEntityUrl;
    /** @type {?} */
    StandAloneComponent.prototype.addEntitiesUrl;
    /** @type {?} */
    StandAloneComponent.prototype.getEntityUrl;
    /** @type {?} */
    StandAloneComponent.prototype.slideShow;
    /** @type {?} */
    StandAloneComponent.prototype.lockSlideShow;
    /** @type {?} */
    StandAloneComponent.prototype.slideShowTimeBeforeNext;
    /** @type {?} */
    StandAloneComponent.prototype.configPath;
    /** @type {?} */
    StandAloneComponent.prototype.bootstrapAccentPrimary;
    /** @type {?} */
    StandAloneComponent.prototype.bootstrapAccentSecondary;
    /** @type {?} */
    StandAloneComponent.prototype.api;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmQtYWxvbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9zdGFuZC1hbG9uZS9zdGFuZC1hbG9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTdEO0lBcURFLDZCQUFtQixHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtJQUFHLENBQUM7Ozs7SUFFdEMsc0NBQVE7OztJQUFSLGNBQVksQ0FBQzs7OztJQUViLHVEQUF5Qjs7O0lBQXpCO1FBQUEsaUJBNEZDO1FBM0ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsNkJBQTZCLENBQUM7UUFDaEQsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxHQUFHO2lCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUN4QixJQUFJLENBQ0gsVUFBVTs7OztZQUFDLFVBQUMsR0FBRztnQkFDYixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRW5CLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxFQUFDLEVBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUc7Ozs7WUFBQyxVQUFDLElBQUk7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxJQUFJLENBQUM7WUFD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LDRDQUN1Qjs7SUFFdkIsc0RBQ2dDOztJQUVoQyx5Q0FDbUI7O0lBSW5CLHFEQUMrQjs7SUFFL0IsdURBQ2lDOztJQUVyQixrQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYXBpL2FwaS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImFwcC1zdGFuZC1hbG9uZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3N0YW5kLWFsb25lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9zdGFuZC1hbG9uZS5jb21wb25lbnQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTdGFuZEFsb25lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgZ3JpZFNpemU6IG51bWJlcjsgLy8gbnVtYmVyIG9mIGFsYnVtcyBkaXNwbGF5ZWQgb24gYSByb3dcblxuICBASW5wdXQoKVxuICBncmlkU2l6ZVN1Z2dlc3Rpb25zOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgc2tpcDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHRha2U6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBhbGJ1bVVybDogc3RyaW5nOyAvLyBhcGkgY2FsbCB0byByZXRyaWV2ZSB0aGUgYWxidW1zIGluIHRoZSBBbGJ1bSBpdCBjYW4gYmUgdXNlZCBmb3IgYm90aCBsb2NhbCBhbmQgcmVtb3RlIHJlc291cmNlcyBsaWtlIGEgbG9jYWwganNvbiBvciBmcm9tIGEgc2VydmVyXG5cbiAgQElucHV0KClcbiAgc3VnZ2VzdGVkRW50aXR5VXJsOiBzdHJpbmc7IC8vIGFwaSBjYWxsIHRvIHJldHJpZXZlIHRoZSBFbnRpdGllcyBpbiB0aGUgRW50aXR5XG5cbiAgQElucHV0KClcbiAgZGVsZXRlRW50aXR5VXJsOiBzdHJpbmc7IC8vIGFwaSBjYWxsIHRvIGRlbGV0ZSB0aGUgRW50aXRpZXMgaW4gdGhlIEVudGl0eVxuXG4gIEBJbnB1dCgpXG4gIGFkZEVudGl0aWVzVXJsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ2V0RW50aXR5VXJsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2xpZGVTaG93OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGxvY2tTbGlkZVNob3c6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2xpZGVTaG93VGltZUJlZm9yZU5leHQ6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBjb25maWdQYXRoOiBzdHJpbmc7XG5cbiAgLy8gdXNlZCB0byByZWRpcmVjdCB0byB0aGUgYWxidW1cbiAgLy9wbGFjZWhvbGRlcnMgZm9yIHRoZSBpbWFnZXMgb2YgdGhlIGFsYnVtKGluIDNkIG1vZGUgb3IgaW1hZ2UgaW4gMmQpXG4gIEBJbnB1dCgpXG4gIGJvb3RzdHJhcEFjY2VudFByaW1hcnk6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBib290c3RyYXBBY2NlbnRTZWNvbmRhcnk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBpOiBBcGlTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBsb2FkSW5wdXRPcHRpb25zT3JEZWZhdWx0KCkge1xuICAgIHRoaXMuY29uZmlnUGF0aCA9IFwiLi4vLi4vLi4vYXNzZXRzL2NvbmZpZy5qc29uXCI7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ1BhdGggIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5hcGlcbiAgICAgICAgLmdldERhdGEodGhpcy5jb25maWdQYXRoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZykgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1wiZ3JpZFNpemVcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5ncmlkU2l6ZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRTaXplID0gY29uZmlnW1wiZ3JpZFNpemVcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJncmlkU2l6ZVN1Z2dlc3Rpb25zXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmdyaWRTaXplU3VnZ2VzdGlvbnMgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID0gY29uZmlnW1wiZ3JpZFNpemVTdWdnZXN0aW9uc1wiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdbXCJza2lwXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMuc2tpcCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNraXAgPSBjb25maWdbXCJza2lwXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ1tcInRha2VcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy50YWtlID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudGFrZSA9IGNvbmZpZ1tcInRha2VcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJib290c3RyYXBBY2NlbnRQcmltYXJ5XCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnkgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5ID0gY29uZmlnW1wiYm9vdHN0cmFwQWNjZW50UHJpbWFyeVwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImJvb3RzdHJhcEFjY2VudFNlY29uZGFyeVwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnkgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnkgPSBjb25maWdbXCJib290c3RyYXBBY2NlbnRTZWNvbmRhcnlcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1wiYWxidW1VcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5hbGJ1bVVybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmFsYnVtVXJsID0gY29uZmlnW1wiYWxidW1VcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJzdWdnZXN0ZWRFbnRpdHlVcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuc3VnZ2VzdGVkRW50aXR5VXJsID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkRW50aXR5VXJsID0gY29uZmlnW1wic3VnZ2VzdGVkRW50aXR5VXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiZGVsZXRlRW50aXR5VXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmRlbGV0ZUVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUVudGl0eVVybCA9IGNvbmZpZ1tcImRlbGV0ZUVudGl0eVVybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImFkZEVudGl0aWVzVXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmFkZEVudGl0aWVzVXJsID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRW50aXRpZXNVcmwgPSBjb25maWdbXCJhZGRFbnRpdGllc1VybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImdldEVudGl0eVVybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5nZXRFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5nZXRFbnRpdHlVcmwgPSBjb25maWdbXCJnZXRFbnRpdHlVcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1wic2xpZGVTaG93XCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMuc2xpZGVTaG93ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVTaG93ID0gY29uZmlnW1wic2xpZGVTaG93XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wibG9ja1NsaWRlU2hvd1wiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5sb2NrU2xpZGVTaG93ID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubG9ja1NsaWRlU2hvdyA9IGNvbmZpZ1tcImxvY2tTbGlkZVNob3dcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJzbGlkZVNob3dUaW1lQmVmb3JlTmV4dFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0ID0gY29uZmlnW1wic2xpZGVTaG93VGltZUJlZm9yZU5leHRcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubG9hZERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9hZERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBsb2FkRGVmYXVsdCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZ3JpZFNpemUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5ncmlkU2l6ZSA9IDEwO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ3JpZFNpemVTdWdnZXN0aW9ucyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmdyaWRTaXplU3VnZ2VzdGlvbnMgPSAzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2tpcCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNraXAgPSAwO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMudGFrZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnRha2UgPSAxMDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5ID0gXCJkYW5nZXJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSA9IFwiZGFya1wiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYWxidW1VcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5hbGJ1bVVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZGVsZXRlRW50aXR5VXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZGVsZXRlRW50aXR5VXJsID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFkZEVudGl0aWVzVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYWRkRW50aXRpZXNVcmwgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZ2V0RW50aXR5VXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZ2V0RW50aXR5VXJsID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNsaWRlU2hvdyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNsaWRlU2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMubG9ja1NsaWRlU2hvdyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmxvY2tTbGlkZVNob3cgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHQgPSA1MDAwO1xuICAgIH1cblxuICAgIHZhciBhbGJ1bUlucHV0cyA9IHtcbiAgICAgIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgZ3JpZFNpemVTdWdnZXN0aW9uczogdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zLFxuICAgICAgc2tpcDogdGhpcy5za2lwLFxuICAgICAgdGFrZTogdGhpcy50YWtlLFxuICAgICAgYm9vdHN0cmFwQWNjZW50UHJpbWFyeTogdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5LFxuICAgICAgYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5OiB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSxcbiAgICAgIGFsYnVtVXJsOiB0aGlzLmFsYnVtVXJsLFxuICAgICAgc3VnZ2VzdGVkRW50aXR5VXJsOiB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCxcbiAgICAgIGRlbGV0ZUVudGl0eVVybDogdGhpcy5kZWxldGVFbnRpdHlVcmwsXG4gICAgICBhZGRFbnRpdGllc1VybDogdGhpcy5hZGRFbnRpdGllc1VybCxcbiAgICAgIGdldEVudGl0eVVybDogdGhpcy5nZXRFbnRpdHlVcmwsXG4gICAgICBsb2NrU2xpZGVTaG93OiB0aGlzLmxvY2tTbGlkZVNob3csXG4gICAgICBzbGlkZVNob3c6IHRoaXMuc2xpZGVTaG93LFxuICAgICAgc2xpZGVTaG93VGltZUJlZm9yZU5leHQ6IHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHRcbiAgICB9O1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhbGJ1bUlucHV0c1wiLCBKU09OLnN0cmluZ2lmeShhbGJ1bUlucHV0cykpO1xuICB9XG59XG4iXX0=