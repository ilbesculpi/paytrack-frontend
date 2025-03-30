import { Component, computed, input, Input } from '@angular/core';
import { Customer } from '../../../models';

@Component({
    selector: 'customer-tile',
    templateUrl: './customer-tile.component.html',
    styleUrl: './customer-tile.component.scss',
})
export class CustomerTileComponent {

    display = input<'grid'|'list'>('grid');
    customer = input.required<Customer>();
    customerId = computed(() => this.customer().id);

}
