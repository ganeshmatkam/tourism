import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { DomSanitizer } from '@angular/platform-browser';

import { VideoService } from '../../providers/_providers';

/**
 * Generated class for the VideoDetails component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-details',
  templateUrl: 'video-details.html',
  providers: [VideoService]
})
export class VideoDetails {

  public currentVideo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private videoSvc: VideoService,
    public sanitizer: DomSanitizer,
    private streamingMedia: StreamingMedia) {
    this.currentVideo = navParams.get('video');
  }
  public playVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    this.streamingMedia.playVideo(this.videoSvc.getEmbedUrl(this.currentVideo.url), options);
  }
  public getEmbedUrl() {
    let url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoSvc.getEmbedUrl(this.currentVideo.url));
    return url;
  }
}
