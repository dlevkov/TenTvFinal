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
        this.TitleTrimed = data.TitleTrimed;
        this.TimeStamp = new Date(data.TimeStamp);
        this.Id = data.Id;
        this.Author = data.Author;
        this.Link = data.link;
        this.TimeBefore = data.TimeBefore;
        this.CounterId = data.CounterId;
    }
}
