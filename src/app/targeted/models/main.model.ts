import { HeadlineModel } from '../../common/models/headline.model';
import { Constants } from '../../common/Constants';

export class MainModel {
    Headlines: HeadlineModel[] = [];
    adFirst: boolean = false;
    headlinePushValid: boolean = true;
    AlertHeadlines: HeadlineModel[] = [];
    PairtHeadlines: HeadlineModel[] = [];
    AlertCounter: number = 0;
    ItemCounter: number = 0;
    TopFourEndIndex: number = -1;
    AlertsEndIndex: number = -1;
    isFiltered: boolean = false;
    sids: number[] = [];

    constructor(data) {
        data.forEach(element => {
            this.headlinePushValid = true;
            element.Id = this.ItemCounter++;
            if (element.DisplayOrder === 1) {
                element.ImageTimeout = 10;
            } else if (element.DisplayOrder >= 2 && element.DisplayOrder <= 4) {
                element.ImageTimeout = 100;
            } else {
                element.ImageTimeout = -1;
            }
            let headline = new HeadlineModel(element);
            headline.AdsSecond = this.adFirst;

            // validate and agrigate
            this.handleAlerts(headline, element);
            this.handlePairs(headline, element);

            if (this.headlinePushValid) this.Headlines.push(headline);

            // handle ads business logic
            this.handleAds(headline, element);


        });
        this.reorganizeModel();
    }

    reorganizeModel() {
        this.reorganizeAlerts();
        this.reorganizePairs();
        this.setTopFourEndIndex();
        this.setAlertsEndIndex();
    }

    setTopFourEndIndex() {
        this.TopFourEndIndex = 3 + this.AlertHeadlines.length;
    }

    setAlertsEndIndex() {
        this.AlertsEndIndex = this.AlertHeadlines.length;
    }

    reorganizeAlerts() {
        //
        let i = 1;
        this.AlertHeadlines.forEach(element => {
            this.Headlines.splice(i++, 0, element);
        });
    }

    reorganizePairs() {
        //
        let pairStart = true;
        let i: number;

        if (this.PairtHeadlines.length % 2 > 0) this.PairtHeadlines.pop();

        this.PairtHeadlines.forEach(element => {
            i = pairStart ? element.CounterId + this.AlertCounter : i + 1;
            element.PairStart = pairStart;
            this.Headlines.splice(i, 0, element);
            pairStart = !pairStart;
        });
    }

    handleAlerts(headline: HeadlineModel, element: any) {
        if (Constants.HEADLINETYPES[element.DisplaySigns] === 'Alert') {
            headline.AlertId = this.AlertCounter++;
            this.AlertHeadlines.push(headline);
            this.headlinePushValid = false;
        }
    }

    handlePairs(headline: HeadlineModel, element: any) {
        if (Constants.HEADLINETYPES[element.DisplaySigns] === 'Pair') {
            this.PairtHeadlines.push(headline);
            this.headlinePushValid = false;
        }
    }

    handleAds(headline: HeadlineModel, element: any) {
        if (Constants.HEADLINETYPES[element.DisplaySigns] === 'Ad') {
            this.adFirst = true;
        }
    }

    setFiltered() {
        this.isFiltered = true;
        this.sids = [12, 23];
    }

}
