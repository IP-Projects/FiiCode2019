/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class LightboxComponent {
    constructor() {
        this.noShow = new EventEmitter();
        this.loadMore = new EventEmitter();
        this.ready = 0;
        this.startSlideShow = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (typeof this.slideShow == "string") {
            this.slideShow = this.slideShow == "true";
        }
        if (typeof this.lockSlideShow == "string") {
            this.lockSlideShow = this.lockSlideShow == "true";
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.ready = 1;
        }), 1000);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.start();
    }
    /**
     * @return {?}
     */
    start() {
        if (this.ready == 1) {
            if (this.show == 1) {
                this.slideIndex = this.index;
                this.openEntityModal();
                this.currentSlide(this.slideIndex + 1);
                console.log(this.slideShow);
                if (this.slideShow == true && this.startSlideShow == false) {
                    this.startSlideShow = true;
                    setInterval((/**
                     * @return {?}
                     */
                    () => {
                        this.plusSlides(1);
                        console.log("here");
                    }), this.slideShowTimeBeforeNext);
                }
            }
        }
        else {
            setTimeout(this.start, 1000);
        }
    }
    /**
     * @return {?}
     */
    openEntityModal() {
        document.getElementById(`${this.type}Modal`).style.display = "block";
    }
    /**
     * @return {?}
     */
    closeEntityModal() {
        console.log(typeof this.lockSlideShow);
        if (this.lockSlideShow == false) {
            document.getElementById(`${this.type}Modal`).style.display = "none";
            this.noShow.emit(0);
        }
    }
    /**
     * @param {?} n
     * @return {?}
     */
    plusSlides(n) {
        this.showSlides((this.slideIndex += n));
    }
    /**
     * @param {?} n
     * @return {?}
     */
    currentSlide(n) {
        this.showSlides((this.slideIndex = n));
    }
    /**
     * @param {?} n
     * @return {?}
     */
    showSlides(n) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var slides = document.getElementsByClassName(`my${this.type}Slides`);
        // console.log(slides);
        if (n > slides.length) {
            if (this.noMoreData) {
                this.slideIndex = 1;
            }
            else {
                this.loadMore.emit(true);
                this.slideIndex = this.slideIndex - 1;
            }
        }
        console.log(slides);
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i]["style"].display = "none";
        }
        slides[this.slideIndex - 1]["style"].display = "block";
    }
}
LightboxComponent.decorators = [
    { type: Component, args: [{
                selector: "app-lightbox",
                template: "<!-- Modal for displaying multimedia files -->\n<div\n  id=\"{{ type + 'Modal' }}\"\n  class=\"modalEntity  roboto-font\"\n  (swipeleft)=\"plusSlides(-1)\"\n  (swiperight)=\"plusSlides(1)\"\n>\n  <span class=\"close cursor \" (click)=\"closeEntityModal()\">&times;</span>\n  <div class=\"modalEntity-content  d-flex justify-content-center align-items-center\">\n    <div class=\"{{ 'my' + type + 'Slides' + ' wh-98' }}\" *ngFor=\"let entity of data; let i = index\">\n      <app-album-loader\n        *ngIf=\"slideIndex == i + 1\"\n        sourceUrl=\"{{ entityUrl }}\"\n        entityId=\"{{ entity.id }}\"\n      ></app-album-loader>\n    </div>\n  </div>\n  <a class=\"prev\" (click)=\"plusSlides(-1)\">&#10094;</a>\n  <a class=\"next\" (click)=\"plusSlides(1)\">&#10095;</a>\n</div>\n",
                styles: [".modalEntity{display:none;position:fixed;z-index:100000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000}.modalEntity-content{position:relative;background-color:#000;margin:auto;padding:0;width:80%;height:100%}.close{color:#fff;position:absolute;top:10px;right:25px;font-size:35px;font-weight:700}.close:focus,.close:hover{color:#999;text-decoration:none;cursor:pointer}.mySlides{display:none}.cursor{cursor:pointer}.next,.prev{cursor:pointer;position:absolute;top:50%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;transition:.6s;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next{right:0;border-radius:3px 0 0 3px}.next:hover,.prev:hover{background-color:rgba(0,0,0,.8)}"]
            }] }
];
/** @nocollapse */
LightboxComponent.ctorParameters = () => [];
LightboxComponent.propDecorators = {
    data: [{ type: Input }],
    type: [{ type: Input }],
    index: [{ type: Input }],
    show: [{ type: Input }],
    noMoreData: [{ type: Input }],
    entityUrl: [{ type: Input }],
    slideShow: [{ type: Input }],
    lockSlideShow: [{ type: Input }],
    slideShowTimeBeforeNext: [{ type: Input }],
    noShow: [{ type: Output }],
    loadMore: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LightboxComponent.prototype.data;
    /** @type {?} */
    LightboxComponent.prototype.type;
    /** @type {?} */
    LightboxComponent.prototype.index;
    /** @type {?} */
    LightboxComponent.prototype.show;
    /** @type {?} */
    LightboxComponent.prototype.noMoreData;
    /** @type {?} */
    LightboxComponent.prototype.entityUrl;
    /** @type {?} */
    LightboxComponent.prototype.slideShow;
    /** @type {?} */
    LightboxComponent.prototype.lockSlideShow;
    /** @type {?} */
    LightboxComponent.prototype.slideShowTimeBeforeNext;
    /** @type {?} */
    LightboxComponent.prototype.noShow;
    /** @type {?} */
    LightboxComponent.prototype.loadMore;
    /** @type {?} */
    LightboxComponent.prototype.slideIndex;
    /** @type {?} */
    LightboxComponent.prototype.ready;
    /** @type {?} */
    LightboxComponent.prototype.startSlideShow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9saWdodGJveC9saWdodGJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFPeEgsTUFBTSxPQUFPLGlCQUFpQjtJQXNDNUI7UUFUQSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUc1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUc5QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFFUixDQUFDOzs7O0lBRWhCLFFBQVE7UUFDTixJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRLEVBQUU7WUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztTQUMzQztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxD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QUFNLENBQUM7U0FDckM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pELENBQUM7OztZQTVIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGd5QkFBd0M7O2FBRXpDOzs7OzttQkFFRSxLQUFLO21CQUdMLEtBQUs7b0JBR0wsS0FBSzttQkFHTCxLQUFLO3lCQUdMLEtBQUs7d0JBR0wsS0FBSzt3QkFHTCxLQUFLOzRCQUdMLEtBQUs7c0NBR0wsS0FBSztxQkFHTCxNQUFNO3VCQUdOLE1BQU07Ozs7SUE5QlAsaUNBQ0s7O0lBRUwsaUNBQ0s7O0lBRUwsa0NBQ007O0lBRU4saUNBQ0s7O0lBRUwsdUNBQ1c7O0lBRVgsc0NBQ1U7O0lBRVYsc0NBQ1U7O0lBRVYsMENBQ2M7O0lBRWQsb0RBQ2dDOztJQUVoQyxtQ0FDNEI7O0lBRTVCLHFDQUM4Qjs7SUFFOUIsdUNBQVc7O0lBQ1gsa0NBQVU7O0lBQ1YsMkNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtbGlnaHRib3hcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9saWdodGJveC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbGlnaHRib3guY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTGlnaHRib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIGRhdGE7XG5cbiAgQElucHV0KClcbiAgdHlwZTtcblxuICBASW5wdXQoKVxuICBpbmRleDtcblxuICBASW5wdXQoKVxuICBzaG93O1xuXG4gIEBJbnB1dCgpXG4gIG5vTW9yZURhdGE7XG5cbiAgQElucHV0KClcbiAgZW50aXR5VXJsO1xuXG4gIEBJbnB1dCgpXG4gIHNsaWRlU2hvdztcblxuICBASW5wdXQoKVxuICBsb2NrU2xpZGVTaG93O1xuXG4gIEBJbnB1dCgpXG4gIHNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpXG4gIG5vU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgbG9hZE1vcmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2xpZGVJbmRleDtcbiAgcmVhZHkgPSAwO1xuICBzdGFydFNsaWRlU2hvdyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2xpZGVTaG93ID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuc2xpZGVTaG93ID0gdGhpcy5zbGlkZVNob3cgPT0gXCJ0cnVlXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NrU2xpZGVTaG93ID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMubG9ja1NsaWRlU2hvdyA9IHRoaXMubG9ja1NsaWRlU2hvdyA9PSBcInRydWVcIjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlYWR5ID0gMTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5yZWFkeSA9PSAxKSB7XG4gICAgICBpZiAodGhpcy5zaG93ID09IDEpIHtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5vcGVuRW50aXR5TW9kYWwoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUodGhpcy5zbGlkZUluZGV4ICsgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2xpZGVTaG93KTtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVTaG93ID09IHRydWUgJiYgdGhpcy5zdGFydFNsaWRlU2hvdyA9PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuc3RhcnRTbGlkZVNob3cgPSB0cnVlO1xuICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1c1NsaWRlcygxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZVwiKTtcbiAgICAgICAgICB9LCB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KHRoaXMuc3RhcnQsIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5FbnRpdHlNb2RhbCgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9TW9kYWxgKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG4gIGNsb3NlRW50aXR5TW9kYWwoKSB7XG4gICAgY29uc29sZS5sb2codHlwZW9mIHRoaXMubG9ja1NsaWRlU2hvdyk7XG4gICAgaWYgKHRoaXMubG9ja1NsaWRlU2hvdyA9PSBmYWxzZSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfU1vZGFsYCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5ub1Nob3cuZW1pdCgwKTtcbiAgICB9XG4gIH1cbiAgcGx1c1NsaWRlcyhuKSB7XG4gICAgdGhpcy5zaG93U2xpZGVzKCh0aGlzLnNsaWRlSW5kZXggKz0gbikpO1xuICB9XG5cbiAgY3VycmVudFNsaWRlKG4pIHtcbiAgICB0aGlzLnNob3dTbGlkZXMoKHRoaXMuc2xpZGVJbmRleCA9IG4pKTtcbiAgfVxuXG4gIHNob3dTbGlkZXMobikge1xuICAgIHZhciBpO1xuICAgIHZhciBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBteSR7dGhpcy50eXBlfVNsaWRlc2ApO1xuICAgIC8vIGNvbnNvbGUubG9nKHNsaWRlcyk7XG4gICAgaWYgKG4gPiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5ub01vcmVEYXRhKSB7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRNb3JlLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleCAtIDE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHNsaWRlcyk7XG5cbiAgICBpZiAobiA8IDEpIHtcbiAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNsaWRlc1tpXVtcInN0eWxlXCJdLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBzbGlkZXNbdGhpcy5zbGlkZUluZGV4IC0gMV1bXCJzdHlsZVwiXS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG59XG4iXX0=