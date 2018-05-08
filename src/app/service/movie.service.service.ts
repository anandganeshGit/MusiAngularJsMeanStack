import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MoviesService {

  baseUrl: string;
  apiKey: string;
  language: string;
  dat: any;
  result: any;

  constructor(private _http: Http) { }
/*  getUsers(fnm, lnm, ph, mail, pwd, addr) {
    this.dat = [fnm, lnm, ph, mail, pwd, addr];
    console.log('STARTNG FROM TS SERVICE CONNECTION');
    return this._http.post('http://localhost:4200/users/register', fnm);
      /!*.map(result => this.result = result.json().data);*!/
  }*/

  getUsers(dd) {
    console.log('STARTNG FROM TS SERVICE CONNECTION');
    return this._http.post('/users/register', dd).subscribe(res => {
      console.log('Ula Varla');
    });

  }

}
