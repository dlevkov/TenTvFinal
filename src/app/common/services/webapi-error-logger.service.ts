import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Dal } from '../services/dal.service';
import { Constants } from '../Constants';
import 'rxjs/add/operator/map';

@Injectable()
export class WebApiErrorLogger implements OnDestroy {
    private _dal: Dal;
    private _dataDomain: string = Constants.DATA_DOMAIN;
    private _subscriber: Subscription;
    constructor(private _http: Http) {
        this._dal = new Dal(_http);
    }

    public Log(title: string, message: any) {
        if (!this._subscriber)
            this._subscriber = this.sendMessage(message).subscribe();
    }
    public sendMessage(message: string): Observable<any> {
        return this._http.get(this._dataDomain + 'TenTvAppFront/errorlog?ErrorDesc=' + '{' + decodeURI(message) + '}')
            .map((res) => {
                window.location.href = '/main';
            });
    }
    public ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}



