import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage {
    
  alarmItems: any[];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    private plt: Platform, 
    private localNotifications: LocalNotifications) { 
    this.plt.ready().then((rdy) =>{
      this.localNotifications.on('click', (notification, state)=>{
        let json = JSON.parse(notification.data);

        let alert = this.alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      });
    });
    
    this.alarmItems = [
    {
      checked: 'false',
      time: '06:00',
    },  
    {
      checked: 'false',
      time: '23:44',
    },
    {
      checked: 'false',
      time: '00:00',
    },
  ];  
  }
  addNewAlarm(){
    this.navCtrl.push('AddAlarmPage')
  }
  scheduleNotification(){
    this.localNotifications.schedule({
      id:1 ,
      title: 'Alarm',
      text: String(new Date(new Date().setHours(19,51,0o0,0o0))),
      at : new Date(new Date().setHours(19,52,0o0,0o0)),
      data: { mydata:'Hidden Messages'}
    });
  }
}
