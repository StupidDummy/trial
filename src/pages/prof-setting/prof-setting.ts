import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Settings } from '../../providers/providers';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the ProfSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prof-setting',
  templateUrl: 'prof-setting.html',
})
export class ProfSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private openNativeSettings: OpenNativeSettings,
    private sqlite: SQLite,
    private toast: Toast,) {
  }

  reminder : any[]
  temp: any

  getSession(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
        db.executeSql('SELECT * FROM account WHERE email=?',[res.rows.item(0).email])
        .then(res=>{
          this.reminder =[]
          this.reminder.push({notif:res.rows.item(0).notif})
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
  
  editProfile(){
    this.navCtrl.push('EditProfilePage')
  }

  updateEnable(reminder){
    if(reminder=='true'){
      reminder = false;
    }else{
      reminder = true;
    }

    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
          db.executeSql('UPDATE account SET notif=? WHERE email=?',[reminder,res.rows.item(0).email])
          .then(res=>{
            console.log(res);
            // this.toast.show(String('notification updated! ' + reminder),'1000','center').subscribe(
            //   toast =>{
            //     console.log(toast);
            //   }
            // )
          })
          this.getSession()
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

  signOut(){ 
    this.sqlite.create({
    name:'ionicalarm.db',
    location: 'default'
  }).then((db: SQLiteObject)=>{
    db.executeSql('DELETE FROM signedIn WHERE rowid=?',['1'])
    .then(res=>{
      this.toast.show('Sign Out successfully','5000','center').subscribe(
        toast =>{
          this.navCtrl.setRoot(WelcomePage);
        }
      );
    })
    .catch(e =>{
      this.toast.show('Sign Out failed','5000','center').subscribe(
        toast =>{
          this.navCtrl.setRoot(WelcomePage);
        }
      );
    });
  }).catch(e => console.log(e))
  }

  open(setting: string){
    this.openNativeSettings.open(setting).then(val =>{
      alert(setting);
    }).catch(err =>{
      alert(JSON.stringify(err));
    })
  }

  ionViewDidLoad() {
    this.getSession()
  }

  ionViewWillEnter(){
    this.getSession()
  }

}
