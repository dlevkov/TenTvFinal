import { Component, OnInit, Input, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Cookies } from '../../../common/Cookies';
import { MainService } from '../../services/main.service';
import { HeadlineModel } from '../../../common/models/headline.model';
import { MainModel } from '../../../targeted/models/main.model';
import { FilterServiceComponent } from '../filter-service/filter-service.component';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public showTwitter: boolean = true;
    @Input() public isInArticle: boolean = false;
    public seed: string;
    public item: MainModel;
    public DfpId: number = 0;
    public isFiltered: boolean = false;
    public _service: MainService;
    public _subscriber: Subscription;

    constructor(public http: Http, public _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new MainService(this.http);
    }

    public generateDfpId(): number {
        return this.DfpId;
    }

    public addCounter(): void {
        this.DfpId++;
    }

    public ngOnChanges(changes) {
        this.seed = new Date().getMilliseconds().toString();
    }

    public ngOnInit() {
        this.seed = new Date().getMilliseconds().toString();
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        if (typeof data !== 'undefined' && data) {
            this.isFiltered = true;
        }
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
            .subscribe(data => {
                this.item = data;
                this.item.isFiltered = this.isFiltered;
            });
    }

    public ngOnDestroy() {
        this._subscriber.unsubscribe();
        window['AdUnitsCollectionIndex'].reset();
        console.log('main dtor');
    }

    public initFilter() {
        Cookies.getNanaCookie();
        if (Cookies.nanaFilterSids.length > 0 && Cookies.nanaFilterSids.length !== FilterServiceComponent.filterServices.length) {
            this.isFiltered = true;
        } else
        { this.isFiltered = false; }
    }

    public handleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }
}
