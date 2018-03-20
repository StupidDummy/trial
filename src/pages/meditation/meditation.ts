import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-meditation',
  templateUrl: 'meditation.html'
})
export class MeditationPage {
    
  listOfMeditation = [
    {
      title : '3-Minute guided meditation practices',
      description : 'A brief mindfulness meditation practice to relax your body and focus your mind.',
      id : 'meditation1',
      source : 'assets/sounds/3-Minute.mp3',
    },
    {
      title : '5-Minute guided breathing meditation practices',
      description : 'This practice can help reduce stress, anxiety, and negative emotions.',
      id : 'meditation2',
      source : 'assets/sounds/5-Minute Breathing Meditation.mp3'
    }
  ]
  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast,
  ) { }

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
  
}
