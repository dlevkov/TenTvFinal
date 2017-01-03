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
export class SectionComponent implements OnInit, OnDestroy {
    item: SectionModel;

    private _currentId: number;
    private _service: SectionService;
    private _subscriber: Subscription;
    private _dfpId: number = 1;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new SectionService(http);
    }

    generateDfpId(i: number): number {
        return Math.floor(i / 4);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/sectionBy/' + this._currentId + '?%24orderby=DisplayOrder%20desc')
            .subscribe(data => {
                this.item = data;
            });
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
