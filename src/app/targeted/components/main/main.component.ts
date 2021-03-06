import { INanaRouteProvider, NanaRouterDataSenderService } from '../../services/nanaRouter-data-sender.service';
import { DfpUnitManager } from '../../../common/components/3rdParty/dfp/dfp-basic';
import { DfpStripComponent } from '../../../common/components/3rdParty/dfp/dfp-strip.component';
import { DfpInboardComponent } from '../../../common/components/3rdParty/dfp/dfp-inboard.component';
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
import { pageTransition } from '../../../animations';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    animations: [pageTransition]
})

export class MainComponent implements OnInit, OnDestroy, INanaRouteProvider {
    @Input() public showTwitter: boolean = true;
    @Input() public isInArticle: boolean = false;

    public seed: string;
    public item: MainModel;
    public DfpId: number = 0;
    public isFiltered: boolean = false;
    public _service: MainService;
    public _subscriber: Subscription;
    public state: string = 'in';
    public isDfp: boolean = true;

    public inboardData: any;
    public stripData: any;

    private _routeSubscriber: Subscription;
    private _cookie: Cookies;

    constructor(public http: Http, public _ngZone: NgZone, public route: ActivatedRoute, cookieService: CookieService, private nanaRouter: NanaRouterDataSenderService) {
        this._service = new MainService(this.http);
        this._cookie = new Cookies(cookieService);
        this.seed = new Date().getTime().toString();
    }

    public generateDfpId(): number {
        return this.DfpId;
    }

    public addCounter(): void {
        this.DfpId++;
    }

    public ngOnInit() {
        this._routeSubscriber = this.route.params
            .subscribe(() => {
                if (!this.isInArticle) this.initFilter();
                this.getItems();
                this.addCounter();
            });

        this.state = (this.state === 'in' ? 'out' : 'in');
        this.SendData(); // send data object to outer space

    }

    public isSafary() {
        return false;
    }

    public getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/main?%24orderby=DisplayOrder%20asc%2CLastModifyDate%20desc')
            .subscribe((data) => {
                this.item = data;
                this.item.isFiltered = this.isFiltered;
                this.setConcreteComponents();
            });
    }

    public ngOnDestroy() {
        this._subscriber.unsubscribe();
        this._routeSubscriber.unsubscribe();
        window['AdUnitsCollectionIndex'].reset();
    }

    public initFilter() {
        let ids: number[] = this._cookie.getNanaCookie();
        console.log('filter init from main: ' + ids);
        this.isFiltered = (((ids.length > 0 && ids.length !== FilterServiceComponent.filterServices.length) && ids[0] !== 0) ? true : false);
    }

    public handleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }

    public setConcreteComponents() {
        this.inboardData = {
            component: DfpInboardComponent,
            inputs: {
                seed: this.seed
            }
        };
        this.stripData = {
            component: DfpStripComponent,
            inputs: {
                seed: this.seed,
                dfpObjectName: 'main',
                dfpId: this.generateDfpId(),
                mainModel: this.item
            }
        };
        setTimeout(() => {
            window['AdUnitsCollectionIndex'].init();
            DfpUnitManager.ResetCounters();
        }, 5000);
    }

    public SendData() {
        this.nanaRouter.SendFiltered(this.isFiltered);
    }
}
