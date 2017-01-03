import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../common/Constants';
import { ArticleListModel } from '../../targeted/models/article-list.model';
import { Dal } from '../../common/services/dal.service';
import 'rxjs/add/operator/map';
@Injectable()
export class ArticleListService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    public GetItemsByUri(uri: string) {
        return this._dal.GetItemsByUri(uri)
            .map((data) => {
                let items: ArticleListModel[] = [];
                if (data) {
                    data.forEach((item, index) => {
                        item.ImageTimeout = -1;
                        items.push(new ArticleListModel(item));
                    });
                }
                return items;
            });
    }
}