/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpeechService } from 'ngx-speech';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, take, takeUntil } from 'rxjs/operators';
import { ApiService } from '../../shared/api/api.service';
import { SnakeService } from '../../shared/easterEgg/snake.service';
import { FloatingMicrophoneService } from '../../shared/services/floating-microphone.service';
export class CollectionOfMultimediaAlbumsComponent {
    /**
     * @param {?} api
     * @param {?} formBuilder
     * @param {?} speech
     * @param {?} snake
     * @param {?} router
     * @param {?} floatingMicrophone
     */
    constructor(api, formBuilder, speech, snake, router, floatingMicrophone) {
        this.api = api;
        this.formBuilder = formBuilder;
        this.speech = speech;
        this.snake = snake;
        this.router = router;
        this.floatingMicrophone = floatingMicrophone;
        this._loadedFirstTime = false;
        this._noMoreData = false;
        this._modalDeleteConfirmation = "";
        this._destroyed = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._addNewCollectionForm = this.formBuilder.group({
            collectionName: ["", Validators.required],
            collectionType: ["", Validators.required],
            keywords: ["", Validators.required]
        });
        this.loadInputOptionsOrDefault();
        this.speechActions();
        this.floatingMicrophone.makeFloatingMicrophone(this.speech);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
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
                document.getElementById("deleteCollectionButton").click();
            }
            if (msg.message == "add") {
                document.getElementById("addCollectionButton").click();
            }
            if (msg.message == "suggestions" ||
                msg.message == "tip" ||
                msg.message == "recommendations") {
                document.getElementById("suggestionsCollectionButton").click();
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
    /**
     * @return {?}
     */
    getCollections() {
        this.api
            .getData(this.collectionUrl
            .replace("/$userId", `/${this.userId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/${this.skip}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (typeof this._collectionData == "undefined") {
                this._collectionData = [];
            }
            data["collection"].forEach((/**
             * @param {?} collection
             * @return {?}
             */
            (collection) => {
                console.log(collection);
                console.log(collection["placeholder"].length);
                if (collection["placeholder"].length == 0) {
                    collection["placeholder"] = [
                        {
                            data: "../../../assets/new-collection.jpg"
                        }
                    ];
                }
            }));
            if (data["collection"].length != 0) {
                console.log(this._collectionData);
                this._collectionData = [...this._collectionData, ...data["collection"]];
                this.skip += this.take;
                /** @type {?} */
                var str = "";
                this._collectionData.forEach((/**
                 * @param {?} collection
                 * @return {?}
                 */
                (collection) => {
                    str += "," + collection["keywords"];
                }));
                this._mostUsedKeywords = this.mostUsedKeywords(str);
                console.log(typeof this.suggestedCollectionUrl);
                if (typeof this.suggestedCollectionUrl != "undefined") {
                    console.log(typeof this.suggestedCollectionUrl);
                    this.getSuggestedCollections();
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
        console.log(wordsList);
        return wordsList;
    }
    /**
     * @return {?}
     */
    getSuggestedCollections() {
        //for suggestions we skip 0 since we want only the best suggestions
        this.api
            .getData(this.suggestedCollectionUrl
            .replace("/$userId", `/${this.userId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/0`) + `/${this._mostUsedKeywords}`)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data.forEach((/**
             * @param {?} collection
             * @return {?}
             */
            (collection) => {
                console.log(collection);
                console.log(collection["placeholder"].length);
                if (collection["placeholder"].length == 0) {
                    collection["placeholder"] = [
                        {
                            data: "../../../assets/new-collection.jpg"
                        }
                    ];
                }
            }));
            this._suggestedCollectionData = data;
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
                this.getCollections();
            }
        }
    }
    /**
     * @return {?}
     */
    loadCollectionsUntilScrollbarAppears() {
        this.getCollections();
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
                    this.getCollections();
                }
            }
        }), 1000);
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
     * @param {?} collection
     * @return {?}
     */
    accessOrDelete(collection) {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  here put redirect on click
        if (this._deleteAccent == this.bootstrapAccentSecondary) {
            console.log(collection);
            this._markedForDeletion = collection;
        }
        else {
            console.log(collection);
            this.router.navigate([`/${collection.id}`]);
        }
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    accessRecommendedCollection(collection) {
        this.router.navigate([`/${collection.id}`]);
    }
    /**
     * @return {?}
     */
    deleteCollection() {
        this.api
            .deleteData(this.deleteCollectionUrl.replace("/$collectionId", `/${this._markedForDeletion["id"]}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { }));
        this._collectionData = this._collectionData.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != this._markedForDeletion));
    }
    /**
     * @return {?}
     */
    addCollection() {
        console.log(this._addNewCollectionForm);
        // let headers = new HttpHeaders();
        // headers.append("Content-Type", "application/json");
        this.api
            .postData(this.addCollectionUrl, {
            Name: `${this._addNewCollectionForm.value.collectionName}`,
            Type: this._addNewCollectionForm.value.collectionType,
            Keywords: `${this._addNewCollectionForm.value.keywords}`,
            UserId: `${this.userId}`
        })
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            console.log(data);
            data["placeholder"] = [
                {
                    data: "../../../assets/new-collection.jpg"
                }
            ];
            this._collectionData = [...this._collectionData, data];
        }));
    }
    /**
     * @return {?}
     */
    loadInputOptionsOrDefault() {
        if (typeof this.configPath != "undefined") {
            this.api
                .getData(this.configPath)
                .pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.loadDefault();
                if (typeof this.collectionUrl != "undefined") {
                    this.loadCollectionsUntilScrollbarAppears();
                    this.onWindowScroll();
                }
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
                if (typeof config["userId"] != "undefined" && typeof this.userId == "undefined") {
                    this.userId = config["userId"];
                }
                if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
                    this.gridSize = config["gridSize"];
                }
                if (typeof config["gridSizeSuggestions"] != "undefined" &&
                    typeof this.gridSizeSuggestions == "undefined") {
                    this.gridSizeSuggestions = config["gridSizeSuggestions"];
                }
                if (typeof config["collectionUrl"] != "undefined" &&
                    typeof this.collectionUrl == "undefined") {
                    this.collectionUrl = config["collectionUrl"];
                }
                if (typeof config["suggestedCollectionUrl"] != "undefined" &&
                    typeof this.suggestedCollectionUrl == "undefined") {
                    this.suggestedCollectionUrl = config["suggestedCollectionUrl"];
                }
                if (typeof config["deleteCollectionUrl"] != "undefined" &&
                    typeof this.deleteCollectionUrl == "undefined") {
                    this.deleteCollectionUrl = config["deleteCollectionUrl"];
                }
                if (typeof config["addCollectionUrl"] != "undefined" &&
                    typeof this.addCollectionUrl == "undefined") {
                    this.addCollectionUrl = config["addCollectionUrl"];
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
                if (typeof this.collectionUrl != "undefined") {
                    this.loadCollectionsUntilScrollbarAppears();
                    this.onWindowScroll();
                }
            }));
        }
        else {
            this.loadDefault();
            if (typeof this.collectionUrl != "undefined") {
                this.loadCollectionsUntilScrollbarAppears();
                this.onWindowScroll();
            }
        }
    }
    /**
     * @return {?}
     */
    loadDefault() {
        if (typeof this.userId == "undefined") {
            this.userId = "00000000-0000-0000-0000-000000000000";
        }
        if (typeof this.gridSize == "undefined") {
            this.gridSize = 10;
        }
        if (typeof this.gridSizeSuggestions == "undefined") {
            this.gridSizeSuggestions = 3;
        }
        if (typeof this.collectionUrl == "undefined") {
            this.collectionUrl = "";
        }
        if (typeof this.suggestedCollectionUrl == "undefined") {
            this.suggestedCollectionUrl = "";
        }
        if (typeof this.deleteCollectionUrl == "undefined") {
            this.deleteCollectionUrl = "";
        }
        if (typeof this.addCollectionUrl == "undefined") {
            this.addCollectionUrl = "";
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
        this._deleteAccent = this.bootstrapAccentPrimary;
    }
}
CollectionOfMultimediaAlbumsComponent.decorators = [
    { type: Component, args: [{
                selector: "app-collection-of-multimedia-albums",
                template: "<div id=\"collection-of-multimedia-albums\" class=\"w-100 h-100 p-2 box roboto-font\">\n  <!--Button Area-->\n  <div id=\"button-area\" class=\"w-100 d-flex-block justify-content-between box\">\n    <div class=\"w-resizable-35 d-flex justify-content-between-start\">\n      <button\n        type=\"button\"\n        id=\"addCollectionButton\"\n        class=\"btn btn-{{ bootstrapAccentPrimary }} w-min-140px\"\n        data-toggle=\"modal\"\n        data-target=\"#addCollectionModal\"\n      >\n        Add Collection\n      </button>\n      <button\n        type=\"button\"\n        id=\"deleteCollectionButton\"\n        class=\"btn btn-{{ _deleteAccent }} w-min-140px\"\n        (click)=\"toggleDeleteButton()\"\n      >\n        Delete Collection\n      </button>\n    </div>\n\n    <div class=\"w-resizable-20 d-flex justify-content-between-end box\">\n      <!-- Toggle Switch -->\n      <div class=\"w-140px d-flex flex-nowrap\">\n        <div class=\"w-60px ml-2 d-flex align-items-center box\">\n          <label class=\"switch box\">\n            <input type=\"checkbox\" [(ngModel)]=\"_toggleView\" />\n            <span class=\"slider round\"></span>\n          </label>\n        </div>\n        <button\n          type=\"button\"\n          id=\"suggestionsCollectionButton\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }} w-80px\"\n          data-toggle=\"modal\"\n          data-target=\"#seeSuggestionsModal\"\n        >\n          Tip\n        </button>\n      </div>\n      <!-- Filter Box -->\n      <div class=\"w-min-140px w-max-140px box\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Search..\" [(ngModel)]=\"_searchText\" />\n      </div>\n    </div>\n  </div>\n\n  <!--Collections Area-->\n  <div id=\"collections-area\" class=\"w-100 h-85 mt-3 d-flex-block flex-wrap box\">\n    <div\n      class=\"{{ 'grid-size-' + gridSize }}\"\n      *ngFor=\"let collection of (_collectionData | filterCollections: _searchText)\"\n      (click)=\"accessOrDelete(collection)\"\n      data-toggle=\"modal\"\n      [attr.data-target]=\"_modalDeleteConfirmation\"\n    >\n      <!--Placeholder Area-->\n      <div [ngSwitch]=\"_toggleView\" class=\"w-99 box position-relative\">\n        <div *ngSwitchDefault id=\"placeholder2d\" class=\"w-99 box position-relative\">\n          <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ collection.placeholder[0].data }}\" />\n        </div>\n        <div\n          *ngSwitchCase=\"1\"\n          id=\"placeholder3d\"\n          class=\"w-99 box position-relative h-min-250px d-flex justify-content-center\"\n        >\n          <img\n            *ngFor=\"let placeholder of collection.placeholder.slice(0, 5); let i = index\"\n            src=\"{{ placeholder.data }}\"\n            class=\"w-max-200px thumbnail layer-stack  layer-{{ i }} \"\n          />\n        </div>\n      </div>\n\n      <!--Collection's Name Area-->\n      <div\n        id=\"collection-name\"\n        class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n      >\n        {{ collection.name }}\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal add Collection -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"addCollectionModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"addCollection\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"addCollection\">Create a new Collection?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"_addNewCollectionForm\">\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control d-none\" formControlName=\"collectionName\" />\n            <label for=\"Name\" class=\"col-form-label\">Name:</label>\n            <input type=\"text\" class=\"form-control\" id=\"Name\" formControlName=\"collectionName\" />\n            <label class=\"\" for=\"collectionType\">Type</label>\n            <select class=\"custom-select\" id=\"collectionType\" formControlName=\"collectionType\">\n              <option selected disabled>Choose...</option>\n              <option value=\"0\">Public</option>\n              <option value=\"1\">Private</option>\n            </select>\n            <label for=\"Keywords\" class=\"col-form-label\">Keywords:</label>\n            <input type=\"text\" class=\"form-control\" id=\"keywords\" formControlName=\"keywords\" />\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"addCollection()\"\n        >\n          Save changes\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal see Suggestions -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"seeSuggestionsModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"seeSuggestions\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"seeSuggestions\">Suggestions</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body d-flex-block flex-wrap box\">\n        <div\n          class=\"{{ 'grid-size-' + gridSizeSuggestions }}\"\n          *ngFor=\"let collection of _suggestedCollectionData\"\n          (click)=\"accessRecommendedCollection(collection)\"\n          data-dismiss=\"modal\"\n        >\n          <!--Placeholder Area-->\n          <div class=\"w-99 box position-relative\">\n            <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n              <img\n                class=\"w-100 thumbnail hover-shadow\"\n                src=\"{{ collection.placeholder[0].data }}\"\n              />\n            </div>\n          </div>\n          <!--Collection's Name Area-->\n          <div\n            id=\"collection-name\"\n            class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n          >\n            {{ collection.name }}\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Confirmation Modal -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"deleteConfirmationModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"deleteConfirmation\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\" id=\"deleteConfirmation\">Confirm Delete</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <p>Are you sure you want to delete the collection, this procedure is irreversible.</p>\n        <p>Do you want to proceed?</p>\n      </div>\n\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Cancel\n        </button>\n        <button\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          (click)=\"deleteCollection()\"\n          data-dismiss=\"modal\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Microphone Button -->\n<div id=\"floatingMicrophone\" class=\"notRecording\">\n  <img class=\"w-50\" src=\"../../../assets/microphoneIcon.png\" />\n</div>\n",
                styles: [".switch{position:relative;display:inline-block;width:60px;height:34px;margin:0}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s}.slider:before{position:absolute;content:\"\";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;transition:.4s}.switch>input:checked+.slider{background-color:#2196f3}.switch>input:focus+.slider{box-shadow:0 0 1px #2196f3}.switch>input:checked+.slider:before{-webkit-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}"]
            }] }
];
/** @nocollapse */
CollectionOfMultimediaAlbumsComponent.ctorParameters = () => [
    { type: ApiService },
    { type: FormBuilder },
    { type: SpeechService },
    { type: SnakeService },
    { type: Router },
    { type: FloatingMicrophoneService }
];
CollectionOfMultimediaAlbumsComponent.propDecorators = {
    gridSize: [{ type: Input }],
    gridSizeSuggestions: [{ type: Input }],
    userId: [{ type: Input }],
    collectionUrl: [{ type: Input }],
    suggestedCollectionUrl: [{ type: Input }],
    deleteCollectionUrl: [{ type: Input }],
    addCollectionUrl: [{ type: Input }],
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
    bootstrapAccentSecondary: [{ type: Input }],
    onWindowScroll: [{ type: HostListener, args: ["window:scroll",] }]
};
if (false) {
    /**
     * Specific options will override batch options from json object
     * @type {?}
     */
    CollectionOfMultimediaAlbumsComponent.prototype.gridSize;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.gridSizeSuggestions;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.userId;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.collectionUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.suggestedCollectionUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.deleteCollectionUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.addCollectionUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.skip;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.take;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.albumUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.suggestedEntityUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.deleteEntityUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.addEntitiesUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.getEntityUrl;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.slideShow;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.lockSlideShow;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.slideShowTimeBeforeNext;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.configPath;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.bootstrapAccentPrimary;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.bootstrapAccentSecondary;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._collectionData;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._suggestedCollectionData;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._searchText;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._toggleView;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._mostUsedKeywords;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._loadedFirstTime;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._noMoreData;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._deleteAccent;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._markedForDeletion;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._addNewCollectionForm;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._modalDeleteConfirmation;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype._scrollAmount;
    /**
     * @type {?}
     * @private
     */
    CollectionOfMultimediaAlbumsComponent.prototype._destroyed;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.api;
    /**
     * @type {?}
     * @private
     */
    CollectionOfMultimediaAlbumsComponent.prototype.formBuilder;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.speech;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.snake;
    /** @type {?} */
    CollectionOfMultimediaAlbumsComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    CollectionOfMultimediaAlbumsComponent.prototype.floatingMicrophone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1vZi1tdWx0aW1lZGlhLWFsYnVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbXVsdGktbWVkaWEtYWxidW0tbWFuYWdlbWVudC8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlcy9jb2xsZWN0aW9uLW9mLW11bHRpbWVkaWEtYWxidW1zL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFPOUYsTUFBTSxPQUFPLHFDQUFxQzs7Ozs7Ozs7O0lBaUZoRCxZQUNTLEdBQWUsRUFDZCxXQUF3QixFQUN6QixNQUFxQixFQUNyQixLQUFtQixFQUNuQixNQUFjLEVBQ2Isa0JBQTZDO1FBTDlDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFVBQUss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QWtMTCxZQUFZLFNBQUMsZUFBZTs7Ozs7OztJQTdPN0IseURBQ2lCOztJQUVqQixvRUFDNEI7O0lBRTVCLHVEQUNlOztJQUVmLDhEQUNzQjs7SUFFdEIsdUVBQytCOztJQUUvQixvRUFDNEI7O0lBRTVCLGlFQUN5Qjs7SUFFekIscURBQ2E7O0lBRWIscURBQ2E7O0lBRWIseURBQ2lCOztJQUVqQixtRUFDMkI7O0lBRTNCLGdFQUN3Qjs7SUFFeEIsK0RBQ3VCOztJQUV2Qiw2REFDcUI7O0lBRXJCLDBEQUNtQjs7SUFFbkIsOERBQ3VCOztJQUV2Qix3RUFDZ0M7O0lBRWhDLDJEQUNtQjs7SUFJbkIsdUVBQytCOztJQUUvQix5RUFDaUM7O0lBRWpDLGdFQUFnQjs7SUFDaEIseUVBQXlCOztJQUN6Qiw0REFBWTs7SUFDWiw0REFBWTs7SUFFWixrRUFBa0I7O0lBQ2xCLGlFQUF5Qjs7SUFDekIsNERBQW9COztJQUNwQiw4REFBYzs7SUFDZCxtRUFBbUI7O0lBQ25CLHNFQUFzQjs7SUFDdEIseUVBQThCOztJQUM5Qiw4REFBYzs7Ozs7SUFFZCwyREFBeUM7O0lBRXZDLG9EQUFzQjs7Ozs7SUFDdEIsNERBQWdDOztJQUNoQyx1REFBNEI7O0lBQzVCLHNEQUEwQjs7SUFDMUIsdURBQXFCOzs7OztJQUNyQixtRUFBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTcGVlY2hTZXJ2aWNlIH0gZnJvbSAnbmd4LXNwZWVjaCc7XG5pbXBvcnQgeyBFTVBUWSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFNuYWtlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9lYXN0ZXJFZ2cvc25ha2Uuc2VydmljZSc7XG5pbXBvcnQgeyBGbG9hdGluZ01pY3JvcGhvbmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zsb2F0aW5nLW1pY3JvcGhvbmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtY29sbGVjdGlvbi1vZi1tdWx0aW1lZGlhLWFsYnVtc1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMuY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbk9mTXVsdGltZWRpYUFsYnVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFNwZWNpZmljIG9wdGlvbnMgd2lsbCBvdmVycmlkZSBiYXRjaCBvcHRpb25zIGZyb20ganNvbiBvYmplY3RcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdyaWRTaXplOiBudW1iZXI7IC8vIG51bWJlciBvZiBhbGJ1bXMgZGlzcGxheWVkIG9uIGEgcm93XG5cbiAgQElucHV0KClcbiAgZ3JpZFNpemVTdWdnZXN0aW9uczogbnVtYmVyOyAvLyBudW1iZXIgb2YgYWxidW1zIGRpc3BsYXllZCBvbiBhIHJvd1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGNvbGxlY3Rpb25Vcmw6IHN0cmluZzsgLy8gYXBpIGNhbGwgdG8gcmV0cmlldmUgdGhlIGFsYnVtcyBpbiB0aGUgY29sbGVjdGlvbiBpdCBjYW4gYmUgdXNlZCBmb3IgYm90aCBsb2NhbCBhbmQgcmVtb3RlIHJlc291cmNlcyBsaWtlIGEgbG9jYWwganNvbiBvciBmcm9tIGEgc2VydmVyXG5cbiAgQElucHV0KClcbiAgc3VnZ2VzdGVkQ29sbGVjdGlvblVybDogc3RyaW5nOyAvLyBhcGkgY2FsbCB0byByZXRyaWV2ZSB0aGUgYWxidW1zIGluIHRoZSBjb2xsZWN0aW9uXG5cbiAgQElucHV0KClcbiAgZGVsZXRlQ29sbGVjdGlvblVybDogc3RyaW5nOyAvLyBhcGkgY2FsbCB0byBkZWxldGUgdGhlIGFsYnVtcyBpbiB0aGUgY29sbGVjdGlvblxuXG4gIEBJbnB1dCgpXG4gIGFkZENvbGxlY3Rpb25Vcmw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBza2lwOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgdGFrZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGFsYnVtVXJsOiBzdHJpbmc7IC8vIGFwaSBjYWxsIHRvIHJldHJpZXZlIHRoZSBhbGJ1bXMgaW4gdGhlIEFsYnVtIGl0IGNhbiBiZSB1c2VkIGZvciBib3RoIGxvY2FsIGFuZCByZW1vdGUgcmVzb3VyY2VzIGxpa2UgYSBsb2NhbCBqc29uIG9yIGZyb20gYSBzZXJ2ZXJcblxuICBASW5wdXQoKVxuICBzdWdnZXN0ZWRFbnRpdHlVcmw6IHN0cmluZzsgLy8gYXBpIGNhbGwgdG8gcmV0cmlldmUgdGhlIEVudGl0aWVzIGluIHRoZSBFbnRpdHlcblxuICBASW5wdXQoKVxuICBkZWxldGVFbnRpdHlVcmw6IHN0cmluZzsgLy8gYXBpIGNhbGwgdG8gZGVsZXRlIHRoZSBFbnRpdGllcyBpbiB0aGUgRW50aXR5XG5cbiAgQElucHV0KClcbiAgYWRkRW50aXRpZXNVcmw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXRFbnRpdHlVcmw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzbGlkZVNob3c6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbG9ja1NsaWRlU2hvdzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzbGlkZVNob3dUaW1lQmVmb3JlTmV4dDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZ1BhdGg6IHN0cmluZztcblxuICAvLyB1c2VkIHRvIHJlZGlyZWN0IHRvIHRoZSBhbGJ1bVxuICAvL3BsYWNlaG9sZGVycyBmb3IgdGhlIGltYWdlcyBvZiB0aGUgYWxidW0oaW4gM2QgbW9kZSBvciBpbWFnZSBpbiAyZClcbiAgQElucHV0KClcbiAgYm9vdHN0cmFwQWNjZW50UHJpbWFyeTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGJvb3RzdHJhcEFjY2VudFNlY29uZGFyeTogc3RyaW5nO1xuXG4gIF9jb2xsZWN0aW9uRGF0YTtcbiAgX3N1Z2dlc3RlZENvbGxlY3Rpb25EYXRhO1xuICBfc2VhcmNoVGV4dDtcbiAgX3RvZ2dsZVZpZXc7XG5cbiAgX21vc3RVc2VkS2V5d29yZHM7XG4gIF9sb2FkZWRGaXJzdFRpbWUgPSBmYWxzZTtcbiAgX25vTW9yZURhdGEgPSBmYWxzZTtcbiAgX2RlbGV0ZUFjY2VudDtcbiAgX21hcmtlZEZvckRlbGV0aW9uO1xuICBfYWRkTmV3Q29sbGVjdGlvbkZvcm07XG4gIF9tb2RhbERlbGV0ZUNvbmZpcm1hdGlvbiA9IFwiXCI7XG4gIF9zY3JvbGxBbW91bnQ7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFwaTogQXBpU2VydmljZSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwdWJsaWMgc3BlZWNoOiBTcGVlY2hTZXJ2aWNlLFxuICAgIHB1YmxpYyBzbmFrZTogU25ha2VTZXJ2aWNlLFxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGZsb2F0aW5nTWljcm9waG9uZTogRmxvYXRpbmdNaWNyb3Bob25lU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fYWRkTmV3Q29sbGVjdGlvbkZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGNvbGxlY3Rpb25OYW1lOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBjb2xsZWN0aW9uVHlwZTogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAga2V5d29yZHM6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuICAgIHRoaXMubG9hZElucHV0T3B0aW9uc09yRGVmYXVsdCgpO1xuICAgIHRoaXMuc3BlZWNoQWN0aW9ucygpO1xuICAgIHRoaXMuZmxvYXRpbmdNaWNyb3Bob25lLm1ha2VGbG9hdGluZ01pY3JvcGhvbmUodGhpcy5zcGVlY2gpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHNwZWVjaEFjdGlvbnMoKSB7XG4gICAgdGhpcy5zcGVlY2gubWVzc2FnZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMudG9nZ2xlTWljKCk7XG4gICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG1zZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnLm1lc3NhZ2UgPT0gXCJkZWxldGVcIikge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlQ29sbGVjdGlvbkJ1dHRvblwiKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cubWVzc2FnZSA9PSBcImFkZFwiKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRDb2xsZWN0aW9uQnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1zZy5tZXNzYWdlID09IFwic3VnZ2VzdGlvbnNcIiB8fFxuICAgICAgICAgIG1zZy5tZXNzYWdlID09IFwidGlwXCIgfHxcbiAgICAgICAgICBtc2cubWVzc2FnZSA9PSBcInJlY29tbWVuZGF0aW9uc1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VnZ2VzdGlvbnNDb2xsZWN0aW9uQnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1zZy5tZXNzYWdlID09IFwic25ha2VcIikge1xuICAgICAgICAgIHRoaXMuc25ha2Uuc25ha2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZU1pYygpO1xuICAgICAgfSk7XG4gIH1cblxuICB0b2dnbGVNaWMoKSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0aW5nTWljcm9waG9uZVwiKTtcbiAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJub3RSZWNvcmRpbmdcIikpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcIm5vdFJlY29yZGluZ1wiKTtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInJlY29yZGluZ1wiKTtcbiAgICAgIHRoaXMuc3BlZWNoLnN0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcInJlY29yZGluZ1wiKTtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcIm5vdFJlY29yZGluZ1wiKTtcbiAgICAgIHRoaXMuc3BlZWNoLnN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBnZXRDb2xsZWN0aW9ucygpIHtcbiAgICB0aGlzLmFwaVxuICAgICAgLmdldERhdGEoXG4gICAgICAgIHRoaXMuY29sbGVjdGlvblVybFxuICAgICAgICAgIC5yZXBsYWNlKFwiLyR1c2VySWRcIiwgYC8ke3RoaXMudXNlcklkfWApXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJHRha2VcIiwgYC8ke3RoaXMudGFrZX1gKVxuICAgICAgICAgIC5yZXBsYWNlKFwiLyRza2lwXCIsIGAvJHt0aGlzLnNraXB9YClcbiAgICAgIClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29sbGVjdGlvbkRhdGEgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb25EYXRhID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtcImNvbGxlY3Rpb25cIl0uZm9yRWFjaCgoY29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb24pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb25bXCJwbGFjZWhvbGRlclwiXS5sZW5ndGgpO1xuXG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb25bXCJwbGFjZWhvbGRlclwiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY29sbGVjdGlvbltcInBsYWNlaG9sZGVyXCJdID0gW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGF0YTogXCIuLi8uLi8uLi9hc3NldHMvbmV3LWNvbGxlY3Rpb24uanBnXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YVtcImNvbGxlY3Rpb25cIl0ubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9jb2xsZWN0aW9uRGF0YSk7XG4gICAgICAgICAgdGhpcy5fY29sbGVjdGlvbkRhdGEgPSBbLi4udGhpcy5fY29sbGVjdGlvbkRhdGEsIC4uLmRhdGFbXCJjb2xsZWN0aW9uXCJdXTtcbiAgICAgICAgICB0aGlzLnNraXAgKz0gdGhpcy50YWtlO1xuICAgICAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb25EYXRhLmZvckVhY2goKGNvbGxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHN0ciArPSBcIixcIiArIGNvbGxlY3Rpb25bXCJrZXl3b3Jkc1wiXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9tb3N0VXNlZEtleXdvcmRzID0gdGhpcy5tb3N0VXNlZEtleXdvcmRzKHN0cik7XG4gICAgICAgICAgY29uc29sZS5sb2codHlwZW9mIHRoaXMuc3VnZ2VzdGVkQ29sbGVjdGlvblVybCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1Z2dlc3RlZENvbGxlY3Rpb25VcmwgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2codHlwZW9mIHRoaXMuc3VnZ2VzdGVkQ29sbGVjdGlvblVybCk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0U3VnZ2VzdGVkQ29sbGVjdGlvbnMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbG9hZGVkRmlyc3RUaW1lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9ub01vcmVEYXRhID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBtb3N0VXNlZEtleXdvcmRzKHN0cikge1xuICAgIHZhciB3b3JkQ291bnRzID0ge307XG4gICAgdmFyIHdvcmRzID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3b3JkQ291bnRzW1wiX1wiICsgd29yZHNbaV1dID0gKHdvcmRDb3VudHNbXCJfXCIgKyB3b3Jkc1tpXV0gfHwgMCkgKyAxO1xuICAgIH1cbiAgICBkZWxldGUgd29yZENvdW50c1tcIl9cIl07XG4gICAgdmFyIHdvcmRzTGlzdCA9IFwiXCI7XG4gICAgd29yZENvdW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkod29yZENvdW50cykucmVwbGFjZSgvXy9nLCBcIlwiKSk7XG4gICAgZm9yICh2YXIgayBpbiB3b3JkQ291bnRzKSB7XG4gICAgICB3b3Jkc0xpc3QgKz0gXCIsXCIgKyBrO1xuICAgIH1cbiAgICB3b3Jkc0xpc3QgPSB3b3Jkc0xpc3QucmVwbGFjZShcIixcIiwgXCJcIik7XG4gICAgY29uc29sZS5sb2cod29yZHNMaXN0KTtcbiAgICByZXR1cm4gd29yZHNMaXN0O1xuICB9XG5cbiAgZ2V0U3VnZ2VzdGVkQ29sbGVjdGlvbnMoKSB7XG4gICAgLy9mb3Igc3VnZ2VzdGlvbnMgd2Ugc2tpcCAwIHNpbmNlIHdlIHdhbnQgb25seSB0aGUgYmVzdCBzdWdnZXN0aW9uc1xuICAgIHRoaXMuYXBpXG4gICAgICAuZ2V0RGF0YShcbiAgICAgICAgdGhpcy5zdWdnZXN0ZWRDb2xsZWN0aW9uVXJsXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJHVzZXJJZFwiLCBgLyR7dGhpcy51c2VySWR9YClcbiAgICAgICAgICAucmVwbGFjZShcIi8kdGFrZVwiLCBgLyR7dGhpcy50YWtlfWApXG4gICAgICAgICAgLnJlcGxhY2UoXCIvJHNraXBcIiwgYC8wYCkgKyBgLyR7dGhpcy5fbW9zdFVzZWRLZXl3b3Jkc31gXG4gICAgICApXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YTogQXJyYXk8e30+KSA9PiB7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoY29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb24pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb25bXCJwbGFjZWhvbGRlclwiXS5sZW5ndGgpO1xuXG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb25bXCJwbGFjZWhvbGRlclwiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY29sbGVjdGlvbltcInBsYWNlaG9sZGVyXCJdID0gW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGF0YTogXCIuLi8uLi8uLi9hc3NldHMvbmV3LWNvbGxlY3Rpb24uanBnXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdWdnZXN0ZWRDb2xsZWN0aW9uRGF0YSA9IGRhdGE7XG4gICAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6c2Nyb2xsXCIpXG4gIG9uV2luZG93U2Nyb2xsKCkge1xuICAgIC8vSW4gY2hyb21lIGFuZCBzb21lIGJyb3dzZXIgc2Nyb2xsIGlzIGdpdmVuIHRvIGJvZHkgdGFnXG4gICAgbGV0IHBvcyA9XG4gICAgICAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgK1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBsZXQgbWF4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICBjb25zb2xlLmxvZyhwb3MpO1xuICAgIGNvbnNvbGUubG9nKG1heCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9zY3JvbGxBbW91bnQgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5fc2Nyb2xsQW1vdW50ID0gcG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtb3ZlIHRoZSBmbG9hdGluZyBtaWNyb3Bob25lIGF0IHRoZSBzYW1lIHRpbWUgd2l0aCB0aGUgc2NyZWVuXG4gICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXRpbmdNaWNyb3Bob25lXCIpO1xuICAgICAgZWxlbS5zdHlsZS50b3AgPSBwYXJzZUZsb2F0KGVsZW0uc3R5bGUudG9wKSArIChwb3MgLSB0aGlzLl9zY3JvbGxBbW91bnQpICsgXCJweFwiO1xuICAgICAgdGhpcy5fc2Nyb2xsQW1vdW50ID0gcG9zO1xuICAgIH1cblxuICAgIC8vIHBvcy9tYXggd2lsbCBnaXZlIHlvdSB0aGUgZGlzdGFuY2UgYmV0d2VlbiBzY3JvbGwgYm90dG9tIGFuZCBhbmQgYm90dG9tIG9mIHNjcmVlbiBpbiBwZXJjZW50YWdlLlxuICAgIGlmIChcbiAgICAgIHBvcyA9PSBtYXggfHxcbiAgICAgIE1hdGguY2VpbChwb3MpID09IE1hdGguY2VpbChtYXgpIHx8XG4gICAgICBNYXRoLmZsb29yKHBvcykgPT0gTWF0aC5mbG9vcihtYXgpIHx8XG4gICAgICBNYXRoLmZsb29yKHBvcykgPT0gTWF0aC5jZWlsKG1heCkgfHxcbiAgICAgIE1hdGguY2VpbChwb3MpID09IE1hdGguZmxvb3IobWF4KVxuICAgICkge1xuICAgICAgaWYgKHRoaXMuX2xvYWRlZEZpcnN0VGltZSkge1xuICAgICAgICB0aGlzLmdldENvbGxlY3Rpb25zKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9hZENvbGxlY3Rpb25zVW50aWxTY3JvbGxiYXJBcHBlYXJzKCkge1xuICAgIHRoaXMuZ2V0Q29sbGVjdGlvbnMoKTtcbiAgICBsZXQgbWF4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fbG9hZGVkRmlyc3RUaW1lID09IHRydWUpIHtcbiAgICAgICAgaWYgKG1heCA8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgfHwgdGhpcy5fbm9Nb3JlRGF0YSA9PSB0cnVlKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRDb2xsZWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICB0b2dnbGVEZWxldGVCdXR0b24oKSB7XG4gICAgaWYgKHRoaXMuX2RlbGV0ZUFjY2VudCA9PSB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnkpIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUFjY2VudCA9IHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5O1xuICAgICAgdGhpcy5fbW9kYWxEZWxldGVDb25maXJtYXRpb24gPSBcIiNkZWxldGVDb25maXJtYXRpb25Nb2RhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kZWxldGVBY2NlbnQgPSB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnk7XG4gICAgICB0aGlzLl9tb2RhbERlbGV0ZUNvbmZpcm1hdGlvbiA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgYWNjZXNzT3JEZWxldGUoY29sbGVjdGlvbikge1xuICAgIC8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhICBoZXJlIHB1dCByZWRpcmVjdCBvbiBjbGlja1xuICAgIGlmICh0aGlzLl9kZWxldGVBY2NlbnQgPT0gdGhpcy5ib290c3RyYXBBY2NlbnRTZWNvbmRhcnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb24pO1xuICAgICAgdGhpcy5fbWFya2VkRm9yRGVsZXRpb24gPSBjb2xsZWN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhjb2xsZWN0aW9uKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgLyR7Y29sbGVjdGlvbi5pZH1gXSk7XG4gICAgfVxuICB9XG5cbiAgYWNjZXNzUmVjb21tZW5kZWRDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke2NvbGxlY3Rpb24uaWR9YF0pO1xuICB9XG5cbiAgZGVsZXRlQ29sbGVjdGlvbigpIHtcbiAgICB0aGlzLmFwaVxuICAgICAgLmRlbGV0ZURhdGEoXG4gICAgICAgIHRoaXMuZGVsZXRlQ29sbGVjdGlvblVybC5yZXBsYWNlKFwiLyRjb2xsZWN0aW9uSWRcIiwgYC8ke3RoaXMuX21hcmtlZEZvckRlbGV0aW9uW1wiaWRcIl19YClcbiAgICAgIClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7fSk7XG4gICAgdGhpcy5fY29sbGVjdGlvbkRhdGEgPSB0aGlzLl9jb2xsZWN0aW9uRGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT0gdGhpcy5fbWFya2VkRm9yRGVsZXRpb24pO1xuICB9XG5cbiAgYWRkQ29sbGVjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9hZGROZXdDb2xsZWN0aW9uRm9ybSk7XG4gICAgLy8gbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAvLyBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgdGhpcy5hcGlcbiAgICAgIC5wb3N0RGF0YSh0aGlzLmFkZENvbGxlY3Rpb25VcmwsIHtcbiAgICAgICAgTmFtZTogYCR7dGhpcy5fYWRkTmV3Q29sbGVjdGlvbkZvcm0udmFsdWUuY29sbGVjdGlvbk5hbWV9YCxcbiAgICAgICAgVHlwZTogdGhpcy5fYWRkTmV3Q29sbGVjdGlvbkZvcm0udmFsdWUuY29sbGVjdGlvblR5cGUsXG4gICAgICAgIEtleXdvcmRzOiBgJHt0aGlzLl9hZGROZXdDb2xsZWN0aW9uRm9ybS52YWx1ZS5rZXl3b3Jkc31gLFxuICAgICAgICBVc2VySWQ6IGAke3RoaXMudXNlcklkfWBcbiAgICAgIH0pXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgZGF0YVtcInBsYWNlaG9sZGVyXCJdID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IFwiLi4vLi4vLi4vYXNzZXRzL25ldy1jb2xsZWN0aW9uLmpwZ1wiXG4gICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uRGF0YSA9IFsuLi50aGlzLl9jb2xsZWN0aW9uRGF0YSwgZGF0YV07XG4gICAgICB9KTtcbiAgfVxuXG4gIGxvYWRJbnB1dE9wdGlvbnNPckRlZmF1bHQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ1BhdGggIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5hcGlcbiAgICAgICAgLmdldERhdGEodGhpcy5jb25maWdQYXRoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2xsZWN0aW9uVXJsICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkQ29sbGVjdGlvbnNVbnRpbFNjcm9sbGJhckFwcGVhcnMoKTtcbiAgICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZykgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1widXNlcklkXCJdICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMudXNlcklkID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gY29uZmlnW1widXNlcklkXCJdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1wiZ3JpZFNpemVcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5ncmlkU2l6ZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRTaXplID0gY29uZmlnW1wiZ3JpZFNpemVcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJncmlkU2l6ZVN1Z2dlc3Rpb25zXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmdyaWRTaXplU3VnZ2VzdGlvbnMgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID0gY29uZmlnW1wiZ3JpZFNpemVTdWdnZXN0aW9uc1wiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImNvbGxlY3Rpb25VcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuY29sbGVjdGlvblVybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25VcmwgPSBjb25maWdbXCJjb2xsZWN0aW9uVXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wic3VnZ2VzdGVkQ29sbGVjdGlvblVybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5zdWdnZXN0ZWRDb2xsZWN0aW9uVXJsID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkQ29sbGVjdGlvblVybCA9IGNvbmZpZ1tcInN1Z2dlc3RlZENvbGxlY3Rpb25VcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJkZWxldGVDb2xsZWN0aW9uVXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmRlbGV0ZUNvbGxlY3Rpb25VcmwgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVDb2xsZWN0aW9uVXJsID0gY29uZmlnW1wiZGVsZXRlQ29sbGVjdGlvblVybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImFkZENvbGxlY3Rpb25VcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuYWRkQ29sbGVjdGlvblVybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENvbGxlY3Rpb25VcmwgPSBjb25maWdbXCJhZGRDb2xsZWN0aW9uVXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ1tcInNraXBcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5za2lwID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2tpcCA9IGNvbmZpZ1tcInNraXBcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW1widGFrZVwiXSAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnRha2UgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy50YWtlID0gY29uZmlnW1widGFrZVwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcImJvb3RzdHJhcEFjY2VudFByaW1hcnlcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeSA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnkgPSBjb25maWdbXCJib290c3RyYXBBY2NlbnRQcmltYXJ5XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5XCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmJvb3RzdHJhcEFjY2VudFNlY29uZGFyeSA9IGNvbmZpZ1tcImJvb3RzdHJhcEFjY2VudFNlY29uZGFyeVwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdbXCJhbGJ1bVVybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLmFsYnVtVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWxidW1VcmwgPSBjb25maWdbXCJhbGJ1bVVybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcInN1Z2dlc3RlZEVudGl0eVVybFwiXSAhPSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0ZWRFbnRpdHlVcmwgPSBjb25maWdbXCJzdWdnZXN0ZWRFbnRpdHlVcmxcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJkZWxldGVFbnRpdHlVcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZGVsZXRlRW50aXR5VXJsID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRW50aXR5VXJsID0gY29uZmlnW1wiZGVsZXRlRW50aXR5VXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiYWRkRW50aXRpZXNVcmxcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuYWRkRW50aXRpZXNVcmwgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5hZGRFbnRpdGllc1VybCA9IGNvbmZpZ1tcImFkZEVudGl0aWVzVXJsXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgY29uZmlnW1wiZ2V0RW50aXR5VXJsXCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmdldEVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmdldEVudGl0eVVybCA9IGNvbmZpZ1tcImdldEVudGl0eVVybFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdbXCJzbGlkZVNob3dcIl0gIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGhpcy5zbGlkZVNob3cgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVNob3cgPSBjb25maWdbXCJzbGlkZVNob3dcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWdbXCJsb2NrU2xpZGVTaG93XCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmxvY2tTbGlkZVNob3cgPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5sb2NrU2xpZGVTaG93ID0gY29uZmlnW1wibG9ja1NsaWRlU2hvd1wiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZ1tcInNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0XCJdICE9IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnNsaWRlU2hvd1RpbWVCZWZvcmVOZXh0ID09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHQgPSBjb25maWdbXCJzbGlkZVNob3dUaW1lQmVmb3JlTmV4dFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5sb2FkRGVmYXVsdCgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2xsZWN0aW9uVXJsICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbGxlY3Rpb25zVW50aWxTY3JvbGxiYXJBcHBlYXJzKCk7XG4gICAgICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkRGVmYXVsdCgpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbGxlY3Rpb25VcmwgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB0aGlzLmxvYWRDb2xsZWN0aW9uc1VudGlsU2Nyb2xsYmFyQXBwZWFycygpO1xuICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9hZERlZmF1bHQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnVzZXJJZCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnVzZXJJZCA9IFwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5ncmlkU2l6ZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmdyaWRTaXplID0gMTA7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5ncmlkU2l6ZVN1Z2dlc3Rpb25zID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZ3JpZFNpemVTdWdnZXN0aW9ucyA9IDM7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5jb2xsZWN0aW9uVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuY29sbGVjdGlvblVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zdWdnZXN0ZWRDb2xsZWN0aW9uVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3VnZ2VzdGVkQ29sbGVjdGlvblVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5kZWxldGVDb2xsZWN0aW9uVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZGVsZXRlQ29sbGVjdGlvblVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hZGRDb2xsZWN0aW9uVXJsID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYWRkQ29sbGVjdGlvblVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5za2lwID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2tpcCA9IDA7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy50YWtlID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMudGFrZSA9IDEwO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYm9vdHN0cmFwQWNjZW50UHJpbWFyeSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnkgPSBcImRhbmdlclwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5ID0gXCJkYXJrXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbGJ1bVVybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmFsYnVtVXJsID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnN1Z2dlc3RlZEVudGl0eVVybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5kZWxldGVFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5kZWxldGVFbnRpdHlVcmwgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYWRkRW50aXRpZXNVcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5hZGRFbnRpdGllc1VybCA9IFwiXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5nZXRFbnRpdHlVcmwgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5nZXRFbnRpdHlVcmwgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2xpZGVTaG93ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2xpZGVTaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NrU2xpZGVTaG93ID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMubG9ja1NsaWRlU2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2xpZGVTaG93VGltZUJlZm9yZU5leHQgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dCA9IDUwMDA7XG4gICAgfVxuXG4gICAgdmFyIGFsYnVtSW5wdXRzID0ge1xuICAgICAgZ3JpZFNpemU6IHRoaXMuZ3JpZFNpemUsXG4gICAgICBncmlkU2l6ZVN1Z2dlc3Rpb25zOiB0aGlzLmdyaWRTaXplU3VnZ2VzdGlvbnMsXG4gICAgICBza2lwOiB0aGlzLnNraXAsXG4gICAgICB0YWtlOiB0aGlzLnRha2UsXG4gICAgICBib290c3RyYXBBY2NlbnRQcmltYXJ5OiB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnksXG4gICAgICBib290c3RyYXBBY2NlbnRTZWNvbmRhcnk6IHRoaXMuYm9vdHN0cmFwQWNjZW50U2Vjb25kYXJ5LFxuICAgICAgYWxidW1Vcmw6IHRoaXMuYWxidW1VcmwsXG4gICAgICBzdWdnZXN0ZWRFbnRpdHlVcmw6IHRoaXMuc3VnZ2VzdGVkRW50aXR5VXJsLFxuICAgICAgZGVsZXRlRW50aXR5VXJsOiB0aGlzLmRlbGV0ZUVudGl0eVVybCxcbiAgICAgIGFkZEVudGl0aWVzVXJsOiB0aGlzLmFkZEVudGl0aWVzVXJsLFxuICAgICAgZ2V0RW50aXR5VXJsOiB0aGlzLmdldEVudGl0eVVybCxcbiAgICAgIGxvY2tTbGlkZVNob3c6IHRoaXMubG9ja1NsaWRlU2hvdyxcbiAgICAgIHNsaWRlU2hvdzogdGhpcy5zbGlkZVNob3csXG4gICAgICBzbGlkZVNob3dUaW1lQmVmb3JlTmV4dDogdGhpcy5zbGlkZVNob3dUaW1lQmVmb3JlTmV4dFxuICAgIH07XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFsYnVtSW5wdXRzXCIsIEpTT04uc3RyaW5naWZ5KGFsYnVtSW5wdXRzKSk7XG5cbiAgICB0aGlzLl9kZWxldGVBY2NlbnQgPSB0aGlzLmJvb3RzdHJhcEFjY2VudFByaW1hcnk7XG4gIH1cbn1cbiJdfQ==