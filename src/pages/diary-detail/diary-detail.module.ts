import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaryDetailPage } from './diary-detail';

@NgModule({
  declarations: [
    DiaryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaryDetailPage),
  ],
})
export class DiaryDetailPageModule {}
