import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  template: `
    <div class="object-contents">
      <h1>Here is object</h1>
      <h2>{{ object | async | json }}</h2>
    </div>
    <div class="list-contents">
      <h1>Here is list</h1>
      <ul>
        <li *ngFor="let list of lists | async">
          {{ list | json }}
        </li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  // オブジェクト
  objectRef: AngularFireObject<any>;
  object:Observable<any>;
  // リスト
  listsRef: AngularFireList<any>;
  lists:Observable<any>;

  constructor(db: AngularFireDatabase){
    // オブジェクト
    this.objectRef = db.object('master/product');
    this.object = this.objectRef.valueChanges();
    // リスト
    this.listsRef = db.list('master/product');
    this.lists = this.listsRef.snapshotChanges().pipe(
      map(changes =>
        // changes.map(c => (c.payload.key))
        changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
