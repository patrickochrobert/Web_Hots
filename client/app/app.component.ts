import { Component, View } from 'angular2/core';
import { HeroesList } from './heroes/components/heroeslist.component';
import { HeroesAdd } from './heroes/components/heroesadd.component';
import { Chat } from './chat/chat.component';

@Component({
  selector: 'my-app',
  directives: [HeroesAdd, HeroesList, Chat],
  template: `
  <h1>{{title}}</h1>
  <hero-list>Loading List</hero-list>
  <add-hero>Loading Add hero</add-hero>
  <chat>Loading chat</chat>
  `
})
export class AppComponent {
  public title = 'Tour of Heroes';
}
