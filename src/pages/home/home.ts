import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicProvider } from "./../../providers/music/music";
import { Component } from "@angular/core";
import { NavController, LoadingController, Loading, ActionSheetController, ActionSheet } from "ionic-angular";
import { MusicPlayerPage } from '../music-player/music-player';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  allMusic: any[] = [];
  private _allMusicLoadingController: Loading;
  private _shareSongActionSheet: ActionSheet;

  constructor(
    public navCtrl: NavController,
    private _musicProvider: MusicProvider,
    private _loadingController: LoadingController,
    private _actionSheetController: ActionSheetController,
    private _socialSharing: SocialSharing
  ) {}

  getMusic() {
    this._musicProvider.getMusic().subscribe(
      data => {
        console.log("Data: ", data);
        this._allMusicLoadingController.dismiss();
        this.allMusic = data;
      },
      error => console.log(error)
    );
  }

  ionViewDidLoad(): void {
    this._allMusicLoadingController = this._loadingController.create({
      content: "Getting Your Music From Server"
    });
    this._allMusicLoadingController.present();
    return this.getMusic();
  }

  refresher(reload) {
    this._musicProvider.getMusic().subscribe(oneSong => {
      this.allMusic.unshift(oneSong[0]);
      reload.complete();
    });
  }

  shareSong(music) {
    this._shareSongActionSheet = this._actionSheetController.create({
      title: "Share song with friends",
      buttons: [
        {
          text: "Share on Facebook",
          icon: "logo-facebook",
          handler: () => {
            this._socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
          }
        },
        {
          text: "Share on Twitter",
          icon: "logo-twitter",
          handler: () => {
            this._socialSharing.shareViaTwitter(music.name, music.image, music.music_url)
          }
        },
        {
          text: "Share",
          icon: "logo-share",
          handler: () => {
            this._socialSharing.share(music.name, "", music.image, music.image_url)
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    this._shareSongActionSheet.present();
  }

  goToMusicPlayer(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }

  addToFavorites(music) {
    this._musicProvider.addToFavorites(music);
  }
}
