import { PipeTransform } from '@angular/core';
export declare class FilterCollectionsPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[];
}
