import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { User } from '../../providers/providers';
import { Toast } from '@ionic-native/toast';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };
  result : 'false'
  // Our translated text strings

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private sqlite: SQLite,
    private toast: Toast,) {


  }

  doSignup() {
    this.sqlite.create({
      name:'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS account(rowid INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)',{})
      .then(res=> console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM account WHERE email=?',[this.account.email])
      .then(res=>{
        if((res.rows.length == 0 && this.account.email != '') || (res.rows.length != 0 && res.rows.item(0).email != this.account.email)){
          db.executeSql('INSERT INTO account VALUES(NULL,?,?,?)',[this.account.name,this.account.email, this.account.password])
          .then(res=>{
            this.toast.show('registered successfully','5000','center').subscribe(
              toast =>{
                this.navCtrl.setRoot(WelcomePage);
              }
            );
          })
          .catch(e =>{
            this.toast.show('insert failed','5000','center').subscribe(
              toast =>{
                this.navCtrl.setRoot(WelcomePage);
              }
            );
          });
          
        }else if(this.account.email == ''){
          this.toast.show('Please enter a valid e-mail','5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        }
        else{
          this.toast.show('email already registered!','5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        }
      })
      .catch(e => {
        this.toast.show('db creation failed ' + e,'5000','center').subscribe(
          toast =>{
            this.navCtrl.setRoot(WelcomePage);
          }
        );
      });
    })
  }
}
