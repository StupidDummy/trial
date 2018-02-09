import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AddAlarmPage } from './add-alarm';

@NgModule({
  declarations: [
    AddAlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAlarmPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddAlarmPage
  ]
})
export class AddAlarmPageModule { }
