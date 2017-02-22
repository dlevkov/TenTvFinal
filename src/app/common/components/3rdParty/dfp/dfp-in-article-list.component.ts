import { Constants } from '../../../Constants';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { DfpUnitManager, IResetable } from './dfp-basic';
import { DfpStripComponent } from './dfp-strip.component';

@Component({
    selector: 'dfp-in-article-strip',
    template:
    `
    <div *ngIf='!_isDisabled' id="{{placeHolderId}}" class='mainDfpItem dfp-in-article-strip'></div>
    `,
    styles: [`.dfp-in-article-strip {width:320px;
                                     margin:0 auto;
                                     margin-top:10px;
                                     margin-bottom:10px;
                                     background-color:transparent;}
                          `]
})
export class InArticleListComponent extends DfpUnitManager implements OnInit, IResetable {
    protected static internalCounter = 0;
    private static dfpId: number = 1;
    @Input() public seed: string;

    public _isDisabled: boolean = false;
    public currentResolution: number[];
    public placeHolderId: string;

    constructor(private injector: Injector) {
        super();
        super.AddInstance(this);
        this.seed = this.injector.get('seed');
        this.placeHolderId = 'ad-div-upper-strip-' + this.counter + '-' + this.seed;
    }

    public ngOnInit(): void {
        this.setVisibility();
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
        InArticleListComponent.internalCounter = 0;
        InArticleListComponent.dfpId = 1;
    }
    protected setVisibility() {
        this._isDisabled = !((InArticleListComponent.internalCounter <= (5 * 4)) && ((InArticleListComponent.internalCounter + 1) % 5 === 0));
        if (!this._isDisabled)
            this.AddDfpUnit('main', Constants.DFPADUNITSNAMES['strip'] + InArticleListComponent.dfpId++, this.placeHolderId, this.GetAdUnitSize());
    }

    private get counter() {
        return InArticleListComponent.internalCounter++;
    }
}
