import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-confirm',
    templateUrl: './order-confirm.component.html',
    styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent {
    name:string = '';
    amount:number=0;
    constructor(private route:ActivatedRoute) { }

    ngOnInit():void {
        this.route.queryParams.subscribe(params => {
        this.name = params['name'];
        this.amount=params['amount']
        });
    }
}
