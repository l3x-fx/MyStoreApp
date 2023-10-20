import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MatIconModule, FlexLayoutModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  @Input() error: string | null = '';
}
