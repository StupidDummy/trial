import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Chart } from 'chart.js'
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-sleep-diary',
  templateUrl: 'sleep-diary.html'
})
export class SleepDiaryPage {

  sleepTotalDuration = 0
  inBedTotalDuration = 0
  sleepPerformance :any
  averageSleepTime :any
  recentDuration:any[]
  recentData:any[];
  recentDiary: any[];
  lineChart: any;
  entry = {
    date  : new Date(new Date().getDate()),
    timeInBed :new Date(new Date().getHours()),
    timeFallAsleep :new Date(new Date().getHours()),
    timeWakeUp :new Date(new Date().getHours()),
    timeOutOfBed :new Date(new Date().getHours()),
  };
  
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;

  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast,
  
  ) { }


  getRecentDiary(){
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
      db.executeSql('SELECT * FROM diaryHistory ORDER BY date DESC LIMIT 7',{})
      .then(res=> {

        this.recentDiary =[];
        this.recentData =[];
        this.inBedTotalDuration = 0
        this.sleepTotalDuration = 0
        this.inBedTotalDuration = 0
        this.sleepTotalDuration = 0

        for(var k=0; k<res.rows.length; k++){
          this.recentDiary.push({rowid:res.rows.item(k).rowid, date:res.rows.item(k).date,tib:res.rows.item(k).tib, tfa:res.rows.item(k).tfa, twu:res.rows.item(k).twu, toob: res.rows.item(k).toob})
          this.inBedTotalDuration += this.getDif(res.rows.item(k).tib,res.rows.item(k).toob)
          this.sleepTotalDuration += this.getDif(res.rows.item(k).tfa,res.rows.item(k).twu)
        }
        this.sleepPerformance = (this.sleepTotalDuration/this.inBedTotalDuration*100).toString().substring(0,5)
        this.averageSleepTime = (this.sleepTotalDuration/res.rows.length).toString().substring(0,3)

        
        
      })
      .catch(e =>console.log(e));
    })
    
  }
  getDif(x,y){
    if(Number(x.toString().substring(0,2))<12)
    {
      return(-1*(Number(x.toString().substring(0,2)) - Number(y.toString().substring(0,2))+ Number(x.toString().substring(3,5))/60 - Number(y.toString().substring(3,5))/60))
    }
    else
    {
      return(24+(Number(y.toString().substring(0,2)) - Number(x.toString().substring(0,2))+ Number(y.toString().substring(3,5))/60 - Number(x.toString().substring(3,5))/60))
    }
  }

  

  addNewEntry(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('INSERT INTO diaryHistory VALUES(NULL,?,?,?,?,?)',[this.entry.date.toString(),this.entry.timeInBed.toString(),this.entry.timeFallAsleep.toString(),this.entry.timeWakeUp.toString(),this.entry.timeOutOfBed.toString()])
      .then(res=>{
        console.log(res);
        this.toast.show('success input','5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.getRecentDiary();
      })
      .catch(e =>{
        console.log(e);
        this.toast.show("failed " + e + " " + this.entry.date.toString() + " " + this.entry.timeFallAsleep.toString(),'5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      });
    })
    .catch(e =>{
      console.log(e);
      this.toast.show("failed 2",'5000','center').subscribe(
        toast =>{
          console.log(toast);
        }
      )
    })
  }

  editDetail(rowid){
    this.navCtrl.push('DiaryDetailPage',{idDetail: rowid})
  }

  ionViewWillEnter(){
    this.getRecentDiary();
  }
  
  ionViewDidLoad(){

    this.getRecentDiary();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
 
        });
    this.lineChart = new Chart(this.lineCanvas2.nativeElement, {

      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }

    });

  }
}
