import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { ImageViewerController } from "ionic-img-viewer";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public imageViewerCtrl: ImageViewerController) {
    this.item = navParams.get('item');
  }

  onClick(imageToView) {
    console.log(imageToView);

    
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }

}
