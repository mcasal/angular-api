import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  visibility: string;
  arrCharacters: Character[];
  randomCharacterGender: string;
  randomCharacterName: string;
  randomCharacterImg: string;
  guess: boolean;

  constructor(private characterService: CharacterService) {
    this.visibility = 'invisible';
  }

  ngOnInit(): void {
    this.characterService.getAllCharacters()
      .then(response => {
        this.arrCharacters = response['results'];
      });
    this.guess = true;
  }

  nextGuess() {
    let random = Math.floor(Math.random() * this.arrCharacters.length);

    this.randomCharacterGender = this.arrCharacters[random].gender;
    if (this.randomCharacterGender === 'Male') {
      this.randomCharacterGender = 'his'
    } else if (this.randomCharacterGender === 'Female') {
      this.randomCharacterGender = 'her'
    } else {
      this.randomCharacterGender = 'its'
    }
    this.randomCharacterName = this.arrCharacters[random].name;
    this.randomCharacterImg = this.arrCharacters[random].image;
    this.visibility = 'visible';
  }

  onGuess() {
    let name: string = (<HTMLInputElement>document.getElementById('name_character')).value;
    let guessing = document.getElementById('guessing') as HTMLElement;

    if (name === this.randomCharacterName) {
      this.guess = true;
      guessing.textContent = 'Correct!';
    } else {
      this.guess = false;
      guessing.textContent = 'Wrong!';
    }
  }
}
