import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Character } from "./character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://rickandmortyapi.com/api'
  }

  getAllCharacters(page = 1): Promise<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/?page=${page}`).toPromise();
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`)
  }
}
