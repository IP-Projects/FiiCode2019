/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class FilterCollectionsPipe {
    /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    transform(items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
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
                (word) => {
                    return word.toLowerCase().includes(searchText);
                })) ||
                type.includes(searchText));
        }));
    }
}
FilterCollectionsPipe.decorators = [
    { type: Pipe, args: [{
                name: "filterCollections"
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyQ29sbGVjdGlvbnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL2NvbGxlY3Rpb24tb2YtbXVsdGltZWRpYS1hbGJ1bXMvcGlwZS9maWx0ZXJDb2xsZWN0aW9ucy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7SUFDaEMsU0FBUyxDQUFDLEtBQVksRUFBRSxVQUFrQjtRQUN4QyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFOUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxPQUFPLEtBQUssQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7Z0JBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTtZQUNwQixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsU0FBUyxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxDQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNyQyxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2pELENBQUMsRUFBQztnQkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUMxQixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF4QkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxtQkFBbUI7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogXCJmaWx0ZXJDb2xsZWN0aW9uc1wiXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbGxlY3Rpb25zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBzZWFyY2hUZXh0OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgaWYgKCFpdGVtcykgcmV0dXJuIFtdO1xuICAgIGlmICghc2VhcmNoVGV4dCkgcmV0dXJuIGl0ZW1zO1xuXG4gICAgc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICB2YXIgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgIGlmICh0eXBlID09IDApIHtcbiAgICAgICAgdHlwZSA9IFwicHVibGljXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gXCJwcml2YXRlXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KSB8fFxuICAgICAgICBpdGVtLmtleXdvcmRzLnNwbGl0KFwiLFwiKS5zb21lKCh3b3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAgICAgICAgfSkgfHxcbiAgICAgICAgdHlwZS5pbmNsdWRlcyhzZWFyY2hUZXh0KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19