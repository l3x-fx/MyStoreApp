import {Component, EventEmitter, Output} from '@angular/core'
import {Subscription} from 'rxjs'

@Component({
    selector: 'app-sidenav',
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
