import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
    private sqlite: SQLite,
    private toast: Toast,
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
    
  //   this.alarmItems = [
  //   {
  //     checked: 'false',
  //     time: '06:00',
  //   },  
  //   {
  //     checked: 'false',
  //     time: '23:44',
  //   },
  //   {
  //     checked: 'false',
  //     time: '00:00',
  //   },
  // ];  
  }

  addNewAlarm(){
    this.navCtrl.push('AddAlarmPage')
  }

  scheduleNotification(rowid, time, enable){
    if(enable =='true'){
      this.toast.show('schedulingggggg  ' + String(time),'5000','center').subscribe(
        toast =>{
          console.log(toast);
        }
      );
      this.localNotifications.schedule({
        id: rowid,
        title: 'Alarm',
        text: time,
        at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
        data: { mydata:'Hidden Messages'}
      });
    }else{
      this.localNotifications.cancel(rowid)
      this.toast.show('failed to schedule','5000','center').subscribe(
        toast =>{
          console.log(toast);
        }
      );
    }
    
  }

  ionViewDidLoad(){
    this.getAlarm();
  }
  
  ionViewWillEnter(){
    this.getAlarm();
  }

  getAlarm(){
    this.sqlite.create({
      name:'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS alarm(rowid INTEGER PRIMARY KEY, checked BOOL, time TEXT)',{})
      .then(res=> console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM alarm ORDER BY rowid DESC',{})
      .then(res=> {
        this.alarmItems =[];
        for(var i=0; i<res.rows.length; i++){
          this.alarmItems.push({rowid:res.rows.item(i).rowid, time:res.rows.item(i).time,checked:res.rows.item(i).checked})
          this.scheduleNotification(res.rows.item(i).rowid, res.rows.item(i).time, res.rows.item(i).checked)
        }
        
      })
      .catch(e =>console.log(e));
    })
    
  }
  deleteAlarm(rowid) {
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM alarm WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getAlarm();
        
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
    this.localNotifications.cancel(rowid)
  }

  updateEnable(rowid,checked) {

    if(checked=='true'){
      checked = false;
    }else{
      checked = true;
    }
    
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('UPDATE alarm SET checked=? WHERE rowid=?',[checked,rowid])
      .then(res=>{
        console.log(res);
        
        this.toast.show(String('Alarm updated!'),'1000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        )
        this.getAlarm();
      })
    })
  }

 
}
