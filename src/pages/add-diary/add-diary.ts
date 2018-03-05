import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddDiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-diary',
  templateUrl: 'add-diary.html',
})
export class AddDiaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  public event ={
    month: '2018-01-02',
    timeInBed: '23:40',
    timeFallAsleep: '00:15',
    timeWakeUp: '05:35',
    timeOutOfBed: '06:15'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDiaryPage');
  }

}
