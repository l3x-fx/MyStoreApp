import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormsModule, NgForm} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {FlexLayoutModule} from '@angular/flex-layout'

@Component({
    selector: 'app-log-in',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
    email: string = ''
    password: string = ''
    maxDate!: Date

    constructor() {}

    ngOnInit() {
        this.maxDate = new Date()
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    }

    onSubmit(f: NgForm) {
        console.log('yay', f)
    }
}
