import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Output} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {FlexLayoutModule} from '@angular/flex-layout'
import {Subscription} from 'rxjs'

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
    ],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
    @Output() closeSidenav = new EventEmitter()
    isAuth = false
    authSubscription: Subscription = new Subscription()

    constructor() {}

    ngOnInit() {}
    onClose() {
        this.closeSidenav.emit()
    }

    onLogout() {
        this.onClose()
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe()
    }
}
