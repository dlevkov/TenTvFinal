import {
    INanaRouteProvider,
    NanaRouterDataSenderService
} from '../../../targeted/services/nanaRouter-data-sender.service';
import { Component } from '@angular/core';

@Component({
    selector: 'twitter',
    templateUrl: 'twitter.component.html'
})
export class TwitterComponent implements INanaRouteProvider {
    constructor(private nanaRouter: NanaRouterDataSenderService) {

    }

    public SendData() {
        this.nanaRouter.SendTwitter();
    }
}
