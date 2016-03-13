import { Component } from 'angular2/core';
import { Hero } from '../../hero';
import { HeroesStorage } from '../storage/storage';
@Component({
  selector: 'add-hero',
  template: `
  <input [(ngModel)]="hero.name" >
  <button (click)="addItem()">Add Hero</button>
  `
})
export class HeroesAdd {
  public hero: Hero;
  private storage: HeroesStorage;

  constructor(storage: HeroesStorage) {
    this.storage = storage;
    this.hero = storage.createHero();
  }

  addItem() {
      this.storage.add(this.hero);
      this.hero = this.storage.createHero();
  }
}