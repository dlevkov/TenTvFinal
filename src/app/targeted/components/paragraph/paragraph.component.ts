import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { Http } from '@angular/http';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.component.html',
    styles: [
        `
        .paragraphContentWraper a *{
            color: blue; 
            text-decoration: underline;
        }
        `
    ]
})

export class ParagraphComponent implements OnInit {
    parser: any = window['contentParser'];
    @Input() item: ParagraphModel;
    @Input() index: number;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private safeHtml: SafeHtml;

    constructor(private _sanitizer: DomSanitizer) {

    }

    ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
        this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.parser.contentHref(this.HTMLEncode(this.item.ParagraphContent)));
        this.parser.contentScript(this.HTMLEncode(this.item.ParagraphContent));
    }

    HTMLEncode(str) {
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

    }

}