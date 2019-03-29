/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionOfMultimediaAlbumsComponent, } from '../features/collection-of-multimedia-albums/collection-of-multimedia-albums.component';
import { MultimediaAlbumComponent } from './../features/multimedia-album/multimedia-album.component';
/** @type {?} */
var routes = [
    {
        path: "",
        component: CollectionOfMultimediaAlbumsComponent
    },
    {
        path: ":id",
        component: MultimediaAlbumComponent
    },
    {
        path: "**",
        redirectTo: ""
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forRoot(routes)],
                    exports: [RouterModule]
                },] }
    ];
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvY29yZS9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRXZELE9BQU8sRUFDTCxxQ0FBcUMsR0FDdEMsTUFBTSx1RkFBdUYsQ0FBQztBQUMvRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQzs7SUFFL0YsTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUscUNBQXFDO0tBQ2pEO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsS0FBSztRQUNYLFNBQVMsRUFBRSx3QkFBd0I7S0FDcEM7SUFDRDtRQUNFLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLEVBQUU7S0FDZjtDQUNGO0FBRUQ7SUFBQTtJQUkrQixDQUFDOztnQkFKL0IsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDeEI7O0lBQzhCLHVCQUFDO0NBQUEsQUFKaEMsSUFJZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uT2ZNdWx0aW1lZGlhQWxidW1zQ29tcG9uZW50LFxyXG59IGZyb20gJy4uL2ZlYXR1cmVzL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMvY29sbGVjdGlvbi1vZi1tdWx0aW1lZGlhLWFsYnVtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWx0aW1lZGlhQWxidW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2ZlYXR1cmVzL211bHRpbWVkaWEtYWxidW0vbXVsdGltZWRpYS1hbGJ1bS5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogXCJcIixcclxuICAgIGNvbXBvbmVudDogQ29sbGVjdGlvbk9mTXVsdGltZWRpYUFsYnVtc0NvbXBvbmVudFxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogXCI6aWRcIixcclxuICAgIGNvbXBvbmVudDogTXVsdGltZWRpYUFsYnVtQ29tcG9uZW50XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiBcIioqXCIsXHJcbiAgICByZWRpcmVjdFRvOiBcIlwiXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXHJcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cclxuIl19