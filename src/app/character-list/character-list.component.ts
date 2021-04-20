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
        this.numPages = response['info']['pages'];
      })
  }

  async onChangePage(next) {
    if (next) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    const response = await this.characterService.getAllCharacters(this.currentPage);
    this.arrCharacters = response['results'];
  }
}
