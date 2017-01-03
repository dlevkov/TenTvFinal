import { Component, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';

@Component({
    selector: 'headline-adsecond',
    template: '<taboola [placeHolderId]=\'"taboola-mid-page-2nd"\' [placement]=\'"Mid Page 2nd"\'  [mode] =\'"thumbnails-b"\' [objectType] =\'"home"\'></taboola>'
})
export class HeadlineAdSecondComponent  {
    @Input() item: HeadlineModel;
}
