import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SleepDiaryPage } from './sleep-diary';

@NgModule({
  declarations: [
    SleepDiaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepDiaryPage),
    TranslateModule.forChild()
  ],
  exports: [
    SleepDiaryPage
  ]
})
export class SleepDiaryPageModule { }
