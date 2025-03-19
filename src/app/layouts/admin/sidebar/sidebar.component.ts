import { Component, input } from '@angular/core';
import { User } from '../../../models';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

    user = input<User>();

}
