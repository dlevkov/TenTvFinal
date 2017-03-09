export class TwitterModel {
    Title: string;
    TitleTrimed: string;
    TimeStamp: Date;
    Id: number;
    Author: string;
    Link: string;
    TimeBefore: string;
    CounterId: number;

    constructor(data) {
        this.Title = data.Title;
        this.TitleTrimed = this.HTMLEncode(data.TitleTrimed);
        this.TimeStamp = new Date(data.TimeStamp);
        this.Id = data.Id;
        this.Author = data.Author;
        this.Link = data.link;
        this.TimeBefore = data.TimeBefore;
        this.CounterId = data.CounterId;
    }
    private HTMLEncode(str: string): string {
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

    }
}
