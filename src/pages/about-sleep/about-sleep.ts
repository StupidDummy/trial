import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the AboutSleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-sleep',
  templateUrl: 'about-sleep.html',
})
export class AboutSleepPage {

  itemDetail =[
    {
      title : 'Sleep and Circadian Rhythm',
      name : 'SaCR'
    },
    {
      title : 'Circadian Rhythm Disorders',
      name : 'CRD'
    },
    {
      title : 'Treatment for Sleep Disorder',
      name : 'TfSD'
    },
    {
      title : 'Bright Light Therapy',
      name : 'BLT'
    },
    {
      title : 'Blue Light',
      name : 'BL'
    },
    {
      title : 'CBT-I',
      name : 'CBTI'
    },
    {
      title : 'Sleep Hygiene',
      name : 'SH'
    },
    {
      title : 'Stimulus Control',
      name : 'SC'
    },
    {
      title : 'Sleep Restriction',
      name : 'SR'
    },
    {
      title : 'Mindfulness Meditation',
      name : 'MM'
    }
    
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,) {
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

  openDetail(title){
    this.navCtrl.push('AboutSleepDetailPage',{titleName: title})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutSleepPage');
  }

}
