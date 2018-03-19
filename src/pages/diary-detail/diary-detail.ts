import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { SleepDiaryPage } from '../sleep-diary/sleep-diary';


@IonicPage()
@Component({
  selector: 'page-diary-detail',
  templateUrl: 'diary-detail.html',
})
export class DiaryDetailPage {


  public idDetail;
  detailDiary : any[]
  detailDate :any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private sqlite: SQLite,
     private toast: Toast,) {

    this.idDetail = navParams.get("idDetail");

  }

  getDiaryData(rowid){
    this.sqlite.create({
      name:'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      ///tib = time in bed
      ///tfa = time fall asleep
      ///twu = time wake up
      ///toob = time out of bed
      db.executeSql('CREATE TABLE IF NOT EXISTS diaryHistory(rowid INTEGER PRIMARY KEY, date TEXT, tib TEXT, tfa TEXT, twu TEXT, toob TEXT)',{})
      .then(res=> console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM diaryHistory WHERE rowid=?',[rowid])
      .then(res=> {

        this.detailDiary =[];

        for(var k=0; k<res.rows.length; k++){
          this.detailDiary.push({rowid : res.rows.item(k).rowid, date:res.rows.item(k).date,tib:res.rows.item(k).tib, tfa:res.rows.item(k).tfa, twu:res.rows.item(k).twu, toob: res.rows.item(k).toob})
        }
        this.detailDate = res.rows.item()
        this.toast.show('load successful','5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
      .catch(e =>{
        console.log(e);
        this.toast.show("failed to load data",'5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        )
      })
    })
    
  }
  ionViewDidLoad() {
    this.getDiaryData(this.idDetail)
  }
  
  updateEntry(rowid,tib,tfa,twu,toob){

    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      db.executeSql('UPDATE diaryHistory SET tib=?,tfa=?,twu=?,toob=? WHERE rowid=?',[tib,tfa,twu,toob,rowid])
      .then(res=>{
        console.log(res);
        this.toast.show('update successful','5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.navCtrl.popToRoot();
      })
      .catch(e=>{
        console.log(e);
          this.toast.show('update failed ' + e,'5000','center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          this.navCtrl.popToRoot();
      })
    })
    
  }

  deleteEntry(rowid) {
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM diaryHistory WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.toast.show('delete successful','5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.navCtrl.popToRoot();
      })
      .catch(e => {
        this.toast.show('delete failed' +e,'5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }).catch(e => console.log(e));
  }

}
