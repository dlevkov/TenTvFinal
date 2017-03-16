import { Component, Input, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { GtmService } from '../../services/gtm.service';

@Component({
    selector: 'tag-manager',
    template: `
    <div></div>
  `
})
export class GoogleTagManager implements OnDestroy {

    public _service: GtmService;
    public _articleId: string = 'articleId';
    public _sectionId: string = 'sectionId';
    public _urlParams: string = '';

    private _routeSubscriber: Subscription;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new GtmService(http);
        this._routeSubscriber = this.route.params.subscribe((x) => {
            let typeParam = this.route.snapshot.url[0].path;
            let valueParam = this.route.snapshot.url[1].path;
            switch (typeParam) {
                case 'article':
                    this.getData(this._articleId, valueParam);
                    break;
                case 'section':
                    this.getData(this._sectionId, valueParam);
                    break;
                default:
                    break;
            }

        });
    }
    public getData(key, value) {
        this._subscriber = this._service.getGtmData('?' + key + '=' + value)
            .subscribe((data) => {
                window['NanaGoogleTag'].setNanaGoogleTagParams(data);
            });
    }

    public ngOnDestroy() {
        if (this._subscriber)
            this._subscriber.unsubscribe();
        this._routeSubscriber.unsubscribe();
    }
}
