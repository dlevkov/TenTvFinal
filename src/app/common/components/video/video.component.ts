import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../Constants';
import { Subscription } from 'rxjs/Subscription';
import { VideoService } from '../../services/video.service';
import { VideoModel } from '../../models/video.model';
import { ArticleModel } from '../../../targeted/models/article.model';


@Component({
    selector: 'videocasttime',
    templateUrl: 'video.component.html'
})
export class Video {
    item: VideoModel;
    @Input() article: ArticleModel;
     _casttimeRef: any = window[''];
     _currentId: number;
     _subscriber: Subscription;
     _routeSubscriber: Subscription;
     _service: VideoService;

    constructor(
        public route: ActivatedRoute, http: Http,  myElement: ElementRef
    ) {
        //
        this._service = new VideoService(http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._currentId = +x['id'];
            this.getItems();
        });
    }

    getItems() {
        this._subscriber = this._service.GetItemsByUri('vod/episode/getallnews?%24top=1&%24filter=Id%20eq%20' + this._currentId)
            .subscribe(data => {
                this.item = data;
                if (typeof this.article !== 'undefined' && typeof data.Id !== 'undefined' && data.Id !== undefined) {
                    this.article.IsVideo = true;
                }
            });

    }

    initVideo() {
        let videoUnit = new window['casttimePlayer']();


        videoUnit.casttimeObject.Title = this.item.Title;
        videoUnit.casttimeObject.SubTitle = this.item.SubTitle;
        videoUnit.casttimeObject.SeasonId = this.item.SeasonId;
        videoUnit.casttimeObject.VideoId = this.item.VideoId;

        videoUnit.init();
    }

}
