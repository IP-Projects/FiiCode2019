import { AfterViewInit, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
export declare class UploadComponent implements OnInit, OnChanges, AfterViewInit {
    api: ApiService;
    upload: any;
    cancel: any;
    collectionId: any;
    addEntitiesUrl: any;
    bootstrapAccentSecondary: any;
    newData: EventEmitter<{}>;
    discarded: EventEmitter<{}>;
    $: JQueryStatic;
    imageFormats: string[];
    videoFormats: string[];
    audioFormats: string[];
    bypassCors: string;
    arrayOfEntityAndPlaceholder: any[];
    urlInput: string;
    constructor(api: ApiService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    discardFile(entity: any): void;
    discardChanges(): void;
    uploadFiles(): void;
    postData(sendData: any): void;
    makeUploadArea(): void;
    uploadFilesFromButton(event: any): void;
    readUploadedFilesAndGetPlaceholders(e: any, collectionId: any): void;
    urlInputClass: string;
    scrapUrl(): void;
    getPlaceholderFromUrl(collectionId: any): void;
    generatePostObject(data: any, canvas: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): {
        name: any;
        data: any;
        collectionId: any;
        extension: any;
        keywords: string;
        fileSize: any;
        entityFile: {
            name: any;
            extension: any;
            isUrl: any;
            data: any;
        }[];
    };
    imageData(data: any, width: any, height: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): void;
    audioData(data: any, width: any, height: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): void;
    pdfData(data: any, width: any, height: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): void;
    videoData(data: any, width: any, height: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): void;
    youtubeData(data: any, width: any, height: any, extension: any, fileName: any, isUrl: any, collectionId: any, fileSize: any): void;
}