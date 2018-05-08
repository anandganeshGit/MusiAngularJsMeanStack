import { Component, OnInit } from '@angular/core';
import {MusicSearchService} from '../../service/music-search.service';
import {TrackModel} from '../../models/track-model';
import {ArtistModel} from '../../models/artist-model';
import {MenuItem} from 'primeng/primeng';
import {MatTableDataSource} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {AlbumModel} from '../../models/album-model';
import { DropdownModule } from 'angular-2-dropdown/mk-dropdown/dropdown.module';


 /*declare var swalll: any;*/
/*import Swal from 'sweetalert2';*/


@Component({

  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css'],
  providers: [MusicSearchService]
})
export class MusicSearchComponent implements OnInit {

  searchStr: string;
  searchResArt: ArtistModel[];
  searchResTrack: TrackModel[];
  tracks: TrackModel[] = [];
  temp: TrackModel[];
  items: MenuItem[];
  displayedColumns = ['cover', 'artistName', 'name', 'popularity', 'album', 'addPlaylist'];
  dataSource = new MatTableDataSource<TrackModel>(); // new MatTableDataSource(this.searchResTrack);



  constructor(private musSerSerObj: MusicSearchService) { }

  ngOnInit() {
  }

  searchTracks() {
    this.musSerSerObj.getToken()
      .subscribe(res => {
        console.log('Token function over');
        this.musSerSerObj.searchTracks(this.searchStr, 'track', res.access_token)
          .subscribe(res => {
            this.searchResTrack = res.tracks.items;
            this.dataSource = new MatTableDataSource(this.searchResTrack);
          });
      });
  }
  SortByArtist()
 {
   this.sortByArtist();
   this.dataSource = new MatTableDataSource(this.searchResTrack);
 }

 SortByAlbum()
 {
     console.log("Asas");
   this.sortByAlbum();
   this.dataSource = new MatTableDataSource(this.searchResTrack);
 }

 SortByPop()
 {
   this.sortByPopularity();
             this.dataSource = new MatTableDataSource(this.searchResTrack);
 }

  sortByArtist() {
   
    this.searchResTrack.sort(function (track1, track2) {
        if (track1.artists[0].name < track2.artists[0].name) {
            return -1;
        }
        else if (track1.artists[0].name > track2.artists[0].name) {
            return 1;
        }
        else {
            return 0;
        }
    });
 
 }
 
 hello()
 {
    console.log("helaso");
 }
 
 sortByAlbum() {
  console.log("shru");
  this.searchResTrack.sort(function (track1, track2) {
      if (track1.album.name < track2.album.name) {
          return -1;
      }
      else if (track1.album.name > track2.album.name) {
          return 1;
      }
      else {
          return 0;
      }
  });
 }
 
 
 sortByPopularity() {
  this.searchResTrack.sort(function (track1, track2) {
      if (track1.popularity > track2.popularity) {
          return -1;
      }
      else if (track1.popularity < track2.popularity) {
          return 1;
      }
      else {
          return 0;
      }
  });
 }

  // Adding tracks function using addTrack function from Service.ts
  add(trackID: string, name: string, album: AlbumModel, artists: ArtistModel[], id: number, popularity: string): void {

    var widgetURL = "https://open.spotify.com/embed?uri=spotify:track:" + trackID;
    console.log(trackID + name + 'Name nad Album   :' + album + artists);
    this.musSerSerObj.addTrack({ trackID, name, album, artists, popularity, widgetURL } as TrackModel)
      .subscribe(track => {
        this.tracks.push(track);
        console.log('Added');
        /*let swal: any;*/


        // Sweetalert2 function for success
/*        Swal({
          type: 'success',
          title: 'Track Added To PlayList',
          showConfirmButton: false,
          timer: 1800
        }).catch(function (timeout) {
          if (timeout === 'timer') {
          }
        });*/
  //  Swal('Added');

      });
  }
}
