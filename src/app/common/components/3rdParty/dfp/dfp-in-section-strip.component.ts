import { Constants } from '../../../Constants';
import { DfpUnitManager, IResetable } from './dfp-basic';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfp-section',
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
export class DfpInSectionStripComponent extends DfpUnitManager implements OnInit, IResetable {
    protected static internalCounter: number = 0;
     protected static dfpId: number = 1;
    public _isDisabled: boolean = false;
    public instancesList: IResetable[];
    public currentResolution: number[];
    public placeHolderId: string;
    @Input() public seed: string;
    constructor(private injector: Injector) {
        super();
        super.AddInstance(this);
        this.seed = this.injector.get('seed');
        this.placeHolderId = 'ad-div-upper-strip-' + this.counter + '-' + this.seed;
    }
    public GetAdUnitSize() {
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
        DfpInSectionStripComponent.internalCounter = 0;
        DfpInSectionStripComponent.dfpId = 1;
    }

    public ngOnInit(): void {
        this.setVisibility();
        super.AddDfpUnit('main', Constants.DFPADUNITSNAMES['strip'] + DfpInSectionStripComponent.dfpId++, this.placeHolderId, this.GetAdUnitSize());
    }
    protected setVisibility() {
        this._isDisabled = (DfpInSectionStripComponent.dfpId > 5);
    }
    private get counter() {
        return DfpInSectionStripComponent.internalCounter++;
    }

}
