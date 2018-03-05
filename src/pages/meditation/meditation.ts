import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media'

@IonicPage()
@Component({
  selector: 'page-meditation',
  templateUrl: 'meditation.html'
})
export class MeditationPage {
    
  pause ='false'
  constructor(public navCtrl: NavController,
  private streamingMedia: StreamingMedia,) { }


  playAudio(){
    let options:StreamingAudioOptions ={
      successCallback: () => {console.log()},
      errorCallback: () => {console.log()},
      initFullscreen:false,
    }
    
    this.streamingMedia.playAudio('assets/sounds/3-Minute.mp3', options);

  }

  pauseAudio(){
    if(this.pause){
      this.streamingMedia.resumeAudio();
    }else{
      this.streamingMedia.pauseAudio();
    }
  }

  stopAudio(){
    this.streamingMedia.stopAudio();
  }
}
