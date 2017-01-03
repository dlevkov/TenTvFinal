import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { TwitterService } from '../../services/twitter.service';
import { TwitterModel } from '../../models/twitter.model';
import { Constants } from '../../Constants';

@Component({
    selector: 'twitter-toolbar',
    templateUrl: 'twitter-toolbar.component.html'
})
export class TwitterToolbarComponent implements OnInit, OnDestroy {
    items: TwitterModel[];
    animationState: string = 'collapsed';
    public _currentItem: TwitterModel;
    public _currentId: number;
    public _service: TwitterService;
    public _subscriber: Subscription;
    public _isVisible: boolean = true;
    public _isPolled = false;
    public _itemId: number = 0;

    constructor(http: Http, public _element: ElementRef) {
        this._service = new TwitterService(http);
    }
    @HostListener('window:scroll', ['$event'])
    scrolleEvent(event) {
        this._isVisible = (0 <= window.pageYOffset && window.pageYOffset < Constants.SCROLL_POSITION) ? true : false;
    }


    ngOnInit() {
        this._subscriber = this._service
            .getTwitts()
            .subscribe(data => {
                this.items = data;
                if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
                    this._currentItem = data[0];
                this.resubscribe();
                this.initInterval();
            });
    }

    resubscribe() {
        if (this.items != null && !this._isPolled) {
            console.log('checked change');
            this._subscriber.unsubscribe();
            this._subscriber = this._service
                .pollITwitts()
                .subscribe(data => {
                    this.items = data;
                    if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
                        this._currentItem = data[0];
                });
            this._isPolled = true;
        }
    }

    getNext() {
        if (typeof this.items !== 'undefined') {
            if (this.items.length <= this._itemId + 1) {
                this._currentItem = this.items[0];
            } else {
                this._itemId++;
            }
            this.animateTransition();
            this._currentItem = this.items[this._itemId];
        }
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

    private animateTransition() {
        let twitter = this._element.nativeElement.children[0];
        $nana('#twiiterItemUn').hide('slide', {
            direction: 'down'
        }, 400);
        window.setTimeout(function () {
            $nana('#twiiterItemUn').show('slide', {
                direction: 'up'
            }, 700);
        }, 450);
    }

    private initInterval() {
        window.setInterval(() => {
            this.getNext();
        }, Constants.TWITTERTICKERINTERVAL);
    }

}
