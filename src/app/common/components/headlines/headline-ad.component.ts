import { Component, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';

@Component({
    selector: 'headline-ad',
    template: '<taboola [placeHolderId]=\'"taboola-mid-page"\' [placement]=\'"Mid Page"\'  [mode] =\'"thumbnails-b"\' [objectType] =\'"home"\'></taboola>'
})
export class HeadlineAdComponent  {
    @Input() item: HeadlineModel;
}
