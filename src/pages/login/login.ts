import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string, keepSignedIn: boolean} = {
    email: '',
    password: '',
    keepSignedIn: false
  };
  temp: any[]
  // data : any[]
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private sqlite: SQLite,
    private toast: Toast,) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // showdata(){
  //   this.sqlite.create({
  //     name: 'ionicalarm.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject)=>{
  //     db.executeSql('SELECT * FROM account',{})
  //     .then(res=>{
  //       this.data =[];
  //       for(var i=0; i<res.rows.length; i++){
  //         this.data.push({rowid:res.rows.item(i).rowid, name:res.rows.item(i).name,email:res.rows.item(i).email,password:res.rows.item(i).password})
  //       }
  //     })
  //     .catch(e =>{
  //       console.log(e);
  //       this.toast.show('error','5000','center').subscribe(
  //         toast =>{
  //           console.log(toast);
  //         }
  //       );
  //     });
  //   })
  //   .catch(e =>{
  //     console.log(e);
  //     this.toast.show(e,'5000','center').subscribe(
  //       toast =>{
  //         console.log(toast);
  //       }
  //     )
  //   })
  // }

  // delete(rowid){
  //   this.sqlite.create({
  //     name: 'ionicalarm.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM account WHERE rowid=?', [rowid])
  //     .then(res => {
  //       console.log(res);
  //       this.toast.show('deleted ' + rowid,'5000','center').subscribe(
  //         toast =>{
  //           console.log(toast);
  //       });
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }
  // Attempt to login in through our User service
  doLogin() {
    
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM account WHERE email=?',[this.account.email])
      .then(res=>{
        console.log(res);
        
        if(this.account.email==''||this.account.password==''){
          this.toast.show('Please enter a valid E-Mail/Password','5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        }
        else if(res.rows.length!= 0 && this.account.email==res.rows.item(0).email && this.account.password == res.rows.item(0).password){
          db.executeSql('CREATE TABLE IF NOT EXISTS session(rowid INTEGER PRIMARY KEY, email TEXT)',{})
          .then(res=> console.log('Executed SQL'))
          .catch(e => console.log(e));
          db.executeSql('DELETE FROM session WHERE rowid=?',['1'])
          .then(res=> console.log(res))
          .catch(e => console.log(e));
          db.executeSql('INSERT INTO session VALUES(NULL,?)',[this.account.email])
          .then(res=> {
            // this.toast.show('session inserted!'+this.account.email,'5000','center').subscribe(
            //   toast =>{
            //     console.log(toast);
            //   }
            // );
            console.log(res)
          })
          .catch(e => {this.toast.show('Error saving session '+ e,'5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          )})
          if(this.account.keepSignedIn){
            db.executeSql('INSERT INTO signedIn VALUES(NULL,?)',[this.account.email])
          .then(res=>console.log(res))
          }
          this.toast.show('Welcome Back, '+ res.rows.item(0).name ,'5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
          this.navCtrl.setRoot(MainPage);
        }
        else{
          this.toast.show('Email/Password is invalid, please try again!','5000','center').subscribe(
            toast =>{
              console.log(toast);
            }
          );
        }
        
      })
      .catch(e =>{
        console.log(e);
        this.toast.show('Error : '+e,'5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      });
    })
    .catch(e =>{
      console.log(e);
      this.toast.show('Error : ' + e,'5000','center').subscribe(
        toast =>{
          console.log(toast);
        }
      )
    })

  }

  ionViewDidLoad(){
    // this.showdata()
  }

}
