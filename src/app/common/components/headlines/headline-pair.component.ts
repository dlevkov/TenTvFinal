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
    selector: 'headline-pair',
    templateUrl: 'headline-pair.component.html'
})
export class HeadlinePairComponent implements OnInit, OnDestroy {
    @Input() public item: HeadlineModel;
    @Input() public nextItem: HeadlineModel;
    private _scrollSubscriber: Subscription;
    private _changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.HeadlIne_Big_460_258;

    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }

    public scrolleEvent(event) {
        if (!this._changedToRealImage && this.isVisible) {
            this.loadUrls();
        }
    }
    public ngOnInit() {
        this._scrollSubscriber = Observable.fromEvent(window, 'scroll')
            .debounceTime(5)
            .subscribe((scroll) => this.scrolleEvent(scroll));
    }
    public ngOnDestroy() {
        this._scrollSubscriber.unsubscribe();
    }
    public imageLoaded() {
        if (this.item.ImageTimeout > 0 && !this._changedToRealImage) {
            setTimeout(() => {
                this.loadUrls();
            }, this.item.ImageTimeout);
        }

    }
    private loadUrls() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType, this.nextItem.MediaStockImageID); // load pair of images
        this._changedToRealImage = true;
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

    get loadingUrlNext() {
        return this._baseModel.loadingUrlNext;
    }
    set loadingUrlNext(value: string) {
        this._baseModel.loadingUrlNext = value;
    }
}
