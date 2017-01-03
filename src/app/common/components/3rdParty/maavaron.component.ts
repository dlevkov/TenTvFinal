import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../Constants';


@Component({
    selector: 'maavaron',
    templateUrl: 'maavaron.component.html',
    styleUrls: ['maavaron.component.css'],
})
export class Maavaron {
    @Input() serviceName: string = '10tv';
    @Input() suffix: string = '';

    public _isVisible: boolean = true;
    public _isDisabled: boolean = false;
    public width: number = 0;
    public height: number = 0;

    public _currentId: number;
    public _routeSubscriber: Subscription;


    constructor(
        public route: ActivatedRoute) {
        //
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._isVisible = true;
            window['castTimeHelper'].showNativeMaavaron();
            console.log('route activated maavaron');
        });
    }

    setSize(size: number[]) {
        this.width = size[0];
        this.height = size[1];
    }

    setClosingTimeout() {
        let timeout = Constants.MAAVARONTIMEOUT;
        setTimeout(() => {
            this.close();
        }, timeout);
    }

    close() {
        this._isVisible = false;
    }

}
