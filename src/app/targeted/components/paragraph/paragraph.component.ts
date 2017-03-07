import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { Http } from '@angular/http';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlContentParser } from '../../../common/HtmlContentParser';

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
    @Input() public item: ParagraphModel;
    @Input() public index: number;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private safeHtml: SafeHtml;

    constructor(private _sanitizer: DomSanitizer, private parserTs: HtmlContentParser) {

    }

    public ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
        this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.parserTs.contentHref(this.HTMLEncode(this.item.ParagraphContent)));
        //this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.HTMLEncode(this.item.ParagraphContent));
       // this.parserTs.contentScript(this.HTMLEncode(this.item.ParagraphContent));
    }

    public HTMLEncode(str) {
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

    }

}