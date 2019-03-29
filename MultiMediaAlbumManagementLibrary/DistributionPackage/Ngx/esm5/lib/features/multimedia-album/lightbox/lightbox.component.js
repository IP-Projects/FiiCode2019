/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var LightboxComponent = /** @class */ (function () {
    function LightboxComponent() {
        this.noShow = new EventEmitter();
        this.loadMore = new EventEmitter();
        this.ready = 0;
        this.startSlideShow = false;
    }
    /**
     * @return {?}
     */
    LightboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (typeof this.slideShow == "string") {
            this.slideShow = this.slideShow == "true";
        }
        if (typeof this.lockSlideShow == "string") {
            this.lockSlideShow = this.lockSlideShow == "true";
        }
    };
    /**
     * @return {?}
     */
    LightboxComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.ready = 1;
        }), 1000);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LightboxComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.start();
    };
    /**
     * @return {?}
     */
    LightboxComponent.prototype.start = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
                    function () {
                        _this.plusSlides(1);
                        console.log("here");
                    }), this.slideShowTimeBeforeNext);
                }
            }
        }
        else {
            setTimeout(this.start, 1000);
        }
    };
    /**
     * @return {?}
     */
    LightboxComponent.prototype.openEntityModal = /**
     * @return {?}
     */
    function () {
        document.getElementById(this.type + "Modal").style.display = "block";
    };
    /**
     * @return {?}
     */
    LightboxComponent.prototype.closeEntityModal = /**
     * @return {?}
     */
    function () {
        console.log(typeof this.lockSlideShow);
        if (this.lockSlideShow == false) {
            document.getElementById(this.type + "Modal").style.display = "none";
            this.noShow.emit(0);
        }
    };
    /**
     * @param {?} n
     * @return {?}
     */
    LightboxComponent.prototype.plusSlides = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.showSlides((this.slideIndex += n));
    };
    /**
     * @param {?} n
     * @return {?}
     */
    LightboxComponent.prototype.currentSlide = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.showSlides((this.slideIndex = n));
    };
    /**
     * @param {?} n
     * @return {?}
     */
    LightboxComponent.prototype.showSlides = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var slides = document.getElementsByClassName("my" + this.type + "Slides");
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
    };
    LightboxComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-lightbox",
                    template: "<!-- Modal for displaying multimedia files -->\n<div\n  id=\"{{ type + 'Modal' }}\"\n  class=\"modalEntity  roboto-font\"\n  (swipeleft)=\"plusSlides(-1)\"\n  (swiperight)=\"plusSlides(1)\"\n>\n  <span class=\"close cursor \" (click)=\"closeEntityModal()\">&times;</span>\n  <div class=\"modalEntity-content  d-flex justify-content-center align-items-center\">\n    <div class=\"{{ 'my' + type + 'Slides' + ' wh-98' }}\" *ngFor=\"let entity of data; let i = index\">\n      <app-album-loader\n        *ngIf=\"slideIndex == i + 1\"\n        sourceUrl=\"{{ entityUrl }}\"\n        entityId=\"{{ entity.id }}\"\n      ></app-album-loader>\n    </div>\n  </div>\n  <a class=\"prev\" (click)=\"plusSlides(-1)\">&#10094;</a>\n  <a class=\"next\" (click)=\"plusSlides(1)\">&#10095;</a>\n</div>\n",
                    styles: [".modalEntity{display:none;position:fixed;z-index:100000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000}.modalEntity-content{position:relative;background-color:#000;margin:auto;padding:0;width:80%;height:100%}.close{color:#fff;position:absolute;top:10px;right:25px;font-size:35px;font-weight:700}.close:focus,.close:hover{color:#999;text-decoration:none;cursor:pointer}.mySlides{display:none}.cursor{cursor:pointer}.next,.prev{cursor:pointer;position:absolute;top:50%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;transition:.6s;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next{right:0;border-radius:3px 0 0 3px}.next:hover,.prev:hover{background-color:rgba(0,0,0,.8)}"]
                }] }
    ];
    /** @nocollapse */
    LightboxComponent.ctorParameters = function () { return []; };
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
    return LightboxComponent;
}());
export { LightboxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9saWdodGJveC9saWdodGJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFeEg7SUEyQ0U7UUFUQSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUc1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUc5QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFFUixDQUFDOzs7O0lBRWhCLG9DQUFROzs7SUFBUjtRQUNFLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksUUFBUSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUM7U0FDbkQ7SUFDSCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQUEsaUJBSUM7UUFIQyxVQUFVOzs7UUFBQztZQUNULEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBRUQsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxpQ0FBSzs7O0lBQUw7UUFBQSxpQkFrQkM7UUFq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LE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6RCxDQUFDOztnQkE1SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixneUJBQXdDOztpQkFFekM7Ozs7O3VCQUVFLEtBQUs7dUJBR0wsS0FBSzt3QkFHTCxLQUFLO3VCQUdMLEtBQUs7NkJBR0wsS0FBSzs0QkFHTCxLQUFLOzRCQUdMLEtBQUs7Z0NBR0wsS0FBSzswQ0FHTCxLQUFLO3lCQUdMLE1BQU07MkJBR04sTUFBTTs7SUF5RlQsd0JBQUM7Q0FBQSxBQTdIRCxJQTZIQztTQXhIWSxpQkFBaUI7OztJQUM1QixpQ0FDSzs7SUFFTCxpQ0FDSzs7SUFFTCxrQ0FDTTs7SUFFTixpQ0FDSzs7SUFFTCx1Q0FDVzs7SUFFWCxzQ0FDVTs7SUFFVixzQ0FDVTs7SUFFViwwQ0FDYzs7SUFFZCxvREFDZ0M7O0lBRWhDLG1DQUM0Qjs7SUFFNUIscUNBQzhCOztJQUU5Qix1Q0FBVzs7SUFDWCxrQ0FBVTs7SUFDViwyQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImFwcC1saWdodGJveFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xpZ2h0Ym94LmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9saWdodGJveC5jb21wb25lbnQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMaWdodGJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgZGF0YTtcblxuICBASW5wdXQoKVxuICB0eXBlO1xuXG4gIEBJbnB1dCgpXG4gIGluZGV4O1xuXG4gIEBJbnB1dCgpXG4gIHNob3c7XG5cbiAgQElucHV0KClcbiAgbm9Nb3JlRGF0YTtcblxuICBASW5wdXQoKVxuICBlbnRpdHlVcmw7XG5cbiAgQElucHV0KClcbiAgc2xpZGVTaG93O1xuXG4gIEBJbnB1dCgpXG4gIGxvY2tTbGlkZVNob3c7XG5cbiAgQElucHV0KClcbiAgc2xpZGVTaG93VGltZUJlZm9yZU5leHQ6IG51bWJlcjtcblxuICBAT3V0cHV0KClcbiAgbm9TaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBsb2FkTW9yZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzbGlkZUluZGV4O1xuICByZWFkeSA9IDA7XG4gIHN0YXJ0U2xpZGVTaG93ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zbGlkZVNob3cgPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5zbGlkZVNob3cgPSB0aGlzLnNsaWRlU2hvdyA9PSBcInRydWVcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvY2tTbGlkZVNob3cgPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5sb2NrU2xpZGVTaG93ID0gdGhpcy5sb2NrU2xpZGVTaG93ID09IFwidHJ1ZVwiO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVhZHkgPSAxO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLnJlYWR5ID09IDEpIHtcbiAgICAgIGlmICh0aGlzLnNob3cgPT0gMSkge1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB0aGlzLm9wZW5FbnRpdHlNb2RhbCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZSh0aGlzLnNsaWRlSW5kZXggKyAxKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zbGlkZVNob3cpO1xuICAgICAgICBpZiAodGhpcy5zbGlkZVNob3cgPT0gdHJ1ZSAmJiB0aGlzLnN0YXJ0U2xpZGVTaG93ID09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFNsaWRlU2hvdyA9IHRydWU7XG4gICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVzU2xpZGVzKDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpO1xuICAgICAgICAgIH0sIHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQodGhpcy5zdGFydCwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkVudGl0eU1vZGFsKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMudHlwZX1Nb2RhbGApLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH1cbiAgY2xvc2VFbnRpdHlNb2RhbCgpIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgdGhpcy5sb2NrU2xpZGVTaG93KTtcbiAgICBpZiAodGhpcy5sb2NrU2xpZGVTaG93ID09IGZhbHNlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9TW9kYWxgKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLm5vU2hvdy5lbWl0KDApO1xuICAgIH1cbiAgfVxuICBwbHVzU2xpZGVzKG4pIHtcbiAgICB0aGlzLnNob3dTbGlkZXMoKHRoaXMuc2xpZGVJbmRleCArPSBuKSk7XG4gIH1cblxuICBjdXJyZW50U2xpZGUobikge1xuICAgIHRoaXMuc2hvd1NsaWRlcygodGhpcy5zbGlkZUluZGV4ID0gbikpO1xuICB9XG5cbiAgc2hvd1NsaWRlcyhuKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYG15JHt0aGlzLnR5cGV9U2xpZGVzYCk7XG4gICAgLy8gY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBpZiAobiA+IHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLm5vTW9yZURhdGEpIHtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZE1vcmUuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IC0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcblxuICAgIGlmIChuIDwgMSkge1xuICAgICAgdGhpcy5zbGlkZUluZGV4ID0gc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc2xpZGVzW2ldW1wic3R5bGVcIl0uZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIHNsaWRlc1t0aGlzLnNsaWRlSW5kZXggLSAxXVtcInN0eWxlXCJdLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH1cbn1cbiJdfQ==