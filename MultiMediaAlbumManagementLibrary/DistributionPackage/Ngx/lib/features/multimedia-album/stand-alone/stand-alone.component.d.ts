import { OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
export declare class StandAloneComponent implements OnInit {
    api: ApiService;
    gridSize: number;
    gridSizeSuggestions: number;
    skip: number;
    take: number;
    albumUrl: string;
    suggestedEntityUrl: string;
    deleteEntityUrl: string;
    addEntitiesUrl: string;
    getEntityUrl: string;
    slideShow: boolean;
    lockSlideShow: boolean;
    slideShowTimeBeforeNext: number;
    configPath: string;
    bootstrapAccentPrimary: string;
    bootstrapAccentSecondary: string;
    constructor(api: ApiService);
    ngOnInit(): void;
    loadInputOptionsOrDefault(): void;
    loadDefault(): void;
}
