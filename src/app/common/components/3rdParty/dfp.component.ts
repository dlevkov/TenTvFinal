import { Component, AfterViewInit, Input } from '@angular/core';
import { Constants } from '../../Constants';
import { Maavaron } from './maavaron.component';


@Component({
    selector: 'dfp',
    template: `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" [ngStyle]="dfpStyle" [class]='"mainDfpItem"'></div>
  `
})
export class DfpMain implements AfterViewInit {
    @Input() serviceName: string = '10tv';
    @Input() placeHolderId: string = '';
    @Input() dfpObjectName: string = 'main';
    @Input() dfpStyle: string = '';
    @Input() maavaron: Maavaron;
    @Input() dfpId: number;

    public _dfpRef: any[];
    public _isVisible: boolean = false;
    public _isDisabled: boolean = false;
    public _currentResolution: number[] = [];
    public slotName: string;
    public adSize: number[] = [];
    public adUnitName: string;
    public _loadingTimeout: number = Constants.DFPLOADINGTIMEOUT;
    public _count: number = 0;
    public _adUnitsCollectionIndex: any;


    ngAfterViewInit() {

        this.generateDfpParams();
        let unit = this.setDfpParams();
        //reinit dfp
        this._adUnitsCollectionIndex.init();

    }

    setDfpParams(): any {
        let unit = new window['AdUnitsCollection']();
        this._adUnitsCollectionIndex = window['AdUnitsCollectionIndex'];
        this._adUnitsCollectionIndex.getUnitsCount();

        unit.objectName = this.dfpObjectName;
        unit.slotName = this.placeHolderId;
        unit.adSize = this.adSize;
        unit.adUnitName = this.adUnitName;

        this._adUnitsCollectionIndex.add(unit);
        return unit;
    }


    //
    getResolution() {
        this._currentResolution.length = 0;
        this._currentResolution = [screen.width, screen.height];
    }

    //
    getMainAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(50);
                break;
        }
        return res;

    }

    //
    getArticleAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(300);
                res.push(250);
                break;
        }
        return res;
    }

    //
    getMaavaronAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(568);
                break;
        }
        return res;
    }

    generateDfpParams() {
        this.getResolution();
        switch (this.dfpObjectName) {
            case 'main':
                this.adUnitName = Constants.DFPADUNITSNAMES['strip'] + this.dfpId;
                this.adSize = this.getMainAdUnitSize();
                break;
            case 'article':
                this.adUnitName = Constants.DFPADUNITSNAMES['box'];
                this.adSize = this.getArticleAdUnitSize();
                break;
            case 'maavaron':
                this.adUnitName = Constants.DFPADUNITSNAMES['maavaron'];
                this.adSize = this.getMaavaronAdUnitSize();
                this.maavaron.setSize(this.adSize);
                break;
            default:
            //

        }


    }


}


