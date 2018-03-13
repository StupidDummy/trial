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
  temp: any[];
  alarmItems: any[];
  session: any[];
  user ={
    name: '',
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
          this.toast.show('alarm time debug 1 scheduled' ,'1000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
            if(day == 'mon'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: 'monday',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: 'week'
              });
              this.toast.show('alarm time  mon scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'tue'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: 'tuesday',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: 'week'
              });
              this.toast.show('alarm time  tue scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'wed'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: 'wednesday',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: 'week'
              });
              this.toast.show('alarm time  wed scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'thur'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: "thursday",
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: "week"
              });
              this.toast.show('alarm time  thurs scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'fri'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
              });
              this.toast.show(new Date(new Date().getDate()).getDay().toString() + new Date(new Date().getDate()).toString(),'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'sat'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: 'saturday',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: 'week'
              });
              this.toast.show('alarm time sat scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else if(day == 'sun'){
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                firstAt: 'sunday',
                text: time,
                at : new Date(new Date().setHours(Number(time.toString().substring(0,2)),Number(time.toString().substring(3,5)),0o0,0o0)),
                data: { mydata:'Hidden Messages'},
                every: 'week'
              });
              this.toast.show('alarm time  sun scheduled' ,'5000','center').subscribe(
                toast =>{
                  console.log(toast);
                }
              );
            }
            else {
              this.localNotifications.schedule({
                id: rowid,
                title: 'Alarm',
                text: time,
                at : new Date(new Date().getDate()),
                data: { mydata:'Hidden Messages'}
              });
              this.toast.show('date here yea' + new Date(new Date().setFullYear(Number(day.substring(0,4)),Number(day.substring(5,7)),Number(day.substring(8,10)))).toString() ,'15000','center').subscribe(
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
