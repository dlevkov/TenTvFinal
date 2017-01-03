import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';
import { HeadlineBase, CustomBaseModel } from './headline-base.component';
@Component({
    selector: 'headline-big',
    templateUrl: 'headline-big.component.html'
})
export class HeadlineBigComponent {
    @Input() item: HeadlineModel;
    _changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.HeadlIne_Big_460_258;

    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }
  @HostListener('window:scroll', ['$event'])
    scrolleEvent(event) {
        if (!this._changedToRealImage && this.isVisible) {
            this.loadUrl();
        }
    }

    imageLoaded() {
        if (this.item.ImageTimeout > 0 && !this._changedToRealImage) {
            setTimeout(() => {
                this.loadUrl();
            }, this.item.ImageTimeout);
        }
    }

    private loadUrl() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType);
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
}
