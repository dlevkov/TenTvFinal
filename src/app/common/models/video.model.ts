export class VideoModel {
    Id: number;
    SeasonId: number;
    Title: string;
    SubTitle: string;
    VideoId: number;
    GetImages: any;

    constructor(data) {
        if (typeof data !== 'undefined' && data !== undefined) {
            this.Id = data.Id;
            this.SeasonId = data.SeasonId;
            this.Title = data.Title;
            this.SubTitle = data.SubTitle;
            this.VideoId = data.VideoId;
            this.GetImages = data.GetImages;
        }
    }
}
