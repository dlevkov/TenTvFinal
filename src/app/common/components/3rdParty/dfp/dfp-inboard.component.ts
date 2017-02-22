import { Constants } from '../../../Constants';
import { DfpUnitManager, IResetable } from './dfp-basic';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfp-inboard',
    template:
    `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" class='mainDfpItem dfp-inboard'></div>
    `,
    styles: ['.dfp-inboard {display:block}']
})
export class DfpInboardComponent extends DfpUnitManager implements OnInit, IResetable {
    public placeHolderId: string = '';
    public _isDisabled: boolean = false;
    @Input() public seed: string;

    constructor(private injector: Injector) {
        super();
        this.seed = this.injector.get('seed');
    }

    public GetAdUnitSize(): number[] {
        let res = [];

        switch (this.currentResolution[0]) {
            case 2:
                break;
            default:
                res.push(1);
                res.push(1);
                break;
        }
        return res;
    }

    public ngOnInit(): void {
        this.placeHolderId = 'div-gpt-ad-' + this.seed;
        this.AddDfpUnit('inboard', Constants.DFPADUNITSNAMES['inboard'], this.placeHolderId, this.GetAdUnitSize());
    }

    public ResetCounter() { }
}
