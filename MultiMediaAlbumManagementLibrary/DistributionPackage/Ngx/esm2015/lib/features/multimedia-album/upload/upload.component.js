/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as $_ from 'jquery';
import * as pdfjsLib from 'pdfjs-dist';
import { take } from 'rxjs/operators';
import { ApiService } from '../../../shared/api/api.service';
export class UploadComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
        this.newData = new EventEmitter();
        this.discarded = new EventEmitter();
        this.$ = $_;
        this.imageFormats = ["jpeg", "jpg", "png", "webp", "gif"];
        this.videoFormats = ["webm", "ogv", "mp4"];
        this.audioFormats = ["mp3", "wave", "ogg", "oga"];
        this.bypassCors = "http://cors-anywhere.herokuapp.com/";
        this.arrayOfEntityAndPlaceholder = [];
        this.urlInput = "";
        this.urlInputClass = "";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.makeUploadArea();
        // setInterval(() => {
        //   console.log(this.arrayOfEntityAndPlaceholder);
        // }, 1000);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.upload == true) {
            this.uploadFiles();
        }
        if (this.cancel == true) {
            this.uploadFiles();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
    /**
     * @param {?} entity
     * @return {?}
     */
    discardFile(entity) {
        this.arrayOfEntityAndPlaceholder = this.arrayOfEntityAndPlaceholder.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != entity));
        console.log(this.arrayOfEntityAndPlaceholder);
    }
    /**
     * @return {?}
     */
    discardChanges() {
        this.arrayOfEntityAndPlaceholder = [];
        this.discarded.emit(0);
    }
    /**
     * @return {?}
     */
    uploadFiles() {
        console.log(this.addEntitiesUrl);
        console.log(this.arrayOfEntityAndPlaceholder);
        /** @type {?} */
        var sendData = [];
        /** @type {?} */
        var totalStorage = 0;
        this.arrayOfEntityAndPlaceholder.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            console.log(entity.fileSize);
            if (entity.fileSize <= 21) {
                if (totalStorage <= 21 && totalStorage + entity.fileSize <= 21) {
                    sendData.push(entity);
                    totalStorage += entity.fileSize;
                }
                else {
                    this.postData(sendData);
                    totalStorage = 0;
                    sendData = [];
                    sendData.push(entity);
                    totalStorage += entity.fileSize;
                }
            }
        }));
        if (sendData.length > 0) {
            this.postData(sendData);
        }
        this.arrayOfEntityAndPlaceholder = [];
    }
    /**
     * @param {?} sendData
     * @return {?}
     */
    postData(sendData) {
        this.api
            .postData(this.addEntitiesUrl, sendData)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            for (var i = 0; i < sendData.length; i++) {
                sendData[i]["entityFile"] = null;
                sendData[i]["id"] = data[i]["id"];
            }
            this.newData.emit(sendData);
        }));
    }
    /**
     * @return {?}
     */
    makeUploadArea() {
        $("#uploadModal").on({
            "dragover dragenter": (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                e.preventDefault();
                e.stopPropagation();
            }),
            drop: (/**
             * @param {?} e
             * @param {?} ui
             * @return {?}
             */
            (e, ui) => {
                /** @type {?} */
                var dataTransfer = e.originalEvent["dataTransfer"];
                console.log(dataTransfer);
                if (dataTransfer && dataTransfer.files.length) {
                    console.log(dataTransfer);
                    e.preventDefault();
                    e.stopPropagation();
                    this.readUploadedFilesAndGetPlaceholders(dataTransfer.files, this.collectionId);
                }
            })
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    uploadFilesFromButton(event) {
        this.readUploadedFilesAndGetPlaceholders(event.target.files, this.collectionId);
    }
    /**
     * @param {?} e
     * @param {?} collectionId
     * @return {?}
     */
    readUploadedFilesAndGetPlaceholders(e, collectionId) {
        /** @type {?} */
        const width = 200;
        /** @type {?} */
        const height = 200;
        console.log(e);
        Object.keys(e).forEach((/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            console.log(e[file]);
            console.log(e[file].name);
            /** @type {?} */
            const fileName = e[file].name;
            /** @type {?} */
            const fileSize = e[file].size / 1024000;
            /** @type {?} */
            const reader = new FileReader();
            reader.readAsDataURL(e[file]);
            (reader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                var readerMetaData = event.target["result"].split(";")[0];
                if (readerMetaData.includes("image") && readerMetaData.includes("svg")) {
                    this.imageData(event.target["result"], width, height, "svg", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("image") && !readerMetaData.includes("svg")) {
                    this.imageData(event.target["result"], width, height, "image", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("audio")) {
                    this.audioData(event.target["result"], width, height, "audio", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("video")) {
                    this.videoData(event.target["result"], width, height, "video", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("pdf")) {
                    this.pdfData(event.target["result"], width, height, "pdf", fileName, 0, collectionId, fileSize);
                }
                console.log(this.arrayOfEntityAndPlaceholder);
            })),
                (reader.onerror = (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => console.log(error)));
        }));
    }
    /**
     * @return {?}
     */
    scrapUrl() {
        this.getPlaceholderFromUrl(this.collectionId);
    }
    /**
     * @param {?} collectionId
     * @return {?}
     */
    getPlaceholderFromUrl(collectionId) {
        /** @type {?} */
        const width = 200;
        /** @type {?} */
        const height = 200;
        /** @type {?} */
        var url = this.urlInput.split("?")[0];
        /** @type {?} */
        var extensionArr = url.split(".");
        /** @type {?} */
        var extension = extensionArr[extensionArr.length - 1];
        /** @type {?} */
        var fileSize = 0.05;
        /** @type {?} */
        var fileName = "File From Url";
        if (typeof url != "undefined") {
            if (this.imageFormats.includes(extension) ||
                this.audioFormats.includes(extension) ||
                this.videoFormats.includes(extension) ||
                extension == "pdf" ||
                extension == "svg" ||
                url.includes("youtube")) {
                if (extension == "svg") {
                    this.imageData(url, width, height, "svg", fileName, 1, collectionId, fileSize);
                }
                if (this.imageFormats.includes(extension)) {
                    this.imageData(url, width, height, "image", fileName, 1, collectionId, fileSize);
                }
                if (this.audioFormats.includes(extension)) {
                    this.audioData(url, width, height, "audio", fileName, 1, collectionId, fileSize);
                }
                if (this.videoFormats.includes(extension)) {
                    this.videoData(url, width, height, "video", fileName, 1, collectionId, fileSize);
                }
                if (extension == "pdf") {
                    this.pdfData(url, width, height, "pdf", fileName, 1, collectionId, fileSize);
                }
                if (url.includes("youtube")) {
                    this.youtubeData(this.urlInput, width, height, "youtube", fileName, 1, collectionId, fileSize);
                }
                this.urlInputClass = "";
            }
            else {
                this.urlInputClass = "text-danger";
            }
        }
        else {
            this.urlInputClass = "text-danger";
        }
        this.urlInput = "";
    }
    /**
     * @param {?} data
     * @param {?} canvas
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize) {
        return {
            name: fileName.split(".")[0],
            data: canvas.toDataURL("image/jpeg", 1),
            collectionId: collectionId,
            extension: extension,
            keywords: "",
            fileSize: fileSize,
            entityFile: [
                {
                    name: fileName,
                    extension: extension,
                    isUrl: isUrl,
                    data: data
                }
            ]
        };
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    imageData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const img = new Image();
        if (isUrl == 1) {
            img.crossOrigin = "Anonymous";
            img.src = this.bypassCors + data;
        }
        else {
            img.src = data;
        }
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
            console.log(this.arrayOfEntityAndPlaceholder);
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    audioData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const img = new Image();
        img.src = "../../../assets/music-icon.jpg";
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    pdfData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        var dataBypass;
        if (isUrl == 1) {
            dataBypass = this.bypassCors + data;
        }
        else {
            dataBypass = data;
        }
        pdfjsLib.getDocument(dataBypass).then((/**
         * @param {?} pdf
         * @return {?}
         */
        (pdf) => {
            pdf.getPage(1).then((/**
             * @param {?} page
             * @return {?}
             */
            (page) => {
                /** @type {?} */
                var canvas = document.createElement("canvas");
                /** @type {?} */
                var viewport = page.getViewport(1.0);
                /** @type {?} */
                var context = canvas.getContext("2d");
                canvas.height = height;
                canvas.width = width;
                page
                    .render({
                    canvasContext: context,
                    viewport: viewport
                })
                    .then((/**
                 * @return {?}
                 */
                () => {
                    this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
                }));
            }));
        }));
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    videoData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const video = document.createElement("video");
        if (isUrl == 1) {
            video.crossOrigin = "Anonymous";
            video.src = this.bypassCors + data;
        }
        else {
            video.src = data;
        }
        video.onloadeddata = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(video, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    youtubeData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        var url = "https://img.youtube.com/vi/" + data.split("/watch?v=")[1] + "/0.jpg";
        /** @type {?} */
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.bypassCors + url;
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                selector: "app-upload",
                template: "<div id=\"uploadModal\" class=\"w-100 h-100 h-min-300px roboto-font\">\n  <div class=\"d-flex flex-wrap align-items-center justify-content-between\">\n    <div class=\"d-flex  flex-nowrap w-resizable-70 mb-1\">\n      <input\n        type=\"text\"\n        [(ngModel)]=\"urlInput\"\n        class=\"form-control mr-1 {{ urlInputClass }}\"\n        data-toggle=\"tooltip\"\n        title=\"The url must end with a known file extension\"\n      />\n      <button class=\"btn btn-{{ bootstrapAccentSecondary }} w-min-100px\" (click)=\"scrapUrl()\">\n        Insert Url\n      </button>\n    </div>\n    <div class=\"d-flex  flex-nowrap justify-content-end w-resizable-30 mb-1\">\n      <input hidden type=\"file\" #uploader (change)=\"uploadFilesFromButton($event)\" multiple />\n      <button class=\"btn btn-{{ bootstrapAccentSecondary }}\" (click)=\"uploader.click()\">\n        Select Files\n      </button>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let entity of arrayOfEntityAndPlaceholder; let i = index\"\n    class=\"d-flex flex-nowrap  align-items-center w-100 mb-2\"\n  >\n    <div class=\"d-flex flex-wrap  align-items-center mr-1\">\n      <input\n        [(ngModel)]=\"arrayOfEntityAndPlaceholder[i].name\"\n        placeholder=\"Name\"\n        class=\"{{ entity.fileSize > 21 ? 'text-danger' : '' }} form-control\"\n      />\n      <input\n        [(ngModel)]=\"arrayOfEntityAndPlaceholder[i].keywords\"\n        placeholder=\"Keyword1,Keyword2,Keyword3\"\n        class=\"{{ entity.fileSize > 21 ? 'text-danger' : '' }} form-control\"\n      />\n    </div>\n    <div class=\"d-flex  flex-nowrap justify-content-end w-min-100px \">\n      <button class=\"btn btn-danger\" (click)=\"discardFile(entity)\">\n        Discard File\n      </button>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: ApiService }
];
UploadComponent.propDecorators = {
    upload: [{ type: Input }],
    cancel: [{ type: Input }],
    collectionId: [{ type: Input }],
    addEntitiesUrl: [{ type: Input }],
    bootstrapAccentSecondary: [{ type: Input }],
    newData: [{ type: Output }],
    discarded: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    UploadComponent.prototype.upload;
    /** @type {?} */
    UploadComponent.prototype.cancel;
    /** @type {?} */
    UploadComponent.prototype.collectionId;
    /** @type {?} */
    UploadComponent.prototype.addEntitiesUrl;
    /** @type {?} */
    UploadComponent.prototype.bootstrapAccentSecondary;
    /** @type {?} */
    UploadComponent.prototype.newData;
    /** @type {?} */
    UploadComponent.prototype.discarded;
    /** @type {?} */
    UploadComponent.prototype.$;
    /** @type {?} */
    UploadComponent.prototype.imageFormats;
    /** @type {?} */
    UploadComponent.prototype.videoFormats;
    /** @type {?} */
    UploadComponent.prototype.audioFormats;
    /** @type {?} */
    UploadComponent.prototype.bypassCors;
    /** @type {?} */
    UploadComponent.prototype.arrayOfEntityAndPlaceholder;
    /** @type {?} */
    UploadComponent.prototype.urlInput;
    /** @type {?} */
    UploadComponent.prototype.urlInputClass;
    /** @type {?} */
    UploadComponent.prototype.api;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL211bHRpbWVkaWEtYWxidW0vdXBsb2FkL3VwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0IsT0FBTyxLQUFLLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU83RCxNQUFNLE9BQU8sZUFBZTs7OztJQThCMUIsWUFBbUIsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFibEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHN0IsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0IsTUFBQyxHQUFHLEVBQUUsQ0FBQztRQUVQLGlCQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsaUJBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsaUJBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLGVBQVUsR0FBRyxxQ0FBcUMsQ0FBQztRQUNuRCxnQ0FBMkIsR0FBRyxFQUFFLENBQUM7UUFDakMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQWlMZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJ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UCx1Q0FDYTs7SUFFYix5Q0FDZTs7SUFFZixtREFDeUI7O0lBRXpCLGtDQUM2Qjs7SUFFN0Isb0NBQytCOztJQUUvQiw0QkFBTzs7SUFFUCx1Q0FBcUQ7O0lBQ3JELHVDQUFzQzs7SUFDdEMsdUNBQTZDOztJQUM3QyxxQ0FBbUQ7O0lBQ25ELHNEQUFpQzs7SUFDakMsbUNBQWM7O0lBaUxkLHdDQUFtQjs7SUFoTFAsOEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyAkXyBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICogYXMgcGRmanNMaWIgZnJvbSAncGRmanMtZGlzdCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2FwaS9hcGkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtdXBsb2FkXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vdXBsb2FkLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi91cGxvYWQuY29tcG9uZW50LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKVxuICB1cGxvYWQ7XG5cbiAgQElucHV0KClcbiAgY2FuY2VsO1xuXG4gIEBJbnB1dCgpXG4gIGNvbGxlY3Rpb25JZDtcblxuICBASW5wdXQoKVxuICBhZGRFbnRpdGllc1VybDtcblxuICBASW5wdXQoKVxuICBib290c3RyYXBBY2NlbnRTZWNvbmRhcnk7XG5cbiAgQE91dHB1dCgpXG4gIG5ld0RhdGEgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIGRpc2NhcmRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAkID0gJF87XG5cbiAgaW1hZ2VGb3JtYXRzID0gW1wianBlZ1wiLCBcImpwZ1wiLCBcInBuZ1wiLCBcIndlYnBcIiwgXCJnaWZcIl07XG4gIHZpZGVvRm9ybWF0cyA9IFtcIndlYm1cIiwgXCJvZ3ZcIiwgXCJtcDRcIl07XG4gIGF1ZGlvRm9ybWF0cyA9IFtcIm1wM1wiLCBcIndhdmVcIiwgXCJvZ2dcIiwgXCJvZ2FcIl07XG4gIGJ5cGFzc0NvcnMgPSBcImh0dHA6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vXCI7XG4gIGFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlciA9IFtdO1xuICB1cmxJbnB1dCA9IFwiXCI7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhcGk6IEFwaVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYWtlVXBsb2FkQXJlYSgpO1xuICAgIC8vIHNldEludGVydmFsKCgpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyKTtcbiAgICAvLyB9LCAxMDAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51cGxvYWQgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jYW5jZWwgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHt9XG5cbiAgZGlzY2FyZEZpbGUoZW50aXR5KSB7XG4gICAgdGhpcy5hcnJheU9mRW50aXR5QW5kUGxhY2Vob2xkZXIgPSB0aGlzLmFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlci5maWx0ZXIoXG4gICAgICAoaXRlbSkgPT4gaXRlbSAhPSBlbnRpdHlcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyKTtcbiAgfVxuXG4gIGRpc2NhcmRDaGFuZ2VzKCkge1xuICAgIHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyID0gW107XG4gICAgdGhpcy5kaXNjYXJkZWQuZW1pdCgwKTtcbiAgfVxuXG4gIHVwbG9hZEZpbGVzKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYWRkRW50aXRpZXNVcmwpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyKTtcbiAgICB2YXIgc2VuZERhdGEgPSBbXTtcbiAgICB2YXIgdG90YWxTdG9yYWdlID0gMDtcbiAgICB0aGlzLmFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlci5mb3JFYWNoKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVudGl0eS5maWxlU2l6ZSk7XG4gICAgICBpZiAoZW50aXR5LmZpbGVTaXplIDw9IDIxKSB7XG4gICAgICAgIGlmICh0b3RhbFN0b3JhZ2UgPD0gMjEgJiYgdG90YWxTdG9yYWdlICsgZW50aXR5LmZpbGVTaXplIDw9IDIxKSB7XG4gICAgICAgICAgc2VuZERhdGEucHVzaChlbnRpdHkpO1xuICAgICAgICAgIHRvdGFsU3RvcmFnZSArPSBlbnRpdHkuZmlsZVNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wb3N0RGF0YShzZW5kRGF0YSk7XG4gICAgICAgICAgdG90YWxTdG9yYWdlID0gMDtcbiAgICAgICAgICBzZW5kRGF0YSA9IFtdO1xuXG4gICAgICAgICAgc2VuZERhdGEucHVzaChlbnRpdHkpO1xuICAgICAgICAgIHRvdGFsU3RvcmFnZSArPSBlbnRpdHkuZmlsZVNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoc2VuZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wb3N0RGF0YShzZW5kRGF0YSk7XG4gICAgfVxuICAgIHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyID0gW107XG4gIH1cblxuICBwb3N0RGF0YShzZW5kRGF0YSkge1xuICAgIHRoaXMuYXBpXG4gICAgICAucG9zdERhdGEodGhpcy5hZGRFbnRpdGllc1VybCwgc2VuZERhdGEpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbmREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc2VuZERhdGFbaV1bXCJlbnRpdHlGaWxlXCJdID0gbnVsbDtcbiAgICAgICAgICBzZW5kRGF0YVtpXVtcImlkXCJdID0gZGF0YVtpXVtcImlkXCJdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV3RGF0YS5lbWl0KHNlbmREYXRhKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbWFrZVVwbG9hZEFyZWEoKSB7XG4gICAgJChcIiN1cGxvYWRNb2RhbFwiKS5vbih7XG4gICAgICBcImRyYWdvdmVyIGRyYWdlbnRlclwiOiAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9LFxuICAgICAgZHJvcDogKGUsIHVpKSA9PiB7XG4gICAgICAgIHZhciBkYXRhVHJhbnNmZXIgPSBlLm9yaWdpbmFsRXZlbnRbXCJkYXRhVHJhbnNmZXJcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFUcmFuc2Zlcik7XG4gICAgICAgIGlmIChkYXRhVHJhbnNmZXIgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFUcmFuc2Zlcik7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgdGhpcy5yZWFkVXBsb2FkZWRGaWxlc0FuZEdldFBsYWNlaG9sZGVycyhkYXRhVHJhbnNmZXIuZmlsZXMsIHRoaXMuY29sbGVjdGlvbklkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBsb2FkRmlsZXNGcm9tQnV0dG9uKGV2ZW50KSB7XG4gICAgdGhpcy5yZWFkVXBsb2FkZWRGaWxlc0FuZEdldFBsYWNlaG9sZGVycyhldmVudC50YXJnZXQuZmlsZXMsIHRoaXMuY29sbGVjdGlvbklkKTtcbiAgfVxuXG4gIHJlYWRVcGxvYWRlZEZpbGVzQW5kR2V0UGxhY2Vob2xkZXJzKGUsIGNvbGxlY3Rpb25JZCkge1xuICAgIGNvbnN0IHdpZHRoID0gMjAwO1xuICAgIGNvbnN0IGhlaWdodCA9IDIwMDtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlW2ZpbGVdKTtcbiAgICAgIGNvbnNvbGUubG9nKGVbZmlsZV0ubmFtZSk7XG5cbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZVtmaWxlXS5uYW1lO1xuICAgICAgY29uc3QgZmlsZVNpemUgPSBlW2ZpbGVdLnNpemUgLyAxMDI0MDAwO1xuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZVtmaWxlXSk7XG4gICAgICAocmVhZGVyLm9ubG9hZCA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgcmVhZGVyTWV0YURhdGEgPSBldmVudC50YXJnZXRbXCJyZXN1bHRcIl0uc3BsaXQoXCI7XCIpWzBdO1xuICAgICAgICBpZiAocmVhZGVyTWV0YURhdGEuaW5jbHVkZXMoXCJpbWFnZVwiKSAmJiByZWFkZXJNZXRhRGF0YS5pbmNsdWRlcyhcInN2Z1wiKSkge1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0W1wicmVzdWx0XCJdLFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBcInN2Z1wiLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgY29sbGVjdGlvbklkLFxuICAgICAgICAgICAgZmlsZVNpemVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkZXJNZXRhRGF0YS5pbmNsdWRlcyhcImltYWdlXCIpICYmICFyZWFkZXJNZXRhRGF0YS5pbmNsdWRlcyhcInN2Z1wiKSkge1xuICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0W1wicmVzdWx0XCJdLFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBcImltYWdlXCIsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBjb2xsZWN0aW9uSWQsXG4gICAgICAgICAgICBmaWxlU2l6ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWRlck1ldGFEYXRhLmluY2x1ZGVzKFwiYXVkaW9cIikpIHtcbiAgICAgICAgICB0aGlzLmF1ZGlvRGF0YShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldFtcInJlc3VsdFwiXSxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgXCJhdWRpb1wiLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgY29sbGVjdGlvbklkLFxuICAgICAgICAgICAgZmlsZVNpemVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkZXJNZXRhRGF0YS5pbmNsdWRlcyhcInZpZGVvXCIpKSB7XG4gICAgICAgICAgdGhpcy52aWRlb0RhdGEoXG4gICAgICAgICAgICBldmVudC50YXJnZXRbXCJyZXN1bHRcIl0sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIFwidmlkZW9cIixcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25JZCxcbiAgICAgICAgICAgIGZpbGVTaXplXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVhZGVyTWV0YURhdGEuaW5jbHVkZXMoXCJwZGZcIikpIHtcbiAgICAgICAgICB0aGlzLnBkZkRhdGEoXG4gICAgICAgICAgICBldmVudC50YXJnZXRbXCJyZXN1bHRcIl0sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIFwicGRmXCIsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBjb2xsZWN0aW9uSWQsXG4gICAgICAgICAgICBmaWxlU2l6ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hcnJheU9mRW50aXR5QW5kUGxhY2Vob2xkZXIpO1xuICAgICAgfSksXG4gICAgICAgIChyZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVybElucHV0Q2xhc3MgPSBcIlwiO1xuICBzY3JhcFVybCgpIHtcbiAgICB0aGlzLmdldFBsYWNlaG9sZGVyRnJvbVVybCh0aGlzLmNvbGxlY3Rpb25JZCk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlckZyb21VcmwoY29sbGVjdGlvbklkKSB7XG4gICAgY29uc3Qgd2lkdGggPSAyMDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gMjAwO1xuXG4gICAgdmFyIHVybCA9IHRoaXMudXJsSW5wdXQuc3BsaXQoXCI/XCIpWzBdO1xuICAgIHZhciBleHRlbnNpb25BcnIgPSB1cmwuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBleHRlbnNpb24gPSBleHRlbnNpb25BcnJbZXh0ZW5zaW9uQXJyLmxlbmd0aCAtIDFdO1xuICAgIHZhciBmaWxlU2l6ZSA9IDAuMDU7XG4gICAgdmFyIGZpbGVOYW1lID0gXCJGaWxlIEZyb20gVXJsXCI7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmltYWdlRm9ybWF0cy5pbmNsdWRlcyhleHRlbnNpb24pIHx8XG4gICAgICAgIHRoaXMuYXVkaW9Gb3JtYXRzLmluY2x1ZGVzKGV4dGVuc2lvbikgfHxcbiAgICAgICAgdGhpcy52aWRlb0Zvcm1hdHMuaW5jbHVkZXMoZXh0ZW5zaW9uKSB8fFxuICAgICAgICBleHRlbnNpb24gPT0gXCJwZGZcIiB8fFxuICAgICAgICBleHRlbnNpb24gPT0gXCJzdmdcIiB8fFxuICAgICAgICB1cmwuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbiA9PSBcInN2Z1wiKSB7XG4gICAgICAgICAgdGhpcy5pbWFnZURhdGEodXJsLCB3aWR0aCwgaGVpZ2h0LCBcInN2Z1wiLCBmaWxlTmFtZSwgMSwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VGb3JtYXRzLmluY2x1ZGVzKGV4dGVuc2lvbikpIHtcbiAgICAgICAgICB0aGlzLmltYWdlRGF0YSh1cmwsIHdpZHRoLCBoZWlnaHQsIFwiaW1hZ2VcIiwgZmlsZU5hbWUsIDEsIGNvbGxlY3Rpb25JZCwgZmlsZVNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvRm9ybWF0cy5pbmNsdWRlcyhleHRlbnNpb24pKSB7XG4gICAgICAgICAgdGhpcy5hdWRpb0RhdGEodXJsLCB3aWR0aCwgaGVpZ2h0LCBcImF1ZGlvXCIsIGZpbGVOYW1lLCAxLCBjb2xsZWN0aW9uSWQsIGZpbGVTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52aWRlb0Zvcm1hdHMuaW5jbHVkZXMoZXh0ZW5zaW9uKSkge1xuICAgICAgICAgIHRoaXMudmlkZW9EYXRhKHVybCwgd2lkdGgsIGhlaWdodCwgXCJ2aWRlb1wiLCBmaWxlTmFtZSwgMSwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dGVuc2lvbiA9PSBcInBkZlwiKSB7XG4gICAgICAgICAgdGhpcy5wZGZEYXRhKHVybCwgd2lkdGgsIGhlaWdodCwgXCJwZGZcIiwgZmlsZU5hbWUsIDEsIGNvbGxlY3Rpb25JZCwgZmlsZVNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpKSB7XG4gICAgICAgICAgdGhpcy55b3V0dWJlRGF0YShcbiAgICAgICAgICAgIHRoaXMudXJsSW5wdXQsXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIFwieW91dHViZVwiLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgY29sbGVjdGlvbklkLFxuICAgICAgICAgICAgZmlsZVNpemVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXJsSW5wdXRDbGFzcyA9IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVybElucHV0Q2xhc3MgPSBcInRleHQtZGFuZ2VyXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsSW5wdXRDbGFzcyA9IFwidGV4dC1kYW5nZXJcIjtcbiAgICB9XG4gICAgdGhpcy51cmxJbnB1dCA9IFwiXCI7XG4gIH1cblxuICBnZW5lcmF0ZVBvc3RPYmplY3QoZGF0YSwgY2FudmFzLCBleHRlbnNpb24sIGZpbGVOYW1lLCBpc1VybCwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBmaWxlTmFtZS5zcGxpdChcIi5cIilbMF0sXG4gICAgICBkYXRhOiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiLCAxKSxcbiAgICAgIGNvbGxlY3Rpb25JZDogY29sbGVjdGlvbklkLFxuICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICBrZXl3b3JkczogXCJcIixcbiAgICAgIGZpbGVTaXplOiBmaWxlU2l6ZSxcbiAgICAgIGVudGl0eUZpbGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IGZpbGVOYW1lLFxuICAgICAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uLFxuICAgICAgICAgIGlzVXJsOiBpc1VybCxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgaW1hZ2VEYXRhKGRhdGEsIHdpZHRoLCBoZWlnaHQsIGV4dGVuc2lvbiwgZmlsZU5hbWUsIGlzVXJsLCBjb2xsZWN0aW9uSWQsIGZpbGVTaXplKSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaWYgKGlzVXJsID09IDEpIHtcbiAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCI7XG4gICAgICBpbWcuc3JjID0gdGhpcy5ieXBhc3NDb3JzICsgZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1nLnNyYyA9IGRhdGE7XG4gICAgfVxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgdGhpcy5hcnJheU9mRW50aXR5QW5kUGxhY2Vob2xkZXIucHVzaChcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVBvc3RPYmplY3QoZGF0YSwgY2FudmFzLCBleHRlbnNpb24sIGZpbGVOYW1lLCBpc1VybCwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSlcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlcik7XG4gICAgfTtcbiAgfVxuXG4gIGF1ZGlvRGF0YShkYXRhLCB3aWR0aCwgaGVpZ2h0LCBleHRlbnNpb24sIGZpbGVOYW1lLCBpc1VybCwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSkge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSBcIi4uLy4uLy4uL2Fzc2V0cy9tdXNpYy1pY29uLmpwZ1wiO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIHRoaXMuYXJyYXlPZkVudGl0eUFuZFBsYWNlaG9sZGVyLnB1c2goXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQb3N0T2JqZWN0KGRhdGEsIGNhbnZhcywgZXh0ZW5zaW9uLCBmaWxlTmFtZSwgaXNVcmwsIGNvbGxlY3Rpb25JZCwgZmlsZVNpemUpXG4gICAgICApO1xuICAgIH07XG4gIH1cbiAgcGRmRGF0YShkYXRhLCB3aWR0aCwgaGVpZ2h0LCBleHRlbnNpb24sIGZpbGVOYW1lLCBpc1VybCwgY29sbGVjdGlvbklkLCBmaWxlU2l6ZSkge1xuICAgIHZhciBkYXRhQnlwYXNzO1xuICAgIGlmIChpc1VybCA9PSAxKSB7XG4gICAgICBkYXRhQnlwYXNzID0gdGhpcy5ieXBhc3NDb3JzICsgZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YUJ5cGFzcyA9IGRhdGE7XG4gICAgfVxuICAgIHBkZmpzTGliLmdldERvY3VtZW50KGRhdGFCeXBhc3MpLnRoZW4oKHBkZikgPT4ge1xuICAgICAgcGRmLmdldFBhZ2UoMSkudGhlbigocGFnZSkgPT4ge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdmFyIHZpZXdwb3J0ID0gcGFnZS5nZXRWaWV3cG9ydCgxLjApO1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgcGFnZVxuICAgICAgICAgIC5yZW5kZXIoe1xuICAgICAgICAgICAgY2FudmFzQ29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIHZpZXdwb3J0OiB2aWV3cG9ydFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcnJheU9mRW50aXR5QW5kUGxhY2Vob2xkZXIucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVBvc3RPYmplY3QoXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBjYW52YXMsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGlzVXJsLFxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25JZCxcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB2aWRlb0RhdGEoZGF0YSwgd2lkdGgsIGhlaWdodCwgZXh0ZW5zaW9uLCBmaWxlTmFtZSwgaXNVcmwsIGNvbGxlY3Rpb25JZCwgZmlsZVNpemUpIHtcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICBpZiAoaXNVcmwgPT0gMSkge1xuICAgICAgdmlkZW8uY3Jvc3NPcmlnaW4gPSBcIkFub255bW91c1wiO1xuICAgICAgdmlkZW8uc3JjID0gdGhpcy5ieXBhc3NDb3JzICsgZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW8uc3JjID0gZGF0YTtcbiAgICB9XG4gICAgdmlkZW8ub25sb2FkZWRkYXRhID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB0aGlzLmFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICB0aGlzLmdlbmVyYXRlUG9zdE9iamVjdChkYXRhLCBjYW52YXMsIGV4dGVuc2lvbiwgZmlsZU5hbWUsIGlzVXJsLCBjb2xsZWN0aW9uSWQsIGZpbGVTaXplKVxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgeW91dHViZURhdGEoZGF0YSwgd2lkdGgsIGhlaWdodCwgZXh0ZW5zaW9uLCBmaWxlTmFtZSwgaXNVcmwsIGNvbGxlY3Rpb25JZCwgZmlsZVNpemUpIHtcbiAgICB2YXIgdXJsID0gXCJodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS9cIiArIGRhdGEuc3BsaXQoXCIvd2F0Y2g/dj1cIilbMV0gKyBcIi8wLmpwZ1wiO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCI7XG4gICAgaW1nLnNyYyA9IHRoaXMuYnlwYXNzQ29ycyArIHVybDtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKGltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB0aGlzLmFycmF5T2ZFbnRpdHlBbmRQbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICB0aGlzLmdlbmVyYXRlUG9zdE9iamVjdChkYXRhLCBjYW52YXMsIGV4dGVuc2lvbiwgZmlsZU5hbWUsIGlzVXJsLCBjb2xsZWN0aW9uSWQsIGZpbGVTaXplKVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG4iXX0=