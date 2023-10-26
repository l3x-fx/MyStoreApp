import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { authActions } from 'src/app/auth/store/auth.actions';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { productsActions } from 'src/app/products/store/products.actions';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MatIconModule, FlexLayoutModule, MatButtonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() error: string | null = '';
  reason: string | null = null;
  split: string[] | null = null;
  constructor(private _store: Store) {}
  ngOnInit() {
    if (this.error) {
      this.split = this.error.split(/Error:/);
      this.error = this.split[0];
      this.reason = this.split[1];
    }
  }
}
