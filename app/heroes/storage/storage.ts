import { Injectable } from 'angular2/core'
import { Hero } from '../../hero';
@Injectable()
export class HeroesStorage {
  private heroStorage: Hero[] = [];
  private counter: number = 0;

  get heroes() {
    return this.heroStorage;
  }

  add(hero: Hero) {
    this.heroStorage.push(hero);
  }

  remove(hero: Hero) {
      this.heroStorage.splice(this.heroStorage.findIndex((value: Hero) => { return value.id == hero.id }), 1);
  }

  createHero(name: string = '', age: number = -1): Hero {
    return {
      name: name,
      id: age === -1 ? this.counter++ : age
    };
  }
}
