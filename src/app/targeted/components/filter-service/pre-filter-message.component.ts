import { defaultOutputDir } from 'awesome-typescript-loader/dist/test/utils';
import { FilterServiceComponent } from './filter-service.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'pre-filter-message',
    templateUrl: 'pre-filter-message.component.html'
})
export class PreFilterMessage {
    @Output() public close: EventEmitter<any> = new EventEmitter();
    public Close() {
        this.close.emit(null);
    }
}
