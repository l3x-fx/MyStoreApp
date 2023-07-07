import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
    name: string = '';
    address: string = '';
    cardnumber: string='';
    @Input() amount!: number;


    constructor(private router: Router) { }

    ngOnInit():void {

    }

    submitForm(): void {
        const extras:NavigationExtras ={
            queryParams: {
                name: this.name,
                amount: this.amount    
            }
        }
        this.router.navigate(['/confirm'], extras);
    }
}
