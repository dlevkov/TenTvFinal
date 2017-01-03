import { Observable } from 'rxjs/Observable';

export interface IService<T> {
    getAll(skip: number, top: number): Observable<T[]>;
    getCount(controllerName?: string ): Observable<number>;
}
