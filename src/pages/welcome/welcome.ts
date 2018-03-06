import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MainPage } from '../pages';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast,) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  startUp(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS signedIn(rowid INTEGER PRIMARY KEY, email TEXT)',{})
      .then(res=> console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM signedIn',{})
      .then(res=> {
        if(res.rows.length != 0){
          db.executeSql('SELECT * FROM account WHERE email=?',[res.rows.item(0).email])
          .then(res=> {
            this.toast.show('Welcome Back, '+ res.rows.item(0).name ,'5000','center').subscribe(
              toast =>{
                console.log(toast);
              }
            );
          })
          this.navCtrl.setRoot(MainPage);
        }
      })
    })
    .catch(e =>{
      this.toast.show('error','5000','center')
    })
  }
  ionViewDidLoad(){
    this.startUp()
  }
}
