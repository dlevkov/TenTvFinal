import { MainModel } from '../../targeted/models/main.model';
import { flatten } from '@angular/router/src/utils/collection';
/**
 * MainModel
 */
import { Constants } from '../../common/Constants';
import { FilterServiceComponent } from '../../targeted/components/filter-service/filter-service.component';

export class HeadlineModel {
    public DestArticleID?: number;
    public DisplayOrder?: number;
    public Title?: string;
    public PrimeTag?: string;
    public SubTitle?: string;
    public StripeColor?: string;
    public ServiceID?: number;
    public HebServiceName?: string;
    public MediaStockImageID?: number;
    public MediaStockImageAlt?: string;
    public MediaStockImageCredit?: string;
    public VideoID?: number;
    public DisplaySigns?: number;
    public LastModifyDate?: string;
    public CounterId: number;
    public AdsSecond: boolean = false;
    public HeadlineType: string;
    public AlertId: number = -1;
    public PairStart: boolean = false;
    public ImageTimeout: number = -1;

    public isMain: boolean = false;
    public isTopFour: boolean = false;
    public isSmall: boolean = false;
    public isBig: boolean = false;
    public isAlert: boolean = false;
    public isAd: boolean = false;
    public isAdSecond: boolean = false;
    public isPair: boolean = false;


    constructor(parameters) {
        this.DestArticleID = parameters.DestArticleID;
        this.DisplayOrder = parameters.DisplayOrder;
        this.Title = parameters.Title;
        this.PrimeTag = parameters.PrimeTag;
        this.SubTitle = parameters.SubTitle;
        this.ServiceID = parameters.ServiceID;
        this.StripeColor = FilterServiceComponent.getColorBySid(this.ServiceID) !== '' ? FilterServiceComponent.getColorBySid(this.ServiceID) : parameters.StripeColor;
        this.HebServiceName = parameters.HebServiceName;
        this.MediaStockImageID = parameters.MediaStockImageID;
        this.MediaStockImageAlt = parameters.MediaStockImageAlt;
        this.MediaStockImageCredit = parameters.MediaStockImageCredit;
        this.VideoID = parameters.VideoID;
        this.DisplaySigns = parameters.DisplaySigns;
        this.LastModifyDate = parameters.LastModifyDate;
        this.CounterId = parameters.Id;
        this.HeadlineType = this.getTypeString;
        this.ImageTimeout = parameters.ImageTimeout;

        this.isMain = this.CounterId === 0;
        this.isTopFour = this.isMain || (this.CounterId >= 1 && this.CounterId <= 3);
        this.isSmall = !this.isTopFour && (this.HeadlineType === 'Small' || this.HeadlineType === 'Video');
        this.isBig = !this.isMain && (this.HeadlineType === 'Big' || this.isTopFour);
        this.isAlert = !this.isTopFour && this.HeadlineType === 'Alert';
        this.isAd = !this.isTopFour && this.HeadlineType === 'Ad' && !this.AdsSecond;
        this.isAdSecond = !this.isTopFour && this.HeadlineType === 'Ad' && this.AdsSecond;
        this.isPair = !this.isTopFour && this.HeadlineType === 'Pair' && this.PairStart;
    }

    public getClass(i: any): string {
        return this.HeadlineType;
    }

    get getTypeString(): string {
        return Constants.HEADLINETYPES[this.DisplaySigns];
    }


}
