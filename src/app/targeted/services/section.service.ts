import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../common/Constants';
import { SectionModel } from '../models/section.model';
import { Dal } from '../../common/services/dal.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SectionService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    public GetItemsByUri(uri: string) {
        return this._dal.GetItemsByUri(uri)
            .map(data => {
                return new SectionModel(data);
            });
    }
}
