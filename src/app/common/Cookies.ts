import { Inject } from '@angular/core';
import { Constants } from './Constants';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';


export class Cookies {
    public nanaFilterSids: number[] = [];
    public sCookieName: string = Constants.FILTERCOOKIENAME;

    private nanaFilterCookieData: string;

    constructor(private _cookieService: CookieService) {
    }

    public getNanaCookie(): number[] {
        return this.getCookie();
    }

    public setNanaCookie(sids: number[]) {
        this.nanaFilterSids = sids;
        if (sids.length === 0) {
            this._cookieService.remove(this.sCookieName);
            return;
        }
        this.setCookie(this.nanaFilterSids.join(','), 2000, 'nana10.co.il');
    }

    private setCookie(sValue, exdays, sDomain) {
        let key = this.sCookieName;
        let value = sValue;
        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put(key, value, opts);
    }

    // This function read the cookie that was saved by saveCookie function
    private getCookie(): number[] {
        let res: number[] = [];
        let cookie = (this._cookieService.get(this.sCookieName));

        if (cookie != null)// cookie exists
            cookie.split(',').forEach((element) => {
                res.push(+element); // add id's as numbers
            });
        return res;
    }
}
