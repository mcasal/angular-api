import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Character } from "../character";
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<Character>;

  constructor(private activatedRoute: ActivatedRoute, private characterServise: CharacterService, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterServise.getDetails(id);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
