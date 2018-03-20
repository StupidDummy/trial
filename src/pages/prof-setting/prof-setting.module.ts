import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfSettingPage } from './prof-setting';

@NgModule({
  declarations: [
    ProfSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfSettingPage),
  ],
})
export class ProfSettingPageModule {}
