/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeechService } from 'ngx-speech';
import { EMPTY, Subject } from 'rxjs';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { ApiService } from '../../shared/api/api.service';
import { SnakeService } from '../../shared/easterEgg/snake.service';
import { FloatingMicrophoneService } from '../../shared/services/floating-microphone.service';
export class MultimediaAlbumComponent {
    /**
     * @param {?} api
     * @param {?} speech
     * @param {?} snake
     * @param {?} router
     * @param {?} route
     * @param {?} floatingMicrophone
     */
    constructor(api, speech, snake, router, route, floatingMicrophone) {
        this.api = api;
        this.speech = speech;
        this.snake = snake;
        this.router = router;
        this.route = route;
        this.floatingMicrophone = floatingMicrophone;
        this._loadedFirstTime = false;
        this._noMoreData = false;
        this._modalDeleteConfirmation = "";
        this._slideIndex = 1;
        this._showSuggestedEntityModal = 0;
        this._suggestedSlideIndex = 1;
        this._destroyed = new Subject();
        this._upload = false;
        this._cancel = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        (params) => {
            this.collectionId = params["id"];
        }));
        this.loadInputOptions();
        this.speechActions();
        this.floatingMicrophone.makeFloatingMicrophone(this.speech);
        this.lockSlideShow;
        if (this.slideShow) {
            this._showEntityModal = 1;
        }
        else {
            this._showEntityModal = 0;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    //to modify actions
    /**
     * @return {?}
     */
    speechActions() {
        this.speech.message
            .pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            this.toggleMic();
            return EMPTY;
        })), takeUntil(this._destroyed))
            .subscribe((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => {
            console.log(msg);
            if (msg.message == "delete") {
                document.getElementById("deleteEntityButton").click();
            }
            if (msg.message == "add") {
                document.getElementById("addEntityButton").click();
            }
            if (msg.message == "suggestions" ||
                msg.message == "tip" ||
                msg.message == "recommendations") {
                document.getElementById("suggestionsEntityButton").click();
            }
            if (msg.message == "snake") {
                this.snake.snake();
            }
            this.toggleMic();
        }));
    }
    /**
     * @return {?}
     */
    toggleMic() {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        if (elem.classList.contains("notRecording")) {
            elem.classList.remove("notRecording");
            elem.classList.add("recording");
            this.speech.start();
        }
        else {
            elem.classList.remove("recording");
            elem.classList.add("notRecording");
            this.speech.stop();
        }
    }
    //delete and add is missing
    /**
     * @return {?}
     */
    getAlbum() {
        this.api
            .getData(this.albumUrl
            .replace("/$collectionId", `/${this.collectionId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/${this.skip}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (typeof this._albumData == "undefined") {
                this._albumData = [];
            }
            if (data["placeholder"].length != 0) {
                console.log(this._albumData);
                this._albumData = [...this._albumData, ...data["placeholder"]];
                this.skip += this.take;
                /** @type {?} */
                var str = "";
                this._albumData.forEach((/**
                 * @param {?} placeholder
                 * @return {?}
                 */
                (placeholder) => {
                    str += "," + placeholder["keywords"];
                }));
                this._mostUsedKeywords = this.mostUsedKeywords(str);
                console.log(typeof this.suggestedEntityUrl);
                if (typeof this.suggestedEntityUrl != "undefined") {
                    console.log(typeof this.suggestedEntityUrl);
                    this.getSuggestedEntities();
                }
                this._loadedFirstTime = true;
            }
            else {
                this._noMoreData = true;
            }
        }));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    mostUsedKeywords(str) {
        /** @type {?} */
        var wordCounts = {};
        /** @type {?} */
        var words = str.split(",");
        for (var i = 0; i < words.length; i++) {
            wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
        }
        delete wordCounts["_"];
        /** @type {?} */
        var wordsList = "";
        wordCounts = JSON.parse(JSON.stringify(wordCounts).replace(/_/g, ""));
        for (var k in wordCounts) {
            wordsList += "," + k;
        }
        wordsList = wordsList.replace(",", "");
        wordsList = wordsList.replace(/,null/g, "");
        console.log(wordsList);
        return wordsList;
    }
    /**
     * @return {?}
     */
    getSuggestedEntities() {
        //for suggestions we skip 0 since we want only the best suggestions
        //we use collection id to skip those from the search results since we already have them
        this.api
            .getData(this.suggestedEntityUrl
            .replace("/$collectionId", `/${this.collectionId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/0`) + `/${this._mostUsedKeywords}`)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this._suggestedEntities = data;
            console.log(data);
        }));
    }
    /**
     * @return {?}
     */
    onWindowScroll() {
        //In chrome and some browser scroll is given to body tag
        /** @type {?} */
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) +
            document.documentElement.offsetHeight;
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        console.log(pos);
        console.log(max);
        if (typeof this._scrollAmount == "undefined") {
            this._scrollAmount = pos;
        }
        else {
            // move the floating microphone at the same time with the screen
            /** @type {?} */
            var elem = document.getElementById("floatingMicrophone");
            elem.style.top = parseFloat(elem.style.top) + (pos - this._scrollAmount) + "px";
            this._scrollAmount = pos;
        }
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (pos == max ||
            Math.ceil(pos) == Math.ceil(max) ||
            Math.floor(pos) == Math.floor(max) ||
            Math.floor(pos) == Math.ceil(max) ||
            Math.ceil(pos) == Math.floor(max)) {
            if (this._loadedFirstTime) {
                this.getAlbum();
            }
        }
    }
    /**
     * @param {?} placeholder
     * @param {?} i
     * @return {?}
     */
    accessOrDelete(placeholder, i) {
        if (this._deleteAccent == this.bootstrapAccentSecondary) {
            this._markedForDeletion = placeholder;
            console.log(this._markedForDeletion);
            console.log(placeholder);
        }
        else {
            this._showEntityModal = 1;
            this._slideIndex = i;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    noEntityModal(event) {
        console.log(event);
        this._showEntityModal = event;
    }
    /**
     * @param {?} i
     * @return {?}
     */
    accessSuggested(i) {
        this._showSuggestedEntityModal = 1;
        this._suggestedSlideIndex = i;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    noSuggestedEntityModal(event) {
        console.log(event);
        this._showSuggestedEntityModal = event;
    }
    /**
     * @return {?}
     */
    deleteEntity() {
        this.api
            .deleteData(this.deleteEntityUrl.replace("/$entityId", `/${this._markedForDeletion["id"]}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { }));
        this._albumData = this._albumData.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != this._markedForDeletion));
    }
    /**
     * @return {?}
     */
    loadEntitiesUntilScrollbarAppears() {
        this.getAlbum();
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        /** @type {?} */
        var interval = setInterval((/**
         * @return {?}
         */
        () => {
            if (this._loadedFirstTime == true) {
                if (max < document.documentElement.scrollHeight || this._noMoreData == true) {
                    clearInterval(interval);
                }
                else {
                    this.getAlbum();
                }
            }
        }), 1000);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    loadMore(event) {
        this.getAlbum();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addNewData(event) {
        console.log(this._albumData);
        this._albumData = [...this._albumData, ...event];
        console.log(this._albumData);
        this._upload = false;
    }
    /**
     * @return {?}
     */
    upload() {
        this._upload = true;
    }
    /**
     * @return {?}
     */
    cancel() {
        this._cancel = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    discardedData(event) {
        this._cancel = event;
    }
    /**
     * @return {?}
     */
    toggleDeleteButton() {
        if (this._deleteAccent == this.bootstrapAccentPrimary) {
            this._deleteAccent = this.bootstrapAccentSecondary;
            this._modalDeleteConfirmation = "#deleteConfirmationModal";
        }
        else {
            this._deleteAccent = this.bootstrapAccentPrimary;
            this._modalDeleteConfirmation = "";
        }
    }
    /**
     * @return {?}
     */
    loadInputOptions() {
        if (typeof sessionStorage.getItem("albumInputs") == "undefined") {
            /** @type {?} */
            var albumInputOptions = JSON.parse(sessionStorage.getItem("albumInputs"));
            this.gridSize = albumInputOptions.gridSize;
            this.gridSizeSuggestions = albumInputOptions.gridSizeSuggestions;
            this.skip = albumInputOptions.skip;
            this.take = albumInputOptions.take;
            this.albumUrl = albumInputOptions.albumUrl;
            this.suggestedEntityUrl = albumInputOptions.suggestedEntityUrl;
            this.deleteEntityUrl = albumInputOptions.deleteEntityUrl;
            this.addEntitiesUrl = albumInputOptions.addEntitiesUrl;
            this.getEntityUrl = albumInputOptions.getEntityUrl;
            this.lockSlideShow = albumInputOptions.lockSlideShow;
            this.slideShow = albumInputOptions.slideShow;
            this.slideShowTimeBeforeNext = albumInputOptions.slideShowTimeBeforeNext;
            this.bootstrapAccentPrimary = albumInputOptions.bootstrapAccentPrimary;
            this.bootstrapAccentSecondary = albumInputOptions.bootstrapAccentSecondary;
            this._deleteAccent = this.bootstrapAccentPrimary;
            if (typeof this.albumUrl != "undefined") {
                this.loadEntitiesUntilScrollbarAppears();
                this.onWindowScroll();
            }
        }
        else {
            setTimeout(this.loadInputOptions, 2000);
        }
    }
}
MultimediaAlbumComponent.decorators = [
    { type: Component, args: [{
                selector: "app-multimedia-album",
                template: "<div id=\"multimedia-album\" class=\"w-100 h-100 p-2 box roboto-font\">\n  <!--Button Area-->\n  <div id=\"button-area\" class=\"w-100 d-flex-block justify-content-between box\">\n    <div class=\"w-resizable-35 d-flex justify-content-between-start\">\n      <button\n        type=\"button\"\n        id=\"addEntityButton\"\n        class=\"btn btn-{{ bootstrapAccentPrimary }} w-min-140px\"\n        data-toggle=\"modal\"\n        data-target=\"#addCollectionModal\"\n      >\n        Add\n      </button>\n      <button\n        type=\"button\"\n        id=\"deleteEntityButton\"\n        class=\"btn btn-{{ _deleteAccent }} w-min-140px\"\n        (click)=\"toggleDeleteButton()\"\n      >\n        Delete\n      </button>\n    </div>\n\n    <div class=\"w-resizable-20 d-flex justify-content-between-end box\">\n      <!-- Suggestions Button -->\n      <div class=\"w-80px d-flex flex-nowrap\">\n        <button\n          type=\"button\"\n          id=\"suggestionsEntityButton\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }} w-80px\"\n          data-toggle=\"modal\"\n          data-target=\"#seeSuggestionsModal\"\n        >\n          Tip\n        </button>\n      </div>\n      <!-- Filter Box -->\n      <div class=\"w-min-140px w-max-140px box\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Search..\" [(ngModel)]=\"_searchText\" />\n      </div>\n    </div>\n  </div>\n\n  <!--Album Area-->\n  <div id=\"album-area\" class=\"w-100 h-85 mt-3 d-flex-block flex-wrap box\">\n    <div\n      class=\"{{ 'grid-size-' + gridSize }}\"\n      *ngFor=\"let entity of (_albumData | filterAlbum: _searchText); let i = index\"\n      data-toggle=\"modal\"\n      [attr.data-target]=\"_modalDeleteConfirmation\"\n      (click)=\"accessOrDelete(entity, i)\"\n    >\n      <!--Placeholder Area-->\n      <div class=\"w-99 box position-relative\">\n        <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n          <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ entity.data }}\" />\n        </div>\n      </div>\n\n      <!--Entity's Name Area-->\n      <div\n        id=\"entity-name\"\n        class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n      >\n        {{ entity.name }}\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal Upload Files and Urls -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"addCollectionModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"addCollection\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"addCollection\">Upload</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <app-upload\n          class=\"w-100 h-100\"\n          [upload]=\"_upload\"\n          [cancel]=\"_cancel\"\n          [collectionId]=\"collectionId\"\n          [addEntitiesUrl]=\"addEntitiesUrl\"\n          [bootstrapAccentSecondary]=\"bootstrapAccentSecondary\"\n          (newData)=\"addNewData($event)\"\n          (discarded)=\"discardedData($event)\"\n        ></app-upload>\n      </div>\n      <div class=\"modal-footer\">\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentSecondary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"cancel()\"\n        >\n          Close\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"upload()\"\n        >\n          Save changes\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal see Suggestions -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"seeSuggestionsModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"seeSuggestions\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"seeSuggestions\">Suggestions</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"false\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body d-flex-block flex-wrap box \">\n        <div\n          class=\"{{ 'grid-size-' + gridSizeSuggestions }} \"\n          *ngFor=\"let entity of _suggestedEntities; let i = index\"\n          (click)=\"accessSuggested(i)\"\n        >\n          <!--Placeholder Area-->\n          <div class=\"w-99 box position-relative \">\n            <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n              <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ entity.data }}\" />\n            </div>\n          </div>\n          <!--Entity's Name Area-->\n          <div\n            id=\"entity-name\"\n            class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n          >\n            {{ entity.name }}\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Confirmation Modal -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"deleteConfirmationModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"deleteConfirmation\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\" id=\"deleteConfirmation\">Confirm Delete</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <p>Are you sure you want to delete the collection, this procedure is irreversible.</p>\n        <p>Do you want to proceed?</p>\n      </div>\n\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Cancel\n        </button>\n        <button\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          (click)=\"deleteEntity()\"\n          data-dismiss=\"modal\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Microphone Button -->\n<div id=\"floatingMicrophone\" class=\"notRecording\">\n  <img class=\"w-50\" src=\"../../../assets/microphoneIcon.png\" />\n</div>\n\n<!-- Modal for displaying multimedia files -->\n<app-lightbox\n  (noShow)=\"noEntityModal($event)\"\n  (loadMore)=\"loadMore($event)\"\n  [show]=\"_showEntityModal\"\n  [data]=\"_albumData | filterAlbum: _searchText\"\n  [entityUrl]=\"getEntityUrl\"\n  type=\"entity\"\n  [index]=\"_slideIndex\"\n  [noMoreData]=\"_noMoreData\"\n  [lockSlideShow]=\"lockSlideShow\"\n  [slideShow]=\"slideShow\"\n  [slideShowTimeBeforeNext]=\"slideShowTimeBeforeNext\"\n></app-lightbox>\n\n<!-- Modal for displaying suggested multimedia files -->\n<app-lightbox\n  (noShow)=\"noSuggestedEntityModal($event)\"\n  [show]=\"_showSuggestedEntityModal\"\n  [data]=\"_suggestedEntities\"\n  [entityUrl]=\"getEntityUrl\"\n  type=\"suggestedEntity\"\n  [index]=\"_suggestedSlideIndex\"\n  noMoreData=\"1\"\n  lockSlideShow=\"false\"\n  slideShow=\"false\"\n  slideShowTimeBeforeNext=\"5000\"\n></app-lightbox>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MultimediaAlbumComponent.ctorParameters = () => [
    { type: ApiService },
    { type: SpeechService },
    { type: SnakeService },
    { type: Router },
    { type: ActivatedRoute },
    { type: FloatingMicrophoneService }
];
MultimediaAlbumComponent.propDecorators = {
    onWindowScroll: [{ type: HostListener, args: ["window:scroll",] }]
};
if (false) {
    /** @type {?} */
    MultimediaAlbumComponent.prototype.collectionId;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.gridSize;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.gridSizeSuggestions;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.skip;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.take;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.albumUrl;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.suggestedEntityUrl;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.deleteEntityUrl;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.addEntitiesUrl;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.getEntityUrl;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.bootstrapAccentPrimary;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.bootstrapAccentSecondary;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.slideShow;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.lockSlideShow;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.slideShowTimeBeforeNext;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._albumData;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._searchText;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._mostUsedKeywords;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._loadedFirstTime;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._noMoreData;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._deleteAccent;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._markedForDeletion;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._modalDeleteConfirmation;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._scrollAmount;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._suggestedEntities;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._loadedEntity;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._showEntityModal;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._slideIndex;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._showSuggestedEntityModal;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._suggestedSlideIndex;
    /**
     * @type {?}
     * @private
     */
    MultimediaAlbumComponent.prototype._destroyed;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._upload;
    /** @type {?} */
    MultimediaAlbumComponent.prototype._cancel;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.api;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.speech;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.snake;
    /** @type {?} */
    MultimediaAlbumComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    MultimediaAlbumComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    MultimediaAlbumComponent.prototype.floatingMicrophone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGltZWRpYS1hbGJ1bS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbXVsdGktbWVkaWEtYWxidW0tbWFuYWdlbWVudC8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlcy9tdWx0aW1lZGlhLWFsYnVtL211bHRpbWVkaWEtYWxidW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFPOUYsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7Ozs7O0lBaUNuQyxZQUNTLEdBQWUsRUFDZixNQUFxQixFQUNyQixLQUFtQixFQUNuQixNQUFjLEVBQ2IsS0FBcUIsRUFDckIsa0JBQTZDO1FBTDlDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNiLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUFuQnZELHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUdwQiw2QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFLOUIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsOEJBQXlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUNqQixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQStPekMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUtoQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBNU9iLENBQUM7Ozs7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFHRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQ2hCLElBQUksQ0FDSCxVQUFVOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsRUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUMzQjthQUNBLFNBQVM7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLFFBQVEsRUFBRTtnQkFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZEO1lBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBRTtnQkFDeEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3BEO1lBQ0QsSUFDRSxHQUFHLENBQUMsT0FBTyxJQUFJLGFBQWE7Z0JBQzVCLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSztnQkFDcEIsR0FBRyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsRUFDaEM7Z0JBQ0EsUUFBUSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwQjtZQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxTQUFTOztZQUNILElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7O0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHO2FBQ0wsT0FBTyxDQUNOLElBQUksQ0FBQyxRQUFRO2FBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2xELE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUN0QzthQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDOztvQkFDbkIsR0FBRyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7O2dCQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ3RDLEdBQUcsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLEVBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsa0JBQWtCLElBQUksV0FBVyxFQUFFO29CQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBRTVDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLEdBQUc7O1lBQ2QsVUFBVSxHQUFHLEVBQUU7O1lBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwRTtRQUNELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUNuQixTQUFTLEdBQUcsRUFBRTtRQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RSxLQUFLLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRTtZQUN4QixTQUFTLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QyxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsb0JBQW9CO1FBQ2xCLG1FQUFtRTtRQUNuRSx1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLEdBQUc7YUFDTCxPQUFPLENBQ04sSUFBSSxDQUFDLGtCQUFrQjthQUNwQixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDbEQsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQzFEO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVM7Ozs7UUFBQyxDQUFDLElBQWUsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFHRCxjQUFjOzs7WUFFUixHQUFHLEdBQ0wsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMvRCxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVk7O1lBQ25DLEdBQUcsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVk7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLFdBQVcsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztTQUMxQjthQUFNOzs7Z0JBRUQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7WUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoRixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztTQUMxQjtRQUVELG1HQUFtRztRQUNuRyxJQUNFLEdBQUcsSUFBSSxHQUFHO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNqQztZQUNBLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ3ZELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Ozs7SUFDRCxhQUFhLENBQUMsS0FBSztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLEtBQUs7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLEdBQUc7YUFDTCxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsU0FBUzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRSxDQUFDLEVBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFDLENBQUM7SUFDdEYsQ0FBQzs7OztJQUVELGlDQUFpQztRQUMvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1lBQ1osR0FBRyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWTs7WUFDM0MsUUFBUSxHQUFHLFdBQVc7OztRQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO29CQUMzRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7YUFDRjtRQUNILENBQUMsR0FBRSxJQUFJLENBQUM7SUFDVixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUdELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7O0lBR0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQUs7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBQ25ELElBQUksQ0FBQyx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDakQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLEVBQUU7O2dCQUMzRCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQztZQUMvRCxJQUFJLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUN6RCxJQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQztZQUNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7WUFDekUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDO1lBQ3ZFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztZQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUVqRCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7U0FDRjthQUFNO1lBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7OztZQXRVRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsa2tQQUFnRDs7YUFFakQ7Ozs7WUFSUSxVQUFVO1lBSlYsYUFBYTtZQUtiLFlBQVk7WUFOSSxNQUFNO1lBQXRCLGNBQWM7WUFPZCx5QkFBeUI7Ozs2QkEwTC9CLFlBQVksU0FBQyxlQUFlOzs7O0lBbEw3QixnREFBYTs7SUFDYiw0Q0FBUzs7SUFDVCx1REFBb0I7O0lBQ3BCLHdDQUFLOztJQUNMLHdDQUFLOztJQUNMLDRDQUFTOztJQUNULHNEQUFtQjs7SUFDbkIsbURBQWdCOztJQUNoQixrREFBZTs7SUFDZixnREFBYTs7SUFDYiwwREFBdUI7O0lBQ3ZCLDREQUF5Qjs7SUFDekIsNkNBQVU7O0lBQ1YsaURBQWM7O0lBQ2QsMkRBQXdCOztJQUV4Qiw4Q0FBVzs7SUFDWCwrQ0FBWTs7SUFDWixxREFBa0I7O0lBQ2xCLG9EQUF5Qjs7SUFDekIsK0NBQW9COztJQUNwQixpREFBYzs7SUFDZCxzREFBbUI7O0lBQ25CLDREQUE4Qjs7SUFDOUIsaURBQWM7O0lBQ2Qsc0RBQW1COztJQUNuQixpREFBYzs7SUFDZCxvREFBaUI7O0lBQ2pCLCtDQUFnQjs7SUFDaEIsNkRBQThCOztJQUM5Qix3REFBeUI7Ozs7O0lBQ3pCLDhDQUF5Qzs7SUErT3pDLDJDQUFnQjs7SUFLaEIsMkNBQWdCOztJQWxQZCx1Q0FBc0I7O0lBQ3RCLDBDQUE0Qjs7SUFDNUIseUNBQTBCOztJQUMxQiwwQ0FBcUI7Ozs7O0lBQ3JCLHlDQUE2Qjs7Ozs7SUFDN0Isc0RBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNwZWVjaFNlcnZpY2UgfSBmcm9tICduZ3gtc3BlZWNoJztcbmltcG9ydCB7IEVNUFRZLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFNuYWtlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9lYXN0ZXJFZ2cvc25ha2Uuc2VydmljZSc7XG5pbXBvcnQgeyBGbG9hdGluZ01pY3JvcGhvbmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zsb2F0aW5nLW1pY3JvcGhvbmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtbXVsdGltZWRpYS1hbGJ1bVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL211bHRpbWVkaWEtYWxidW0uY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL211bHRpbWVkaWEtYWxidW0uY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGltZWRpYUFsYnVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb2xsZWN0aW9uSWQ7XG4gIGdyaWRTaXplO1xuICBncmlkU2l6ZVN1Z2dlc3Rpb25zO1xuICBza2lwO1xuICB0YWtlO1xuICBhbGJ1bVVybDtcbiAgc3VnZ2VzdGVkRW50aXR5VXJsO1xuICBkZWxldGVFbnRpdHlVcmw7XG4gIGFkZEVudGl0aWVzVXJsO1xuICBnZXRFbnRpdHlVcmw7XG4gIGJvb3RzdHJhcEFjY2VudFByaW1hcnk7XG4gIGJvb3RzdHJhcEFjY2VudFNlY29uZGFyeTtcbiAgc2xpZGVTaG93O1xuICBsb2NrU2xpZGVTaG93O1xuICBzbGlkZVNob3dUaW1lQmVmb3JlTmV4dDtcblxuICBfYWxidW1EYXRhO1xuICBfc2VhcmNoVGV4dDtcbiAgX21vc3RVc2VkS2V5d29yZHM7XG4gIF9sb2FkZWRGaXJzdFRpbWUgPSBmYWxzZTtcbiAgX25vTW9yZURhdGEgPSBmYWxzZTtcbiAgX2RlbGV0ZUFjY2VudDtcbiAgX21hcmtlZEZvckRlbGV0aW9uO1xuICBfbW9kYWxEZWxldGVDb25maXJtYXRpb24gPSBcIlwiO1xuICBfc2Nyb2xsQW1vdW50O1xuICBfc3VnZ2VzdGVkRW50aXRpZXM7XG4gIF9sb2FkZWRFbnRpdHk7XG4gIF9zaG93RW50aXR5TW9kYWw7XG4gIF9zbGlkZUluZGV4ID0gMTtcbiAgX3Nob3dTdWdnZXN0ZWRFbnRpdHlNb2RhbCA9IDA7XG4gIF9zdWdnZXN0ZWRTbGlkZUluZGV4ID0gMTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFwaTogQXBpU2VydmljZSxcbiAgICBwdWJsaWMgc3BlZWNoOiBTcGVlY2hTZXJ2aWNlLFxuICAgIHB1YmxpYyBzbmFrZTogU25ha2VTZXJ2aWNlLFxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGZsb2F0aW5nTWljcm9waG9uZTogRmxvYXRpbmdNaWNyb3Bob25lU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIHRoaXMuY29sbGVjdGlvbklkID0gcGFyYW1zW1wiaWRcIl07XG4gICAgfSk7XG4gICAgdGhpcy5sb2FkSW5wdXRPcHRpb25zKCk7XG4gICAgdGhpcy5zcGVlY2hBY3Rpb25zKCk7XG4gICAgdGhpcy5mbG9hdGluZ01pY3JvcGhvbmUubWFrZUZsb2F0aW5nTWljcm9waG9uZSh0aGlzLnNwZWVjaCk7XG4gICAgdGhpcy5sb2NrU2xpZGVTaG93O1xuICAgIGlmICh0aGlzLnNsaWRlU2hvdykge1xuICAgICAgdGhpcy5fc2hvd0VudGl0eU1vZGFsID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2hvd0VudGl0eU1vZGFsID0gMDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLy90byBtb2RpZnkgYWN0aW9uc1xuICBzcGVlY2hBY3Rpb25zKCkge1xuICAgIHRoaXMuc3BlZWNoLm1lc3NhZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZU1pYygpO1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChtc2cpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgaWYgKG1zZy5tZXNzYWdlID09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZUVudGl0eUJ1dHRvblwiKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cubWVzc2FnZSA9PSBcImFkZFwiKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRFbnRpdHlCdXR0b25cIikuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbXNnLm1lc3NhZ2UgPT0gXCJzdWdnZXN0aW9uc1wiIHx8XG4gICAgICAgICAgbXNnLm1lc3NhZ2UgPT0gXCJ0aXBcIiB8fFxuICAgICAgICAgIG1zZy5tZXNzYWdlID09IFwicmVjb21tZW5kYXRpb25zXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWdnZXN0aW9uc0VudGl0eUJ1dHRvblwiKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cubWVzc2FnZSA9PSBcInNuYWtlXCIpIHtcbiAgICAgICAgICB0aGlzLnNuYWtlLnNuYWtlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVNaWMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlTWljKCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdGluZ01pY3JvcGhvbmVcIik7XG4gICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibm90UmVjb3JkaW5nXCIpKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJub3RSZWNvcmRpbmdcIik7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJyZWNvcmRpbmdcIik7XG4gICAgICB0aGlzLnNwZWVjaC5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJyZWNvcmRpbmdcIik7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJub3RSZWNvcmRpbmdcIik7XG4gICAgICB0aGlzLnNwZWVjaC5zdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgLy9kZWxldGUgYW5kIGFkZCBpcyBtaXNzaW5nXG5cbiAgZ2V0QWxidW0oKSB7XG4gICAgdGhpcy5hcGlcbiAgICAgIC5nZXREYXRhKFxuICAgICAgICB0aGlzLmFsYnVtVXJsXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJGNvbGxlY3Rpb25JZFwiLCBgLyR7dGhpcy5jb2xsZWN0aW9uSWR9YClcbiAgICAgICAgICAucmVwbGFjZShcIi8kdGFrZVwiLCBgLyR7dGhpcy50YWtlfWApXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJHNraXBcIiwgYC8ke3RoaXMuc2tpcH1gKVxuICAgICAgKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9hbGJ1bURhdGEgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIHRoaXMuX2FsYnVtRGF0YSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhW1wicGxhY2Vob2xkZXJcIl0ubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9hbGJ1bURhdGEpO1xuICAgICAgICAgIHRoaXMuX2FsYnVtRGF0YSA9IFsuLi50aGlzLl9hbGJ1bURhdGEsIC4uLmRhdGFbXCJwbGFjZWhvbGRlclwiXV07XG4gICAgICAgICAgdGhpcy5za2lwICs9IHRoaXMudGFrZTtcbiAgICAgICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgICAgICB0aGlzLl9hbGJ1bURhdGEuZm9yRWFjaCgocGxhY2Vob2xkZXIpID0+IHtcbiAgICAgICAgICAgIHN0ciArPSBcIixcIiArIHBsYWNlaG9sZGVyW1wia2V5d29yZHNcIl07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fbW9zdFVzZWRLZXl3b3JkcyA9IHRoaXMubW9zdFVzZWRLZXl3b3JkcyhzdHIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwpO1xuXG4gICAgICAgICAgICB0aGlzLmdldFN1Z2dlc3RlZEVudGl0aWVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2xvYWRlZEZpcnN0VGltZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbm9Nb3JlRGF0YSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbW9zdFVzZWRLZXl3b3JkcyhzdHIpIHtcbiAgICB2YXIgd29yZENvdW50cyA9IHt9O1xuICAgIHZhciB3b3JkcyA9IHN0ci5zcGxpdChcIixcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgd29yZENvdW50c1tcIl9cIiArIHdvcmRzW2ldXSA9ICh3b3JkQ291bnRzW1wiX1wiICsgd29yZHNbaV1dIHx8IDApICsgMTtcbiAgICB9XG4gICAgZGVsZXRlIHdvcmRDb3VudHNbXCJfXCJdO1xuICAgIHZhciB3b3Jkc0xpc3QgPSBcIlwiO1xuICAgIHdvcmRDb3VudHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHdvcmRDb3VudHMpLnJlcGxhY2UoL18vZywgXCJcIikpO1xuICAgIGZvciAodmFyIGsgaW4gd29yZENvdW50cykge1xuICAgICAgd29yZHNMaXN0ICs9IFwiLFwiICsgaztcbiAgICB9XG4gICAgd29yZHNMaXN0ID0gd29yZHNMaXN0LnJlcGxhY2UoXCIsXCIsIFwiXCIpO1xuICAgIHdvcmRzTGlzdCA9IHdvcmRzTGlzdC5yZXBsYWNlKC8sbnVsbC9nLCBcIlwiKTtcbiAgICBjb25zb2xlLmxvZyh3b3Jkc0xpc3QpO1xuICAgIHJldHVybiB3b3Jkc0xpc3Q7XG4gIH1cblxuICBnZXRTdWdnZXN0ZWRFbnRpdGllcygpIHtcbiAgICAvL2ZvciBzdWdnZXN0aW9ucyB3ZSBza2lwIDAgc2luY2Ugd2Ugd2FudCBvbmx5IHRoZSBiZXN0IHN1Z2dlc3Rpb25zXG4gICAgLy93ZSB1c2UgY29sbGVjdGlvbiBpZCB0byBza2lwIHRob3NlIGZyb20gdGhlIHNlYXJjaCByZXN1bHRzIHNpbmNlIHdlIGFscmVhZHkgaGF2ZSB0aGVtXG4gICAgdGhpcy5hcGlcbiAgICAgIC5nZXREYXRhKFxuICAgICAgICB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybFxuICAgICAgICAgIC5yZXBsYWNlKFwiLyRjb2xsZWN0aW9uSWRcIiwgYC8ke3RoaXMuY29sbGVjdGlvbklkfWApXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJHRha2VcIiwgYC8ke3RoaXMudGFrZX1gKVxuICAgICAgICAgIC5yZXBsYWNlKFwiLyRza2lwXCIsIGAvMGApICsgYC8ke3RoaXMuX21vc3RVc2VkS2V5d29yZHN9YFxuICAgICAgKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IEFycmF5PHt9PikgPT4ge1xuICAgICAgICB0aGlzLl9zdWdnZXN0ZWRFbnRpdGllcyA9IGRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKFwid2luZG93OnNjcm9sbFwiKVxuICBvbldpbmRvd1Njcm9sbCgpIHtcbiAgICAvL0luIGNocm9tZSBhbmQgc29tZSBicm93c2VyIHNjcm9sbCBpcyBnaXZlbiB0byBib2R5IHRhZ1xuICAgIGxldCBwb3MgPVxuICAgICAgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApICtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IG1heCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc29sZS5sb2cocG9zKTtcbiAgICBjb25zb2xlLmxvZyhtYXgpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5fc2Nyb2xsQW1vdW50ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuX3Njcm9sbEFtb3VudCA9IHBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbW92ZSB0aGUgZmxvYXRpbmcgbWljcm9waG9uZSBhdCB0aGUgc2FtZSB0aW1lIHdpdGggdGhlIHNjcmVlblxuICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0aW5nTWljcm9waG9uZVwiKTtcbiAgICAgIGVsZW0uc3R5bGUudG9wID0gcGFyc2VGbG9hdChlbGVtLnN0eWxlLnRvcCkgKyAocG9zIC0gdGhpcy5fc2Nyb2xsQW1vdW50KSArIFwicHhcIjtcbiAgICAgIHRoaXMuX3Njcm9sbEFtb3VudCA9IHBvcztcbiAgICB9XG5cbiAgICAvLyBwb3MvbWF4IHdpbGwgZ2l2ZSB5b3UgdGhlIGRpc3RhbmNlIGJldHdlZW4gc2Nyb2xsIGJvdHRvbSBhbmQgYW5kIGJvdHRvbSBvZiBzY3JlZW4gaW4gcGVyY2VudGFnZS5cbiAgICBpZiAoXG4gICAgICBwb3MgPT0gbWF4IHx8XG4gICAgICBNYXRoLmNlaWwocG9zKSA9PSBNYXRoLmNlaWwobWF4KSB8fFxuICAgICAgTWF0aC5mbG9vcihwb3MpID09IE1hdGguZmxvb3IobWF4KSB8fFxuICAgICAgTWF0aC5mbG9vcihwb3MpID09IE1hdGguY2VpbChtYXgpIHx8XG4gICAgICBNYXRoLmNlaWwocG9zKSA9PSBNYXRoLmZsb29yKG1heClcbiAgICApIHtcbiAgICAgIGlmICh0aGlzLl9sb2FkZWRGaXJzdFRpbWUpIHtcbiAgICAgICAgdGhpcy5nZXRBbGJ1bSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFjY2Vzc09yRGVsZXRlKHBsYWNlaG9sZGVyLCBpKSB7XG4gICAgaWYgKHRoaXMuX2RlbGV0ZUFjY2VudCA9PSB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSkge1xuICAgICAgdGhpcy5fbWFya2VkRm9yRGVsZXRpb24gPSBwbGFjZWhvbGRlcjtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuX21hcmtlZEZvckRlbGV0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKHBsYWNlaG9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2hvd0VudGl0eU1vZGFsID0gMTtcbiAgICAgIHRoaXMuX3NsaWRlSW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICBub0VudGl0eU1vZGFsKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHRoaXMuX3Nob3dFbnRpdHlNb2RhbCA9IGV2ZW50O1xuICB9XG5cbiAgYWNjZXNzU3VnZ2VzdGVkKGkpIHtcbiAgICB0aGlzLl9zaG93U3VnZ2VzdGVkRW50aXR5TW9kYWwgPSAxO1xuICAgIHRoaXMuX3N1Z2dlc3RlZFNsaWRlSW5kZXggPSBpO1xuICB9XG5cbiAgbm9TdWdnZXN0ZWRFbnRpdHlNb2RhbChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLl9zaG93U3VnZ2VzdGVkRW50aXR5TW9kYWwgPSBldmVudDtcbiAgfVxuXG4gIGRlbGV0ZUVudGl0eSgpIHtcbiAgICB0aGlzLmFwaVxuICAgICAgLmRlbGV0ZURhdGEodGhpcy5kZWxldGVFbnRpdHlVcmwucmVwbGFjZShcIi8kZW50aXR5SWRcIiwgYC8ke3RoaXMuX21hcmtlZEZvckRlbGV0aW9uW1wiaWRcIl19YCkpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge30pO1xuICAgIHRoaXMuX2FsYnVtRGF0YSA9IHRoaXMuX2FsYnVtRGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT0gdGhpcy5fbWFya2VkRm9yRGVsZXRpb24pO1xuICB9XG5cbiAgbG9hZEVudGl0aWVzVW50aWxTY3JvbGxiYXJBcHBlYXJzKCkge1xuICAgIHRoaXMuZ2V0QWxidW0oKTtcbiAgICBsZXQgbWF4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fbG9hZGVkRmlyc3RUaW1lID09IHRydWUpIHtcbiAgICAgICAgaWYgKG1heCA8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgfHwgdGhpcy5fbm9Nb3JlRGF0YSA9PSB0cnVlKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRBbGJ1bSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBsb2FkTW9yZShldmVudCkge1xuICAgIHRoaXMuZ2V0QWxidW0oKTtcbiAgfVxuXG4gIGFkZE5ld0RhdGEoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9hbGJ1bURhdGEpO1xuXG4gICAgdGhpcy5fYWxidW1EYXRhID0gWy4uLnRoaXMuX2FsYnVtRGF0YSwgLi4uZXZlbnRdO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2FsYnVtRGF0YSk7XG5cbiAgICB0aGlzLl91cGxvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIF91cGxvYWQgPSBmYWxzZTtcbiAgdXBsb2FkKCkge1xuICAgIHRoaXMuX3VwbG9hZCA9IHRydWU7XG4gIH1cblxuICBfY2FuY2VsID0gZmFsc2U7XG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLl9jYW5jZWwgPSB0cnVlO1xuICB9XG5cbiAgZGlzY2FyZGVkRGF0YShldmVudCkge1xuICAgIHRoaXMuX2NhbmNlbCA9IGV2ZW50O1xuICB9XG5cbiAgdG9nZ2xlRGVsZXRlQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLl9kZWxldGVBY2NlbnQgPT0gdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5KSB7XG4gICAgICB0aGlzLl9kZWxldGVBY2NlbnQgPSB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeTtcbiAgICAgIHRoaXMuX21vZGFsRGVsZXRlQ29uZmlybWF0aW9uID0gXCIjZGVsZXRlQ29uZmlybWF0aW9uTW9kYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZXRlQWNjZW50ID0gdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5O1xuICAgICAgdGhpcy5fbW9kYWxEZWxldGVDb25maXJtYXRpb24gPSBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIGxvYWRJbnB1dE9wdGlvbnMoKSB7XG4gICAgaWYgKHR5cGVvZiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWxidW1JbnB1dHNcIikgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdmFyIGFsYnVtSW5wdXRPcHRpb25zID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYWxidW1JbnB1dHNcIikpO1xuICAgICAgdGhpcy5ncmlkU2l6ZSA9IGFsYnVtSW5wdXRPcHRpb25zLmdyaWRTaXplO1xuICAgICAgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID0gYWxidW1JbnB1dE9wdGlvbnMuZ3JpZFNpemVTdWdnZXN0aW9ucztcbiAgICAgIHRoaXMuc2tpcCA9IGFsYnVtSW5wdXRPcHRpb25zLnNraXA7XG4gICAgICB0aGlzLnRha2UgPSBhbGJ1bUlucHV0T3B0aW9ucy50YWtlO1xuICAgICAgdGhpcy5hbGJ1bVVybCA9IGFsYnVtSW5wdXRPcHRpb25zLmFsYnVtVXJsO1xuICAgICAgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwgPSBhbGJ1bUlucHV0T3B0aW9ucy5zdWdnZXN0ZWRFbnRpdHlVcmw7XG4gICAgICB0aGlzLmRlbGV0ZUVudGl0eVVybCA9IGFsYnVtSW5wdXRPcHRpb25zLmRlbGV0ZUVudGl0eVVybDtcbiAgICAgIHRoaXMuYWRkRW50aXRpZXNVcmwgPSBhbGJ1bUlucHV0T3B0aW9ucy5hZGRFbnRpdGllc1VybDtcbiAgICAgIHRoaXMuZ2V0RW50aXR5VXJsID0gYWxidW1JbnB1dE9wdGlvbnMuZ2V0RW50aXR5VXJsO1xuICAgICAgdGhpcy5sb2NrU2xpZGVTaG93ID0gYWxidW1JbnB1dE9wdGlvbnMubG9ja1NsaWRlU2hvdztcbiAgICAgIHRoaXMuc2xpZGVTaG93ID0gYWxidW1JbnB1dE9wdGlvbnMuc2xpZGVTaG93O1xuICAgICAgdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dCA9IGFsYnVtSW5wdXRPcHRpb25zLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0O1xuICAgICAgdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5ID0gYWxidW1JbnB1dE9wdGlvbnMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeTtcbiAgICAgIHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5ID0gYWxidW1JbnB1dE9wdGlvbnMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5O1xuICAgICAgdGhpcy5fZGVsZXRlQWNjZW50ID0gdGhpcy5ib290c3RyYXBBY2NlbnRQcmltYXJ5O1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuYWxidW1VcmwgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB0aGlzLmxvYWRFbnRpdGllc1VudGlsU2Nyb2xsYmFyQXBwZWFycygpO1xuICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQodGhpcy5sb2FkSW5wdXRPcHRpb25zLCAyMDAwKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==