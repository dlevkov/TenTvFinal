import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'third-party',
    template: '<div></div>'
})
export class ThirdPartyComponent {
    constructor(private myElement: ElementRef) { }

    ngAfterViewInit() {
        // let instagram = document.createElement('script');
        // instagram.type = 'text/javascript';
        // instagram.src = 'http://platform.instagram.com/en_US/embeds.js';
        // this.myElement.nativeElement.appendChild(instagram);

        let twitter = document.createElement('script');
        twitter.type = 'text/javascript';
        twitter.src = 'http://platform.twitter.com/widgets.js';
        this.myElement.nativeElement.appendChild(twitter);
    }

// If you have html string that contains script tags insert it this way:
//     const fragment = document.createRange().createContextualFragment(yourHtmlString);
//     anyElement.appendChild(fragment);
}
