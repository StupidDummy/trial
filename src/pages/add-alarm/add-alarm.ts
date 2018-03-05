import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController,AlertController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


@IonicPage()

@Component({
  selector: 'page-add-alarm',
  templateUrl: 'add-alarm.html'
})

export class AddAlarmPage {
  newAlarm: { date:Date, time: Date, mon :boolean, tue: boolean,
  wed: boolean, thru: boolean, fri:boolean, sat:boolean, sun:boolean } = {
    date :new Date(),
    time :new Date(),
    mon : false,
    tue : false,
    wed : false,
    thru: false,
    fri : false,
    sat : false,
    sun : false
  };
    
  data = {
    checked  : true,
    time :new Date(new Date().getHours())
  };
   

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController, 
    private plt: Platform, 
    private sqlite: SQLite,
    private toast: Toast,
    private localNotifications: LocalNotifications) { 
      this.plt.ready().then((rdy) =>{
        this.localNotifications.on('click', (notification, state)=>
          {
            let json = JSON.parse(notification.data);
            let alert = this.alertCtrl.create({
              title: notification.title,
              subTitle: json.mydata
            });
            alert.present();
          });
      });
    }
  // doAddAlarm() {
  //   this.localNotifications.schedule({
  //     id:2 ,
  //     title: 'Alarm',
  //     text: this.newAlarm.time.toString(),
  //     at : new Date(new Date().setHours(Number(this.newAlarm.time.toString().substring(0,2)),Number(this.newAlarm.time.toString().substring(3,5)),0o0,0o0)),
  //     data: { mydata:'Hidden Messages'},
  //     sound: 'file://assets/song/test.mp3'
      
  //   });
  
  //   this.navCtrl.setRoot(AlarmMainPage);
  //   // Unable to log in
  //   let toast = this.toastCtrl.create({
  //     message: this.newAlarm.time.toString(),
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();

  //   }  
  doAddAlarm(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('INSERT INTO alarm VALUES(NULL,?,?)',[this.data.checked,this.data.time.toString()])
      .then(res=>{
        console.log(res);
        this.toast.show(this.data.time.toString(),'5000','center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
      .catch(e =>{
        console.log(e);
        this.toast.show(e,'5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      });
    })
    .catch(e =>{
      console.log(e);
      this.toast.show(e,'5000','center').subscribe(
        toast =>{
          console.log(toast);
        }
      )
    })
  }
    
}
