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

    public Log(title: string, message: Response) {

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
        this._subscriber.unsubscribe();
    }
    private convertResponseToJsonMessage(message: Response) {

        console.log(message);
        let obj = {
            title: message.statusText || 'Angular2 Error',
            source: null,
            application: 'Ten Tv app',
            detail: '' + message.text + '' || null,
            data: null,
            statusCode: message.status || null,
            severity: 'Error' || null,
            type: 'Error',
            url: message.url
        };
        return obj;
    }
}



