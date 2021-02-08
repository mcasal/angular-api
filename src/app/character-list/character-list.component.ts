import { Component, OnInit } from '@angular/core';

import { CharacterService } from '../character.service';
import { Character } from "../character";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  arrCharacters: Character[];
  arrCharactersLength: number;
  currentPage: number;
  numPages: number;

  constructor(
    private characterService: CharacterService) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.characterService.getAllCharacters()
      .then(response => {
        this.arrCharacters = response['results'];
        this.arrCharactersLength = this.arrCharacters.length;
        this.numPages = response['info']['pages'];
      })
  }
}
