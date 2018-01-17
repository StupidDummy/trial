import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { OverviewPage } from './overview';

@NgModule({
  declarations: [
    OverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OverviewPage),
    TranslateModule.forChild()
  ],
  exports: [
    OverviewPage
  ]
})
export class OverviewPageModule { }
