import { ImageTypes } from './Enums';

export class Constants {
    public static readonly SERVICE_KEY: string = 'service';
    public static readonly SEARCH_KEY: string = 'search';
    public static readonly IMAGE_LOADING_URL = '/assets/Images/preload640-640.png';
    public static readonly IMAGE_LOADING_URL16_9 = '/assets/Images/preload_640-360.png';

    public static DATA_DOMAIN = 'http://api.nana10.co.il/';
    public static readonly NANA_IMAGES_DOMAIN: string = 'http://f.nanafiles.co.il';
    public static readonly SCROLL_POSITION: number = 1000;
    public static readonly GOOGLEDFPID: string = '/9243695/';
    public static readonly MAAVARONTIMEOUT: number = 20000;

    public static readonly DFPADUNITS: any = Constants.InitDfpAdUnits();
    public static readonly HEADLINETYPES: any = Constants.InitHeadlineTypes();
    public static readonly DFPADUNITSNAMES: any = Constants.InitDfpAdUnitsName();
    public static readonly DFPLOADINGTIMEOUT: number = 1000;
    public static readonly TWITTERTICKERINTERVAL: number = 10000;
    public static readonly FILTERCOOKIENAME: string = 'tentvappfilter';


    public static InitHeadlineTypes(): any {
        let units = {
            10: 'Big',
            1: 'Video',  // temporary replaced by standard item in views
            2: 'Main',
            8: 'Ad',
            9: 'Pair',
            0: 'Small',
            6: 'Alert'
        };
        return units;
    }
    public static InitDfpAdUnits(): { [key: string]: string } {
        let units = {
            '10tv': 'Desktop_Nana10_Channel10_Inread',
            'bidur': 'Desktop_Nana10_Entertainment_Inread',
            'celebs': 'Desktop_Nana10_Celebs_Inread',
            'Food': 'Desktop_Nana10_Food_Inread',
            'gamer': 'Desktop_Nana10_Gamer_Inread',
            'lifestyle': 'Desktop_Nana10_style_Inread',
            'net': 'Desktop_Nana10_Net_Inread',
            'News': 'Desktop_Nana10_News_Inread',
            'sport': 'Desktop_Nana10_Sport_Inread'
        };
        return units;
    }

    public static InitDfpAdUnitsName(): any {
        let units = {
            'maavaron': Constants.GOOGLEDFPID + 'Channel10_Interstitial_Ros_test1',
            // liveBox: googleDfpID + 'MOBILE_NANA10_LiveBoxVideo_300x250',
            'strip': Constants.GOOGLEDFPID + 'Channel10_Strip_General_',
            'box': Constants.GOOGLEDFPID + 'Channel10_Box_300X250',
        };
        return units;
    }


    public static GetImagePathByType(mediaStockImageID, item: ImageTypes, mediaStockImageExt?: string): string {
        let currentType: number = 0;
        switch (item) {
            case ImageTypes.Thumbnail_109_59:
                currentType = 28;
                break;
            case ImageTypes.Main_303_165:
            case ImageTypes.Small_303_165:
                currentType = 493;
                break;
            case ImageTypes.Medium_460_258:
                currentType = 693;
                break;
            case ImageTypes.Standard_606_366:
                currentType = 1789;
                break;
            case ImageTypes.Big_768_400:
                currentType = 1677;
                break;
            case ImageTypes.HeadlIne_Big_460_258:
                currentType = 693;
                break;
            case ImageTypes.Article_Default:
                currentType = 11;
                break;
            case ImageTypes.Headline_Small_303_165:
                currentType = 14;
                break;
            case ImageTypes.Main_450_450:
                currentType = 76;
                break;
            case ImageTypes.Small_130_72:
                currentType = 2;
                break;
            default:
                throw new EvalError('Not implemented ImageType:' + item);
        }
        return this.GetImagePath(mediaStockImageID, currentType, mediaStockImageExt);
    }

    private static GetImagePath(mediaStockImageID: number, mediaStockImageTypeID: number, mediaStockImageExt: string = 'jpg'): string {
        if (mediaStockImageID === 0)
            return '';
        if (mediaStockImageTypeID > 0) {
            return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/img/' + mediaStockImageTypeID + '/' + (mediaStockImageID / 1000000).toFixed(0) +
                '/' + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '.' + mediaStockImageExt;
        }
        return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/NOREPLICATION/img/' + (mediaStockImageID / 1000000).toFixed(0) + '/'
            + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '_THUMBNAIL.' + mediaStockImageExt;

    }
}
if ('development' === ENV) {
    // Dev
    // Constants.DATA_DOMAIN = 'http://api.nana10.co.il/';
    Constants.DATA_DOMAIN = 'http://localhost/Nana10MVC/';
}
