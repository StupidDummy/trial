import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Settings } from '../../providers/providers';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { WelcomePage } from '../welcome/welcome';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    private openNativeSettings: OpenNativeSettings,
    private sqlite: SQLite,
    private toast: Toast,
  ) {
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
  open(setting: string){
    this.openNativeSettings.open(setting).then(val =>{
      alert(setting);
    }).catch(err =>{
      alert(JSON.stringify(err));
    })
  }
  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
