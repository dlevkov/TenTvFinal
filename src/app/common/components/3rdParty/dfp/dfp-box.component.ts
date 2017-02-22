import { Constants } from '../../../Constants';
import { DfpUnitManager, IResetable } from './dfp-basic';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dfp-box',
    template:
    `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" class='mainDfpItem dfp-box'></div>
    `,
    styles: [`.dfp-box {width:300px;
                        margin:0 auto;
                        margin-top:10px;
                        margin-bottom:10px;}
         `]
})
export class DfpBoxComponent extends DfpUnitManager implements OnInit, IResetable {
    public placeHolderId: string = '';
    public _isDisabled: boolean = false;
    @Input() public ArticleId: string;

    constructor(private injector: Injector) {
        super();
        super.AddInstance(this);
        this.ArticleId = this.injector.get('ArticleId');
    }

    public GetAdUnitSize(): number[] {
        let res = [];
        switch (this.currentResolution[0]) {
            case 2:
                break;
            default:
                res.push(300);
                res.push(250);
                break;
        }
        return res;
    }

    public ngOnInit(): void {
        this.placeHolderId = 'ad-div-box' + this.ArticleId;
        this.AddDfpUnit('article', Constants.DFPADUNITSNAMES['box'], this.placeHolderId, this.GetAdUnitSize());
    }

    public ResetCounter() {
    }
}
