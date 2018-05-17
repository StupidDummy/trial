import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Chart } from 'chart.js';
import { WelcomePage } from '../welcome/welcome';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var cordova;
@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  user = {
    name: 'Example',
    profileImage: 'assets/img/download.png',
    coverImage: 'assets/img/landscape-sky-night-stars-29435.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'A wise man once said: The more you do something, the better you will become at it.',
    waketime : '',
    performance: 0,
    bedtime : '',
    sleeplength: 0,
    sleeptime: '',
    full:''
  };
  
  test :any
  recentDataTFA:any[];
  recentDataTIB:any[];
  recentDataTOOB:any[];
  recentDataTWU:any[];
  recentDate:any[];
  scheduledTWU:any[];
  scheduledTFA:any[];
  recentDataSleepLength:any[];
  sleepTotalDuration = 0
  inBedTotalDuration = 0
  lineChart: any;
  barChart: any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('barCanvas') barCanvas;
  constructor(public navCtrl: NavController, 
    private sqlite: SQLite,
    private toast: Toast,
    private localNotifications: LocalNotifications) { }

  getSession(){
    this.sqlite.create({
      name: 'ionicalarm.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('SELECT * FROM session',{})
      .then(res=>{

        db.executeSql('SELECT * FROM account WHERE email=?',[res.rows.item(0).email])
        .then(res=>{
  
          if(res.rows.item(0).notif == 'true'){
            if(res.rows.item(0).smoke =='true'){
              if(new Date().getHours()>=18){
                this.test = new Date(new Date().setDate(new Date().getDate()+1))
              }else{
                this.test = new Date(new Date().setDate(new Date().getDate()))
              }
              this.test.setHours(18,0o0,0o0,0o0)
              this.localNotifications.schedule({
                id: 255,
                title: 'Alarm',
                text: 'Hi '+ res.rows.item(0).name+ ' ,this is a reminder to stop taking smoke after 6 o\'clock',
                at : this.test,
                data: { mydata:'Hidden Messages'},
                every: 'day'
              });
              // this.toast.show('smoke!' +this.test.toString(),'2000','center').subscribe(
              //   toast =>{
              //     console.log(toast);
              //   }
              // );
            }else{
              this.localNotifications.cancel(255)
            }
            if(res.rows.item(0).beer =='true'){
              if(new Date().getHours()>=18){
                this.test = new Date(new Date().setDate(new Date().getDate()+1))
              }else{
                this.test = new Date(new Date().setDate(new Date().getDate()))
              }
              this.test.setHours(18,0o0,0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: 256,
                title: 'Alarm',
                text: 'Hi '+ res.rows.item(0).name+ ' ,this is a reminder to stop taking any alcohol for a better sleep tonight!',
                at : this.test,
                data: { mydata:'Hidden Messages'},
                every: 'day'
              });
              // this.toast.show('beer!' + this.test.toString(),'5000','center').subscribe(
              //   toast =>{
              //     console.log(toast);
              //   }
              // );
            }else{
              this.localNotifications.cancel(256)
            }
            if(res.rows.item(0).coffee =='true'){
              if(new Date().getHours()>=15){
                this.test = new Date(new Date().setDate(new Date().getDate()+1))
              }else{
                this.test = new Date(new Date().setDate(new Date().getDate()))
              }
              this.test.setHours(15,0o0,0o0,0o0)
              cordova.plugins.notification.local.schedule({
                id: 257,
                title: 'Alarm',
                text: 'Hi '+ res.rows.item(0).name+ ' ,this is a reminder to stop taking caffeine for a better sleep tonight!',
                at : this.test,
                data: { mydata:'Hidden Messages'},
              });
              // this.toast.show('coffee!' + this.test.toString(),'8000','center').subscribe(
              //   toast =>{
              //     console.log(toast);
              //   }
              // );
            }else{
              this.localNotifications.cancel(257)
            }
          }else{
            this.localNotifications.cancel(255)
            this.localNotifications.cancel(256)
            this.localNotifications.cancel(257)
          }
  
          this.user.name = res.rows.item(0).name
          this.user.waketime = res.rows.item(0).waketime
          this.user.performance = res.rows.item(0).performance
          this.user.sleeplength = res.rows.item(0).sleeplength
          this.user.performance = res.rows.item(0).performance
          this.user.bedtime = new Date(((Number(res.rows.item(0).waketime.toString().substring(0,2))*3600+Number(res.rows.item(0).waketime.toString().substring(3,5))*60-Number(res.rows.item(0).sleeplength*3600))+Number(res.rows.item(0).sleeplength*3600)%1800)*1000).toISOString().substr(11, 5)
          this.user.full = this.getBeharviour(res.rows.item(0).smoke,res.rows.item(0).beer,res.rows.item(0).coffee)
          db.executeSql('SELECT * FROM diaryHistory WHERE email=? ORDER BY date ASC LIMIT 7',[res.rows.item(0).email])
          .then(res=> {
            
          this.recentDataTFA =[];
          this.recentDataTWU = [];
          this.recentDataTIB =[];
          this.recentDataTOOB =[];
          this.recentDate =[];
          this.scheduledTFA =[];
          this.scheduledTWU =[];
          this.recentDataSleepLength =[];
          for(var k=0; k<res.rows.length; k++){
            if(Number(res.rows.item(k).tfa.toString().substring(0,2))<=12){
              this.recentDataTFA.push(Number(res.rows.item(k).tfa.toString().substring(0,2))*3600+86400+Number(res.rows.item(k).tfa.toString().substring(3,5))*60)
            }else{
              this.recentDataTFA.push(Number(res.rows.item(k).tfa.toString().substring(0,2))*3600+Number(res.rows.item(k).tfa.toString().substring(3,5))*60)
            }
            if(Number(this.user.bedtime.toString().substring(0,2))<=12){
              this.scheduledTFA.push(Number(this.user.bedtime.toString().substring(0,2))*3600+86400+Number(this.user.bedtime.toString().substring(3,5))*60)
            }else{
              this.scheduledTFA.push(Number(this.user.bedtime.toString().substring(0,2))*3600+Number(this.user.bedtime.toString().substring(3,5))*60)
            }
            if(Number(res.rows.item(k).tib.toString().substring(0,2))<=12){
              this.recentDataTIB.push(Number(res.rows.item(k).tib.toString().substring(0,2))*3600+86400+Number(res.rows.item(k).tib.toString().substring(3,5))*60)
            }else{
              this.recentDataTIB.push(Number(res.rows.item(k).tib.toString().substring(0,2))*3600+Number(res.rows.item(k).tib.toString().substring(3,5))*60)
            }
            this.recentDataTOOB.push(Number(res.rows.item(k).toob.toString().substring(0,2))*3600+Number(res.rows.item(k).toob.toString().substring(3,5))*60)
            this.recentDataTWU.push(Number(res.rows.item(k).twu.toString().substring(0,2))*3600+Number(res.rows.item(k).twu.toString().substring(3,5))*60)
            this.scheduledTWU.push(Number(this.user.waketime.toString().substring(0,2))*3600+Number(this.user.waketime.toString().substring(3,5))*60)
            this.recentDataSleepLength.push(this.getDif(res.rows.item(k).tfa,res.rows.item(k).twu))
            this.recentDate.push(res.rows.item(k).date.toString().substring(8,10)+ '/'+res.rows.item(k).date.toString().substring(5,7)+ '/' + res.rows.item(k).date.toString().substring(2,4))
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
                      label: "Scheduled Bed Time",
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
                    },{
                      label: "Time Go To Sleep",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(124,252,0,0.4)",
                        borderColor: "rgba(124,252,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(124,252,0,0.4)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(124,252,0,0.4)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.recentDataTIB,
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
                    },{
                      label: "Time Out Of Bed",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(124,252,0,0.4)",
                        borderColor: "rgba(124,252,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(124,252,0,0.4)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(124,252,0,0.4)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.recentDataTOOB,
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
          this.barChart = new Chart(this.barCanvas.nativeElement, {
  
              type: 'bar',
              data: {
                  labels: this.recentDate,
                  datasets: [{
                      label: 'No. of Hours Sleep',
                      data: this.recentDataSleepLength,
                      
                      borderWidth: 0.5
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero:true
                          }
                      }]
                  }
              }

          });
          function epoch_to_hh_mm_ss(epoch) {
            return new Date(epoch*1000).toISOString().substr(11, 5)
          }
        })

      })
      .catch(e => {
        this.toast.show('No detail fetched! '+e,'5000','center').subscribe(
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
  
  getBeharviour(smoke,beer,coffee){
    if(smoke=='true'){
      if(beer=='true'){
        if(coffee=='true'){
          return 'Smoker • Drink Alcohol • Drink Coffee'
        }else{
          return 'Smoker • Drink Alcohol'
        }
      }else{
        if(coffee=='true'){
          return 'Smoker • Drink Coffee'
        }else{
          return 'Smoker'
        }
      }
    }else{
      if(beer=='true'){
        if(coffee=='true'){
          return 'Drink Alcohol • Drink Coffee'
        }else{
          return 'Drink Alcohol'
        }
      }else{
        if(coffee=='true'){
          return 'Drink Coffee'
        }else{
          return 'Healthy Lifestyle, no smoke, no Alcohol, no coffee'
        }
      }
    }
  }

  ionViewDidLoad(){
    this.getSession()

  }

  
}
