import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {TrackModel} from '../models/track-model';
import {body} from 'express-validator/check';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MusicSearchService {

  private searchUrl: string;
  private redirect_uri: string;
  private client_id = 'efa13ac850d54440bf11925779abfe9a';
  private client_secret = 'f947ab4997c947738a896e7d34f244fb';
  private access_token: string;
  private ArtistUrl: string;
  private AlbumsUrl: string;
  private AlbumUrl: string;
  private TrackUrl: string;
  private WidgetUrl: string;
  private TrackArray: TrackModel[];
  private PlaylistArray: string[];
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';
  private tracksURL = 'api/tracks';
  private playlistURL = 'api/playlists';

  data: any;
  constructor(private _http: Http, private http: HttpClient) {
    this.data = [];
  }
  getToken() {

    let params = ('grant_type=client_credentials');

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.encoded);

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

   /* return this._http.post('/api/token', params, { headers: headers })
      .map(res => res.json());*/

    return this._http.post('/testingInProgress', params , {headers : headers} )
      .map(res=> res.json());
  }
  
    deleteTrack(track: TrackModel): Observable<TrackModel> {

    const id = track.id;
    const url = `${this.tracksURL}/${id}`;
 
    return this.http.delete<TrackModel>(url, httpOptions)
      .pipe(
        catchError(this.handleError<TrackModel>('deleteTrack'))
      );
  }
  getToken2() {

    let params = ('grant_type=client_credentials');

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.encoded);

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post('/users/register2', params, { headers: headers })
      .map(res => res.json());
  }
  
    searchTracks(str: string, type = 'track', token: string) {
   console.log(this.encoded);
  console.log('Search tracks vanthachu');
  this.data.push({'one': str, 'one1': type, 'one2': token});
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

/*    this.searchUrl = 'https://api.spotify.com/search?query=' + str + '&offset=0&limit=50&type=' + type + '&market=US';
    console.log('URL is :' + this.searchUrl);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(this.searchUrl, { headers: headers })
      .map((res: Response) => res.json());*/
    return this._http.post('/getTracks', this.data, { headers: headers })
      .map(res=> res.json());
  }
  
   addTrack(track: TrackModel): Observable<TrackModel> {
    console.log('ENtered Add Track  :' + track.name );
    return this.http.post<TrackModel>(this.tracksURL, track, httpOptions)
      .pipe(
        catchError(this.handleError<TrackModel>('addTrack')
        ));

  }
  getTracks(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(this.tracksURL)
      .pipe(
        catchError(this.handleError('getTracks', []))
      );
  }
    private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}