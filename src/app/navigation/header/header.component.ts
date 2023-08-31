import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Output} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {RouterLink} from '@angular/router'
import {FlexLayoutModule} from '@angular/flex-layout'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        FlexLayoutModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Output() sidenavToggle = new EventEmitter<void>()

    onToggleSidenav() {
        this.sidenavToggle.emit()
    }
}
