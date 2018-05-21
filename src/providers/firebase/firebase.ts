import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
  constructor(public http: HttpClient,public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  getItems(query = {}) {
    //return this.afd.list('/sktapp/');
    console.log(query)
    return this.afd.list('/sktapp/items', {
      query: query
    });
  }



 
  addItem(name) {
    this.afd.list('/sktapp/items').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/sktapp/items').remove(id);
  }


}
