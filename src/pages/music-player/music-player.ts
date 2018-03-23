import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Media, MediaObject } from "@ionic-native/media";

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-music-player",
  templateUrl: "music-player.html"
})
export class MusicPlayerPage {
  private _isMusicPaused = false;
  public music = {};
  private _songMedia: MediaObject = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _media: Media
  ) {}

  ionViewDidLoad() {
    this.music = this.navParams.get("music");
  }

  stopMusic() {
    if (this._songMedia !== null) this._songMedia.stop();
    this._songMedia.release();
    this._songMedia = null;
  }
  playMusic() {
    if (this._songMedia === null) {
      this._songMedia = this._media.create(this.music["music_url"]);
      this._songMedia.play();
    } else {
      if (this._isMusicPaused === true) {
        this._songMedia.play();
        this._isMusicPaused = false;
      }
    }
  }
  pauseMusic() {
    if (this._songMedia !== null) {
      this._songMedia.pause();
      this._isMusicPaused = true;
    }
  }
}
