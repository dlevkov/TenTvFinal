import { Input, Component, EventEmitter, Output } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';


@Component({
    selector: 'filter-service-item',
    templateUrl: 'filter-service-item.component.html'
})
export class FilterServiceItemComponent {
    @Input() item: FilterServiceModel;
    @Output() itemChecked = new EventEmitter();

    handleClick() {
        this.itemChecked.emit();
        console.log('child click');

    }

    public add3Dots(word: string, limit: number) {
        let dots = '...';
        if (word.length > limit) {
            // you can also use substr instead of substring
            word = word.substring(0, limit) + dots;
        }

        return word;
    }
}
