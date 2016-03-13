import { Component, View } from 'angular2/core';
import { HeroesList } from './heroes/components/heroeslist.component';
import { HeroesAdd } from './heroes/components/heroesadd.component';

@Component({
  selector: 'my-app',
  directives: [HeroesAdd, HeroesList],
  template: `
  <h1>{{title}}</h1>
  <hero-list>p</hero-list>
  <add-hero>p</add-hero>
  `
})
export class AppComponent {
  public title = 'Tour of Heroes';
  constructor() {
      
  }
}
