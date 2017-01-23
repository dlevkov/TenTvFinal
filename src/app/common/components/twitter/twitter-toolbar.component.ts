import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, HostListener,
         trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { TwitterService } from '../../services/twitter.service';
import { TwitterModel } from '../../models/twitter.model';
import { Constants } from '../../Constants';

@Component({
    selector: 'twitter-toolbar',
    templateUrl: 'twitter-toolbar.component.html',
    styles: [`
        .rsvp_twitter_widget { 
            bottom: -35px;
            position: fixed;
            z-index: 1000;
            background-color: rgba(255, 255, 255, 1);
            border-top: 1px solid #d8d8d8'
            }
        #twiiterItemUn {
            background-color: rgba(255, 255, 255, 1);
            position: relative;
            width: 90%; 
        }
        .rsvp_twitter_button{
            float: left
        }
    `],
    animations:[
        trigger('animationTrigger', [
            state('show', style({})),
            state('hide', style({})),
            transition('* => *', [
                animate ('1000ms 0s ease-in', keyframes([
                    style({opacity:0, transform: 'translateY(30px)', offset:0}),
                    style({opacity:0.5, transform: 'translateY(7px)', offset:.3}),
                    style({opacity:1, transform: 'translateY(-5px)', offset:.7}),
                    style({opacity:1, transform: 'translateY(0)', offset:1})
                ]))
            ])
        ])
    ]
})
export class TwitterToolbarComponent implements OnInit, OnDestroy {
    items: TwitterModel[];
    animationState:string ='show';

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
            this.animationState = this.animationState==='show'?'hide':'show';
            this._currentItem = this.items[this._itemId];
        }
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

    private initInterval() {
        window.setInterval(() => {
            this.getNext();
        }, Constants.TWITTERTICKERINTERVAL);
    }

}
