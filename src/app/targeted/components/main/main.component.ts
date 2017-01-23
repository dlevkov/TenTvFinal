import { CookieService } from 'angular2-cookie/core';
import { MainModel } from '../../models/main.model';
import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Cookies } from '../../../common/Cookies';
import { MainService } from '../../services/main.service';
import { HeadlineModel } from '../../../common/models/headline.model';
import { FilterServiceComponent } from '../filter-service/filter-service.component';
import { PreFilterMessage } from '../filter-service/pre-filter-message.component';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
    @Input() public showTwitter: boolean = true;
    @Input() public isInArticle: boolean = false;
    public seed: string;
    public item: MainModel;
    public DfpId: number = 0;
    public isFiltered: boolean = false;
    public _service: MainService;
    public _subscriber: Subscription;
    private _cookie: Cookies;
    private showMessageForNewUser: boolean = false;

    constructor(public http: Http, public _ngZone: NgZone, public route: ActivatedRoute, cookieService: CookieService) {
        this._service = new MainService(this.http);
        this._cookie = new Cookies(cookieService);
    }

    public generateDfpId(): number {
        return this.DfpId;
    }

    public addCounter(): void {
        this.DfpId++;
    }

    public ngOnInit() {
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        if (typeof data !== 'undefined' && data) {
            this.isFiltered = true;
        }
        if (this.isNewUser) this.showMessageForNewUser = true;
        this.getItems();
        this.addCounter();
        if (!this.isInArticle) this.initFilter();
    }

    public isSafary() {
        return false;
    }

    public getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/main?%24orderby=DisplayOrder%20asc')
            .subscribe((data) => {
                this.item = data;
                this.item.isFiltered = this.isFiltered;
            });
    }

    public ngOnDestroy() {
        this._subscriber.unsubscribe();
        window['AdUnitsCollectionIndex'].reset();
    }

    public initFilter() {
        let ids: number[] = this._cookie.getNanaCookie();
        console.log(ids);
        this.isFiltered = (((ids.length > 0 && ids.length !== FilterServiceComponent.filterServices.length) && ids[0] !== 0) ? true : false);
    }

    public handleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }

    public setEmptyCookie() {
        this._cookie.setNanaCookie([]);
        this.showMessageForNewUser = false;
    }

    private get isNewUser() {
        return this._cookie.isNewUser;
    }
}
