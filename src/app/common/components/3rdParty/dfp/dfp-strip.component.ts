import { MainModel } from '../../../../targeted/models/main.model';
import { Constants } from '../../../Constants';
import { DfpUnitManager, IResetable } from './dfp-basic';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfp-strip',
    template:
    `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" [class]='"mainDfpItem dfp-strip"'></div>
    `,
    styles: [`.dfp-strip {width:320px;
                          margin:0 auto;
                          margin-top:10px;
                          margin-bottom:10px;
                          background-color:transparent;}
                          `]
})
export class DfpStripComponent extends DfpUnitManager implements OnInit, IResetable {
    protected static internalCounter: number = 0;
    @Input() public seed: string;
    @Input() public dfpId: number;
    @Input() public mainModel: MainModel;
    public placeHolderId: string;
    public _isDisabled: boolean = false;

    constructor(private injector: Injector) {
        super();
        super.AddInstance(this);
        this.seed = this.injector.get('seed');
        this.dfpId = this.injector.get('dfpId');
        this.mainModel = this.injector.get('mainModel');

        this.placeHolderId = 'ad-div-upper-strip-' + this.counter + '-' + this.seed;
    }

    private get counter() {
        return DfpStripComponent.internalCounter++;
    }

    public ngOnInit(): void {
        this.setVisibility();
        if (!this._isDisabled)
            super.AddDfpUnit('main', Constants.DFPADUNITSNAMES['strip'] + this.dfpId, this.placeHolderId, this.GetAdUnitSize());
    }

    public GetAdUnitSize(): number[] {
        let res = [];

        switch (this.currentResolution[0]) {
            case 2:
                break;
            default:
                res.push(320);
                res.push(50);
                break;
        }
        return res;
    }

    public ResetCounter() {
        DfpStripComponent.internalCounter = 0;
    }

    protected setVisibility() {
        let count = DfpStripComponent.internalCounter;
        let maxUnitLimit = 5;
        let UnitInterval = 5;
        let res: boolean = count !== 0 && (count <= maxUnitLimit && count === this.mainModel.TopFourEndIndex || count === this.mainModel.AlertsEndIndex);
        if (!this.mainModel.isFiltered && count <= maxUnitLimit * UnitInterval)
            res = res || (count >= this.mainModel.TopFourEndIndex && (count - this.mainModel.TopFourEndIndex) % UnitInterval === 0);

        this._isDisabled = !res;
    }
}
