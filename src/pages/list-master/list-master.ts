import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Item } from '../../models/item';
import { Items } from '../../providers';


import { FirebaseListObservable } from 'angularfire2/database';


import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})



export class ListMasterPage {
  shoppingItems: FirebaseListObservable<any[]>;
  newItem = '';
  currentItems: Item[];
  keys: String[];
  users: any;
  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public firebaseProvider: FirebaseProvider) {
    
    this.shoppingItems = this.firebaseProvider.getShoppingItems({limitToLast: 6});
    console.log(this.shoppingItems);
    
    this.getUsers();

  }

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }



  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

  console.log("test");
  
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
        this.firebaseProvider.addItem(item)
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
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
