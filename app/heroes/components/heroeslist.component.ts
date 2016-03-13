import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Hero } from '../../hero';
import { HeroesAdd } from './heroesadd.component';
import { HeroesStorage } from '../storage/storage';

@Component({
  selector: 'hero-list',
  template: `
  <div>
      <ul>
        <li *ngFor="#hero of storage.heroes">
          <p>{{hero.name}} &ndash; {{hero.id}}
          <button (click)="removeItem(hero)">Remove</button>
          </p>
        </li>
      </ul>

    </div>
  `
})
export class HeroesList {
  private hero: Hero;
  
  constructor(public storage: HeroesStorage) {
    this.storage = storage;
  }

  removeItem(hero: Hero) {
    this.storage.remove(hero);
  }
}
