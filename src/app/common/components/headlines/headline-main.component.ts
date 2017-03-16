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
    selector: 'headline-main',
    templateUrl: 'headline-main.component.html'
})
export class HeadlineMainComponent implements OnInit, OnDestroy {
    @Input() public item: HeadlineModel;
    private changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.Main_450_450;
    private _scrollSubscriber: Subscription;

    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }
    public scrolleEvent(event) {
        if (!this.changedToRealImage && this.isVisible) {
            this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, this._imageType);
            this.changedToRealImage = true;
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
        if (this.item.ImageTimeout > 0 && !this.changedToRealImage) {
            setTimeout(() => {
                this.loadUrl();
                this.changedToRealImage = true;
            }, this.item.ImageTimeout);
        }
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
    private loadUrl() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType);
    }

}
