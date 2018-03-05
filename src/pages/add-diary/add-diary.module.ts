import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDiaryPage } from './add-diary';

@NgModule({
  declarations: [
    AddDiaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDiaryPage),
  ],
})
export class AddDiaryPageModule {}
