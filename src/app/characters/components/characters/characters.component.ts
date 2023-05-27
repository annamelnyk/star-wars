import { Component, OnInit } from '@angular/core';

import { SwapiService } from '../../../services/swapi.service';
import { ICharacter } from 'src/app/data/models/type';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  public characters: ICharacter[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService
      .getData('people')
      .subscribe((ch: any) => (this.characters = ch.results));
  }
}
