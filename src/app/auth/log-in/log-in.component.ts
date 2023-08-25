import {Component} from '@angular/core'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  email: string = ''
  password: string = ''
  maxDate!: Date;

  constructor( ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
  }

    onSubmit(f: NgForm) {
        console.log('yay', f)
    }
  }

