import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutSleepDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-sleep-detail',
  templateUrl: 'about-sleep-detail.html',
})
export class AboutSleepDetailPage {

  private titleName;
  private content : any[];
  private title = 'just another title';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.titleName = navParams.get('titleName')
  }

  getContent(titleName){
    if(titleName=='SaCR'){
      this.title = 'Sleep and Circadian Rhythm'
      this.content = [
        { 
          isText : true,
          description : 'Sleep is an important part of human routines and it takes around 1/3 of our daily times. Sleep timing of a human is managed by a Rhythm call Circadian Rhythm. Circadian Rhythm is a cyclical of biological processes and behaviours that occur approximately daily. Circadian comes from Latin word circa means about and dies means day which combine meaning is a daily rhythm. Circadian Rhythm which is also known as Biological clock, regulate body functions such as blood pressure, body temperature, heart rate and hormones release. Circadian Rhythm is managed by a group of cells called Suprachiasmatic Nucleus (SCN) which is in the hypothalamus in brain.'
        },
        {
          isText : false,
          link : 'assets/img/melatonin-profile.jpg',
          description : 'figure 1.'
        },
        {
          isText : true,
          description : 'As shown in Figure 1, these SCN cells are connected to optic nerves that senses natural light around the person in a 24-hours period.'        
        },
        {
          isText : false,
          link : 'assets/img/SCN_light_signals.jpg',
          description : 'figure 2.'
        },
        {
          isText : true,
          description : 'Circadian Rhythm has a capability to manage sleep schedule by controlling a hormone call melatonin. Referring to figure 2, Melatonin hormones increases from evening and peak during the middle of the night. The melatonin levels fall to low during the daytime.'
        }

      ]
    }else if(titleName =='CRD'){
      this.title = 'Circadian Rhythm Disorder'
      this.content = [
        {
          isText : true,
          description : 'There are several factors that can disrupt someone Circadian Rhythm causing the timing to misalign. A disrupted Circadian Rhythm is also known as Circadian Rhythm Sleep Disorder (CRSD). Circadian Rhythm Sleep Disorders can be categories into many different types. In this section, we will be taking a closer look at some of the more common varieties.'
        },
        {
          isText : true,
          description : '1. Delayed Sleep-Phase Disorder'
        },
        {
          isText : true,
          description : 'Delayed Sleep-Phase Disorder(DSPD) is a disorder where people stay up later than normal sleeping time. Although the people are staying up later, they still need 7 to 9 hours normal sleep time. This is caused by the delayed or disrupted production of Melatonin which is controlled by Circadian Rhythm. Moreover, the delayed produced Melatonin hormones also lasts the same as normal causing the people difficulty to rise in the morning. This disorder can lead to insomnia, excessive daytime sleepiness and depression.'
        },
        {
          isText : true,
          description : '2. Advanced Sleep-Phase Disorder'
        },
        {
          isText : true,
          description : 'Advanced Sleep Phase Disorder(ASPD) is a disorder where people tend to sleep earlier in the evening. People with ASPD also wake up earlier in the morning. People with this disorder have an earlier cycle of Melatonin. This disorder is more common in the elderly rather than other ages. ASPS occurrences are much lesser compared to DSPD.'
        },
        {
          isText : true,
          description : '3. Non-24-Hour Sleep-Wake Disorder'
        },
        {
          isText : true,
          description : 'Non-24-Hour Sleep-Wake Disorder is a disorder where the peoples’ biological clock is shift every several days due to longer than 24-hour circadian cycle. This syndrome is usually found in blind and sighted people. The reason is blind peoples’ optic nerve have difficulty to sense the light causing the circadian rhythm shifting very often.'
        },
        {
          isText : true,
          description : '4. Irregular Sleep-Wake Rhythm Disorder'
        },
        {
          isText : true,
          description : 'Irregular Sleep-Wake Rhythm Disorder is a disorder where the people don’t have any pattern in their sleep time. Instead, their sleep time are divided into several naps time that sums up to 7-9 hours. This can be due to the central degeneration of SCN neurons and lack of light exposure. This disorder can cause people to have insomnia at night and an excessive day time nap.'
        },
        {
          isText : true,
          description : '5. Jet-Lag Disorder'
        },
        {
          isText : true,
          description : 'Jet-Lag Disorder is a disorder resulted from travelling to another time zone area causing people mismatch between people circadian rhythm or biological clock and the local time zone. The common effects of Jet-Lag Disorder are sleep disturbance, poor appetite, irritability, anxiety, impaired daytime, etc. '
        },
        {
          isText : true,
          description : '6. Shift Work Disorder'
        },
        {
          isText : true,
          description : 'Shift Work Disorder is a disorder that caused when someone circadian rhythm is disturbed by Shift work. A SWD can cause the shift worker working to have lower working performance, sleepiness, and accident during work. '
        },
        {
          isText : false,
          link : 'assets/img/CircadianRhythmPhase.jpg',
          description : 'figure 1'
        },
        {
          isText : true,
          description : 'These Circadian Rhythm Sleep Disorder sleep timing can be seen in figure 1.'
        }
      ]
    }else if(titleName == 'TfSD'){
      this.title = 'Treatments for Sleep Disorder'
      this.content = [
        { 
          isText : true,
          description : 'Among all Circadian Rhythm Sleep Disorder, Delayed Sleep-Phase Disorder is one of the most common disorder around the world. Several treatments have been developed to treat DSPD such as: '
        },
        {
          isText : true,
          description : '1. Melatonin Treatment'        
        },
        {
          isText : true,
          description : '2. Bright Light Therapy'        
        },
        {
          isText : true,
          description : '3. Blue Light'        
        },
        {
          isText : true,
          description : '4. CBT- I'        
        },
        {
          isText : true,
          description : '5. Mindfulness Meditation'        
        }
      ]
    }else if(titleName == 'BLT'){
      this.title = 'Bright Light Therapy'
      this.content = [
        { 
          isText : true,
          description : 'A person circadian rhythm is affected by light exposure surrounding the person. The melatonin level in the body is reduced when the person is exposed to light. Bright light therapy aims to reset a person circadian rhythm by exposing the person to artificial light. Light box is usually used for this therapy. It can emit up to 10000 lux of light allowing each session to be around 15 to 30 minutes. Bright light therapy is known to be safe to use, however, some side effects can also occur, such as eyestrain, headache, and nausea.'
        }
      ]
    }else if(titleName == 'BL'){
      this.title = 'Blue Light'
      this.content = [
        { 
          isText : true,
          description : 'According to Harvard Researchers, among all types of light, blue light has the strongest effects on suppressing the production of melatonin hormones. LED lights in house and bright screens also can produce the same blue light effects. Being exposed to blue lights at night can disrupt a person circadian rhythm and make them stay awake. It is suggested by Harvard to substitute LED lights with dim red lights for night lights, using blue light filter or night mode setting in phones, and avoid bright screens 2-3 hours before sleep for a better sleep at night.'
        },
        {
          isText : false,
          link : 'assets/img/melatonin-0.jpg',
          description : 'figure 1.'
        },
        {
          isText : true,
          description : 'Figure 1 shows that Blue light has the strongest effects on suppresing melatonin production.'
        }
      ]
    }else if(titleName == 'CBTI'){
      this.title = 'CBT-I'
      this.content = [
        { 
          isText : true,
          description : 'Cognitive Behaviour Therapy is a psychotherapy that challenged pattern of negative thinking and behaviour to change it to a better way. Cognitive Behaviour Therapy for Insomnia (CBT-I) is a treatment for a person with insomnia using psychotherapy. First, CBT-I will teach the patient to recognize their negative thoughts that keep the patient awake and try to control them. Next, it will teach the patient to develop good sleep habits and to avoid bad sleep behaviours.'
        },
        { 
          isText : true,
          description : 'CBT-I contain several methods or techniques to treat the insomnia. Following are the methods:'
        },
        {
          isText : true,
          description : '1. Sleep Hygiene'        
        },
        {
          isText : true,
          description : '2. Stimulus Control'        
        },
        {
          isText : true,
          description : '3. Sleep Restriction'        
        }
      ]
    }else if(titleName == 'SH'){
      this.title = 'Sleep Hygiene'
      this.content = [
        { 
          isText : true,
          description : 'Sleep Hygiene is a method of therapy that works by changing a person lifestyle habits about some basic daily activity before sleeps. Following are the activity that Sleep hygiene focus on:'
        },
        { 
          isText : true,
          description : '-	Caffeine intake'
        },
        {
          isText : true,
          description : '-	Alcohol intake'        
        },
        {
          isText : true,
          description : '-	Sleep Environment'        
        },
        {
          isText : true,
          description : '-	Wake up time'        
        }
      ]
    }else if(titleName == 'SC'){
      this.title = 'Stimulus Control'
      this.content = [
        { 
          isText : true,
          description : 'Stimulus Control is a method that helps to associate bed with sleep and to avoid any stimulating activity before sleep. Stimulus control usually associated with several steps before sleep. Following are the step by step guide to have a better sleep.'
        },
        { 
          isText : true,
          description : '1.	Go to bed when sleepy.'
        },
        {
          isText : true,
          description : '2.	If the person doesn’t fall asleep after 20-30 minutes in bed, get up from bed and do something boring. Don’t do any activity in bed.'        
        },
        {
          isText : true,
          description : '3.	Once sleepy again, go to bed.'        
        },
        {
          isText : true,
          description : '4.	Repeat this routine every night when going to sleep.'        
        },
        {
          isText : true,
          description : '5.	Wake up on time and avoid taking nap during day.'
        }
      ]
    }else if(titleName == 'SR'){
      this.title = 'Sleep Restriction'
      this.content = [
        { 
          isText : true,
          description : 'Sleep restriction is a method in CBT-I that aims to reset the patient biological clock by keeping track of his/her sleep timing in a sleep diary. The method requires the patient to wake up on the timing set and avoid naps during the day. This will cause a partial sleep deprivation and make the patient more tired at night. The data recorded from sleep diary can be used to calculate the new sleep timing, and sleep efficiency. '
        },
        { 
          isText : true,
          description : 'A good sleep is a sleep with efficiency score at least 80%. Sleep efficiency score can be calculated by average total sleep time divided by average time in bed. If the efficiency score is above 80%, the patient should maintain the sleep timing. If the efficiency score is below 80%, the patient should sleep at the new given timing. The patient must first choose the wake-up time and set it as the anchor. Next, deduct the wake-up time by average total sleep time and it will resulting the new timing for time to bed. In long term, the patient will slowly adjust their own body clock. '
        }
      ]
    }else if(titleName == 'MM'){
      this.title = 'Mindfulness meditation'
      this.content = [
        { 
          isText : true,
          description : 'Mindfulness is a human ability to be aware of what is going on and not be overwhelmed by it. One of the method to achieve mindfulness is by doing meditation. A study shows that mindfulness meditation can act as solution to treat sleep disturbances and increases sleep quality. According to Dr. Herbert Benson from Harvard, it is recommended to practice mindfulness for 20 minutes and it create a feel of relaxation to help gaining better sleep.'
        }
      ]
    }else{
      this.title = 'Oops',
      this.content = [
        {
          isText : true,
          description : 'Error 404........ Something gone missing hmm.. Have you try turning it off and on again? or perhaps try putting it rice...'
        }
      ]
    }
  }

  ionViewDidLoad() {
    this.getContent(this.titleName);

  }

}
