import { HeadlineModel } from '../../common/models/headline.model';
import { Constants } from '../../common/Constants';
import { ImageTypes } from '../../common/Enums';


export class ArticleListModel {
    Headline: HeadlineModel;

    constructor(data: any) {
        this.Headline = new HeadlineModel(data);
    }
}
