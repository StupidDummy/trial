import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Chart } from 'chart.js'

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
    sleeplength: 0,
    sleeptime: ''
  };
  
  recentDataTFA:any[];
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
          this.user.sleeplength = res.rows.item(0).sleeplength
          this.user.performance = res.rows.item(0).performance
          this.user.bedtime = new Date(((Number(res.rows.item(0).waketime.toString().substring(0,2))*3600+Number(res.rows.item(0).waketime.toString().substring(3,5))*60-Number(res.rows.item(0).sleeplength*3600))+Number(res.rows.item(0).sleeplength*3600)%1800)*1000).toISOString().substr(11, 5)
        
          db.executeSql('SELECT * FROM diaryHistory WHERE email=? ORDER BY date ASC LIMIT 7',[res.rows.item(0).email])
          .then(res=> {
            
          this.recentDataTFA =[];
          this.recentDataTWU = [];
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
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: this.recentDate,
                datasets: [{
                    label: 'No. of Hours Sleep',
                    data: this.recentDataSleepLength,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
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

  ionViewDidLoad(){
    this.getSession()

  }

  
}
