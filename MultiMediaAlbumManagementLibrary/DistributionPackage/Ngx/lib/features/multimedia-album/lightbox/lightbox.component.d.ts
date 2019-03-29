import { AfterViewInit, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class LightboxComponent implements OnInit, AfterViewInit, OnChanges {
    data: any;
    type: any;
    index: any;
    show: any;
    noMoreData: any;
    entityUrl: any;
    slideShow: any;
    lockSlideShow: any;
    slideShowTimeBeforeNext: number;
    noShow: EventEmitter<{}>;
    loadMore: EventEmitter<{}>;
    slideIndex: any;
    ready: number;
    startSlideShow: boolean;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    start(): void;
    openEntityModal(): void;
    closeEntityModal(): void;
    plusSlides(n: any): void;
    currentSlide(n: any): void;
    showSlides(n: any): void;
}
