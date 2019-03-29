/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var FilterAlbumPipe = /** @class */ (function () {
    function FilterAlbumPipe() {
    }
    /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    FilterAlbumPipe.prototype.transform = /**
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
            return (item.name.toLowerCase().includes(searchText) ||
                item.extension.toLowerCase().includes(searchText) ||
                item.keywords.split(",").some((/**
                 * @param {?} word
                 * @return {?}
                 */
                function (word) {
                    return word.toLowerCase().includes(searchText);
                })));
        }));
    };
    FilterAlbumPipe.decorators = [
        { type: Pipe, args: [{
                    name: "filterAlbum"
                },] }
    ];
    return FilterAlbumPipe;
}());
export { FilterAlbumPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyQWxidW0ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL211bHRpbWVkaWEtYWxidW0vcGlwZS9maWx0ZXJBbGJ1bS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBbUJBLENBQUM7Ozs7OztJQWZDLG1DQUFTOzs7OztJQUFULFVBQVUsS0FBWSxFQUFFLFVBQWtCO1FBQ3hDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU5QixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLElBQUk7WUFDdkIsT0FBTyxDQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJOzs7O2dCQUFDLFVBQUMsSUFBSTtvQkFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkFsQkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxhQUFhO2lCQUNwQjs7SUFpQkQsc0JBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWhCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6IFwiZmlsdGVyQWxidW1cIlxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJBbGJ1bVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgc2VhcmNoVGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIGlmICghaXRlbXMpIHJldHVybiBbXTtcbiAgICBpZiAoIXNlYXJjaFRleHQpIHJldHVybiBpdGVtcztcblxuICAgIHNlYXJjaFRleHQgPSBzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCkgfHxcbiAgICAgICAgaXRlbS5leHRlbnNpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KSB8fFxuICAgICAgICBpdGVtLmtleXdvcmRzLnNwbGl0KFwiLFwiKS5zb21lKCh3b3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==