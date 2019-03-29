/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PdfModuleModule } from '@multimedia-album-management/extras/pdf-module';
import { SvgModuleModule } from '@multimedia-album-management/extras/svg-module';
import { YoutubeModuleModule } from '@multimedia-album-management/extras/youtube-module';
import { SpeechModule } from 'ngx-speech';
import { AppRoutingModule } from './core/app-routing.module';
import { CollectionOfMultimediaAlbumsComponent, } from './features/collection-of-multimedia-albums/collection-of-multimedia-albums.component';
import { FilterCollectionsPipe } from './features/collection-of-multimedia-albums/pipe/filterCollections.pipe';
import { AlbumLoaderComponent } from './features/multimedia-album/album-loader/album-loader.component';
import { LightboxComponent } from './features/multimedia-album/lightbox/lightbox.component';
import { MultimediaAlbumComponent } from './features/multimedia-album/multimedia-album.component';
import { FilterAlbumPipe } from './features/multimedia-album/pipe/filterAlbum.pipe';
import { StandAloneComponent } from './features/multimedia-album/stand-alone/stand-alone.component';
import { UploadComponent } from './features/multimedia-album/upload/upload.component';
import { NgxMultiMediaAlbumManagementComponent } from './ngx-multi-media-album-management.component';
import { AudioModuleComponent } from './shared/modularComponents/audio-module/audio-module.component';
import { ImageModuleComponent } from './shared/modularComponents/image-module/image-module.component';
import { VideoModuleComponent } from './shared/modularComponents/video-module/video-module.component';
var NgxMultiMediaAlbumManagementModule = /** @class */ (function () {
    function NgxMultiMediaAlbumManagementModule() {
    }
    NgxMultiMediaAlbumManagementModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        NgxMultiMediaAlbumManagementComponent,
                        MultimediaAlbumComponent,
                        CollectionOfMultimediaAlbumsComponent,
                        AlbumLoaderComponent,
                        ImageModuleComponent,
                        VideoModuleComponent,
                        AudioModuleComponent,
                        FilterCollectionsPipe,
                        FilterAlbumPipe,
                        StandAloneComponent,
                        LightboxComponent,
                        UploadComponent
                    ],
                    imports: [
                        BrowserModule,
                        AppRoutingModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        SpeechModule,
                        PdfModuleModule,
                        SvgModuleModule,
                        YoutubeModuleModule
                    ],
                    providers: [
                        { provide: APP_BASE_HREF, useValue: "/" },
                        { provide: "SPEECH_LANG", useValue: "en-US" }
                    ],
                    exports: [CollectionOfMultimediaAlbumsComponent, StandAloneComponent]
                },] }
    ];
    return NgxMultiMediaAlbumManagementModule;
}());
export { NgxMultiMediaAlbumManagementModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQ0wscUNBQXFDLEdBQ3RDLE1BQU0sc0ZBQXNGLENBQUM7QUFDOUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDL0csT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDdkcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDNUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN0RixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN0RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN0RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUV0RztJQUFBO0lBZ0NpRCxDQUFDOztnQkFoQ2pELFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1oscUNBQXFDO3dCQUNyQyx3QkFBd0I7d0JBQ3hCLHFDQUFxQzt3QkFDckMsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7d0JBQ3pDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO3FCQUM5QztvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxtQkFBbUIsQ0FBQztpQkFDdEU7O0lBQ2dELHlDQUFDO0NBQUEsQUFoQ2xELElBZ0NrRDtTQUFyQyxrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfQkFTRV9IUkVGIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBQZGZNb2R1bGVNb2R1bGUgfSBmcm9tICdAbXVsdGltZWRpYS1hbGJ1bS1tYW5hZ2VtZW50L2V4dHJhcy9wZGYtbW9kdWxlJztcbmltcG9ydCB7IFN2Z01vZHVsZU1vZHVsZSB9IGZyb20gJ0BtdWx0aW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvZXh0cmFzL3N2Zy1tb2R1bGUnO1xuaW1wb3J0IHsgWW91dHViZU1vZHVsZU1vZHVsZSB9IGZyb20gJ0BtdWx0aW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvZXh0cmFzL3lvdXR1YmUtbW9kdWxlJztcbmltcG9ydCB7IFNwZWVjaE1vZHVsZSB9IGZyb20gJ25neC1zcGVlY2gnO1xuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9jb3JlL2FwcC1yb3V0aW5nLm1vZHVsZSc7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uT2ZNdWx0aW1lZGlhQWxidW1zQ29tcG9uZW50LFxufSBmcm9tICcuL2ZlYXR1cmVzL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMvY29sbGVjdGlvbi1vZi1tdWx0aW1lZGlhLWFsYnVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyQ29sbGVjdGlvbnNQaXBlIH0gZnJvbSAnLi9mZWF0dXJlcy9jb2xsZWN0aW9uLW9mLW11bHRpbWVkaWEtYWxidW1zL3BpcGUvZmlsdGVyQ29sbGVjdGlvbnMucGlwZSc7XG5pbXBvcnQgeyBBbGJ1bUxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9hbGJ1bS1sb2FkZXIvYWxidW0tbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWdodGJveENvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9saWdodGJveC9saWdodGJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGltZWRpYUFsYnVtQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy9tdWx0aW1lZGlhLWFsYnVtL211bHRpbWVkaWEtYWxidW0uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlckFsYnVtUGlwZSB9IGZyb20gJy4vZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9waXBlL2ZpbHRlckFsYnVtLnBpcGUnO1xuaW1wb3J0IHsgU3RhbmRBbG9uZUNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvbXVsdGltZWRpYS1hbGJ1bS9zdGFuZC1hbG9uZS9zdGFuZC1hbG9uZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy9tdWx0aW1lZGlhLWFsYnVtL3VwbG9hZC91cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IE5neE11bHRpTWVkaWFBbGJ1bU1hbmFnZW1lbnRDb21wb25lbnQgfSBmcm9tICcuL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb01vZHVsZUNvbXBvbmVudCB9IGZyb20gJy4vc2hhcmVkL21vZHVsYXJDb21wb25lbnRzL2F1ZGlvLW1vZHVsZS9hdWRpby1tb2R1bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlTW9kdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9zaGFyZWQvbW9kdWxhckNvbXBvbmVudHMvaW1hZ2UtbW9kdWxlL2ltYWdlLW1vZHVsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9Nb2R1bGVDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlZC9tb2R1bGFyQ29tcG9uZW50cy92aWRlby1tb2R1bGUvdmlkZW8tbW9kdWxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neE11bHRpTWVkaWFBbGJ1bU1hbmFnZW1lbnRDb21wb25lbnQsXG4gICAgTXVsdGltZWRpYUFsYnVtQ29tcG9uZW50LFxuICAgIENvbGxlY3Rpb25PZk11bHRpbWVkaWFBbGJ1bXNDb21wb25lbnQsXG4gICAgQWxidW1Mb2FkZXJDb21wb25lbnQsXG4gICAgSW1hZ2VNb2R1bGVDb21wb25lbnQsXG4gICAgVmlkZW9Nb2R1bGVDb21wb25lbnQsXG4gICAgQXVkaW9Nb2R1bGVDb21wb25lbnQsXG4gICAgRmlsdGVyQ29sbGVjdGlvbnNQaXBlLFxuICAgIEZpbHRlckFsYnVtUGlwZSxcbiAgICBTdGFuZEFsb25lQ29tcG9uZW50LFxuICAgIExpZ2h0Ym94Q29tcG9uZW50LFxuICAgIFVwbG9hZENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBTcGVlY2hNb2R1bGUsXG4gICAgUGRmTW9kdWxlTW9kdWxlLFxuICAgIFN2Z01vZHVsZU1vZHVsZSxcbiAgICBZb3V0dWJlTW9kdWxlTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQVBQX0JBU0VfSFJFRiwgdXNlVmFsdWU6IFwiL1wiIH0sXG4gICAgeyBwcm92aWRlOiBcIlNQRUVDSF9MQU5HXCIsIHVzZVZhbHVlOiBcImVuLVVTXCIgfVxuICBdLFxuICBleHBvcnRzOiBbQ29sbGVjdGlvbk9mTXVsdGltZWRpYUFsYnVtc0NvbXBvbmVudCwgU3RhbmRBbG9uZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TXVsdGlNZWRpYUFsYnVtTWFuYWdlbWVudE1vZHVsZSB7fVxuIl19