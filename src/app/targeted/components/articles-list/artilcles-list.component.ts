import { Component, OnDestroy, Input, NgZone, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Cookies } from '../../../common/Cookies';
import { Subscription } from 'rxjs/Subscription';
import { ArticleListService } from '../../services/artilce-list.service';
import { ArticleListModel } from '../../../targeted/models/article-list.model';
import { HeadlineSmallComponent } from '../../../common/components/headlines/headline-small.component';
import { FilterServiceComponent } from '../filter-service/filter-service.component';

@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
    // host: {
    //     '(window:scroll)': 'scrolleEvent($event)'
    // }
})
export class ArticlesListComponent implements OnDestroy, OnChanges {
    @Input() public isVisible: boolean = false;
    @Input() public sids: number[] = [];
    @Input() public isInArticle: boolean = false;
    public seed: string;
    public items: ArticleListModel[] = [];
    public _subscriber: Subscription;
    public _service: ArticleListService;
    public _url: string = '';
    public _keepGoing: boolean = true;
    public _routeSubscriber: Subscription;
    public _currentPage: number = 1;
    public _itemsPerPage: number = 10;


    constructor(public http: Http, public _router: Router, public _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new ArticleListService(this.http);
        this._routeSubscriber = this.route.params.subscribe((x) => {
            this.init(x['data']);
        });
    }

    public init(data: string) {
        //
        this.seed = new Date().getMilliseconds().toString();
        if (typeof data !== 'undefined' && data) {
            data.split(',').forEach((element) => {
                this.sids.push(+element);
            });

        } else if (Cookies.nanaFilterSids.length > 0) {
            //
            this.sids = Cookies.nanaFilterSids;

        } else {
            this.sids = [];
        }
        this._url = '';
        this.sids.forEach((element, index) => {
            this._url += ('idsList=' + element + '&');
        });
        ///TenTvAppFront/article-list?idsList=126&%24top=10&%24orderby=DestArticleID%20desc
        // this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + (this._currentPage++ * this._itemsPerPage) + '&$orderby=DestArticleID desc')
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + 100 + '&$orderby=DestArticleID desc')
            .subscribe((d) => {
                this.items = d;
                if (!this.isInArticle) {
                    setTimeout(() => {
                        if (this.route.snapshot) {
                            this.scrollIntoView('articleList');
                        }
                    }, 1000);
                }

            });
    }

    //  scrolleEvent(event) {
    // if($(window).scrollTop() + $(window).height() == $(document).height()) {
    //        alert("bottom!");
    //    }
    //  }
    public loadMore() {
        this._subscriber =
            this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + (this._currentPage++ * this._itemsPerPage)
                + '&$orderby=DestArticleID desc')
                .subscribe((d) => {
                    this.items = d;
                });
    }

    public generateDfpId(id: number): any {
        let newid = id / 5;
        return Math.floor(newid + 3);
    }

    public ngOnChanges(change) {
        this.seed = new Date().getMilliseconds().toPrecision();
    }

    public isDfp(id: number): boolean {
        // TODO: it's a magic, magic...
        return id <= (5 * 3) && (id + 1) % 5 === 0;
    }


    public toggleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }

    public scrollIntoView(eleID) {
        if (typeof this.route.snapshot.url !== 'undefined' && this.route.snapshot.url.length > 0 && this.route.snapshot.url['0'].path !== 'main') {
            let e = document.getElementById(eleID);
            if (!!e && e.scrollIntoView) {
                e.scrollIntoView();
            }
        }
    }

    public ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






