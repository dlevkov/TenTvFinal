import { INanaRouteProvider, NanaRouterDataSenderService } from '../../services/nanaRouter-data-sender.service';
import { DfpUnitManager } from '../../../common/components/3rdParty/dfp/dfp-basic';
import { DfpInSectionStripComponent } from '../../../common/components/3rdParty/dfp/dfp-in-section-strip.component';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SectionService } from '../../services/section.service';
import { SectionModel } from '../../models/section.model';
import { GoogleTagManager } from '../../../common/components/3rdParty/googleTagManager';

@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy, INanaRouteProvider {
    public item: SectionModel;
    public incomeData: any;

    private _currentId: number;
    private _service: SectionService;
    private _subscriber: Subscription;
    private _dfpId: number = 1;

    constructor(public route: ActivatedRoute, http: Http, private nanaRouter: NanaRouterDataSenderService) {
        this._service = new SectionService(http);
    }

    public generateDfpId(i: number): number {
        return Math.floor(i / 4);
    }

    public ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
        this.setConcreteComponents();
    }

    public getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/sectionBy/' + this._currentId + '?%24orderby=DisplayOrder%20desc')
            .subscribe((data) => {
                this.item = data;
                this.SendData();
            });
    }
    public ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

    public SendData() {
        this.nanaRouter.SendSection(this.item);
    }
    private setConcreteComponents() {
        this.incomeData = {
            component: DfpInSectionStripComponent,
            inputs: {
                seed: new Date().getTime().toString()
            }
        };

        setTimeout(() => {
            window['AdUnitsCollectionIndex'].init();
            console.log('internal init');
            DfpUnitManager.ResetCounters();
        }, 5000);
        console.log('external init');
    }
}
