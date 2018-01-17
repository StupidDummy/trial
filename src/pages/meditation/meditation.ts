import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meditation',
  templateUrl: 'meditation.html'
})
export class MeditationPage {
    

  constructor(public navCtrl: NavController) { }
  public event ={
    month: '2018-01-02',
    timeInBed: '23:40',
    timeFallAsleep: '00:15',
    timeWakeUp: '05:35',
    timeOutOfBed: '06:15'
}
}
