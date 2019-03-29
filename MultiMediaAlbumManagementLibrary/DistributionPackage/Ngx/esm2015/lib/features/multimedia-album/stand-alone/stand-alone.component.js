/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApiService } from '../../../shared/api/api.service';
export class StandAloneComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    loadInputOptionsOrDefault() {
        this.configPath = "../../../assets/config.json";
        if (typeof this.configPath != "undefined") {
            this.api
                .getData(this.configPath)
                .pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.loadDefault();
                return EMPTY;
            })), take(1), map((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                console.log("here");
                return data;
            })))
                .subscribe((/**
             * @param {?} config
             * @return {?}
             */
            (config) => {
                if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
                    this.gridSize = config["gridSize"];
                }
                if (typeof config["gridSizeSuggestions"] != "undefined" &&
                    typeof this.gridSizeSuggestions == "undefined") {
                    this.gridSizeSuggestions = config["gridSizeSuggestions"];
                }
                if (typeof config["skip"] != "undefined" && typeof this.skip == "undefined") {
                    this.skip = config["skip"];
                }
                if (typeof config["take"] != "undefined" && typeof this.take == "undefined") {
                    this.take = config["take"];
                }
                if (typeof config["bootstrapAccentPrimary"] != "undefined" &&
                    typeof this.bootstrapAccentPrimary == "undefined") {
                    this.bootstrapAccentPrimary = config["bootstrapAccentPrimary"];
                }
                if (typeof config["bootstrapAccentSecondary"] != "undefined" &&
                    typeof this.bootstrapAccentSecondary == "undefined") {
                    this.bootstrapAccentSecondary = config["bootstrapAccentSecondary"];
                }
                if (typeof config["albumUrl"] != "undefined" && typeof this.albumUrl == "undefined") {
                    this.albumUrl = config["albumUrl"];
                }
                if (typeof config["suggestedEntityUrl"] != "undefined" &&
                    typeof this.suggestedEntityUrl == "undefined") {
                    this.suggestedEntityUrl = config["suggestedEntityUrl"];
                }
                if (typeof config["deleteEntityUrl"] != "undefined" &&
                    typeof this.deleteEntityUrl == "undefined") {
                    this.deleteEntityUrl = config["deleteEntityUrl"];
                }
                if (typeof config["addEntitiesUrl"] != "undefined" &&
                    typeof this.addEntitiesUrl == "undefined") {
                    this.addEntitiesUrl = config["addEntitiesUrl"];
                }
                if (typeof config["getEntityUrl"] != "undefined" &&
                    typeof this.getEntityUrl == "undefined") {
                    this.getEntityUrl = config["getEntityUrl"];
                }
                if (typeof config["slideShow"] != "undefined" && typeof this.slideShow == "undefined") {
                    this.slideShow = config["slideShow"];
                }
                if (typeof config["lockSlideShow"] != "undefined" &&
                    typeof this.lockSlideShow == "undefined") {
                    this.lockSlideShow = config["lockSlideShow"];
                }
                if (typeof config["slideShowTimeBeforeNext"] != "undefined" &&
                    typeof this.slideShowTimeBeforeNext == "undefined") {
                    this.slideShowTimeBeforeNext = config["slideShowTimeBeforeNext"];
                }
                this.loadDefault();
            }));
        }
        else {
            this.loadDefault();
        }
    }
    /**
     * @return {?}
     */
    loadDefault() {
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
    }
}
StandAloneComponent.decorators = [
    { type: Component, args: [{
                selector: "app-stand-alone",
                template: "<app-multimedia-album class=\"w-100 h-100\"> </app-multimedia-album>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
StandAloneComponent.ctorParameters = () => [
    { type: ApiService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmQtYWxvbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9zdGFuZC1hbG9uZS9zdGFuZC1hbG9uZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTzdELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFnRDlCLFlBQW1CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQUcsQ0FBQzs7OztJQUV0QyxRQUFRLEtBQUksQ0FBQzs7OztJQUViLHlCQUF5QjtRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLDZCQUE2QixDQUFDO1FBQ2hELElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBRztpQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDeEIsSUFBSSxDQUNILFVBQVU7Ozs7WUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRW5CLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxFQUFDLEVBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUc7Ozs7WUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8s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eUNBQ21COztJQUluQixxREFDK0I7O0lBRS9CLHVEQUNpQzs7SUFFckIsa0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2FwaS9hcGkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtc3RhbmQtYWxvbmVcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9zdGFuZC1hbG9uZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vc3RhbmQtYWxvbmUuY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU3RhbmRBbG9uZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGdyaWRTaXplOiBudW1iZXI7IC8vIG51bWJlciBvZiBhbGJ1bXMgZGlzcGxheWVkIG9uIGEgcm93XG5cbiAgQElucHV0KClcbiAgZ3JpZFNpemVTdWdnZXN0aW9uczogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHNraXA6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICB0YWtlOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgYWxidW1Vcmw6IHN0cmluZzsgLy8gYXBpIGNhbGwgdG8gcmV0cmlldmUgdGhlIGFsYnVtcyBpbiB0aGUgQWxidW0gaXQgY2FuIGJlIHVzZWQgZm9yIGJvdGggbG9jYWwgYW5kIHJlbW90ZSByZXNvdXJjZXMgbGlrZSBhIGxvY2FsIGpzb24gb3IgZnJvbSBhIHNlcnZlclxuXG4gIEBJbnB1dCgpXG4gIHN1Z2dlc3RlZEVudGl0eVVybDogc3RyaW5nOyAvLyBhcGkgY2FsbCB0byByZXRyaWV2ZSB0aGUgRW50aXRpZXMgaW4gdGhlIEVudGl0eVxuXG4gIEBJbnB1dCgpXG4gIGRlbGV0ZUVudGl0eVVybDogc3RyaW5nOyAvLyBhcGkgY2FsbCB0byBkZWxldGUgdGhlIEVudGl0aWVzIGluIHRoZSBFbnRpdHlcblxuICBASW5wdXQoKVxuICBhZGRFbnRpdGllc1VybDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldEVudGl0eVVybDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNsaWRlU2hvdzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBsb2NrU2xpZGVTaG93OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgY29uZmlnUGF0aDogc3RyaW5nO1xuXG4gIC8vIHVzZWQgdG8gcmVkaXJlY3QgdG8gdGhlIGFsYnVtXG4gIC8vcGxhY2Vob2xkZXJzIGZvciB0aGUgaW1hZ2VzIG9mIHRoZSBhbGJ1bShpbiAzZCBtb2RlIG9yIGltYWdlIGluIDJkKVxuICBASW5wdXQoKVxuICBib290c3RyYXBBY2NlbnRQcmltYXJ5OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFwaTogQXBpU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgbG9hZElucHV0T3B0aW9uc09yRGVmYXVsdCgpIHtcbiAgICB0aGlzLmNvbmZpZ1BhdGggPSBcIi4uLy4uLy4uL2Fzc2V0cy9jb25maWcuanNvblwiO1xuICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWdQYXRoICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYXBpXG4gICAgICAgIC5nZXREYXRhKHRoaXMuY29uZmlnUGF0aClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChjb25maWcpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ1tcImdyaWRTaXplXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMuZ3JpZFNpemUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGNvbmZpZ1tcImdyaWRTaXplXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiZ3JpZFNpemVTdWdnZXN0aW9uc1wiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFNpemVTdWdnZXN0aW9ucyA9IGNvbmZpZ1tcImdyaWRTaXplU3VnZ2VzdGlvbnNcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1wic2tpcFwiXSAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnNraXAgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5za2lwID0gY29uZmlnW1wic2tpcFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdbXCJ0YWtlXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMudGFrZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnRha2UgPSBjb25maWdbXCJ0YWtlXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiYm9vdHN0cmFwQWNjZW50UHJpbWFyeVwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5ID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeSA9IGNvbmZpZ1tcImJvb3RzdHJhcEFjY2VudFByaW1hcnlcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJib290c3RyYXBBY2NlbnRTZWNvbmRhcnlcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5ID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5ID0gY29uZmlnW1wiYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ1tcImFsYnVtVXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMuYWxidW1VcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5hbGJ1bVVybCA9IGNvbmZpZ1tcImFsYnVtVXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wic3VnZ2VzdGVkRW50aXR5VXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCA9IGNvbmZpZ1tcInN1Z2dlc3RlZEVudGl0eVVybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImRlbGV0ZUVudGl0eVVybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5kZWxldGVFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVFbnRpdHlVcmwgPSBjb25maWdbXCJkZWxldGVFbnRpdHlVcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJhZGRFbnRpdGllc1VybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5hZGRFbnRpdGllc1VybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEVudGl0aWVzVXJsID0gY29uZmlnW1wiYWRkRW50aXRpZXNVcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJnZXRFbnRpdHlVcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZ2V0RW50aXR5VXJsID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RW50aXR5VXJsID0gY29uZmlnW1wiZ2V0RW50aXR5VXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ1tcInNsaWRlU2hvd1wiXSAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnNsaWRlU2hvdyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlU2hvdyA9IGNvbmZpZ1tcInNsaWRlU2hvd1wiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImxvY2tTbGlkZVNob3dcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubG9ja1NsaWRlU2hvdyA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2tTbGlkZVNob3cgPSBjb25maWdbXCJsb2NrU2xpZGVTaG93XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wic2xpZGVTaG93VGltZUJlZm9yZU5leHRcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHQgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dCA9IGNvbmZpZ1tcInNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxvYWREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZERlZmF1bHQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdyaWRTaXplID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZ3JpZFNpemUgPSAxMDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdyaWRTaXplU3VnZ2VzdGlvbnMgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID0gMztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNraXAgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5za2lwID0gMDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRha2UgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy50YWtlID0gMTA7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeSA9IFwiZGFuZ2VyXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnkgPSBcImRhcmtcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFsYnVtVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYWxidW1VcmwgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc3VnZ2VzdGVkRW50aXR5VXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3VnZ2VzdGVkRW50aXR5VXJsID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmRlbGV0ZUVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmRlbGV0ZUVudGl0eVVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hZGRFbnRpdGllc1VybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmFkZEVudGl0aWVzVXJsID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdldEVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmdldEVudGl0eVVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zbGlkZVNob3cgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zbGlkZVNob3cgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvY2tTbGlkZVNob3cgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5sb2NrU2xpZGVTaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0ID0gNTAwMDtcbiAgICB9XG5cbiAgICB2YXIgYWxidW1JbnB1dHMgPSB7XG4gICAgICBncmlkU2l6ZTogdGhpcy5ncmlkU2l6ZSxcbiAgICAgIGdyaWRTaXplU3VnZ2VzdGlvbnM6IHRoaXMuZ3JpZFNpemVTdWdnZXN0aW9ucyxcbiAgICAgIHNraXA6IHRoaXMuc2tpcCxcbiAgICAgIHRha2U6IHRoaXMudGFrZSxcbiAgICAgIGJvb3RzdHJhcEFjY2VudFByaW1hcnk6IHRoaXMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeSxcbiAgICAgIGJvb3RzdHJhcEFjY2VudFNlY29uZGFyeTogdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnksXG4gICAgICBhbGJ1bVVybDogdGhpcy5hbGJ1bVVybCxcbiAgICAgIHN1Z2dlc3RlZEVudGl0eVVybDogdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwsXG4gICAgICBkZWxldGVFbnRpdHlVcmw6IHRoaXMuZGVsZXRlRW50aXR5VXJsLFxuICAgICAgYWRkRW50aXRpZXNVcmw6IHRoaXMuYWRkRW50aXRpZXNVcmwsXG4gICAgICBnZXRFbnRpdHlVcmw6IHRoaXMuZ2V0RW50aXR5VXJsLFxuICAgICAgbG9ja1NsaWRlU2hvdzogdGhpcy5sb2NrU2xpZGVTaG93LFxuICAgICAgc2xpZGVTaG93OiB0aGlzLnNsaWRlU2hvdyxcbiAgICAgIHNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0OiB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0XG4gICAgfTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWxidW1JbnB1dHNcIiwgSlNPTi5zdHJpbmdpZnkoYWxidW1JbnB1dHMpKTtcbiAgfVxufVxuIl19