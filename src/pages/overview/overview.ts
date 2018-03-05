import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
    followers: 456,
    following: 1052,
    posts: 35
  };
  constructor(public navCtrl: NavController) { }

}
