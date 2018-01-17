import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AlarmPage } from './alarm';

@NgModule({
  declarations: [
    AlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmPage),
    TranslateModule.forChild()
  ],
  exports: [
    AlarmPage
  ]
})
export class AlarmPageModule { }
