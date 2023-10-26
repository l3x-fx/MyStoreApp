import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FlexLayoutModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {}
