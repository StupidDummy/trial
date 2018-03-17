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

  user = {
    name : '',
    time : '',
  }
  sleepTotalDuration = 0
  inBedTotalDuration = 0
  sleepPerformance :any
  averageSleepTime :any
  recentDuration:any[]
  recentDataTFA:any[];
  recentDataTWU:any[];
  recentDate:any[];
  recentDiary: any[];
  scheduledTWU:any[];
  scheduledTFA:any[];
  lineChart: any;
  session : string
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
          this.user.time = res.rows.item(0).time
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

  getRecentDiary(){
    this.sqlite.create({
    name: 'ionicalarm.db',
    location: 'default'
    }).then((db: SQLiteObject)=>{
    db.executeSql('SELECT * FROM session',{})
    .then(res=>{
      ///tib = time in bed
      ///tfa = time fall asleep
      ///twu = time wake up
      ///toob = time out of bed

      db.executeSql('CREATE TABLE IF NOT EXISTS diaryHistory(rowid INTEGER PRIMARY KEY, date TEXT, tib TEXT, tfa TEXT, twu TEXT, toob TEXT, email TEXT)',{})
      .then(res=> {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      });
      db.executeSql('SELECT * FROM diaryHistory WHERE email=? ORDER BY date ASC LIMIT 7',[res.rows.item(0).email])
      .then(res=> {

        this.recentDiary =[];
        this.recentDataTFA =[];
        this.recentDataTWU = [];
        this.recentDate =[];
        this.inBedTotalDuration = 0
        this.sleepTotalDuration = 0
        this.inBedTotalDuration = 0
        this.sleepTotalDuration = 0
        this.scheduledTFA =[];
        this.scheduledTWU =[];
        for(var k=0; k<res.rows.length; k++){
          this.recentDiary.push({rowid:res.rows.item(k).rowid, date:res.rows.item(k).date,tib:res.rows.item(k).tib, tfa:res.rows.item(k).tfa, twu:res.rows.item(k).twu, toob: res.rows.item(k).toob})
          this.inBedTotalDuration += this.getDif(res.rows.item(k).tib,res.rows.item(k).toob)
          this.sleepTotalDuration += this.getDif(res.rows.item(k).tfa,res.rows.item(k).twu)
          this.recentDataTFA.push(Number(res.rows.item(k).tfa.toString().substring(0,2))*3600+Number(res.rows.item(k).tfa.toString().substring(3,5))*60)
          this.recentDataTWU.push(Number(res.rows.item(k).twu.toString().substring(0,2))*3600+Number(res.rows.item(k).twu.toString().substring(3,5))*60)
          this.recentDate.push(res.rows.item(k).date.toString().substring(8,10)+ '/'+res.rows.item(k).date.toString().substring(5,7)+ '/' + res.rows.item(k).date.toString().substring(2,4))
        }
        this.sleepPerformance = (this.sleepTotalDuration/this.inBedTotalDuration*100).toString().substring(0,5)
        this.averageSleepTime = (this.sleepTotalDuration/res.rows.length).toString().substring(0,3)
        for(var j=0; j<res.rows.length; j++){
          this.scheduledTWU.push(21600)
          this.scheduledTFA.push((86400+this.averageSleepTime*3600-21600)-(86400+this.averageSleepTime*3600-21600)%1800)
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

          type: 'line',
          data: {
              labels: this.recentDate,
              datasets: [
                  {
                      label: "Time Fall Asleep",
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
                      data: this.recentDataTFA,
                      spanGaps: false,
                  },{
                    label: "Scheduled Sleep Time",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(255,0,0,0.4)",
                      borderColor: "rgba(255,0,0,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(255,0,0,0.4)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(255,0,0,0.4)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.scheduledTFA,
                      spanGaps: false,
                  }
              ]
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  userCallback: function(v) { return epoch_to_hh_mm_ss(v) },
                  stepSize: 30 * 60
                }
              }]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.datasets[tooltipItem.datasetIndex].label + ': ' + epoch_to_hh_mm_ss(tooltipItem.yLabel)
                }
              }
            }
          }
    
        });
        this.lineChart = new Chart(this.lineCanvas2.nativeElement, {

          type: 'line',
          data: {
              labels: this.recentDate,
              datasets: [
                  {
                      label: "Time Wake Up",
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
                      data: this.recentDataTWU,
                      spanGaps: false,
                  },{
                    label: "Scheduled Wake Up Time",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(255,0,0,0.4)",
                      borderColor: "rgba(255,0,0,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(255,0,0,0.4)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(255,0,0,0.4)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.scheduledTWU,
                      spanGaps: false,
                  }
              ]
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  userCallback: function(v) { return epoch_to_hh_mm_ss(v) },
                  stepSize: 30 * 60
                }
              }]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.datasets[tooltipItem.datasetIndex].label + ': ' + epoch_to_hh_mm_ss(tooltipItem.yLabel)
                }
              }
            }
          }
    
        });
        function epoch_to_hh_mm_ss(epoch) {
          return new Date(epoch*1000).toISOString().substr(11, 5)
        }
      })
      .catch(e =>{
        this.toast.show('failed to fetch data! '+e,'5000','center').subscribe(
          toast =>{
            console.log(toast);
          }
        );
      });
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
      db.executeSql('SELECT * FROM session',{})
    .then(res=>{
      db.executeSql('INSERT INTO diaryHistory VALUES(NULL,?,?,?,?,?,?)',[this.entry.date.toString(),this.entry.timeInBed.toString(),this.entry.timeFallAsleep.toString(),this.entry.timeWakeUp.toString(),this.entry.timeOutOfBed.toString(),res.rows.item(0).email])
      .then(res=>{
        console.log(res);
        this.toast.show('success input','5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.getRecentDiary()
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      })
      .catch(e =>{
        console.log(e);
        
      });
    })
    .catch(e =>{
      console.log(e)
    })
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
    this.getSession();
    this.getRecentDiary();
  }
  
  ionViewDidLoad(){
    this.getSession();
    this.getRecentDiary();
    
   

  }
}
