import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Dal } from '../services/dal.service';
import { Constants } from '../Constants';
import 'rxjs/add/operator/map';

@Injectable()
export class WebApiErrorLogger implements OnDestroy {
    private _dal: Dal;
    private _elmahApi: string = 'https://elmah.io/api/v2/messages';
    private _elmahID: string = '980f5cfd-86c6-4690-af25-62e3e3a848ac';

    private _subscriber: Subscription;
    constructor(private _http: Http) {
        this._dal = new Dal(_http);
    }

    public Log(message) {

        let jsonMessage = this.convertResponseToJsonMessage(message);
        if (!this._subscriber)
            this._subscriber = this.sendMessage(jsonMessage).subscribe();
    }
    public sendMessage(message): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._elmahApi + '?logid=' + this._elmahID, message)
            .map((res) => {
                window.location.href = '/main';
            });
    }
    public ngOnDestroy() {
        if (this._subscriber) {
            this._subscriber.unsubscribe();
        }
    }
    private convertResponseToJsonMessage(message) {

        console.log('Income error:' + message);
        let obj = {
            title: message.statusText || message.message || 'Angular2 Error',
            source: null,
            application: 'Ten Tv app',
            detail: message.stack || '' + message.text + '' || null,
            data: null,
            statusCode: message.status || null,
            severity: 'Error' || null,
            type: 'Error',
            url: message.url,
            cookies: message.headers
        };
        return obj;
    }
}



