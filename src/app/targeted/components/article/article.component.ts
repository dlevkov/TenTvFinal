import { Subscription } from 'rxjs/Subscription';
import { ArticleShareData } from '../../models/article-share-data.model';
import { AfterViewChecked, Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';
import { Constants } from '../../../common/Constants';
import { GoogleTagManager } from '../../../common/components/3rdParty/googleTagManager';
import { ScrollTop } from '../../../common/components/scroll-top/scroll-top.component';

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnDestroy, AfterViewChecked {
    public item: ArticleModel;
    public parser: any = window['contentParser'];
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;
    private _routeSubscriber: Subscription;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private _nanaRouteRef: any;

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef, private _ngZone: NgZone) {
        window.angularComponentRef = { component: this, zone: _ngZone };
        this._nanaRouteRef = window['nanaRoute'];
        this._service = new ArticleService(http);
        this._routeSubscriber = this.route.params
        .subscribe((x) => {
            this._currentId = +x['id'];
            this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article/' + this._currentId)
                .subscribe((data) => {
                    document.body.scrollTop = 0;
                    this.item = data;
                    this.parser.length = this.item.Paragraphs.length;
                    this._loadingUrl = this.item.TitlePic;
                    this.sendArticleData();
                });
        });
    }

    public ngOnDestroy() {
        this._subscriber.unsubscribe();
        this._routeSubscriber.unsubscribe();
    }

    public ngAfterViewChecked() {
       // this.animateTransition();
    }

    //
    private animateTransition() {
        let elem = this.myElement.nativeElement;
        elem.classList.remove('load-image-show');
        elem.classList.add('load-image-hidden');
    }

    private sendArticleData() {
        this._nanaRouteRef.invokeRouteEvent('/article/' + this.item.ArticleID,
            true, false, false, new ArticleShareData(this.item.ShareUrl, this.item.Title, this.item.SubTitle));
    }
    // ***************************************************************************************************************************//
    // Get angular function from external JS:
    // Add to \src\custom-typings.d.ts -  interface Window { angularComponentRef : any; }

    // constructor(private _ngZone: NgZone) {
    //     window.angularComponentRef = { component: this, zone: _ngZone };    //     
    // }

    // publicFunc(data: String) {
    //     this._ngZone.run(() => {
    //         this.privateFunc(data);
    //     });
    // }
    // privateFunc(str) {
    //     console.log("print: " + str);

    // }

    // Use in your outside JS 
    // window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.publicFunc('bla bla');})
    // ***************************************************************************************************************************//
}
