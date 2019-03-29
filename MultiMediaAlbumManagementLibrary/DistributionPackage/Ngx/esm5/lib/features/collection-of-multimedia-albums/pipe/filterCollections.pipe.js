/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var FilterCollectionsPipe = /** @class */ (function () {
    function FilterCollectionsPipe() {
    }
    /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    FilterCollectionsPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    function (items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var type = item.type;
            if (type == 0) {
                type = "public";
            }
            else {
                type = "private";
            }
            return (item.name.toLowerCase().includes(searchText) ||
                item.keywords.split(",").some((/**
                 * @param {?} word
                 * @return {?}
                 */
                function (word) {
                    return word.toLowerCase().includes(searchText);
                })) ||
                type.includes(searchText));
        }));
    };
    FilterCollectionsPipe.decorators = [
        { type: Pipe, args: [{
                    name: "filterCollections"
                },] }
    ];
    return FilterCollectionsPipe;
}());
export { FilterCollectionsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyQ29sbGVjdGlvbnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMvcGlwZS9maWx0ZXJDb2xsZWN0aW9ucy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBeUJBLENBQUM7Ozs7OztJQXJCQyx5Q0FBUzs7Ozs7SUFBVCxVQUFVLEtBQVksRUFBRSxVQUFrQjtRQUN4QyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFOUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxPQUFPLEtBQUssQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxJQUFJOztnQkFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ3BCLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFDYixJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLElBQUksR0FBRyxTQUFTLENBQUM7YUFDbEI7WUFDRCxPQUFPLENBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7O2dCQUFDLFVBQUMsSUFBSTtvQkFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLEVBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FDMUIsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBeEJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsbUJBQW1CO2lCQUMxQjs7SUF1QkQsNEJBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQXRCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogXCJmaWx0ZXJDb2xsZWN0aW9uc1wiXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbGxlY3Rpb25zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBzZWFyY2hUZXh0OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgaWYgKCFpdGVtcykgcmV0dXJuIFtdO1xuICAgIGlmICghc2VhcmNoVGV4dCkgcmV0dXJuIGl0ZW1zO1xuXG4gICAgc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICB2YXIgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgIGlmICh0eXBlID09IDApIHtcbiAgICAgICAgdHlwZSA9IFwicHVibGljXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gXCJwcml2YXRlXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KSB8fFxuICAgICAgICBpdGVtLmtleXdvcmRzLnNwbGl0KFwiLFwiKS5zb21lKCh3b3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAgICAgICAgfSkgfHxcbiAgICAgICAgdHlwZS5pbmNsdWRlcyhzZWFyY2hUZXh0KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19