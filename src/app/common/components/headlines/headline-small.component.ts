import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';
import { HeadlineBase, CustomBaseModel } from './headline-base.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'headline-small',
    templateUrl: 'headline-small.component.html'
})
export class HeadlineSmallComponent implements OnInit, OnDestroy {
    @Input() public item: HeadlineModel;
    private _changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.Small_130_72;
    private _scrollSubscriber: Subscription;

    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }
    public ngOnInit() {
        this._scrollSubscriber = Observable.fromEvent(window, 'scroll')
            .debounceTime(5)
            .subscribe((scroll) => this.scrolleEvent(scroll));
    }
    public ngOnDestroy() {
        this._scrollSubscriber.unsubscribe();
    }
    public scrolleEvent(event) {
        if (!this._changedToRealImage && this.isVisible) {
            this._loadUrl();
        }
    }
    private imageLoaded() {
        if (this.item.ImageTimeout > 0 && !this._changedToRealImage) {
            setTimeout(() => {
                this._loadUrl();
            }, this.item.ImageTimeout);
        }
    }
    private _loadUrl() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType);
        this._changedToRealImage = true;
        this._scrollSubscriber.unsubscribe();
    }
    get isVisible() {
        return this._basic.isVisible();
    }
    get loadingUrl() {
        return this._baseModel.loadingUrl;
    }
    set loadingUrl(value: string) {
        this._baseModel.loadingUrl = value;
    }

    // Created in order to solve too long title problem in headline-small
    get cuttedTitle(): string {
        return this.item.Title.slice(0, 62);
    }

}
