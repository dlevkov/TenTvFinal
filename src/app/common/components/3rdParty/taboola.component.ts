import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Taboola } from '../../Taboola';

@Component({
    selector: 'taboola',
    template: `
    <div id="{{placeHolderId}}"></div>
  `
})
export class TaboolaMain implements OnInit, AfterViewInit {
    taboolaRef: Taboola;
    @Input() placeHolderId: string = 'taboola-under-article';
    @Input() placement: string = 'Under Article';
    @Input() mode: string = 'thumbnails-c';
    @Input() objectType: string = 'article';

    ngOnInit() {
        //
        this.taboolaRef = new Taboola();
    }

    ngAfterViewInit() {
        this.taboolaRef.objectType = this.objectType;
        this.taboolaRef.placeHolderId = this.placeHolderId;
        this.taboolaRef.placement = this.placement;
        this.taboolaRef.mode = this.mode;
        this.taboolaRef.appendTaboolaHead();
        this.taboolaRef.appendTabolaBodyEnd();
        this.taboolaRef.appendTaboolaContent();
    }

}
