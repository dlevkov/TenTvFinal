import { defaultOutputDir } from 'awesome-typescript-loader/dist/test/utils';
import { FilterServiceComponent } from './filter-service.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'filter-confirmation',
    templateUrl: 'filter-confirmation.component.html'
})
export class FilterConfirmation {
    @Output() public close: EventEmitter<any> = new EventEmitter();
    private Close() {
        this.close.emit(null);
    }
}
