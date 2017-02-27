import { Component, Input, NgZone, OnInit, style, ViewContainerRef } from '@angular/core';
import { PubSubService } from '../../Global/PubSubService';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
@Component({
    selector: 'controller',
    template: ''
})
export class Controller implements OnInit {
    private _routeSubscriber: Subscription;
    private _isVisible: boolean = true;

    constructor(private _router: Router, private _ngZone: NgZone, private _location: Location, private viewContainer: ViewContainerRef) {
        window.angularComponentRef = { component: this, zone: _ngZone };
        window.angularComponentNav = { component: this, zone: _ngZone };

        this._router.events
            .filter((event) => event instanceof NavigationStart)
            .subscribe((evt) => {
                if (!evt.url.includes('/mainfiltered/'))
                    console.log('maavaron on:' + evt.url);
            });
    }

    public ngOnInit() {
        let elem = document.getElementById('nanaLoader');
        elem.classList.add('load-image-hidden');
    }

    public getRouteUrl(data: String) {
        this._ngZone.run(() => {
            this.setVisible();
        });
    }

    public navigateBack(data: string) {
        this._ngZone.run(() => {
            window.scrollTo(0, 0);
            this._location.back(); // in HTML5 window.history.back(); works fine
        });
    }
    public navigateHome(data: string) {
        this._ngZone.run(() => {
            this._router.navigate(['/main']);
        });
    }

    private setVisible() {
        this._isVisible = true;
        window.scrollTo(0, 0);
    }

    private navigateForward() {
        this._location.forward();
    }
}
