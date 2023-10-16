import { Component } from '@angular/core';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-intro-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule, FlexLayoutModule],
  templateUrl: './intro-sheet.component.html',
  styleUrls: ['./intro-sheet.component.css'],
})
export class IntroSheetComponent {
  constructor(
    private _store: Store,
    private _bottomSheetRef: MatBottomSheetRef<IntroSheetComponent>,
  ) {}

  confirmIntro(): void {
    this._store.dispatch(authActions.intro());
    this._bottomSheetRef.dismiss();
  }
}
