import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Item } from '../../models/item';
import { Items } from '../../providers';

import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: FirebaseListObservable<any[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public firebaseProvider: FirebaseProvider) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      // this.currentItems = [];
      return false;
    }
    this.currentItems = this.firebaseProvider.getItems(
      {
        orderByChild:'name',
        startAt:val,
        endAt:val+"\uf8ff",
        once:"value"
      }
    );
    console.log(this.currentItems);
    
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
