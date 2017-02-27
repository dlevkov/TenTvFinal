import { confirmationAnimation, visibilityChanged } from '../../../animations';
import { Constants } from '../../../common/Constants';
import { Cookies } from '../../../common/Cookies';
import { FilterServiceModel } from '../../../common/models/filter-service.model';
import { MainModel } from '../../../targeted/models/main.model';
import { FilterServiceService } from '../../services/filter-service.service';
import {
    animate,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    state,
    style,
    transition,
    trigger,
    DoCheck
} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'filter-service',
    templateUrl: 'filter-service.component.html',
    animations: [visibilityChanged, confirmationAnimation]
})
export class FilterServiceComponent implements OnInit {

    public static filterServices: FilterServiceModel[] = new Array<FilterServiceModel>(
        new FilterServiceModel({ HebServiceName: 'חדשות', ServiceID: 126, ServiceName: 'news', StripeColor: '#f7892d' }),
        new FilterServiceModel({ HebServiceName: 'ערוץ 10', ServiceID: 169, ServiceName: 'news', StripeColor: '#f30373' }),
        new FilterServiceModel({ HebServiceName: 'תרבות ובידור', ServiceID: 123, ServiceName: 'news', StripeColor: '#e68479' }),
        new FilterServiceModel({ HebServiceName: 'לייף סטייל', ServiceID: 129, ServiceName: 'news', StripeColor: '#e33194' }),
        new FilterServiceModel({ HebServiceName: 'אונליין', ServiceID: 127, ServiceName: 'news', StripeColor: '#000000' }),
        new FilterServiceModel({ HebServiceName: 'אוכל', ServiceID: 142, ServiceName: 'news', StripeColor: '#bc024a' }),
        new FilterServiceModel({ HebServiceName: 'סלבס', ServiceID: 216, ServiceName: 'news', StripeColor: '#dcc608' }),
        new FilterServiceModel({ HebServiceName: 'גיימר', ServiceID: 212, ServiceName: 'news', StripeColor: '#5C9DC0' }),
        new FilterServiceModel({ HebServiceName: 'דוקו', ServiceID: 186, ServiceName: 'news', StripeColor: '#f30373' })
    );
    public static getColorBySid(sid: number) {
        let color = '';
        FilterServiceComponent.filterServices.forEach((element: FilterServiceModel) => {
            if (element.ServiceID === sid) color = element.StripeColor;
        });
        return color;
    }

    @Input() public mainModel: MainModel;

    public get Sids(): number[] {
        return this._sids;
    }
    public set Sids(v: number[]) {
        this._sids = v;
    }
    public visibility = 'hidden';
    public confirm = false;
    public animationConfirm = 'hidden';
    public _items: FilterServiceModel[];
    public _loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    public _service: FilterServiceService;
    public _subscriber: Subscription;
    public _sids: number[] = [];
    public _generatedId: string;
    public _classUpdated: string = '';
    public _clearFilterText = {
        false: 'סמן הכל',
        true: 'נקה הכל',
    };
    public _clearFilter: boolean = true;
    public _updateButtonStyle = { 'color': '#585756', 'border-color': '#585756' };
    public _filterCookie: Cookies;
    public _filterCookieData: string;
    public _filterCookieName: string = Constants.FILTERCOOKIENAME;
    public showMessageForNewUser: boolean = false;
    private _cookie: Cookies;

    constructor(http: Http, public _router: Router, public _ngZone: NgZone, public _element: ElementRef, cookieService: CookieService) {
        this._service = new FilterServiceService(http);
        this._cookie = new Cookies(cookieService);
        window.angularComponentRef = { component: this, zone: _ngZone };
    }

    public ngOnInit() {
        this.initItems();
        this.initUserData();
        if (this.isNewUser) this.showMessageForNewUser = true;
    }

    // Used by Outer JS Object CastTimeHelper.toggleServiceFilter(). DO_NOT_CHANGE
    public toggleFilter() {
        this._ngZone.run(() => {
            this.toggleVisibility(); // show or hide
        });
    }

    public initUserData() {
        this.getCookieData();
        this.applyChecked();
    }

    public clearFilterTextGet() {
        // let text = this._clearFilter ? 'true' : 'false';
        return this._clearFilterText[this._clearFilter.toString()];
    }

    public toggleclearFilter() {
        this._items.forEach((element: FilterServiceModel) => {
            element.Checked = !this._clearFilter;
        });
        this._clearFilter = !this._clearFilter;
        this._classUpdated = 'rsvp_changed_status';
        this._updateButtonStyle = { 'color': 'red', 'border-color': 'red' };
    }

    public initItems() {
        this._items = FilterServiceComponent.filterServices;
    }

    public toggleVisibility() {
        this.visibility = (this.visibility === 'hidden' ? 'shown' : 'hidden');
    }

    public Redirect() {
        this.confirm = true;
        this.animationConfirm = 'shown';
    }
    public setIds() {
        this._cookie.setNanaCookie(this._sids);
    }

    public setEmptyCookie() {
        this._cookie.setNanaCookie([]);
        this.showMessageForNewUser = false;
    }

    private get isNewUser() {
        return this._cookie.isNewUser;
    }
    private closeWithTimeout() {
        setTimeout(() => {
            this.onClose(null);
        }, 1500);
    }
    private onClose(event) {
        this.visibility = 'hidden';
        this.animationConfirm = 'hidden';
        this.confirm = false;
        this.mainModel.setFiltered();
        this.getChecked();
        this.setIds();

        if (this._sids.length > 0) // has items
            this._router.navigate(['/mainfiltered/' + this._generatedId, { data: this._sids }]); else
            this._router.navigate(['/emptyFilter']);
    }
    private getCookieData() {
        this._sids = this._cookie.getNanaCookie();
    }

    private getChecked() {
        this._sids = this._items.filter((x: FilterServiceModel) => x.Checked === true).map((x: FilterServiceModel) => x.ServiceID);
    }

    private applyChecked() {
        this._items.filter((it: FilterServiceModel) => this._sids.indexOf(it.ServiceID) >= 0).forEach((element: FilterServiceModel) => {
            element.Checked = true;
        });
        if (this._sids.length > 0)
            this._clearFilter = true;
    }

    private clickCheckbox() {
        this._classUpdated = 'rsvp_changed_status';
        this._updateButtonStyle = { 'color': 'red', 'border-color': 'red' };
        this._clearFilter = true;
        console.log('parent click');
    }
}
