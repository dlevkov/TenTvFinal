import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Constants } from '../../Constants';
import { Maavaron } from './maavaron.component';


@Component({
    selector: 'dfp',
    template: `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" [ngStyle]="dfpStyle" [class]='"mainDfpItem"'></div>
  `
})

export class DfpMain implements AfterViewInit {
    @Input() public serviceName: string = '10tv';
    @Input() public placeHolderId: string = '';
    @Input() public dfpObjectName: string = 'main';
    @Input() public dfpStyle: string = '';
    @Input() public maavaron: Maavaron;
    @Input() public dfpId: number;

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

    public ngAfterViewInit() {
        this.generateDfpParams();
        let unit = this.setDfpParams();
        // reinit dfp
        this._adUnitsCollectionIndex.init();
    }

    public setDfpParams(): any {
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
    public getResolution() {
        this._currentResolution.length = 0;
        this._currentResolution = [screen.width, screen.height];
    }

    //
    public getMainAdUnitSize() {
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
    public getArticleAdUnitSize() {
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
    public getMaavaronAdUnitSize() {
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

    //
    public getInboardAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(1);
                res.push(1);
                break;
        }
        return res;

    }

    public generateDfpParams() {
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
            case 'inboard':
                this.adUnitName = Constants.DFPADUNITSNAMES['inboard'];
                this.adSize = this.getInboardAdUnitSize();
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
    // private setDfp(): void {
    //     let res: boolean = this.setCounter !== 0 && (this.setCounter === this.mainModel.TopFourEndIndex || this.setCounter === this.mainModel.AlertsEndIndex);
    //     if (!this.isFiltered)
    //         res = res || (this.setCounter >= this.mainModel.TopFourEndIndex && (this.setCounter - this.mainModel.TopFourEndIndex) % 5 === 0);
    //     console.log('current dfp: ' + res);
    //     this.isDfp.emit(res);
    // }

}


