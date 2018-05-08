import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class WebApiDbService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const tracks = [
      {
        id: 0,
        trackID: '',
        name: '',
        genre: '',
        album: '',
        artist: '',


      }
    ];

    return {tracks};
  }

}
