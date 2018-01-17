import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage {
    
  alarmItems: any[];

  constructor(public navCtrl: NavController) { 
  this.alarmItems = [
    {
      checked: 'true',
      time: '06:00',
    },  
    {
      checked: 'false',
      time: '23:44',
    },
    {
      checked: 'true',
      time: '00:00',
    },
  ];
}
}
