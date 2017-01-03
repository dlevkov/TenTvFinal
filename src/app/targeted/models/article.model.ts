import { ParagraphModel } from '../models/paragraph.model';
import { Constants } from '../../common/Constants';
import { ImageTypes } from '../../common/Enums';
import { FilterServiceComponent } from '../../targeted/components/filter-service/filter-service.component';

export class ArticleModel {
    Paragraphs: Array<ParagraphModel> = [];
    MediaStockImageAlt: string;
    MediaStockImageCredit: string;
    ArticleMediaStockImageID: string;
    Title: string;
    AuthorName: string;
    SubTitle: string;
    ModifyDateFormatted: string;
    ArticleID: string;
    SectionID: string;
    IconHref2: string;
    StripeColor: string;
    ServiceName: string;
    ServiceID: number;
    ParagraphID: number;
    StripImagePath: string;
    StripImagePathShow: boolean = true;
    TitlePic: string;
    IsVideo: boolean = false;
    ShareUrl: string;


    constructor(data: any[]) {
        this.MediaStockImageAlt = data[0].MediaStockImageAlt;
        this.MediaStockImageCredit = data[0].MediaStockImageCredit;
        this.Title = data[0].Title;
        this.AuthorName = data[0].AuthorName;
        this.SubTitle = data[0].SubTitle;
        this.ModifyDateFormatted = data[0].ModifyDateFormatted;
        this.ArticleID = data[0].ArticleID;
        this.SectionID = data[0].SectionID;
        this.IconHref2 = data[0].IconHref2;
        this.ServiceName = data[0].ServiceName;
        this.ServiceID = data[0].ServiceID;
        this.StripeColor = FilterServiceComponent.getColorBySid(this.ServiceID) !== '' ? FilterServiceComponent.getColorBySid(this.ServiceID) : data[0].StripeColor;
        this.ParagraphID = data[0].ParagraphID;
        this.ShareUrl = data[0].ShareURL;
        if (this.ServiceID === 160) {
            this.StripImagePath = data[0].ThumbPicPath;
        } else if (data[0].IconURL2 != null && data[0].IconURL2 !== '') {
            this.StripImagePath = Constants.NANA_IMAGES_DOMAIN + data[0].IconURL2;
        } else {
            this.StripImagePathShow = false;
        }

        this.ArticleMediaStockImageID = data[0].ArticleMediaStockImageID;

        console.log(this.TitlePic);
        let order: number = 1;
        data.forEach(element => {
            element.DisplayOrder = order++;
            this.Paragraphs.push(new ParagraphModel(element));
        });

        this.TitlePic = typeof this.Paragraphs[0].PicMediaStockImageID !== 'undefined' ? Constants.GetImagePathByType(this.Paragraphs[0].PicMediaStockImageID, ImageTypes.Article_Default) : '';
    }
}
