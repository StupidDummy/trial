import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meditation',
  templateUrl: 'meditation.html'
})
export class MeditationPage {
    
  listOfMeditation = [
    {
      title : '3-Minute guided meditation practices',
      description : 'A brief mindfulness meditation practice to relax your body and focus your mind.',
      id : 'meditation1',
      source : 'assets/sounds/3-Minute.mp3',
    },
    {
      title : '5-Minute guided breathing meditation practices',
      description : 'This practice can help reduce stress, anxiety, and negative emotions.',
      id : 'meditation2',
      source : 'assets/sounds/5-Minute Breathing Meditation.mp3'
    }
  ]
  constructor(public navCtrl: NavController
  ) { }


  
}
