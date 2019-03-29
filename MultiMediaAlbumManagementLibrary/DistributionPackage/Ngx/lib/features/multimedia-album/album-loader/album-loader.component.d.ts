import { OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api/api.service';
export declare class AlbumLoaderComponent implements OnInit {
    api: ApiService;
    sourceUrl: any;
    entityId: any;
    source: any;
    extension: any;
    constructor(api: ApiService);
    ngOnInit(): void;
    getEntity(entityUrl: any): void;
}
