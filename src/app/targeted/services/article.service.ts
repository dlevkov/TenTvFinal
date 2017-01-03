import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../common/Constants';
import { ArticleModel } from '../models/article.model';
import { Dal } from '../../common/services/dal.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    public GetItemsByUri(uri: string): Observable<ArticleModel> {
        return this._dal.GetItemsByUri(uri)
            .map(data => {
                return new ArticleModel(data);
            });
    }
}