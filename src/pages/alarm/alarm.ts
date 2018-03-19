import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})

export class AlarmPage {
  test :any
  dayTemp : any
  temp: any[];
  alarmItems: any[];
  session: any[];
  user ={
    name: '',
    time: '',
  }
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



  scheduleNotification(rowid, time, enable, day){
    
        if(enable =='true'){
            if(day == 'mon'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(1)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'tue'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(2)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'wed'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(3)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'thur'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(4)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'fri'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(5)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'sat'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(6)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'sun'){
              this.test = new Date(new Date().setDate(new Date().getDate()+this.getDiffDay(7)))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else {
              this.test = new Date(new Date().setFullYear(Number(day.toString().substring(0,4)), Number(day.toString().substring(5,7))-1, Number(day.toString().substring(8,10))))
              this.test.setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : this.test,
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show(this.test.toString() + " scheduled!","5000",'center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
        }else{
          this.localNotifications.cancel(rowid)
        }
    
  }

  ionViewDidLoad(){
    this.getSession();
    this.getAlarm();
  }
  
  ionViewWillEnter(){
    this.getSession();
    this.getAlarm();
  }

  getDiffDay(day){
    if (day <= new Date().getDay()){
      return( day + 7 - new Date().getDay())
    }else{
      return( day - new Date().getDay()  )
    }
  }

  getAlarm(){
    this.sqlite.create({
      name:'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS alarm(rowid INTEGER PRIMARY KEY, checked BOOL, time TEXT, date TEXT, day TEXT, email TEXT)',{})
      .then(res=> console.log('Executed SQL'))
      .catch(e => console.log(e));
      
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
        db.executeSql('SELECT * FROM alarm WHERE email=?',[res.rows.item(0).email])
        .then(res=> {
        this.alarmItems =[];
        for(var i=0; i<res.rows.length; i++){
          // if(res.rows.item(i).mon == 'true' && res.rows.item(i).tue == 'true' && res.rows.item(i).wed == 'true' && res.rows.item(i).thru == 'true' && res.rows.item(i).fri == 'true' && res.rows.item(i).sat == 'true' && res.rows.item(i).sun == 'true' ){
           
          // }
          // else if(res.rows.item(i).mon == 'false' && res.rows.item(i).tue == 'false' && res.rows.item(i).wed == 'false' && res.rows.item(i).thru == 'false' && res.rows.item(i).fri == 'false' && res.rows.item(i).sat == 'false' && res.rows.item(i).sun == 'false' ){
          //   this.alarmItems.push({rowid:res.rows.item(i).rowid, time:res.rows.item(i).time,checked:res.rows.item(i).checked, freq: res.rows.item(i).date.toString() })
          // }
          // else{
          //   this.alarmItems.push({rowid:res.rows.item(i).rowid, time:res.rows.item(i).time,checked:res.rows.item(i).checked, freq: this.dayWriter(res.rows.item(i).mon,res.rows.item(i).tue,res.rows.item(i).wed,res.rows.item(i).thru,res.rows.item(i).fri,res.rows.item(i).sat,res.rows.item(i).sun) })
          // }
          this.alarmItems.push({rowid:res.rows.item(i).rowid, time:res.rows.item(i).time,checked:res.rows.item(i).checked, freq:  res.rows.item(i).day })
          this.scheduleNotification(res.rows.item(i).rowid, res.rows.item(i).time, res.rows.item(i).checked, res.rows.item(i).day)
        }
        })
        .catch(e =>{
          this.toast.show('Error session not found'+ e+ this.session,'5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        });
      })
      .catch(e =>{
        this.toast.show('No session detected!','5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      })
      
    })
  }

  getSession(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
        db.executeSql('SELECT * FROM account WHERE email=?',[res.rows.item(0).email])
        .then(res=>{
          this.user.name = res.rows.item(0).name
          this.user.time = res.rows.item(0).waketime
        })
        .catch(e => {
          this.toast.show('No detail fetched!','5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        })
        
      })
      .catch(e =>{
        this.toast.show('No session detected!','5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      })

    })
    .catch(e => console.log(e))
  }
  

  dayWriter( mon, tue, wed, thru, fri, sat, sun){
    this.temp =[]
    if(mon == 'true'){
      this.temp.push('Mon')
    }
    if(tue == 'true'){
      this.temp.push('Tue')
    }
    if(wed == 'true'){
      this.temp.push('Wed')
    }
    if(thru == 'true'){
      this.temp.push('Thru')
    }
    if(fri == 'true'){
      this.temp.push('Fri')
    }
    if(sat == 'true'){
      this.temp.push('Sat')
    }
    if(sun == 'true'){
      this.temp.push('Sun')
    }
    return this.temp.join(', ')
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
