import { HeadlineModel } from '../../common/models/headline.model';
import { Constants } from '../../common/Constants';

export class SectionModel {
    SectionID?: number;
    IconURL2?: string;
    ImageFile: string;
    Headlines: HeadlineModel[] = [];

    constructor(data: any[]) {
        this.SectionID = +data[0].SectionID;
        this.IconURL2 = data[0].IconURL2;
        this.ImageFile = Constants.NANA_IMAGES_DOMAIN + this.IconURL2;
        let i = 0;

        data.forEach(element => {

            element.DestArticleID = element.ArticleID; // renaming for next operation
            element.LastModifyDate = element.ModifyDate;
            element.DisplayOrder = i;
            element.Id = i++;
            if (element.Id <= 5) {
                element.ImageTimeout = 100;
            } else {
                element.ImageTimeout = -1;
            }

            this.Headlines.push(new HeadlineModel(element));
        });
    }
}
