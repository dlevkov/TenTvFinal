import { ElementRef } from '@angular/core';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

export class HeadlineBase {

    private _myElem: ElementRef;
    private offset: number = 100;
    private _rect: any;
    constructor(myElement: ElementRef, public item: CustomBaseModel) {
        this._myElem = myElement;
        this._rect = this._myElem.nativeElement.getBoundingClientRect();
    }
    public loadUrl(mediaImageId: number, currentImageType: ImageTypes, mediaImageIdNext: number = 0) {
        // $nana(this._myElem.nativeElement).find('img').fadeTo(500, 0.01); // hide

        if (mediaImageId != null)
            this.item.loadingUrl = Constants.GetImagePathByType(mediaImageId, currentImageType);
        if (mediaImageIdNext > 0)
            this.item.loadingUrlNext = Constants.GetImagePathByType(mediaImageIdNext, currentImageType);

        // $nana(this._myElem.nativeElement).find('img').delay(700).fadeTo(300, 1); // show
    }
    public isVisible() {
        const rect = this._rect;
        const threshold = this.offset;
        // Is the element in viewport but larger then viewport itself
        const elementLargerThenViewport = rect.top <= threshold && rect.bottom >= -threshold;
        // Is the top of the element in the viewport
        const topInsideViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        // Is the bottom of the element in the viewport
        const belowInsideViewport = rect.bottom >= 0 && rect.bottom <= window.innerHeight;
        // Is the right side of the element in the viewport
        const rightsideInViewport = rect.right >= -threshold && (rect.right - threshold) <= window.innerWidth;
        // Is the left side of the element is the viewport
        const leftsideInViewport = rect.left >= -threshold && (rect.left - threshold) <= window.innerWidth;

        return (
            elementLargerThenViewport ||
            ((topInsideViewport || belowInsideViewport) &&
                (rightsideInViewport || leftsideInViewport))
        );
    }
}
// tslint:disable-next-line:max-classes-per-file
export class CustomBaseModel {
    public loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    public loadingUrlNext: string = Constants.IMAGE_LOADING_URL16_9;

}
