import { HttpClient } from '@angular/common/http';
export declare class ApiService {
    http: HttpClient;
    constructor(http: HttpClient);
    getData(url: any): import("rxjs").Observable<Object>;
    postData(url: any, data: any): import("rxjs").Observable<Object>;
    putData(url: any, data: any): import("rxjs").Observable<Object>;
    deleteData(url: any): import("rxjs").Observable<Object>;
}
