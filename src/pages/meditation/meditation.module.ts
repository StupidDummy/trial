import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MeditationPage } from './meditation';

@NgModule({
  declarations: [
    MeditationPage,
  ],
  imports: [
    IonicPageModule.forChild(MeditationPage),
    TranslateModule.forChild()
  ],
  exports: [
    MeditationPage
  ]
})
export class MeditationPageModule { }
