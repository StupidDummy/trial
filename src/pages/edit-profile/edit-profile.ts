import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,) {
  }

  account : any[]

  getSession(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
        db.executeSql('SELECT * FROM account WHERE email=?',[res.rows.item(0).email])
        .then(res=>{
          this.account =[]
          this.account.push({name: res.rows.item(0).name, email: res.rows.item(0).email, smoke: res.rows.item(0).smoke, beer: res.rows.item(0).beer, coffee: res.rows.item(0).coffee,waketime: res.rows.item(0).waketime})

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
  
  
  ionViewDidLoad() {
    this.getSession()
  }

  ionViewWillEnter(){
    this.getSession()
  }
  updateProfile(name,email,smoke,beer,coffee,waketime){
    

    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{
          db.executeSql('UPDATE account SET name=?,smoke=?,beer=?,coffee=?,waketime=? WHERE email=?',[name,smoke,beer,coffee,waketime,res.rows.item(0).email])
          .then(res=>{
            console.log(res);
            this.toast.show('profile updated','1000','center').subscribe(
              toast =>{
                console.log(toast);
              }
            )
          })
          .catch(e =>{
            this.toast.show('errorr!' + e,'5000','center').subscribe(
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
  }
}
