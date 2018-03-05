import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutSleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-sleep',
  templateUrl: 'about-sleep.html',
})
export class AboutSleepPage {

  itemDetail =[
    {
      title : 'Sleep and Circadian Rhythm',
      name : 'SaCR'
    },
    {
      title : 'Circadian Rhythm Disorders',
      name : 'CRD'
    },
    {
      title : 'Treatment for Sleep Disorder',
      name : 'TfSD'
    },
    {
      title : 'Bright Light Therapy',
      name : 'BLT'
    },
    {
      title : 'Blue Light',
      name : 'BL'
    },
    {
      title : 'CBT-I',
      name : 'CBTI'
    },
    {
      title : 'Sleep Hygiene',
      name : 'SH'
    },
    {
      title : 'Stimulus Control',
      name : 'SC'
    },
    {
      title : 'Sleep Restriction',
      name : 'SR'
    },
    {
      title : 'Mindfulness Meditation',
      name : 'MM'
    }
    
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openDetail(title){
    this.navCtrl.push('AboutSleepDetailPage',{titleName: title})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutSleepPage');
  }

}
