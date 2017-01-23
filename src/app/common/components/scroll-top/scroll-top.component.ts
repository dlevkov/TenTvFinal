import { DOCUMENT } from '@angular/platform-browser';
import { Component, HostListener, Inject } from '@angular/core';
import { Constants } from '../../Constants';
import { PageScrollInstance, PageScrollService, EasingLogic, PageScrollConfig } from 'ng2-page-scroll';

@Component({
    selector: 'scroll-top',
    templateUrl: 'scroll-top.component.html'
})

export class ScrollTop {

    public _isVisible: boolean = false;
    constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: Document) {
        PageScrollConfig.defaultInterruptible = true;
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                // easeInOutExpo easing 
                if (t === 0) return b;
                if (t === d) return b + c;
                // tslint:disable-next-line:no-conditional-assignment
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
    }
    @HostListener('window:scroll', ['$event'])
    public scrolleEvent(event) {
        this._isVisible = (Constants.SCROLL_POSITION < window.pageYOffset) ? true : false;
    }
    public ScrollToTop() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#scrollToTop');
        this.pageScrollService.start(pageScrollInstance);
    }
    public onClick() {
        this.ScrollToTop();
    }

}
