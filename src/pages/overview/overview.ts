import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  user = {
    name: 'Paula Bolliger',
    profileImage: 'assets/img/previewfile_876461475.jpg',
    coverImage: 'assets/img/landscape-sky-night-stars-29435.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'A wise man once said: The more you do something, the better you will become at it.',
    waketime : '',
    performance: 0,
    bedtime : '',
    sleeplength: 0
  };
  

  constructor(public navCtrl: NavController, 
    private sqlite: SQLite,
    private toast: Toast,) { }

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
          this.user.waketime = res.rows.item(0).waketime
          this.user.performance = res.rows.item(0).performance
          this.user.bedtime = res.rows.item(0).bedtime
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
  

  ionViewDidLoad(){
    this.getSession()

  }

  
}
