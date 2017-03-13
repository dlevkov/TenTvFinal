import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Dal } from '../services/dal.service';
import { VideoModel } from '../models/video.model';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    public GetItemsByUri(uri: string) {
        return this._dal.GetItemsByUri(uri)
            .map((data) => {
                let item: VideoModel;
                if (data) {
                    item = new VideoModel(data[0]);
                }
                return item;
            })
            .catch(this._dal.handleError);
    }
}
