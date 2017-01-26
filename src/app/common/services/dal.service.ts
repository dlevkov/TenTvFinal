import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../Constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';

export class Dal {
    private _dataDomain: string = Constants.DATA_DOMAIN;

    constructor(private _http: Http) {

    }

    public GetItemsByUri(uri: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._dataDomain + uri)
            .map((res: Response) => res.json())
            .retry(5)
            .catch(this.handleError);
    }
    public handleError(error: Response) {

        console.error(error);
        // window.location.href = '/main';
        return Observable.throw(error || 'Server error');
    }
}
