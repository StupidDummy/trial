import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


@IonicPage()

@Component({
  selector: 'page-add-alarm',
  templateUrl: 'add-alarm.html'
})

export class AddAlarmPage {
  
  data = {
    checked  : false,
    time : new Date(new Date().getHours()),
    date : new Date(new Date().getDate()),
    mon : false,
    tue : false,
    wed : false,
    thur: false,
    fri : false,
    sat : false,
    sun : false
  };
  public session:string

  constructor(public navCtrl: NavController,
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
  doAddAlarm(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
        if(this.data.mon){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'mon',res.rows.item(0).email])
          .then(res=>{
           
          })
          .catch(e=>console.log(e))
        }
        if(this.data.tue){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'tue',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }if(this.data.wed){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'wed',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }if(this.data.thur){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'thur',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }if(this.data.fri){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'fri',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }if(this.data.sat){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'sat',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }if(this.data.sun){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),'sun',res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }
        if(!this.data.mon && !this.data.tue && !this.data.wed && !this.data.thur && !this.data.fri && !this.data.sat && !this.data.sun){
          db.executeSql('INSERT INTO alarm VALUES(NULL,?,?,?,?,?)',[this.data.checked,this.data.time.toString(),this.data.date.toString(),this.data.date.toString(),res.rows.item(0).email])
          .then(res=>{
           
          })
            .catch(e=>console.log(e))
        }
        
          this.navCtrl.popToRoot();
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
