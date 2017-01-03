import { Component, Input, OnInit } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';

@Component({
    selector: 'headline-alert',
    templateUrl: 'headline-alert.component.html',
    styles: [
        `
        .AlertItemLast{
            margin-bottom: 12px; 
             border-top: 1px solid #d8d8d8;
        }
        .AlertItem{
            border-top: 1px solid #d8d8d8;
        }
        .AlertItemFirst{
            margin-top: -12px; 
        }
        `
    ]
})
export class HeadlineAlertComponent implements OnInit {
    @Input() item: HeadlineModel;
    @Input() countId: number = 0;
    public _lastModifiedTime: string;

    ngOnInit() {
        let ttime = this.item.LastModifyDate.split('T');
        if (ttime.length > 1) {
            let ttimear = ttime[1].split(':');
            ttimear.pop();
            this._lastModifiedTime = ttimear.join(':');
        }
    }

    public getItemClass() {
        if (this.countId === (this.item.AlertId + 1))
            return 'rsvp_main_article_updates AlertItemLast';

        if (this.item.AlertId === 0)
            return 'rsvp_main_article_updates AlertItemFirst';

        return 'rsvp_main_article_updates AlertItem';
    }
}
